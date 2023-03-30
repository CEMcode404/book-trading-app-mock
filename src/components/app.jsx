import React from "react";

const App = () => {
  return (
    <div>
      <h1>Hello there!</h1>
      <object
        type="image/svg+xml"
        data="./assets/Booktrade.comLogo.svg"
        className="logo__svg"
      >
        Logo
      </object>
      <img src="./assets/Booktrade.comLogo.svg"></img>
    </div>
  );
};

export default App;
