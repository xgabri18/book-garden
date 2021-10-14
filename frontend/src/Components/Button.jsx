import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const Button = ({ icon, text, to, variant, style }) => {
  if (icon) {
    return (
      <Link to={to} className={`Button Button-${variant}`} style={style}>
        {icon}
        {text}
      </Link>
    );
  }

  return (
    <Link to={to} className={`Button Button-${variant}`} style={style}>
      {text}
    </Link>
  );
};

export default Button;
