import React from "react";
import { NavLink } from "react-router-dom";

const List = ({ itemName, className, link }) => {
  return (
    <li className={className}>
      <NavLink to={link}>
        {itemName}
      </NavLink>
    </li>
  );
};

export default List;
