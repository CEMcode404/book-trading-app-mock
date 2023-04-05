import React from "react";
import books from "../../assets/Foreground-books.svg";
import background from "../../assets/Background.svg";
import bookman from "../../assets/Bookman.svg";
import welcomeSign from "../../assets/Foreground-welcome.svg";

const Parallax = () => {
  return (
    <div className="parallax">
      <object type="image/svg+xml" data={background}>
        Background
      </object>
      <object type="image/svg+xml" data={bookman}>
        Background
      </object>
      <object type="image/svg+xml" data={books}>
        Background
      </object>
      <object type="image/svg+xml" data={welcomeSign}>
        Background
      </object>
    </div>
  );
};

export default Parallax;
