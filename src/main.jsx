console.log("Main.jsx loaded");

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

console.log("About to render");

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/my-react-app/">
    <App />
  </BrowserRouter>
);

console.log("Rendered");
