import React, { useState } from "react";

const DropDownV2 = ({ children, title = "Title" }) => {
  const [slideStatus, setSlide] = useState("");
  const downUp = () => {
    switch (slideStatus) {
      case "":
        setSlide("Down");
        break;
      case "Down":
        setSlide("Up");
        break;
      case "Up":
        setSlide("Down");
        break;
      default:
    }
  };

  return (
    <section aria-label={title} className="dropDownV2">
      <div className="dropDownV2__headbar" onClick={downUp}>
        <h2 className="dropDownV2__title">{title}</h2>
        <hr className="dropDownV2__hr"></hr>
        <div
          className={"dropDownV2__triangle-up animate--rotate" + slideStatus}
        ></div>
      </div>
      <div className={"dropDownV2__body animate--slide" + slideStatus}>
        {children}
        <hr className="dropDownV2__hr"></hr>
      </div>
    </section>
  );
};

export default DropDownV2;
