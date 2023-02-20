import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({ className, link, linkName }) => {
  return (
    <NavLink className={className} to={link}>
      {linkName}
    </NavLink>
  );
};

export default Button;
