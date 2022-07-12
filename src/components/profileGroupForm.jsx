import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveProfileGroup, getProfileGroup } from "../services/profileGroupService";
import auth from "../services/authService";
import TnyEditor from "./common/editorInput";
import PhotoUpload from "./common/photoUpload";

class ProfileGroupForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "",
        heading: "",
        body: "",
        image: "",
        caption: "",
      },

      heading: "",
      body: "",
      image: "",
      caption: "",
      errors: {},
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  schema = {
    heading: Joi.string().required().label("Profile Group Head"),
    body: Joi.string().required().label("Profile Group Body"),
    image: Joi.string().allow("").optional().label("Profile Group Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
  };
  async componentDidMount() {
    await this.populateProfileGroup();
  }
  async populateProfileGroup() {
    try {
      const profileGroupId = this.props.match.params.id;
      if (!profileGroupId) return;

      const { data: profileGroup } = await getProfileGroup(profileGroupId);
      const _id = profileGroupId ? profileGroupId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(profileGroup) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(profileGroup) {
    return {
      _id: profileGroup._id,
      heading: profileGroup.heading,
      body: profileGroup.body,
      image: profileGroup.image,
      caption: profileGroup.caption,
    };
  }
  doSubmit = async () => {
    const response = await saveProfileGroup(this.state.data);
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
                <h1>Add profileGroup page sub page articles</h1>
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
                          id="profile_btn"
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
export default ProfileGroupForm;
