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
  hideTextSm = false,
  onClick,
}) => {
  if (icon) {
    return (
      <button
        type={type}
        className={`Button ${variant} ${size} ${className}`}
        style={style}
        onClick={onClick}
      >
        {icon}
        <span className={hideTextSm ? "hidden md:block" : ""}>{text}</span>
      </button>
    );
  }

  return (
    <button
      type={type}
      className={`Button ${variant} ${size} ${className}`}
      style={style}
      onClick={onClick}
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
  hideTextSm = false,
}) => {
  if (icon) {
    return (
      <Link
        to={to}
        className={`Button ${variant} ${size} ${className}`}
        style={style}
      >
        {icon}
        <span className={hideTextSm ? "hidden md:block" : ""}>{text}</span>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className={`Button ${variant} ${size} ${className}`}
      style={style}
    >
      {text}
    </Link>
  );
};
