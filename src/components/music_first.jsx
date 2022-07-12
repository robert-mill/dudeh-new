import React, { Component } from "react";
import parse from "html-react-parser";
import auth from "../services/authService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { TweenLite } from "gsap";
import { getMusics, deleteMusic } from "../services/musicService";
const sliderMinX = 0;
let sliderMaxX = 280;

const greenGradient = { start: "#068c3b", end: "#9dac00" };
const yellowGradient = { start: "#9dac00", end: "#a17208" };
const orangeGradient = { start: "#a17208", end: "#FF9008" };
const redGradient = { start: "#FF9008", end: "#7C0000" };
class Music extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.startTouchDrag = this.startTouchDrag.bind(this);
    this.mouseMoving = this.mouseMoving.bind(this);
    this.touchMoving = this.touchMoving.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.bgStyle = this.bgStyle.bind(this);
    this.setCurVal = this.setCurVal.bind(this);

    this.gradations = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.state = {
      data: [],
      width: window.innerwidth,
      height: window.innerheight,
      dragging: false,
      sliderX: 0,
      gradientStart: greenGradient.start,
      gradientEnd: greenGradient.end,
      curIndex: 0,
    };
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    if (window.innerWidth > 500) {
      sliderMaxX = 520;
    }
  }

  get gradientStart() {
    return this.state.gradientStart;
  }

  set gradientStart(value) {
    this.setState({ gradientStart: value });
  }

  get gradientEnd() {
    return this.state.gradientEnd;
  }

  set gradientEnd(value) {
    this.setState({ gradientEnd: value });
  }

  commonStartDrag(pageX) {
    this.initialMouseX = pageX;
    this.setState({ dragging: true });
    this.initialSliderX = this.state.sliderX;
  }

  startDrag(e) {
    console.log(this.state.curIndex);
    const pageX = e.pageX;
    this.commonStartDrag(pageX);
  }

  startTouchDrag(e) {
    e.preventDefault();
    console.log(e);
    const pageX = e.changedTouches[0].pageX;
    this.commonStartDrag(pageX);
  }

  stopDrag() {
    this.setState({ dragging: false });
  }

  setCurVal = (i) => {
    this.setState({ curIndex: i });
  };
  commonMoving(pageX) {
    if (this.state.dragging) {
      this.volumneAudio(this.currentValue, this.state.curIndex);

      const dragAmount = pageX - this.initialMouseX;
      const targetX = this.initialSliderX + dragAmount;

      // keep slider inside limits
      const sliderX = Math.max(Math.min(targetX, sliderMaxX), sliderMinX);
      this.setState({ sliderX: sliderX });

      let targetGradient = greenGradient;
      if (this.currentValue >= 3) {
        targetGradient = yellowGradient;
      }
      if (this.currentValue >= 5) {
        targetGradient = orangeGradient;
      }
      if (this.currentValue >= 8) {
        targetGradient = redGradient;
      }

      if (this.activeGradientStart !== targetGradient.start) {
        this.activeGradientStart = targetGradient.start;

        // gradient changed
        TweenLite.to(this, 0.7, {
          gradientStart: targetGradient.start,
          gradientEnd: targetGradient.end,
        });
      }
    }
  }

  mouseMoving(e) {
    const pageX = e.pageX;
    this.commonMoving(pageX);
  }

  touchMoving(e) {
    e.preventDefault();
    const thisCurVal = this.state.curIndex;
    console.log(thisCurVal);
    const pageX = e.changedTouches[0].pageX;
    this.commonMoving(pageX);
  }

  get currentValue() {
    const valueRangeStart = 0;
    const valueRange = 10;
    return (this.state.sliderX / sliderMaxX) * valueRange + valueRangeStart;
  }

  gradationElementStyle(value) {
    const nearDistance = 0.5;
    const liftDistance = 12;

    const diff = Math.abs(this.currentValue - value);
    const distY = diff / nearDistance - 1;

    // constrain the distance so that the element doesn't go to the bottom
    const elementY = Math.min(distY * liftDistance, 0);
    const lift = { top: `${elementY}px` };

    return lift;
  }

  bgStyle() {
    return {
      background:
        "linear-gradient(to bottom right," +
        `${this.gradientStart}, ${this.gradientEnd})`,
    };
  }
  playAudio(i) {
    const audioEl = document.getElementsByClassName("audio-element")[i];
    audioEl.play();
  }
  stopAudio(i) {
    const audioEl = document.getElementsByClassName("audio-element")[i];
    audioEl.pause();
  }

  volumneAudio(v, i) {
    const audioEl = document.getElementsByClassName("audio-element")[i];
    audioEl.volume = v / 10;
  }

  loadFunction = () => {
    document.getElementsByClassName("pcloug-logo-lone").css =
      "boarder:red 1px solid!important;";
  };
  handleAmend = (m) => {
    window.location = `/music/${m._id}`;
  };
  handleDelete = async (music) => {
    const originaldata = this.state.data;
    const data = originaldata.filter((m) => m._id !== music._id);
    this.setState({ data });
    try {
      await deleteMusic(music._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This track has already been deleted");
      this.setState({ data: originaldata });
    }
  };
  async componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    const { data } = await getMusics();
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="row diving-pan music-pan">
        {parse(`<style>
          .spinner{display:none;}
          .folder-link {min-width: 100px !important;}
        </style>`)}

        <div className="col-lg-6 col-md-12 music-block">
          {auth.getCurrentUser() && auth.getRole() && (
            <Link className="col-12 btn btn-secondary" to="/music/new">
              Add music
            </Link>
          )}
          {data &&
            data.map((m, i) => (
              <div className="music-row" key={m._id}>
                <div className="music-caption">{m.caption}</div>
                <div className="music-control">
                  <button onClick={() => this.playAudio(i)}>
                    <span>
                      <i
                        className="fa fa-play-circle-o fa-2x"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </button>
                  <button onClick={() => this.stopAudio(i)}>
                    <span>
                      <i
                        className="fa fa-stop-circle-o fa-2x"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </button>
                  <div className="upper-container" style={this.bgStyle()}>
                    <div className="centered curv">
                      {Math.round(this.currentValue)}
                    </div>

                    <div className="value-gradation">
                      {this.gradations.map((value, x) => (
                        <div
                          className="gradation-element"
                          style={this.gradationElementStyle(value)}
                          key={x}
                        >
                          <span className="gradation-element-number">
                            {value}
                          </span>
                          <br />
                          <span className="gradation-element-line">|</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lower-container">
                    <div
                      className={
                        "slider-container " +
                        (this.state.dragging ? "grabbing " : "")
                      }
                      onMouseMove={this.mouseMoving}
                      onTouchMove={this.touchMoving}
                      onMouseUp={this.stopDrag}
                      onTouchEnd={this.stopDrag}
                      style={{ left: this.state.sliderX }}
                    >
                      <svg
                        width="150"
                        height="30"
                        viewBox="0 0 150 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M74.3132 0C47.0043 2.44032e-05 50.175 30 7.9179 30H144.27C99.4571 30 101.622 -2.44032e-05 74.3132 0Z"
                          transform="translate(-7.38794 0.5)"
                          fill="#ccc"
                        />
                      </svg>
                      <div
                        className={
                          "slider-button " +
                          (this.state.dragging ? "grabbing " : "")
                        }
                        onMouseOver={() => this.setCurVal(i)}
                        onMouseDown={this.startDrag}
                        onTouchStart={this.startTouchDrag}
                      >
                        <i
                          className="fa fa-volume-up fa-2x"
                          style={{ color: "rgba(255,255,255,1)" }}
                          aria-hidden="true"
                        >
                          <span className="innericon"></span>
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
                <audio className="audio-element">
                  <source src={m.music}></source>
                </audio>
                {auth.getCurrentUser() && auth.getRole() && (
                  <React.Fragment>
                    <i
                      className="fa fa-trash-o fa-3x"
                      aria-hidden="true"
                      onClick={() => this.handleDelete(m)}
                    ></i>
                    <i
                      className="fa fa-pencil-square-o fa-3x"
                      aria-hidden="true"
                      onClick={() => this.handleAmend(m)}
                    ></i>
                  </React.Fragment>
                )}
              </div>
            ))}
        </div>
        <div className="col-6"></div>
      </div>
    );
  }
}

export default Music;
