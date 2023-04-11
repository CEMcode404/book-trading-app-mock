import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import NavBarOverlay from "./NavBarOverlay.jsx";

import bugerMenu from "../../assets/menu_icon.svg";
import logo from "../../assets/noBG-logo.svg";
import findIcon from "../../assets/find_icon.svg";

const NavBar = ({ showHeadBar = true }) => {
  if (!showHeadBar) {
    return null;
  }

  const [slideStatus, setSlide] = useState("");
  const open_closeSidebar = () => {
    switch (slideStatus) {
      case "":
        setSlide("slideIn");
        break;
      case "slideIn":
        setSlide("slideOut");
        break;
      case "slideOut":
        setSlide("slideIn");
        break;
      default:
    }
  };

  return (
    <Fragment>
      <nav className="navPlaceHolder"></nav>
      <nav className="navbar">
        {
          <NavBarOverlay
            slideStatus={slideStatus}
            open_closeSidebar={open_closeSidebar}
          />
        }
        <ul className="navbar__ul">
          <li className="navbar__li menu-icon" onClick={open_closeSidebar}>
            <object
              style={{ pointerEvents: "none" }}
              type="image/svg+xml"
              data={bugerMenu}
              className="menu-icon__svg"
            >
              Menu Icon
            </object>
          </li>
          <li className="navbar__li logo">
            <object type="image/svg+xml" data={logo} className="logo__svg">
              Logo
            </object>
          </li>
          <li className="navbar__li">
            <NavLink className="navbar__NavLink" to="/">
              Home
            </NavLink>
          </li>
          <li className="navbar__li">
            <NavLink className="navbar__NavLink" to="/login">
              Log-in
            </NavLink>
          </li>
          <li className="navbar__li">
            <NavLink className="navbar__NavLink" to="/signup">
              Sign up
            </NavLink>
          </li>
          <li className="navbar__li">
            <NavLink className="navbar__NavLink" to="/account">
              Account
            </NavLink>
          </li>
          <li className="navbar__li search-bar">
            <input
              type="text"
              className="search-bar__input highlight"
              placeholder="Find books..."
            ></input>
          </li>
          <li className="navbar__li search-icon">
            <object
              type="image/svg+xml"
              data={findIcon}
              className="search-icon__svg"
            >
              Search Icon
            </object>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default NavBar;
