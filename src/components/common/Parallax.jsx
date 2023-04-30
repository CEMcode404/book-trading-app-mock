import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../app.jsx";
import welcomeSign from "../../assets/Foreground-welcome.svg";
import books from "../../assets/Foreground-books.svg";
import background from "../../assets/Background.svg";
import closeEyesBookman from "../../assets/Close_eyes_bookman.svg";
import bookman from "../../assets/Bookman.svg";
import NavBarOverlay from "./NavBarOverlay.jsx";
import burgerMenu from "../../assets/menu_icon.svg";
import findIcon from "../../assets/find_icon.svg";
import { logout } from "../../services/userService.js";

const Parallax = ({ parallaxState }) => {
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

  const { user, changeUser } = useContext(UserContext);

  return (
    <div className="parallax">
      {
        <NavBarOverlay
          slideStatus={slideStatus}
          open_closeSidebar={open_closeSidebar}
        />
      }
      <nav aria-label="Primary Navigation" className="parallax__navbar">
        <span className="parallax__menu-icon" onClick={open_closeSidebar}>
          <object
            style={{ pointerEvents: "none" }}
            type="image/svg+xml"
            data={burgerMenu}
            className="parallax__menu-icon-svg"
          >
            Menu Icon
          </object>
        </span>
        <NavLink className="parallax__navlink" to="/">
          Home
        </NavLink>
        {!user && (
          <NavLink className="parallax__navlink" to="/login">
            Log-in
          </NavLink>
        )}
        {user && (
          <NavLink
            to="#"
            className="parallax__navlink"
            onClick={() => {
              logout();
              changeUser(null);
            }}
          >
            Log-out
          </NavLink>
        )}
        {!user && (
          <NavLink className="parallax__navlink" to="/signup">
            Sign up
          </NavLink>
        )}
        {user && (
          <NavLink className="parallax__navlink" to="/account">
            {user}
          </NavLink>
        )}
        <input
          type="text"
          className="parallax__search-bar highlight"
          placeholder="Find books..."
        ></input>
        <span className="parallax__search-icon">
          <object
            type="image/svg+xml"
            data={findIcon}
            className="parallax__search-icon-svg"
          >
            Search Icon
          </object>
        </span>
      </nav>

      <div>
        <object
          type="image/svg+xml"
          data={background}
          style={{ top: -(parallaxState * 0.1) + "px" }}
        >
          Background
        </object>
        <object
          type="image/svg+xml"
          data={closeEyesBookman}
          style={{ top: -(parallaxState * 0.3) + "px" }}
        >
          Bookman
        </object>
        <object
          type="image/svg+xml"
          data={bookman}
          className="animate--blink"
          style={{ top: -(parallaxState * 0.3) + "px" }}
        >
          Bookman
        </object>
        <object
          type="image/svg+xml"
          data={books}
          style={{ top: -(parallaxState * 0.6) + "px" }}
        >
          Books
        </object>
        <object
          type="image/svg+xml"
          data={welcomeSign}
          style={{
            top: -(parallaxState * 0.6) + "px",
            right: -(parallaxState * 0.6) + "px",
          }}
          className="animate--swing"
        >
          Welcome Sign
        </object>
      </div>
    </div>
  );
};

export default Parallax;
