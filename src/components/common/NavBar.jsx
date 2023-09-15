import React, { Fragment, useContext, useRef } from "react";
import { logout } from "../../services/userService.js";
import { NavLink } from "react-router-dom";
import NavBarOverlay from "./NavBarOverlay.jsx";

import burgerMenu from "../../assets/menu_icon.svg";
import logo from "../../assets/noBG-logo.svg";
import { UserContext } from "../context/userContext.js";
import WrappedInView from "./WrappedInview.jsx";

const NavBar = ({ showHeadBar = true }) => {
  const sideBarRef = useRef();
  const { user, changeUser } = useContext(UserContext);

  if (!showHeadBar) {
    return null;
  }

  return (
    <WrappedInView threshold={0}>
      {(inView) => (
        <Fragment>
          <div className="navPlaceHolder"></div>
          <nav
            className={`navbar ${inView ? "" : "navbar__out-of-view"}`}
            aria-label="Primary Navigation"
          >
            {<NavBarOverlay ref={sideBarRef} />}
            <div className="navbar__ul-wrapper">
              <ul className="navbar__ul">
                <li
                  className="navbar__li menu-icon"
                  onClick={() => sideBarRef.current.openSideBar()}
                >
                  <object
                    style={{ pointerEvents: "none" }}
                    type="image/svg+xml"
                    data={burgerMenu}
                    className="menu-icon__svg"
                  >
                    Menu Icon
                  </object>
                </li>
                <li className="navbar__li--logo">
                  <object
                    type="image/svg+xml"
                    data={logo}
                    className="logo__svg"
                  >
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
