import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveNrlGallery, getNrlGallery } from "../services/nrlGalleryService";
import auth from "../services/authService";
import PhotoUpload from "./common/photoUpload";

class NrlGalleryForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "",

        image: "",
        caption: "",
      },

      image: "",
      caption: "",
      errors: {},
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  schema = {
    image: Joi.string().allow("").optional().label("About Group Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
  };
  async componentDidMount() {
    await this.populateNrlGallery();
  }
  async populateNrlGallery() {
    try {
      const nrlGalleryId = this.props.match.params.id;
      if (!nrlGalleryId) return;

      const { data: nrlGallery } = await getNrlGallery(nrlGalleryId);
      const _id = nrlGalleryId ? nrlGalleryId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(nrlGallery) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(nrlGallery) {
    return {
      _id: nrlGallery._id,

      image: nrlGallery.image,
      caption: nrlGallery.caption,
    };
  }
  doSubmit = async () => {
    const response = await saveNrlGallery(this.state.data);
    auth.loginWithJWT(response.headers["x-auth-token"]);
    window.location = "/";
  };

  handleImageChange = async (event) => {
    const content = document.getElementById("preview_img").src;
    const caption = document.getElementById("caption").value;
    const data = { ...this.state.data };

    data.image = content;
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
    const image = await document.getElementById("preview_img").src;
    const caption = await document.getElementById("caption").value;

    const data = { ...this.state.data };
    data.image = image;

    data.caption = caption;

    await this.setState({ data });
    const response = await this.doSubmit();
  };
  render() {
    const { heading = "", body = "", image, caption } = this.state.data;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row admin-form">
            <div className="col"></div>
            <div className="col-md-7">
              <PhotoUpload imageIn={image} />

              <div className="mainform-elements">
                <h1>Add nrlGallery page sub page articles</h1>

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
                      name="image"
                      id="ImageEditor"
                      value={image}
                      onChange={this.handleImageChange}
                      error={this.state.errors["image"]}
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
                          value="Add article"
                          id="about_btn"
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
export default NrlGalleryForm;
