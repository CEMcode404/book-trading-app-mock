import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../app.jsx";

const NavBarOverlay = ({ slideStatus, open_closeSidebar }) => {
  const currentUser = useContext(UserContext);
  const slideType = " animate--" + slideStatus;
  return (
    <div>
      <div
        className={"navbar-overlay__background"}
        onClick={open_closeSidebar}
        style={
          slideStatus === "slideIn" ? { display: "block" } : { display: "none" }
        }
      ></div>
      <aside
        aria-label="Pop up Navigation"
        className={"navbar-overlay__side-bar" + slideType}
      >
        <div className="navbar-overlay__headbar"></div>
        <NavLink to="/" className="navbar_overlay__NavLink">
          HOME
        </NavLink>
        <NavLink
          to={currentUser ? "#" : "/login"}
          className="navbar_overlay__NavLink"
        >
          {currentUser ? "LOG OUT" : "LOG IN"}
        </NavLink>
        {!currentUser && (
          <NavLink to="/signup" className="navbar_overlay__NavLink">
            SIGNUP
          </NavLink>
        )}
        <NavLink to="/account" className="navbar_overlay__NavLink">
          {currentUser && currentUser.toUpperCase()}
        </NavLink>
      </aside>
    </div>
  );
};

export default NavBarOverlay;
