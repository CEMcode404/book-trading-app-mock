import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../app.jsx";
import { logout } from "../../services/userService.js";

const NavBarOverlay = ({ slideStatus, open_closeSidebar }) => {
  const { user, changeUser } = useContext(UserContext);
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
        {!user && (
          <NavLink to="/login" className="navbar_overlay__NavLink">
            LOG IN
          </NavLink>
        )}
        {user && (
          <NavLink
            to="#"
            className="navbar_overlay__NavLink"
            onClick={() => {
              logout();
              changeUser(null);
            }}
          >
            LOG OUT
          </NavLink>
        )}

        {!user && (
          <NavLink to="/signup" className="navbar_overlay__NavLink">
            SIGNUP
          </NavLink>
        )}
        <NavLink to="/account" className="navbar_overlay__NavLink">
          {user && user.toUpperCase()}
        </NavLink>
      </aside>
    </div>
  );
};

export default NavBarOverlay;
