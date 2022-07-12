import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  saveHolidayGroup,
  getHolidayGroup,
} from "../services/holidayGroupService";
import auth from "../services/authService";
import TnyEditor from "./common/editorInput";
import PhotoUpload from "./common/photoUpload";

class HolidayGroupForm extends Form {
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
    heading: Joi.string().required().label("Holiday Group Head"),
    body: Joi.string().required().label("Holiday Group Body"),
    image: Joi.string().allow("").optional().label("Holiday Group Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
    video: Joi.string().allow("").optional().label("Holiday Group video"),
    videoCaption: Joi.string().allow("").optional().label("videoCaption"),
  };
  async componentDidMount() {
    await this.populateHolidayGroup();
  }
  async populateHolidayGroup() {
    try {
      const holidayGroupId = this.props.match.params.id;
      if (!holidayGroupId) return;

      const { data: holidayGroup } = await getHolidayGroup(holidayGroupId);
      const _id = holidayGroupId ? holidayGroupId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(holidayGroup) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(holidayGroup) {
    return {
      _id: holidayGroup._id,
      heading: holidayGroup.heading,
      body: holidayGroup.body,
      image: holidayGroup.image,
      caption: holidayGroup.caption,
      video: holidayGroup.video,
      videoCaption: holidayGroup.videoCaption,
    };
  }
  doSubmit = async () => {
    const response = await saveHolidayGroup(this.state.data);
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
    const videoCaption = document.getElementById("videoCaption").value;
    const video = document.getElementById("video").value;
    data.video = video;

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
                <h1>Add holidayGroup page sub page articles</h1>
                <TnyEditor
                  heading={heading}
                  value={heading}
                  label="Holiday Heading"
                  height="150"
                  onChange={this.handleEditorChangeheading}
                />
                <TnyEditor
                  body={body}
                  value={body}
                  label="Holiday Body Text"
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
                    <div className="col-md-12">
                      <label htmlFor="video">Video (YouTube String)</label>
                      <input
                        type="text"
                        name="video"
                        id="video"
                        value={video}
                        onChange={this.handleVideoChange}
                        error={this.state.errors["video"]}
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="videoCaption">Video Caption</label>
                      <input
                        type="text"
                        name="videoCaption"
                        id="videoCaption"
                        value={videoCaption}
                        onChange={this.handleVideoCaptionChange}
                        error={this.state.errors["videoCaption"]}
                      />
                    </div>
                    <input
                      type="hidden"
                      name="image"
                      id="ImageEditor"
                      value={image}
                      onChange={this.handleImageChange}
                      error={this.state.errors["image"]}
                    />
                    <div className="col-md-12">
                      <label htmlFor="caption">Caption</label>
                      <input
                        type="text"
                        name="caption"
                        id="caption"
                        value={caption}
                        onChange={this.handleCaptionChange}
                        error={this.state.errors["caption"]}
                      />
                    </div>
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
export default HolidayGroupForm;
