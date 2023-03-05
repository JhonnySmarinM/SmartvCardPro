import React from "react";
import { NavLink } from "react-router-dom";
import {FaAngleRight} from "react-icons/fa"
import Title from "./Title";
const Breadcrumbs = ({ className, link1, value1, link2, value2 }) => {
  return (
    <>
      <Title title={value2} className="text-[49px]" />
      <p
        className={`font-secondary font-normal text-[12px] text-[#767676] capitalize  flex gap-2 items-center ${className}`}
      >
        <NavLink to={link1}>{value1}</NavLink>
        <FaAngleRight />
        <NavLink to={link2}>{value2}</NavLink>
      </p>
    </>
  );
};

export default Breadcrumbs;
