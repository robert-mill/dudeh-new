import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="row col-foot-common">
        <div className="col"></div>
        <div className="col">
          <Link to="/contactUs">
            <i className="fa fa-envelope fa-2x" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="col">
          <i className="fa fa-phone-square fa-2x" aria-hidden="true"></i>
        </div>
        <div className="col"></div>
      </div>
    </footer>
  );
};

export default Footer;
