import React, { Component } from "react";
import { Link } from "react-router-dom";
import {stripHtml} from "string-strip-html";
import parse from "html-react-parser";
import { getNrlGroups, deleteNrlGroup } from "../services/nrlGroupService";
import { getNrlPages, deleteNrlPage } from "../services/nrlService";

import auth from "../services/authService";
import { toast } from "react-toastify";
class Nrl extends Component {
  state = {
    data: [],
    groupData: [],
    filtered: [],
    imgArr: ["jpg", "JPG", "png", "PNG", "gif", "GIF"],
  };
  async componentDidMount() {
    const { data: groupData } = await getNrlGroups();
    const { data } = await getNrlPages();
    this.setState({ data, groupData, filtered: [] });
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
  handleDelete = async (nrl) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== nrl._id);
    this.setState({ data });
    try {
      await deleteNrlPage(nrl._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };

  handleGroupItemDelete = async (nrlGroup) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== nrlGroup._id);
    this.setState({ data });
    try {
      await deleteNrlGroup(nrlGroup._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };
  handleGroupClick = async (md) => {
    const { groupData: allGroupData } = this.state;
    let filtered = allGroupData.filter((m) => m._id === md._id);
    console.log(filtered);
    this.setState({ filtered });
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
                <Link className="navbar-brand" to={`/nrl/new`}>
                  New main article
                </Link>
              </button>
              <button className="btn btn-primary">
                <Link className="navbar-brand" to={`/nrlGroup/new`}>
                  New sub panal
                </Link>
              </button>
            </div>
          </React.Fragment>
        )}

        <div className="row nrl-pan">
          <div className={`col-lg-9 col-md-12`}>
            <div className="row">
              {groupData && (
                <div className="col-lg-2 col-md-12 article-index">
                  <div className="nrl-pan-head">Nrl articles</div>
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
                  <div className="cf" onClick={this.handleClearFilter}>
                    Back{" "}
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </div>
                </div>
              )}
              <div className={`col-lg-${(groupData && "7") || "9"} col-md-12`}>
                {(filtered.length < 1 &&
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
                        <button className="btn btn-primary">
                          <Link className="navbar-brand" to={`/nrl/${m._id}`}>
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
                        </button>
                      )}
                    </div>
                  ))) ||
                  filtered.map((m) => (
                    <div className="col table-block" key={m._id}>
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
                        <button className="btn btn-primary">
                          <Link className="navbar-brand" to={`/nrl/${m._id}`}>
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
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Nrl;
