import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React from "react";

import App from "./components/App.jsx";

import "./styles/index.scss";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
