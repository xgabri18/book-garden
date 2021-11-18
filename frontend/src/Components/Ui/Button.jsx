import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export const Button = ({
  icon,
  text,
  type,
  variant = "",
  size = "",
  style = {},
  className = "",
}) => {
  if (icon) {
    return (
      <button
        type={type}
        className={`Button ${variant} ${size} ${className}`}
        style={style}
      >
        {icon}
        {text}
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`Button ${variant} ${size} ${className}`}
      style={style}
    >
      {text}
    </button>
  );
};

export const ButtonLink = ({
  icon,
  text,
  to,
  variant = "",
  size = "",
  style = {},
  className = "",
}) => {
  if (icon) {
    return (
      <Link
        to={to}
        className={`Button ${variant} ${size} ${className}`}
        style={style}
      >
        {icon}
        {text}
      </Link>
    );
  }

  return (
    <Link to={to} className={`Button ${variant} ${size}`} style={style}>
      {text}
    </Link>
  );
};
