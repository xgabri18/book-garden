import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./auth";

ReactDOM.render(
  <React.StrictMode>
    <div
      className="flex items-center justify-center bg-gray-50"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="text-4xl font-bold">Loading...</div>
    </div>
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
