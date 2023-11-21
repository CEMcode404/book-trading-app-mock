import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import Dialog from "../../commonComponents/Dialog.jsx";

import { logout } from "../../../services/userService.js";
import { UserContext } from "../../contexts/userContext.js";

import "./navBarOverlay.scss";

const NavBarOverlay = ({
  backDropClickCallBack,
  isOpen = false,
  transitionSpeed = 200,
}) => {
  //Asssign a classname with translateX(width of element) for the dialog element to prevent the
  //navbaroverlay not animating on first dialog open
  const { user, changeUser } = useContext(UserContext);
  const navBarOverlayContentsRef = useRef();

  const [transform, setTransform] = useState(
    `translateX(-${navBarOverlayContentsRef.current?.offsetWidth}px)`
  );

  useEffect(() => {
    if (isOpen) setTransform("translateX(0px)");
  }, [isOpen]);

  function handleCloseDialog() {
    setTransform(
      `translateX(-${navBarOverlayContentsRef.current?.offsetWidth}px)`
    );

    setTimeout(() => {
      backDropClickCallBack();
    }, transitionSpeed);
  }

  function handleLogOut() {
    logout();
    changeUser(null);
  }

  return (
    <Dialog
      aria-label="Pop up Navigation"
      backDropClickCallBack={handleCloseDialog}
      className={"navbar-overlay__dialog"}
      isOpen={isOpen}
      style={{
        transform: transform,
        transition: `transform ${transitionSpeed / 1000}s`,
      }}
    >
      <div ref={navBarOverlayContentsRef}>
        <div className="navbar-overlay__headbar"></div>
        <NavLink className="navbar-overlay__navlink" to="/">
          HOME
        </NavLink>

        {!user && (
          <NavLink className="navbar-overlay__navlink" to="/login">
            LOG IN
          </NavLink>
        )}

        {user && (
          <NavLink
            className="navbar-overlay__navlink"
            onClick={handleLogOut}
            to="#"
          >
            LOG OUT
          </NavLink>
        )}

        {!user && (
          <NavLink className="navbar-overlay__navlink" to="/signup">
            SIGNUP
          </NavLink>
        )}

        <NavLink to="/account" className="navbar-overlay__navlink">
          {user?.firstName.toUpperCase()}
        </NavLink>
      </div>
    </Dialog>
  );
};

NavBarOverlay.propTypes = {
  backDropClickCallBack: PropTypes.func,
  isOpen: PropTypes.bool,
  transitionSpeed: PropTypes.number,
};

export default NavBarOverlay;
