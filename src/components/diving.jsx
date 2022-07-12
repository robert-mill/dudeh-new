import React, { Component } from "react";
import { Link } from "react-router-dom";
import {stripHtml} from "string-strip-html";
import parse from "html-react-parser";
import {
  getDivingGroups,
  deleteDivingGroup,
} from "../services/divingGroupService";
import { getDivingPages, deleteDivingPage } from "../services/divingService";
import {getDivingGallerys, deleteDivingGallery} from "../services/divingGalleryService";

import auth from "../services/authService";
import { toast } from "react-toastify";
// import GallerySimple from "./common/gallerySimple";
// import Gallery3D from "./common/gallery-3d";




class Diving extends Component {
  state = {
    data: [],
    gallery:[],
    showGallery:false,
    groupData: [],
    filtered: [],
    imgArr: ["jpg", "JPG", "png", "PNG", "gif", "GIF"],
  };
  async componentDidMount() {
    const { data: groupData } = await getDivingGroups();
    const {data: gallery} = await getDivingGallerys();
    const { data } = await getDivingPages();
    this.setState({ data, groupData, filtered: [], gallery });
  }

  handleImage = (m) => {
    try {
      const { imgArr } = this.state;
      if (m) {
        let image = m.toLowerCase().split(".").pop();
        if (imgArr.includes(image)) {
          return m;
        } else {
          return false;
        }
      }
    } catch (err) {
      return m.image;
    }
  };
  handleClearFilter = () => {
    this.setState({ filtered: [] });
  };
  handleDelete = async (diving) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== diving._id);
    this.setState({ data });
    try {
      await deleteDivingPage(diving._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };
 


  handleGroupItemDelete = async (divingGroup) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== divingGroup._id);
    this.setState({ data });
    try {
      await deleteDivingGroup(divingGroup._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };
  handleGroupClick = async (md) => {
    const { groupData: allGroupData } = this.state;

    let filtered = allGroupData.filter((m) => m._id === md._id);
    
    this.setState({ filtered, showGallery:false });
  };

  handleGalleryClick = async () =>{
  
    this.setState({ filtered:[], showGallery:true });
  } 

  render() {
    const { data, groupData, filtered,showGallery, gallery} = this.state;
    const opts = {
      playerVars: {
        autoplay: 0,
      },
    };

    return (
      <React.Fragment>
       
        <div className=""></div>
        <style>{`.spinner{display:none;"`}</style>
        {auth.getRole() && auth.getCurrentUser() && (
          <React.Fragment>
            <div className="row">
              <button className="btn btn-primary">
                <Link className="navbar-brand" to={`/diving/new`}>
                  New main article
                </Link>
              </button>
              <button className="btn btn-primary">
                <Link className="navbar-brand" to={`/divingGroup/new`}>
                  New sub panal
                </Link>
              </button>
              <button className="btn byn-secondary">
                <Link className="navbar-brand" to={`/divingGallery/new`}>Add gallery pic</Link>
              </button>
            </div>
          </React.Fragment>
        )}

        <div className="row about-pan">
          <div className={`col-lg-9 col-md-12`}>
            <div className="row">
              {groupData && (
                <div className="col-lg-2 col-md-12 article-index">
                  <div className="about-pan-head">Diving articles</div>
                  <img src="/image.png" alt="gallery"  onClick={this.handleGalleryClick}/>
                  {groupData &&
                    groupData.map((m) => (
                      <div className="gd-bx" key={m._id}>
                        <div className="gd-bx-in">
                          {m.heading && (
                            <span className="gd-bx-hd">
                              <h3>{stripHtml(m.heading)}</h3>
                            </span>
                          )}
                          <span
                            className="gd-mre"
                            onClick={() => this.handleGroupClick(m)}
                          >
                            More...
                          </span>
                        </div>
                      </div>
                    ))}
                 {groupData.length >0 && <div className="cf" onClick={this.handleClearFilter}>
                    Back{" "}
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </div>}
                </div>
              )}
              <div className={`col-lg-${(groupData && "7 gallery-block")  || "9 gallery-block"} col-md-12 gallery-block`}>
                {(
                  showGallery > 0 && gallery.length > 0 && 
                  (
                  <React.Fragment>
                    {/* <Gallery3D gallery={ gallery} className="gallerydesktop" page="divingGallery"/> */}
                    <div  className="gallerymobile row"><div className="col-12">
                      {/* <GallerySimple  data={gallery} onChange={this.onChange} onDelete={this.handleGalleryDelete}/> */}
                    </div></div>
                  </React.Fragment>
                  
                  ) ||
              
                  filtered.length < 1 &&
                  data &&
                  data.map((m) => (
                    <div className="col-12 table-block my-auto" key={m._id}>
                      <div className="inner-table-block">
                        <div className="inner-table-block-text">
                          <div className="inner-table-block-text-sub">
                            {parse(m.heading)}
                            {m.image && this.handleImage(m.image) && (
                              <div className="table-image-pan">
                                <img src={m.image} alt={stripHtml(m.heading)} />
                                {m.caption && (
                                  <div className="table-caption">
                                    {m.caption}
                                  </div>
                                )}
                              </div>
                            )}
                            {m.video && this.handleImage(m.video) && (
                              <div className="table-image-pan">
                                <img src={m.video} alt={stripHtml(m.heading)} />
                                {m.videoCaption && (
                                  <div className="table-caption">
                                    {m.videoCaption}
                                  </div>
                                )}
                              </div>
                            )}
                            {parse(m.body)}
                          </div>
                        </div>
                      </div>
                      {auth.getRole() && auth.getCurrentUser() && (
                        <React.Fragment >
                          <Link className="navbar-brand" to={`/diving/${m._id}`}>
                            <i
                              className="fa fa-pencil-square-o fa-2x"
                              aria-hidden="true"
                            ></i>
                          </Link>
                          <div onClick={() => this.handleDelete(m)}>
                            <i
                              className="fa fa-trash fa-2x"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  ))) ||
                 (
                    <div className="col table-block" key={filtered[0]._id}>
                      <div className="inner-table-block">
                        <div className="inner-table-block-text">
                          <div className="inner-table-block-text-sub">
                            {parse(filtered[0].heading)}
                            {filtered[0].image && this.handleImage(filtered[0].image) && (
                              <div className="table-image-pan">
                                <img src={filtered[0].image} alt={stripHtml(filtered[0].heading)} />
                                {filtered[0].caption && (
                                  <div className="table-caption">
                                    {filtered[0].caption}
                                  </div>
                                )}
                              </div>
                            )}
                            {filtered[0].video && this.handleImage(filtered[0].video) && (
                              <div className="table-image-pan">
                                <img src={filtered[0].video} alt={stripHtml(filtered[0].heading)} />
                                {filtered[0].videoCaption && (
                                  <div className="table-caption">
                                    {filtered[0].videoCaption}
                                  </div>
                                )}
                              </div>
                            )}
                            {parse(filtered[0].body)}
                          </div>
                        </div>
                      </div>
                      {auth.getRole() && auth.getCurrentUser() && (
                        <button className="btn btn-primary">
                          <Link className="navbar-brand" to={`/diving/${filtered[0]._id}`}>
                            <i
                              className="fa fa-pencil-square-o fa-2x"
                              aria-hidden="true"
                            ></i>
                          </Link>
                          <div onClick={() => this.handleDelete(filtered[0])}>
                            <i
                              className="fa fa-trash fa-2x"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </button>
                      )}
                    </div>
                  )}
              </div>
              <div className="col-lg-2"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Diving;
