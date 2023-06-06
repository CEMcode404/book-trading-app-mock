import React, { useState, Fragment, useContext } from "react";
import { logout } from "../../services/userService.js";
import { NavLink, useNavigate } from "react-router-dom";
import NavBarOverlay from "./NavBarOverlay.jsx";

import burgerMenu from "../../assets/menu_icon.svg";
import logo from "../../assets/noBG-logo.svg";
import defaultImg from "../../assets/book-no-image.svg";
import { searchBookWithName } from "../../services/searchService.js";
import { UserContext } from "../context/userContext.js";
import SearchBar from "./SearchBar.jsx";

const NavBar = ({ showHeadBar = true }) => {
  if (!showHeadBar) {
    return null;
  }

  const navigate = useNavigate();

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

  const [timeOutHandle, setTimeOutHandle] = useState();

  const handleSearchInput = (search) => {
    search.closeSuggestionList();

    if (timeOutHandle) {
      clearTimeout(timeOutHandle);
    }
    search.setIsTyping(true);

    if (!search.inputValue) return search.setIsTyping(false);

    const timeOutId = setTimeout(() => {
      searchBookWithName(search.inputValue, (res, err) => {
        search.setIsTyping(false);
        if (res) search.showSuggestionList(res.data.items);
      });
    }, [3000]);
    setTimeOutHandle(timeOutId);
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
        <div className="navbar__ul-wrapper">
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
                  {user.firstName}
                </NavLink>
              </li>
            )}
          </ul>
          <div>
            <SearchBar
              placeholder="Find books..."
              className="navbar__search-bar"
              onChange={(searchString) => handleSearchInput(searchString)}
              formatFunc={(test) =>
                test.map((book) => (
                  <div
                    className="navbar__search-result-list"
                    onClick={() =>
                      navigate("/search-results", {
                        state: book.volumeInfo,
                      })
                    }
                  >
                    <img
                      className="navbar__search-result-img"
                      src={
                        book?.volumeInfo?.imageLinks?.smallThumbnail ||
                        defaultImg
                      }
                      alt={book.volumeInfo?.title}
                    ></img>
                    <p className="navbar__search-result-title">
                      {book?.volumeInfo?.title}
                    </p>
                  </div>
                ))
              }
            />
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
