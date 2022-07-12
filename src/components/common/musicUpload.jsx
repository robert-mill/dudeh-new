import React, { Component } from "react";
class MusicUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioVal: "no",
      music: this.props.musicIn,
      musicDisp: "none",
      src: "",
    };
  }
  checkImage(img) {
    try {
      console.log(img);
      return true;
    } catch (err) {
      return false;
    }
  }
  musicUploadedx = () => {
    const musicDisp = "block";

    this.setState({ musicDisp });
  };

  render() {
    const { music, musicDisp } = this.state;
    return (
      <div id="photo-form-container">
        <img
          src={this.props.musicIn}
          id="preview_img"
          style={{ display: `${musicDisp}` }}
          width="80"
          title=""
          alt={`preview ${music}`}
          onChange={this.musicUploadedx}
        />
        <button
          id="upload_widget"
          className="Cloudinary-button"
          onClick={this.musicUploadedx}
        >
          Upload Music
        </button>
      </div>
    );
  }
}

export default MusicUpload;
