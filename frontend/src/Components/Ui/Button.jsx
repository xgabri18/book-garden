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
  showText,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`Button ${variant} ${size} ${className}`}
      style={style}
      onClick={onClick}
    >
      {icon}
      <span className={showText ? "hidden " + showText + ":block" : ""}>
        {text}
      </span>
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
  showText,
  target,
}) => {
  return (
    <Link
      to={to}
      className={`Button ${variant} ${size} ${className}`}
      style={style}
      target={target}
    >
      {icon}
      <span className={showText ? "hidden " + showText + ":block" : ""}>
        {text}
      </span>
    </Link>
  );
};
