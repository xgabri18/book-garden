import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./auth";

ReactDOM.render(
  <React.StrictMode>
    <div>Loading</div>
  </React.StrictMode>,
  document.getElementById("root")
);

AuthService.checkAuthSession().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
