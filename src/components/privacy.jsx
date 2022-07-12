import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { getPrivacys, deletePrivacy } from "../services/privacyService";
//import InnerNav from "./innerNav";
import parse from "html-react-parser";
import "react-toastify/dist/ReactToastify.css";
import {stripHtml} from "string-strip-html";
class About extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const { data } = await getPrivacys();
    console.log(data);
    this.setState({ data });
  }

  imageHandle = (imgd) => {
    const nimg = stripHtml(imgd);
    return "/" + nimg;
  };

  handleDelete = async (privacy) => {
    const originalAbout = this.state.data;
    const data = this.state.data.filter((m) => m._id !== privacy._id);
    this.setState({ data });
    try {
      await deletePrivacy(privacy._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This map privacy has already been deleted");
      this.setState({ data: originalAbout });
    }
  };

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        {auth.getRole() && auth.getCurrentUser() && (
          <button className="btn btn-primary">
            <Link className="navbar-brand" to={`/privacy/new`}>
              New
            </Link>
          </button>
        )}
        <div className="row home-panel">
          <div className="col">
            {data &&
              data.map((m) => (
                <div className="col" key={m._id}>
                  <div className="">
                    {parse(m.heading)}
                    {parse(m.body)}

                    {auth.getRole() && auth.getCurrentUser() && (
                      <React.Fragment>
                        <button className="btn btn-primary">
                          <Link
                            className="navbar-brand"
                            to={`/privacy/${m._id}`}
                          >
                            Edit,
                          </Link>
                        </button>
                        <i
                          className="fa fa-trash 2x"
                          onClick={() => this.handleDelete(m)}
                        ></i>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div></React.Fragment>
    );
  }
}

export default About;
