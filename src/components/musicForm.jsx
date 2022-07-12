import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMusic, getMusic } from "../services/musicService";
import auth from "../services/authService";
import MusicUpload from "./common/musicUpload";

class MusicForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "",

        music: "",
        caption: "",
      },

      music: "",
      caption: "",
      errors: {},
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  schema = {
    music: Joi.string().allow("").optional().label(" Music Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
  };
  async componentDidMount() {
    await this.populateMusic();
  }
  async populateMusic() {
    try {
      const musicId = this.props.match.params.id;
      if (!musicId) return;

      const { data: music } = await getMusic(musicId);
      const _id = musicId ? musicId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(music) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(music) {
    return {
      _id: music._id,

      music: music.music,
      caption: music.caption,
    };
  }
  doSubmit = async () => {
    const response = await saveMusic(this.state.data);
    auth.loginWithJWT(response.headers["x-auth-token"]);
    window.location = "/";
  };

  handleImageChange = async (event) => {
    const content = document.getElementById("preview_img").src;
    const caption = document.getElementById("caption").value;
    const data = { ...this.state.data };

    data.music = content;
    data.caption = caption;
    this.setState({ data });
  };
  handleCaptionChange = async () => {
    const data = { ...this.state.data };
    const caption = document.getElementById("caption").value;
    data.caption = caption;
    this.setState({ data });
  };
  onClickHandler = async (e) => {
    e.preventDefault();
    const music = await document.getElementById("preview_img").src;
    const caption = await document.getElementById("caption").value;

    const data = { ...this.state.data };
    data.music = music;

    data.caption = caption;

    await this.setState({ data });
    await this.doSubmit();
  };
  render() {
    const { music, caption } = this.state.data;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row admin-form">
            <div className="col"></div>
            <div className="col-md-7">
              <MusicUpload musicIn={music} />

              <div className="mainform-elements">
                <h1>Add music</h1>

                {
                  <form>
                    <input
                      type="hidden"
                      name="_id"
                      value={this.state._id}
                      label="id"
                      onChange={this.handleChange}
                      error={this.state.errors["_id"]}
                    />

                    <input
                      type="hidden"
                      name="music"
                      id="MusicEditor"
                      value={music}
                      onChange={this.handleImageChange}
                      error={this.state.errors["music"]}
                    />
                    <label htmlFor="caption">Caption</label>
                    <input
                      type="text"
                      name="caption"
                      id="caption"
                      value={caption}
                      onChange={this.handleCaptionChange}
                      error={this.state.errors["caption"]}
                    />
                    <div className="row">
                      <div className="col">
                        <input
                          type="submit"
                          value="Add Music"
                          id="music_btn"
                          onClick={this.onClickHandler}
                        />
                      </div>
                    </div>
                  </form>
                }
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default MusicForm;
