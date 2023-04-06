import React from "react";
import welcomeSign from "../../assets/Foreground-welcome.svg";
import books from "../../assets/Foreground-books.svg";
import background from "../../assets/Background.svg";
import closeEyesBookman from "../../assets/Close_eyes_bookman.svg";
import bookman from "../../assets/Bookman.svg";

const Parallax = ({ parallaxState }) => {
  return (
    <div className="parallax">
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
  );
};

export default Parallax;
