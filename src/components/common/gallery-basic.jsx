import React, { Component } from "react";
import { Button, ButtonToolbar, Modal } from "react-bootstrap";

class GalleryBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      showHide: false,
    };
  }
  handlePopup = (m) => {
    this.setState({ showHide: m._id });
  };
  handleClose = (m) => {
    this.setState({ showHide: false });
  };
  render() {
    const { data } = { ...this.props };
    const { showHide } = { ...this.state };
    return (
      data &&
      data.map((m) => (
        <div
          className="col-md-3 col-sm-4 col-xs-6 col-xxs-12 gallery-pic-block"
          key={`v${m._id}`}
        >
          <div className="gallery-pic-inner-block">
            <img src={m.image} alt={m.caption} />
            <div className="slider-caption">{m.caption}</div>
            <div
              style={{ textAlign: "center" }}
              className="custom-btn"
              onClick={() => this.handlePopup(m)}
            >
              <i class="fa fa-eye"></i>
            </div>
          </div>
          <Modal show={showHide === m._id ? true : false}>
            <Modal.Header closeButton onClick={() => this.handleClose(m)}>
              <Modal.Title>{m.caption}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={m.image} alt={m.caption} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.handleClose(m)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ))
    );
  }
}

export default GalleryBasic;
