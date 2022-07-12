import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveAboutGroup, getAboutGroup } from "../services/aboutGroupService";
import auth from "../services/authService";
import TnyEditor from "./common/editorInput";
import PhotoUpload from "./common/photoUpload";

class AboutGroupForm extends Form {
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
    heading: Joi.string().required().label("About Group Head"),
    body: Joi.string().required().label("About Group Body"),
    image: Joi.string().allow("").optional().label("About Group Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
  };
  async componentDidMount() {
    await this.populateAboutGroup();
  }
  async populateAboutGroup() {
    try {
      const aboutGroupId = this.props.match.params.id;
      if (!aboutGroupId) return;

      const { data: aboutGroup } = await getAboutGroup(aboutGroupId);
      const _id = aboutGroupId ? aboutGroupId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(aboutGroup) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(aboutGroup) {
    return {
      _id: aboutGroup._id,
      heading: aboutGroup.heading,
      body: aboutGroup.body,
      image: aboutGroup.image,
      caption: aboutGroup.caption,
    };
  }
  doSubmit = async () => {
    const response = await saveAboutGroup(this.state.data);
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
                <h1>Add aboutGroup page sub page articles</h1>
                <TnyEditor
                  heading={heading}
                  value={heading}
                  label="About Heading"
                  height="150"
                  onChange={this.handleEditorChangeheading}
                />
                <TnyEditor
                  body={body}
                  value={body}
                  label="About Body Text"
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
export default AboutGroupForm;
