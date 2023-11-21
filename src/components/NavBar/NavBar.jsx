import React, { Fragment, useContext, useState } from "react";

import NavBarOverlay from "./navBarOverlay/NavBarOverlay.jsx";
import WrappedInView from "../commonComponents/WrappedInview.jsx";

import burgerMenu from "./menu_icon.svg";
import { logout } from "../../services/userService.js";
import logo from "../../assets/noBG-logo.svg";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/userContext.js";

import "./navBar.scss";

const NavBar = () => {
  const { user, changeUser } = useContext(UserContext);
  const [isSidBarOpen, setIsSideBarOpen] = useState(false);

  function handleLogOut() {
    logout();
    changeUser(null);
  }

  return (
    <WrappedInView threshold={0}>
      {(inView) => (
        <Fragment>
          <div className="navbar__placeholder"></div>
          <nav
            aria-label="Primary Navigation"
            className={`navbar ${inView ? "" : "navbar__out-of-view"}`}
          >
            {
              <NavBarOverlay
                backDropClickCallBack={() => setIsSideBarOpen(false)}
                isOpen={isSidBarOpen}
              />
            }

            <div className="navbar__ul-wrapper">
              <ul className="navbar__ul">
                <li
                  className="navbar__li navbar__li--menu-icon"
                  onClick={() => setIsSideBarOpen(true)}
                >
                  <object
                    className="navbar__menu-icon"
                    data={burgerMenu}
                    style={{ pointerEvents: "none" }}
                    type="image/svg+xml"
                  >
                    Menu Icon
                  </object>
                </li>

                <li className="navbar__li--logo">
                  <object
                    className="navbar__logo"
                    data={logo}
                    type="image/svg+xml"
                  >
                    Logo
                  </object>
                </li>

                <li className="navbar__li">
                  <NavLink className="navbar__navlink" to="/">
                    Home
                  </NavLink>
                </li>

                {!user && (
                  <li className="navbar__li">
                    <NavLink className="navbar__navlink" to="/login">
                      Log-in
                    </NavLink>
                  </li>
                )}

                {user && (
                  <li className="navbar__li">
                    <NavLink
                      className="navbar__navlink"
                      onClick={handleLogOut}
                      to="#"
                    >
                      Log-out
                    </NavLink>
                  </li>
                )}

                {!user && (
                  <li className="navbar__li">
                    <NavLink className="navbar__navlink" to="/signup">
                      Sign up
                    </NavLink>
                  </li>
                )}
                {user && (
                  <li className="navbar__li">
                    <NavLink className="navbar__navlink" to="/account">
                      {user.firstName}
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </Fragment>
      )}
    </WrappedInView>
  );
};

export default NavBar;
