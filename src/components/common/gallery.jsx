import React from "react";
import { Zoom } from "react-slideshow-image";
const images = [
  "images/slide_2.jpg",
  "images/slide_3.jpg",
  "images/slide_4.jpg",
  "images/slide_5.jpg",
  "images/slide_6.jpg",
  "images/slide_7.jpg",
];

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true,
};
const Gallery = ({ imageObj }) => {
  return (
    <div className="gallery-block">
      <div className="slide-container">
        <Zoom {...zoomOutProperties}>
          {imageObj.map((each, index) => (
            <img key={index} style={{ width: "100%" }} src={each.image} />
          ))}
        </Zoom>
      </div>
    </div>
  );
};

export default Gallery;
