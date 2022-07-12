import React, { Component } from "react";
import { Link } from "react-router-dom";
import {stripHtml} from "string-strip-html";
import parse from "html-react-parser";
import {
  getAboutGroups,
  deleteAboutGroup,
} from "../services/aboutGroupService";
import { getAbouts, deleteAbout } from "../services/aboutService";

import auth from "../services/authService";
import { toast } from "react-toastify";
class About extends Component {
  state = {
    data: [],
    groupData: [],
    filtered: [],
    imgArr: ["jpg", "JPG", "png", "PNG", "gif", "GIF"],
  };
  async componentDidMount() {
    let filtered=this.state.filtered;
    const { data: groupData } = await getAboutGroups();
    if(filtered.length===0){
      filtered = groupData[0];
      this.setState({groupData, filtered});
    }
    
    this.setState({  groupData });
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
  handleDelete = async (about) => {
    const originaldata = this.state.data;

    const data = originaldata.filter((m) => m._id !== about._id);
    this.setState({ data });
    try {
      await deleteAbout(about._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };

  handleGroupItemDelete = async (aboutGroup) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== aboutGroup._id);
    this.setState({ data });
    try {
      await deleteAboutGroup(aboutGroup._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };
  handleGroupClick = async (md) => {
    const groupData = await this.state.groupData;
    const filtered = await groupData.filter((m) => m._id === md._id);
    console.log("............."+filtered[0]._id);
    this.setState({ filtered:filtered[0] });
  };

  render() {
    const { data, groupData, filtered } = this.state;
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
                <Link className="navbar-brand" to={`/about/new`}>
                  New main article
                </Link>
              </button>
              <button className="btn btn-primary">
                <Link className="navbar-brand" to={`/aboutGroup/new`}>
                  New sub panal
                </Link>
              </button>
            </div>
          </React.Fragment>
        )}

        <div className="row about-pan">
          <div className={`col-lg-9 col-md-12`}>
            <div className="row">
              {groupData && (
                <React.Fragment>
                <div className="col-lg-2 col-md-12 article-index">
                  <div className="about-pan-head">About articles</div>
                  {groupData &&
                    groupData.map((m) => (
                      <div className="gd-bx" key={m._id}>
                        <div className="gd-bx-in">
                          {m.heading && (
                            <span className="gd-bx-hd">
                              <h3>{stripHtml(m.heading)} {filtered._id === m._id?parse(`<i class="fa fa-check fa-2x" aria-hidden="true" style="float:right"></i>`):""}</h3>
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
                

                  
                </div>
                 <div className="col-lg-7  col-md-12 article-index ">
                          {filtered && (<div className="aboutBox" style={{border:"1px solid rgba(100,100,100,0.3)", margin:"0.5rem", padding:"0.5rem"}}>
                            <div style={{width:"100%", display:"block", padding:"0.3rem", backgroundColor:"rgba(0,0,0,0.5)", color:"rgba(255,255,255,1)" }}>{parse(filtered.heading)}</div>
                            {filtered.image && <img src={filtered.image} alt={filtered.heading} style={{width:"100%", maxWidth:"100%"}}/>}
                            <span className="articleCaption">{parse(filtered.caption)}</span>
                              {parse(filtered.body)}</div>)}

                              {auth.getRole() && auth.getCurrentUser() && (
                                <React.Fragment>
                                <Link className="navbar-brand" to={`/about/${filtered._id}`}>
                                <i
                                  className="fa fa-pencil-square-o fa-2x"
                                  aria-hidden="true"
                                ></i>
                              </Link>
                              <div onClick={() => this.handleDelete(filtered)}>
                              <i
                                className="fa fa-trash fa-2x"
                                aria-hidden="true"
                              ></i>
                            </div></React.Fragment>
                              )}
                </div>
                </React.Fragment>
              )}
             
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default About;
