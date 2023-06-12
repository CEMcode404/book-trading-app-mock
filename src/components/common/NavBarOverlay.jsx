import React, {
  useContext,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/userService.js";
import { UserContext } from "../context/userContext.js";

const NavBarOverlay = forwardRef(function NavBarOverlay({}, externalRef) {
  const { user, changeUser } = useContext(UserContext);
  const dialogRef = useRef();

  function openSideBar() {
    const dialogElement = dialogRef.current;
    dialogElement.showModal();
    dialogElement.style.transform = "translateX(0)";
  }

  function closeSideBar(e) {
    const dialogElement = dialogRef.current;
    const dialogDimensions = dialogElement.getBoundingClientRect();

    if (
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom ||
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right
    ) {
      dialogElement.style.transform = "translateX(-200px)";
      setTimeout(() => {
        dialogElement.close();
      }, 1000);
    }
  }

  useImperativeHandle(
    externalRef,
    () => {
      return {
        openSideBar,
      };
    },
    []
  );

  return (
    <dialog
      aria-label="Pop up Navigation"
      className={"navbar-overlay__side-bar"}
      ref={dialogRef}
      onClick={closeSideBar}
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
        {user && user.firstName.toUpperCase()}
      </NavLink>
    </dialog>
  );
});

export default NavBarOverlay;
