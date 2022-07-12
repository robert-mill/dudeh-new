import React, { Component } from "react";
import auth from "../../services/authService";
import { Link, NavLink } from "react-router-dom";
import stripHtml from "string-strip-html";
import { Navbar } from "react-bootstrap";
import ScrollIntoView from "react-scroll-into-view";

const UnderNav = (props) => {
  const navItems = props.navItems;
  return (
    <Navbar className="underNav" bg="light" expand="lg">
      <ScrollIntoView selector={`#group${0}`}>
        <button className="mdl-button mdl-js-button mdl-button--raised">
          <i className="fa fa-caret-square-o-up fx-x2" aria-hidden="true"></i>
        </button>
      </ScrollIntoView>
      {navItems &&
        navItems.map((m, index) => (
          <ScrollIntoView selector={`#group${index + 2}`} key={m._id}>
            <button className="mdl-button mdl-js-button mdl-button--raised">
              {stripHtml(m.heading)}
            </button>
          </ScrollIntoView>
        ))}
    </Navbar>
  );
};

export default UnderNav;

// const UnderNav = ({ navItems }) => {
//   handleClick = (m) => {
//     console.log(m._id);
//   };
//   return (
//     <Navbar className="underNav" bg="light" expand="lg">
//       {navItems &&
//         navItems.map((m, index) => (
//           <Link key={m._id} onClick={() => this.handleClick(m)}>
//             {stripHtml(m.heading)}
//           </Link>
//         ))}
//     </Navbar>
//   );
// };

// export default UnderNav;
