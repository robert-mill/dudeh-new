import React, { Component } from "react";
import { sendEmail } from "../services/contactService";

class Contact extends Component {
  state = {
    data: { name: "", email: "", message: "" },
    name: "",
    email: "",
    message: "",
  };
  resetForm() {
    this.setState({ name: "", email: "", message: "" });
  }
  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }
  mapToViewModel() {
    return {
      _id: this.state._id,
      cbeAboutHead: this.state.cbeAboutHead,
      cbeAboutText: this.state.cbeAboutText,
    };
  }
  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({ data: this.mapToViewModel() });

    sendEmail(this.state.data);
  }

  render() {
    return (
      
        <div className="row home-panel">
          <div className="col-lg-2 col-md-12"></div>
          <div className="col-lg-8 col-md-12">
            <div className="container">
              <iframe
                allowtransparency="true"
                frameborder="0"
                scrolling="no"
                style="width: 100%; height: 250px; margin-top: 10px; margin-bottom: 10px;"
                src="//www.weebly.com/weebly/apps/generateMap.php?map=google&amp;elementid=520678126404211662&amp;ineditor=0&amp;control=3&amp;width=auto&amp;height=250px&amp;overviewmap=0&amp;scalecontrol=0&amp;typecontrol=0&amp;zoom=15&amp;long=0.9182334&amp;lat=51.9110870&amp;domain=www&amp;point=1&amp;align=1&amp;reseller=false"
              ></iframe>
            </div>
            <div className="container">
              <form
                id="contact-form"
                onSubmit={this.handleSubmit.bind(this)}
                method="POST"
              >
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onNameChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={this.state.email}
                    onChange={this.onEmailChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    value={this.state.message}
                    onChange={this.onMessageChange.bind(this)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-2 col-md-12"></div>
        </div>
    );
  }
}

export default Contact;
