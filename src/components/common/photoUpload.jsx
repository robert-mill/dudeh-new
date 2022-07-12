import React, { Component } from "react";
class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioVal: "no",
      image: this.props.imageIn,
      imageDisp: "none",
      src: "",
    };
  }
  checkImage(img) {
    try {
      require(img);
      return true;
    } catch (err) {
      return false;
    }
  }
  imageUploadedx = () => {
    const imageDisp = "block";

    this.setState({ imageDisp });
  };

  render() {
    const { image, imageDisp } = this.state;
    return (
      <div id="photo-form-container">
        <img
          src={this.props.imageIn}
          id="preview_img"
          style={{ display: `${imageDisp}` }}
          width="80"
          title=""
          alt={`preview ${image}`}
          onChange={this.imageUploadedx}
        />
        <button
          id="upload_widget"
          className="Cloudinary-button"
          onClick={this.imageUploadedx}
        >
          Upload Image
        </button>
      </div>
    );
  }
}

export default PhotoUpload;
