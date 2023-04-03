import { Route, Routes } from "react-router-dom";
import React, { Fragment } from "react";
import NavBar from "./common/NavBar.jsx";
import HomePage from "./Homepage.jsx";

const App = () => {
  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
