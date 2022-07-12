import React, { useState } from "react";


const MusicPlayer = (props) => {
  let initvolumne = 5;
  let selected = "";
  const [select, setSelected] = useState(selected);
  const [volumne, setVolumne] = useState(initvolumne);
  function playAudio(e) {

    const els = document.getElementsByClassName("audio-element");
    const sstop = document.getElementsByClassName("fa-stop-circle-o");
    const splay = document.getElementsByClassName("fa-play-circle-o");

    sstop.forEach(function(key, index){
      sstop[index].style.color = "red";
    });
    sstop[props.index].style.color = "red";


    splay.forEach(function(key, index){
    splay[index].style.color = "blue";
    });

    els.forEach(function(key, index){
      
        els[index].pause();
        setSelected("");
    });

    setSelected("");
    setSelected(`${props.index}play`);
    const audioEl = document.getElementsByClassName("audio-element")[
      props.index
    ];
    document.getElementsByClassName("fa-play-circle-o")[props.index].style.color = "red";
    audioEl.play();
  }
  function stopAudio(e) {
    setSelected("");
    setSelected(`${props.index}stop`);
    const audioEl = document.getElementsByClassName("audio-element")[
      props.index
    ];
    document.getElementsByClassName("fa-stop-circle-o")[props.index].style.color = "red";
    audioEl.pause();
  }
  function handleInputChange(e) {
    setVolumne(e.target.value);
    volumneAudio(e.target.value);
  }
  function volumneAudio(v) {
    const audioEl = document.getElementsByClassName("audio-element")[
      props.index
    ];
    audioEl.volume = volumne / 10;
  }
  return (
    <div className="music-row row">
      <div className="music-caption">{props.caption}</div>
      <audio className="audio-element">
        <source src={props.music}></source>
      </audio>
      <div className="music-control col-md-10 col-xs-10">
        <div className="row">
          <button className="col-6 col-xs-12" onClick={playAudio}>
            <span>
              <i
                className="fa fa-play-circle-o fa-2x"
                style={{
                  color: select === `${props.index}play` ? "red" : "blue",
                }}
                aria-hidden="true"
              ></i>
            </span>
          </button>
          <button className="col-6 col-xs-12" onClick={stopAudio}>
            <span>
              <i
                className="fa fa-stop-circle-o fa-2x"
                style={{
                  color: (select === `${props.index}play` ? "blue" : "red" ),
                }}
                aria-hidden="true"
              ></i>
            </span>
          </button>
          <div className="rangeContainer col-12" style={{ padding: "0" }}>
            <div className="">
              <label style={{ width: "100%" }}>
                <input
                  id={`typeinp`}
                  type="range"
                  min="0"
                  max="10"
                  value={volumne}
                  onChange={handleInputChange}
                  step="1"
                />
                {volumne}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2 col-xs-2">
        <img
          src={`/snd-${volumne}.png`}
          alt="volumne"
          style={{ width: "auto", maxWidth: "100%" }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
