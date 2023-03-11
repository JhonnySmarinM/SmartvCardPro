import React, { useState } from "react";
import InnerSideBar from "./InnerSideBar";
import Title from "./layouts/Title";
import { HiPlusSm } from "react-icons/hi";
const SideBar = ({ title, showDrop }) => {
  const [show, setShow] = useState(true);
  const [drop, setDrop] = useState(showDrop);
  return (
    <>
      {drop ? (
        <div
          onClick={() => setShow(!show)}
          className="flex items-center justify-between cursor-pointer"
        >
          <Title title={title} className="text-[20px]" />
          <HiPlusSm />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Title title={title} className="text-[20px]" />
        </div>
      )}
      {show && (
        <>
          <InnerSideBar title="Category 1" showSubDrop={false} />
          <InnerSideBar title="Category 2" showSubDrop={true} />
          <InnerSideBar title="Category 3" showSubDrop={false} />
          <InnerSideBar title="Category 4" showSubDrop={true} />
        </>
      )}
    </>
  );
};

export default SideBar;
 