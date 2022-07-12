import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
//import { saveBg, getBg, getBgs, deleteBg } from "../services/bgService";
import auth from "../services/authService";
import { toast } from "react-toastify";
import PhotoUpload from "./common/photoUpload";

class BgForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      dataimgs: [
       {
         _id: "1",
        image: "venice.jpg",
      },
      {
        _id: "2",
       image: "twentytwo.jpg",
      },
        {
          _id: "3",
        image: "twentythree.JPG",
      },
      ],
      data: {
        _id: "",

        image: "",
      },

      image: "",
      caption: "",
      errors: {},
    };
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  schema = {
    image: Joi.string().allow("").optional().label("About Gallery Image"),
    caption: Joi.string().allow("").optional().label("Caption"),
  };
  async componentDidMount() {
    await this.populateBg();
  }
  async populateBg() {
    //const dataimgs = [];

    // try {
    //   const aboutId = this.props.match.params.id;
    //   const { data: dataimgs } = await getBgs();
    //   this.setState({ dataimgs });
    //   if (!aboutId) return;

    //   const { data: about } = await getBg(aboutId);
    //   const _id = aboutId ? aboutId : "";
    //   this.setState({ _id, data: this.mapToViewModelDynamic(about) });
    // } catch (ex) {}
  }
  mapToViewModelDynamic(about) {
    return {
      _id: about._id,

      image: about.image,
    };
  }
  doSubmit = async () => {
    const response = await saveBg(this.state.data);
    auth.loginWithJWT(response.headers["x-auth-token"]);
    window.location = "/";
  };

  handleDelete = async (image) => {
    const originaldata = this.state.dataimgs;
    const data = originaldata.filter((m) => m._id !== image._id);
    this.setState({ data });
    try {
      await deleteBg(image._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };

  handleImageChange = async (event) => {
    const content = document.getElementById("preview_img").src;
    const data = { ...this.state.data };

    data.image = content;
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

    const data = { ...this.state.data };
    data.image = image;

    await this.setState({ data });
    const response = await this.doSubmit();
  };
  render() {
    const { image,_id } = this.state.data;
    const { dataimgs} = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid" style={{ marginTop: "17rem" }}>
          <div
            className="row"
            style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
          >
            <div className="col-12">
              <p>Current background images - click on to delete</p>
            </div>
            {dataimgs &&
              dataimgs.length > 1 &&
              dataimgs.map((m) => (
                <div className="col" key={m._id}>
                  {auth.getCurrentUser && auth.getRole &&
                  <img
                    src={m.image}
                    alt=""
                    style={{ width: "auto", maxWidth: "100px" }}
                    onClick={()=>this.handleDelete(m)}
                  /> ||  <img
                  src={m.image}
                  alt=""
                  style={{ width: "auto", maxWidth: "100px" }}
                />}
                </div>
              ))}
          </div>
          <div className="row admin-form">
            <div className="col"></div>
            <div className="col-md-7">
              <PhotoUpload imageIn={image} />

              <div className="mainform-elements">
                <h1>Add about background image</h1>

                {
                  <form>
                    <input
                      type="hidden"
                      name="_id"
                      value={_id}
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
export default BgForm;
