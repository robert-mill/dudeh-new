import React, { Component } from "react";
import parse from "html-react-parser";
import auth from "../services/authService";
import {stripHtml} from "string-strip-html";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import MusicPlayer from "./common/musicPlayer";
import { getMusics, deleteMusic } from "../services/musicService";

class Music extends Component {
  constructor(props) {
    super(props);
    //this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      data: [],
      width: window.innerwidth,
      height: window.innerheight,
      dragging: false,
      sliderX: 0,
      value: 5,
      filtered:[],
      genre:"",

      curIndex: 0,
    };
  }

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

  handleGroupClick = async (md) => {
    const data = await this.state.data;
    const filtered = await data.filter((m) => m.genre === md.genre);
   
    this.setState({ filtered, showGallery:true, genre:md.genre  });
  };

  removeDuplicates = (originalArray, prop) =>{
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  }

  async componentDidMount() {
    let  filtered = this.state.filtered;
    window.addEventListener("resize", this.updateWindowDimensions);
    const { data } = await getMusics();
    if(filtered.length===0){
      filtered = await data.filter((m) => m.genre ===data[0].genre);
        this.setState({ filtered, data, genre:data[0].genre});
    }else{
        this.setState({ data,filtered,data});
    }

    this.setState({ data, filtered });
  }

  render() {
    const { data, filtered, genre } = this.state;
    const newArr = this.removeDuplicates(data, "genre");
   
    return (
      <div className="row diving-pan music-pan">
        {parse(`<style>
          .spinner{display:none;}
          .folder-link {min-width: 100px !important;}
          input[type=range] {
            -webkit-appearance: none;
            margin: 18px 0;
            width: 100%;
          }
          input[type=range]:focus {
            outline: none;
          }
          input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 8.4px;
            cursor: pointer;
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            background: #3071a9;
            border-radius: 1.3px;
            border: 0.2px solid #010101;
          }
          input[type=range]::-webkit-slider-thumb {
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            border: 1px solid #000000;
            height: 36px;
            width: 16px;
            border-radius: 3px;
            background: #ffffff;
            cursor: pointer;
            -webkit-appearance: none;
            margin-top: -14px;
          }
          input[type=range]:focus::-webkit-slider-runnable-track {
            background: #367ebd;
          }
          input[type=range]::-moz-range-track {
            width: 100%;
            height: 8.4px;
            cursor: pointer;
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            //background: #3071a9;
            border-radius: 1.3px;
            border: 0.2px solid #010101;
          }
          input[type=range]::-moz-range-thumb {
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            border: 1px solid #000000;
            height: 36px;
            width: 16px;
            border-radius: 3px;
            background: #ffffff;
            cursor: pointer;
            content:"A";
          }
          input[type=range]::-ms-track {
            width: 100%;
            height: 8.4px;
            cursor: pointer;
            background: transparent;
            border-color: transparent;
            border-width: 16px 0;
            color: transparent;
          }
          input[type=range]::-ms-fill-lower {
            background: #2a6495;
            border: 0.2px solid #010101;
            border-radius: 2.6px;
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          }
          input[type=range]::-ms-fill-upper {
            background: #3071a9;
            border: 0.2px solid #010101;
            border-radius: 2.6px;
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          }
          input[type=range]::-ms-thumb {
            box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
            border: 1px solid #000000;
            height: 36px;
            width: 16px;
            border-radius: 3px;
            background: #ffffff;
            cursor: pointer;
           
          }
          input[type=range]:focus::-ms-fill-lower {
            background: #3071a9;
          }
          input[type=range]:focus::-ms-fill-upper {
            background: #367ebd;
          }
        
        </style>`)}






        <div className="col-lg-9 col-md-12 music-block">
          <div className="row">
            {auth.getCurrentUser() && auth.getRole() && (
              <Link className="col-12 btn btn-secondary" to="/music/new">
                Add music
              </Link>
            )}
              {newArr && (
                <div className="col-lg-2 col-md-12 article-index">
                  <div className="about-pan-head">Music categories</div>
                    {newArr &&
                    newArr.map((m) => (
                      <div className="gd-bx" key={m._id}>
                        <div className="gd-bx-in">
                          {m.genre && (
                            <span className="gd-bx-hd gd-mre" onClick={() => this.handleGroupClick(m)}>
                              <h3>{stripHtml(m.genre)}</h3>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                 {newArr.length >0 && <div className="cf" onClick={this.handleClearFilter}>
                    Back{" "}
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </div>}
                </div>
              )}
              



           
           
           
            <div className={`col-lg-${(filtered && "7 gallery-block")  || "12 gallery-block"} col-md-12 gallery-block`}>
              <div className="row"><div className="col-12 music-genre">{genre}</div></div>
              <div className="row row-flex">
           
                    {filtered &&
                      filtered.map((m, i) => (
                        <div key={m._id} className="col-sm-6 col-12" style={{backgroundColor:"rgba(255,255,255,0.7)"}}>
                          <MusicPlayer music={m.music} caption={m.caption} index={i} />
                          {auth.getCurrentUser() && auth.getRole() && <Link to={`/music/${m._id}`} ><i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i></Link>}
                        </div>
                      ))}
            </div>
             </div>

          </div>
        </div>
        <div className="col-6"></div>
      </div>
    );
  }
}

export default Music;
