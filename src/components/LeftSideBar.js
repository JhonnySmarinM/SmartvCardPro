import React from "react";
import SideBar from "./SideBar";

const LeftSideBar = () => {
  return (
    <>
      <SideBar title="shop by category" showDrop={false} />
      <SideBar title="Shop by Color" showDrop={true} />
      <SideBar title="Shop by Brand" showDrop={true} />
      <SideBar title="Shop by Price" showDrop={false} />
    </>
  );
};

export default LeftSideBar;
