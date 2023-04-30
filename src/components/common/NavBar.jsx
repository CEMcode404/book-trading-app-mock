import React, { useState, Fragment, useContext } from "react";
import { logout } from "../../services/userService.js";
import { NavLink } from "react-router-dom";
import NavBarOverlay from "./NavBarOverlay.jsx";

import burgerMenu from "../../assets/menu_icon.svg";
import logo from "../../assets/noBG-logo.svg";
import findIcon from "../../assets/find_icon.svg";
import { searchBookWithName } from "../../services/searchService.js";
import { UserContext } from "../app.jsx";

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

  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (e) => {
    setSearchInput(e.currentTarget.value);
  };

  const { user, changeUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navPlaceHolder"></div>
      <nav className="navbar" aria-label="Primary Navigation">
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
              data={burgerMenu}
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
          {!user && (
            <li className="navbar__li">
              <NavLink className="navbar__NavLink" to="/login">
                Log-in
              </NavLink>
            </li>
          )}
          {user && (
            <li className="navbar__li">
              <NavLink
                to="#"
                className="navbar__NavLink"
                onClick={() => {
                  logout();
                  changeUser(null);
                }}
              >
                Log-out
              </NavLink>
            </li>
          )}
          {!user && (
            <li className="navbar__li">
              <NavLink className="navbar__NavLink" to="/signup">
                Sign up
              </NavLink>
            </li>
          )}
          {user && (
            <li className="navbar__li">
              <NavLink className="navbar__NavLink" to="/account">
                {user}
              </NavLink>
            </li>
          )}
          <li className="navbar__li search-bar">
            <input
              type="text"
              className="search-bar__input highlight"
              placeholder="Find books..."
              onInput={handleSearchInput}
            ></input>
          </li>
          <li
            className="navbar__li search-icon"
            onClick={() => {
              searchBookWithName(searchInput);
            }}
          >
            <object
              style={{ pointerEvents: "none" }}
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
