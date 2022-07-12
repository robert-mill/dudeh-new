import React, { Component } from "react";
import { Link } from "react-router-dom";
import {stripHtml} from "string-strip-html";
import parse from "html-react-parser";
import { getHomePages, deleteHomePage } from "../services/homeService";

import auth from "../services/authService";
import { toast } from "react-toastify";
class Home extends Component {
  state = {
    data: [
      {
        heading:"<h1>Dennis Francis Udeh (R.I.P.)</h1>",
        body:"<p>Programmer, Teacher and Friend.<br>11th March 1955 - 20th April 2022</p><p>This site has been disabled  for the moment.</p>",
        image:"",
        caption:"<p>Dennis Udeh</p>"
      }
    ],
    groupData: [],
    imgArr: ["jpg", "JPG", "png", "PNG", "gif", "GIF"],
  };
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

  async componentDidMount() {
    // const { data } = await getHomePages();
    // this.setState({ data });
  }
  refs = this.state.groupData.reduce((acc, value) => {
    acc[value.id] = React.createRef();
    return acc;
  }, {});
  handleImage = (m) => {
    try {
      if (m.image) return m.image;
    } catch (err) {
      return m.image;
    }
  };
  handleDelete = async (home) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== home._id);
    this.setState({ data });
    try {
      await deleteHomePage(home._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This data has already been deleted");
      this.setState({ data: originaldata });
    }
  };

  handleClick = async (m) => {
    console.log(m._id);
  };

  render() {
    const { data } = this.state;

    return (
      <React.Fragment>
        {auth.getRole() && auth.getCurrentUser() && (
          <React.Fragment>
            <button className="btn btn-primary">
              <Link className="navbar-brand" to={`/home/new`}>
                New main article
              </Link>
            </button>
          </React.Fragment>
        )}
        <div className="row home-block">
          <div className="container">
            
            <div className="col-md-12 home-pan" id="group0">
              <div className="col-md-6 col-xs-12 h-100 hp-content">
                {data &&
                  data.map((m) => (
                    <div className="col table-block m-auto" key={m._id}>
                      <div className="inner-table-block">
                        <div className="inner-table-block-text">
                          {parse(m.heading)}
                          {m.image && this.handleImage(m) && (
                            <div className="table-image-pan">
                              <img src={m.image} alt={stripHtml(m.heading)} />
                              {m.caption && (
                                <div className="table-caption">{m.caption}</div>
                              )}
                            </div>
                          )}
                          {parse(m.body)}
                        </div>
                      </div>
                      {auth.getRole() && auth.getCurrentUser() && (
                        <button className="btn btn-primary">
                          <Link className="navbar-brand" to={`/home/${m._id}`}>
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

export default Home;
