import React from "react";
import SideBar from "./SideBar";
import {category,colors,brands,price} from "../fakedata/data"; 

const LeftSideBar = () => {
  return (
    <>
      <SideBar title="shop by category" showDrop={false} data={category} />
      <SideBar title="Shop by Color" showDrop={true} data={colors} />
      <SideBar title="Shop by Brand" showDrop={true} data={brands} />
      <SideBar title="Shop by Price" showDrop={false} data={price} />
    </>
  );
};

export default LeftSideBar;
