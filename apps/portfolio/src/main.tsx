import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./assets/index.css";
import "./config";

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
