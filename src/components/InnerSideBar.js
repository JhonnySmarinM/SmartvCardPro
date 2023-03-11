import React, { useState } from "react";
import Title from "./layouts/Title";
import { HiPlusSm } from "react-icons/hi";
const InnerSideBar = ({title,showSubDrop}) => {
    const [show, setShow] = useState(true);
    const [drop, setDrop] = useState(showSubDrop);
  return (
    <>
      {drop ? (
        <div
          onClick={() => setShow(!show)}
          className="flex items-center justify-between cursor-pointer"
        >
          <p className="text-base">{title}</p>
          <HiPlusSm />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-base">{title}</p>
        </div>
      )}
      {drop && show && (
        <>
          <div>heklllo</div>
          <div>heklllo</div>
          <div>heklllo</div>
          <div>heklllo</div>
        </>
      )}
    </>
  );
};

export default InnerSideBar;
