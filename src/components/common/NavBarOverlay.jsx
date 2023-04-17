import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const NavBarOverlay = ({ slideStatus, open_closeSidebar }) => {
  const headersProps = [
    ["HOME", "/"],
    ["LOG IN", "/login"],
    ["SIGN UP", "/signup"],
    ["ACCOUNT", "/account"],
  ];
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
      <aside className={"navbar-overlay__side-bar" + slideType}>
        <div className="navbar-overlay__headbar"></div>
        {headersProps.map(([title, path]) => (
          <NavLink to={path} className="navbar_overlay__NavLink" key={title}>
            {title}
          </NavLink>
        ))}
      </aside>
    </div>
  );
};

export default NavBarOverlay;
