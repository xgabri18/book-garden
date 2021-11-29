import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export const Button = ({
  icon,
  text,
  type,
  variant = "",
  size = "",
  className = "",
  showText,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`Button ${variant} ${size} ${className}`}
      {...rest}
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
  className = "",
  showText,
  ...rest
}) => {
  return (
    <Link
      to={to}
      className={`Button ${variant} ${size} ${className}`}
      {...rest}
    >
      {icon}
      <span className="hidden md:block" />
      <span className={showText ? "hidden " + showText + ":block" : ""}>
        {text}
      </span>
    </Link>
  );
};
