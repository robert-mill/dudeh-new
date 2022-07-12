import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { savePrivacy, getPrivacy } from "../services/privacyService";
import auth from "../services/authService";
import TnyEditor from "./common/editorInput";
class PrivacyForm extends Form {
  state = {
    data: { _id: "", cbePrivacyHead: "", cbePrivacyText: "" },
    cbePrivacyHead: "",
    cbePrivacyText: "",
    _id: "",

    errors: {}
  };

  schema = {
    cbePrivacyHead: Joi.string()
      .allow("")
      .optional()
      .label("cbePrivacyHead"),
    cbePrivacyText: Joi.string()
      .min(5)
      .label("cbePrivacyText")
  };

  async populatePrivacy() {
    try {
      const privacyId = this.props.match.params.id;
      if (!privacyId || privacyId === "new") return;
      const _id = privacyId ? privacyId : "";
      const { data: privacy } = await getPrivacy(privacyId);
      this.setState({ _id });
      this.setState({
        data: this.mapToViewModelDynamic(privacy),
        _id: privacy._id,
        cbePrivacyHead: privacy.cbePrivacyHead,
        cbePrivacyText: privacy.cbePrivacyText
      });
    } catch (ex) {}
  }
  async componentDidMount() {
    await this.populatePrivacy();
  }

  doSubmit = async () => {
    await this.setState({ data: this.mapToViewModel() });
    const response = await savePrivacy(this.state.data);
    auth.loginWithJWT(response.headers["x-auth-token"]);

    window.location = "/";
  };

  mapToViewModelDynamic(privacy) {
    return {
      _id: privacy._id,
      cbePrivacyHead: privacy.cbePrivacyHead,
      cbePrivacyText: privacy.cbePrivacyText
    };
  }
  mapToViewModel() {
    return {
      _id: this.state._id,
      cbePrivacyHead: this.state.cbePrivacyHead,
      cbePrivacyText: this.state.cbePrivacyText
    };
  }
  onChangeHandler = event => {
    const image = event.target.files[0].name;
    console.log(image);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  onClickHandler = async e => {
    e.preventDefault();
    await this.setState({ data: this.mapToViewModel() });
    const response = await savePrivacy(this.state.data);
    auth.loginWithJWT(response.headers["x-auth-token"]);
    window.location = "/";
  };
  handleEditorChangeHeadText = (content, editor) => {
    let cbePrivacyHead = content;
    this.setState({ cbePrivacyHead });
  };
  handleEditorChangeTextText = (content, editor) => {
    let cbePrivacyText = content;
    this.setState({ cbePrivacyText });
  };

  render() {
    const { cbePrivacyHead, cbePrivacyText } = this.state.data;
    return (
      <div className="container-fluid">
        <div className="row admin-form">
          <div className="col"></div>
          <div className="col-md-7">
            <h1>Add privacy article</h1>

            {
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="_id"
                  value={this.state._id}
                  label="id"
                  onChange={this.handleChange}
                  error={this.state.errors["_id"]}
                />
                <TnyEditor
                  cbePrivacyHead={cbePrivacyHead}
                  value={cbePrivacyHead}
                  label="Privacy Heading"
                  height="100"
                  onChange={this.handleEditorChangeHeadText}
                />

                <br />
                <TnyEditor
                  cbePrivacyText={cbePrivacyText}
                  value={cbePrivacyText}
                  label="Privacy Text"
                  height="300"
                  onChange={this.handleEditorChangeTextText}
                />
                <input
                  type="submit"
                  value="Add article"
                  onClick={this.onClickHandler}
                />
              </form>
            }
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default PrivacyForm;
