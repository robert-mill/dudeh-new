import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveGallery, getGallery } from "../services/galleryService";
import auth from "../services/authService";
import TnyEditor from "./common/editorInput";
import PhotoUpload from "./common/photoUpload";

class GalleryForm extends Form {
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
    image: Joi.string().allow("").optional().label(" Gallery Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
  };
  async componentDidMount() {
    await this.populateGallery();
  }
  async populateGallery() {
    try {
      const galleryId = this.props.match.params.id;
      if (!galleryId) return;

      const { data: gallery } = await getGallery(galleryId);
      const _id = galleryId ? galleryId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(gallery) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(gallery) {
    return {
      _id: gallery._id,

      image: gallery.image,
      caption: gallery.caption,
    };
  }
  doSubmit = async () => {
    const response = await saveGallery(this.state.data);
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
    const { image, caption } = this.state.data;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row admin-form">
            <div className="col"></div>
            <div className="col-md-7">
              <PhotoUpload imageIn={image} />

              <div className="mainform-elements">
                <h1>Add gallery gallery image</h1>

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
                          id="gallery_btn"
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
export default GalleryForm;
