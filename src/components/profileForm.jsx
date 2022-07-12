import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveProfile, getProfile } from "../services/profileService";
import auth from "../services/authService";
import TnyEditor from "./common/editorInput";
import PhotoUpload from "./common/photoUpload";

class ProfileForm extends Form {
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
    heading: Joi.string().required().label("Profile Head"),
    body: Joi.string().required().label("Profile Body"),
    image: Joi.string().allow("").optional().label("Profile Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
    video: Joi.string().allow("").optional().label("Profile Video"),
    videoCaption: Joi.string().allow("").optional().label("Video Caption"),
  };
  async componentDidMount() {
    await this.populateProfile();
  }
  async populateProfile() {
    try {
      const profileId = this.props.match.params.id;
      if (!profileId) return;

      const { data: profile } = await getProfile(profileId);
      const _id = profileId ? profileId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(profile) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(profile) {
    return {
      _id: profile._id,
      heading: profile.heading,
      body: profile.body,
      image: profile.image,
      caption: profile.caption,
      video: profile.video,
      videoCaption: profile.videoCaption,
    };
  }
  doSubmit = async () => {
    const response = await saveProfile(this.state.data);
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
                <h1>Add profile page main details</h1>
                <TnyEditor
                  heading={heading}
                  value={heading}
                  label="Profile Heading"
                  height="150"
                  onChange={this.handleEditorChangeheading}
                />
                <TnyEditor
                  body={body}
                  value={body}
                  label="Profile Body Text"
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
                      id="profile_btn"
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
export default ProfileForm;
