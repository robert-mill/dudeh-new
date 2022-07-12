import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveNrlPage, getNrlPage } from "../services/nrlService";
import auth from "../services/authService";
import TnyEditor from "./common/editorInput";
import PhotoUpload from "./common/photoUpload";

class NrlForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "",
        heading: "",
        body: "",
        image: "",
        caption: "",
        video: "",
        videoCaption: "",
      },

      heading: "",
      body: "",
      image: "",
      caption: "",
      video: "",
      videoCaption: "",
      errors: {},
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  schema = {
    heading: Joi.string().required().label("Nrl Head"),
    body: Joi.string().required().label("Nrl Body"),
    image: Joi.string().allow("").optional().label("Nrl Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
    video: Joi.string().allow("").optional().label("Nrl Video"),
    videoCaption: Joi.string().allow("").optional().label("Video Caption"),
  };
  async componentDidMount() {
    await this.populateNrl();
  }
  async populateNrl() {
    try {
      const nrlId = this.props.match.params.id;
      if (!nrlId) return;

      const { data: nrl } = await getNrlPage(nrlId);
      const _id = nrlId ? nrlId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(nrl) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(nrl) {
    return {
      _id: nrl._id,
      heading: nrl.heading,
      body: nrl.body,
      image: nrl.image,
      caption: nrl.caption,
      video: nrl.video,
      videoCaption: nrl.videoCaption,
    };
  }
  doSubmit = async () => {
    const response = await saveNrlPage(this.state.data);
    auth.loginWithJWT(response.headers["x-auth-token"]);
    window.location = "/";
  };
  handleEditorChangeheading = (content, editor) => {
    const data = { ...this.state.data };
    data.heading = content;
    this.setState({ data });
  };
  handleEditorChangebody = (content, editor) => {
    const data = { ...this.state.data };
    data.body = content;
    this.setState({ data });
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

  handleVideoChange = async (event) => {
    const video = document.getElementById("video").value;
    const data = { ...this.state.data };

    data.video = video;
    this.setState({ data });
  };
  handleVideoCaptionChange = async () => {
    const data = { ...this.state.data };
    const videoCaption = document.getElementById("videoCaption").value;
    data.videoCaption = videoCaption;
    this.setState({ data });
  };

  onClickHandler = async (e) => {
    e.preventDefault();
    const data = { ...this.state.data };
    const image = await document.getElementById("preview_img").src;
    const caption = await document.getElementById("caption").value;
    const video = document.getElementById("video").value;
    data.video = video;

    const videoCaption = document.getElementById("videoCaption").value;
    data.videoCaption = videoCaption;

    data.image = image;

    data.caption = caption;

    await this.setState({ data });
    const response = await this.doSubmit();
  };
  render() {
    const {
      heading = "",
      body = "",
      image,
      caption,
      video,
      videoCaption,
    } = this.state.data;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row admin-form">
            <div className="col"></div>
            <div className="col-md-7">
              <PhotoUpload imageIn={image} />

              <div className="mainform-elements">
                <h1>Add nrl page main details</h1>
                <TnyEditor
                  heading={heading}
                  value={heading}
                  label="Nrl Heading"
                  height="150"
                  onChange={this.handleEditorChangeheading}
                />
                <TnyEditor
                  body={body}
                  value={body}
                  label="Nrl Body Text"
                  height="200"
                  onChange={this.handleEditorChangebody}
                />
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
                      type="text"
                      name="image"
                      id="ImageEditor"
                      value={image}
                      onChange={this.handleImageChange}
                      error={this.state.errors["image"]}
                    />
                    <label htmlFor="caption"></label>
                    <input
                      type="text"
                      name="caption"
                      id="caption"
                      value={caption}
                      onChange={this.handleCaptionChange}
                      error={this.state.errors["caption"]}
                    />
                    <label htmlFor="video"></label>
                    <input
                      type="text"
                      name="video"
                      id="video"
                      value={video}
                      onChange={this.handleVideoChange}
                      error={this.state.errors["video"]}
                    />
                    <label htmlFor="caption"></label>
                    <input
                      type="text"
                      name="videoCaption"
                      id="videoCaption"
                      value={videoCaption}
                      onChange={this.handleVideoCaptionChange}
                      error={this.state.errors["videoCaption"]}
                    />
                    <input
                      type="submit"
                      value="Add article"
                      id="nrl_btn"
                      onClick={this.onClickHandler}
                    />
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
export default NrlForm;
