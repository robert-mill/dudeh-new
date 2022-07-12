import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {
  saveQualifications,
  getQualifications,
} from "../services/qualificationService";
import auth from "../services/authService";

class QualificationsForm extends Form {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: "",
        title: "",
        description: "",
        grade: "",
        location: "",
      },
      title: "",
      description: "",
      grade: "",
      location: "",
      errors: {},
    };
  }

  schema = {
    title: Joi.string().allow("").optional().label("Qualifications Head"),
    description: Joi.string()
      .allow("")
      .optional()
      .label("Qualifications description"),
    grade: Joi.string().allow("").optional().label("Qualifications Grade"),
    location: Joi.string()
      .allow("")
      .optional()
      .label("Qualifications Location"),
  };
  async componentDidMount() {
    await this.populateQualifications();
  }
  async populateQualifications() {
    try {
      const cvId = this.props.match.params.id;
      if (!cvId) return;

      const { data: cv } = await getQualifications(cvId);
      const _id = cvId ? cvId : "";
      this.setState({ _id, data: this.mapToViewModelDynamic(cv) });
    } catch (ex) {}
  }
  mapToViewModelDynamic(cv) {
    return {
      _id: cv._id,
      title: cv.title,
      description: cv.description,
    };
  }
  doSubmit = async () => {
    const response = await saveQualifications(this.state.data);
    auth.loginWithJWT(response.headers["x-auth-token"]);
    window.location = "/";
  };
  handleEditorChangetitle = (content, editor) => {
    const data = { ...this.state.data };
    data.title = content;
    this.setState({ data });
  };
  handleEditorChangedescription = (content, editor) => {
    const data = { ...this.state.data };
    data.description = content;
    this.setState({ data });
  };

  onClickHandler = async (e) => {
    e.preventDefault();
    await this.doSubmit();
  };
  render() {
    const { title = "", description = "", grade, location } = this.state.data;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row admin-form">
            <div className="col"></div>
            <div className="col-md-7">
              <div className="mainform-elements">
                <h1>Add Qualifications</h1>

                {
                  <form>
                    <input
                      type="hidden"
                      name="_id"
                      value={this.state._id}
                      id="id"
                      onChange={this.handleChange}
                      error={this.state.errors["_id"]}
                    />
                    <label>
                      Title
                      <input
                        type="text"
                        name="title"
                        value={title}
                        id="title"
                        onChange={this.handleChange}
                        error={this.state.errors["title"]}
                      />
                    </label>
                    <label>
                      Description
                      <input
                        type="text"
                        name="description"
                        value={description}
                        id="description"
                        onChange={this.handleChange}
                        error={this.state.errors["description"]}
                      />
                    </label>
                    <label>
                      Grade
                      <input
                        type="text"
                        name="grade"
                        value={grade}
                        id="grade"
                        onChange={this.handleChange}
                        error={this.state.errors["grade"]}
                      />
                    </label>
                    <label>
                      Locaton
                      <input
                        type="text"
                        name="location"
                        value={location}
                        id="location"
                        onChange={this.handleChange}
                        error={this.state.errors["location"]}
                      />
                    </label>

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
export default QualificationsForm;
