import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({ className, link, linkName }) => {
  return (
    <NavLink className={`px-6 py-2 font-bold rounded transition-colors duration-200 bg-acento text-white hover:bg-red-900 ${className}`} to={link}>
      {linkName}
    </NavLink>
  );
};

export default Button;
