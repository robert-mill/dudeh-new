import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  saveHomePage,
  getHomePage,
  deleteImage,
} from "../services/homeService";
import auth from "../services/authService";
import TnyEditor from "./common/editorInput";
import PhotoUpload from "./common/photoUpload";

class HomeForm extends Form {
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
    heading: Joi.string().required().label("Home Head"),
    body: Joi.string().required().label("Home Body"),
    image: Joi.string().allow("").optional().label("Home Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
  };
  async componentDidMount() {
    await this.populateHome();
  }
  async populateHome() {
    try {
      const homeId = this.props.match.params.id;
      if (!homeId) return;

      const { data: home } = await getHomePage(homeId);
      const _id = homeId ? homeId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(home) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(home) {
    return {
      _id: home._id,
      heading: home.heading,
      body: home.body,
      image: home.image,
      caption: home.caption,
    };
  }
  doSubmit = async () => {
    const response = await saveHomePage(this.state.data);
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
  handleDeleteImage = async (e) => {
    e.preventDefault();
    const image = document.getElementById("ImageEditor").value;
    if (image) {
      const data = { ...this.state.data };
      data.image = "";
      this.setState({ data, image });
    }
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
                <h1>Add home page main details</h1>
                <TnyEditor
                  heading={heading}
                  value={heading}
                  label="Home Heading"
                  height="150"
                  onChange={this.handleEditorChangeheading}
                />
                <TnyEditor
                  body={body}
                  value={body}
                  label="Home Body Text"
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
                    <button
                      className="button btn-danger"
                      onClick={this.handleDeleteImage}
                    >
                      Delete Image
                    </button>
                    <input
                      type="submit"
                      value="Add article"
                      id="home_btn"
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
export default HomeForm;
