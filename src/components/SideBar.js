import React, { useState } from "react";
import InnerSideBar from "./InnerSideBar";
import Title from "./layouts/Title";
import { RxTriangleUp, RxTriangleDown } from "react-icons/rx";
import SubText from "./layouts/SubText";
const SideBar = ({ title, showDrop }) => {
  const [show, setShow] = useState(true);
  const [drop, setDrop] = useState(showDrop);
  return (
    <section className="mb-14">
      {drop ? (
        <div
          onClick={() => setShow(!show)}
          className="flex items-center justify-between cursor-pointer "
        >
          <Title title={title} className="text-[20px] " />
          {show ? <RxTriangleUp /> : <RxTriangleDown />}
        </div>
      ) : (
        <div>
          <Title title={title} className="text-[20px] " />
        </div>
      )}
      {show && (
        <>
          <InnerSideBar title="Category 1" showSubDrop={false} color="red"></InnerSideBar>
          <InnerSideBar title="Category 2" showSubDrop={true}>
            <SubText title="subcategory 1" />
            <SubText title="subcategory 2" />
            <SubText title="subcategory 3" />
            <SubText title="subcategory 4" />
          </InnerSideBar>
          <InnerSideBar title="Category 3" showSubDrop={false} color="red"></InnerSideBar>
          <InnerSideBar title="Category 4" showSubDrop={true}>
            <SubText title="subcategory 1" />
            <SubText title="subcategory 2" />
            <SubText title="subcategory 3" />
            <SubText title="subcategory 4" />
          </InnerSideBar>
        </>
      )}
    </section>
  );
};

export default SideBar;
