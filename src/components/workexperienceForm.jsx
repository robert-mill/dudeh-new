import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  saveWorkExperience,
  getWorkExperience,
} from "../services/workexperienceService";
import auth from "../services/authService";
import TnyEditor from "./common/editorInput";

class WorkexperienceForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "",
        heading: "",
        body: "",
      },
      heading: "",
      body: "",
      errors: {},
    };
  }

  schema = {
    heading: Joi.string().required().label("Workexperience Head"),
    body: Joi.string().required().label("Workexperience Body"),
  };
  async componentDidMount() {
    await this.populateWorkexperience();
  }
  async populateWorkexperience() {
    try {
      const cvId = this.props.match.params.id;
      if (!cvId) return;

      const { data: cv } = await getWorkExperience(cvId);
      const _id = cvId ? cvId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(cv) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(cv) {
    return {
      _id: cv._id,
      heading: cv.heading,
      body: cv.body,
    };
  }
  doSubmit = async () => {
    const response = await saveWorkExperience(this.state.data);
    auth.loginWithJWT(response.headers["x-auth-token"]);
    window.location = "/";
  };
  handleEditorChangeheading = (content, editor) => {
    const data = { ...this.state.data };
    data.heading = content;
    this.setState({ data });
  };
  handleEditorChangebody = (content, editor) => {
    const data = { ...this.state.data };
    data.body = content;
    this.setState({ data });
  };

  onClickHandler = async (e) => {
    e.preventDefault();
    await this.doSubmit();
  };
  render() {
    const { heading = "", body = "" } = this.state.data;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row admin-form">
            <div className="col"></div>
            <div className="col-md-7">
              <div className="mainform-elements">
                <h1>Add Workexperience</h1>
                <TnyEditor
                  heading={heading}
                  value={heading}
                  label="Workexperience Heading"
                  height="150"
                  onChange={this.handleEditorChangeheading}
                />
                <TnyEditor
                  body={body}
                  value={body}
                  label="Workexperience Body Text"
                  height="200"
                  onChange={this.handleEditorChangebody}
                />
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
                      type="submit"
                      value="Add article"
                      id="cv_btn"
                      onClick={this.onClickHandler}
                    />
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
export default WorkexperienceForm;
