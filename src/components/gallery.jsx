import React, { Component } from "react";
import { Link } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import { deleteGallery, getGallerys } from "../services/galleryService";

import auth from "../services/authService";

import GalleryBasic from "./common/gallery-basic";
class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      data: [],
      filtered: [],
      imgArr: ["jpg", "JPG", "png", "PNG", "gif", "GIF"],
      galleryView: true,
      showHide: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  async componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    const { data } = await getGallerys();
    this.setState({ data, filtered: [] });
  }

  handleSwitchView = () => {
    const { galleryView } = { ...this.state };
    this.setState({ galleryView: !galleryView });
    console.log("--->" + this.state.galleryView + "<---");
  };
  fn = () => {
    console.log("action");
  };

  render() {
    const {
      data,
      filtered,
      galleryView = false,
      showHide = false,
      width,
    } = this.state;
    const opts = {
      playerVars: {
        autoplay: 0,
      },
    };

    return (
      <React.Fragment>
        {auth.getRole() && auth.getCurrentUser() && (
          <React.Fragment>
            <button className="btn btn-primary">
              <Link className="navbar-brand" to={`/gallery/new`}>
                Add picture to gallery
              </Link>
            </button>
          </React.Fragment>
        )}

        <div className="gallery-block">
          <div className="row gallery__group gallery-pan">
            <div className="col-md-7 col-sm-12">
              {window.innerWidth > 999 && galleryView ? (
                <div className="gallery-pan">
                  
                </div>
              ) : (
                <GalleryBasic data={data} />
              )}
            </div>
            <div className="col"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Gallery;
