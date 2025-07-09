import React, { useState } from "react";
import InnerSideBar from "./InnerSideBar";
import Title from "./layouts/Title";
import { RxTriangleUp, RxTriangleDown } from "react-icons/rx";
import SubText from "./layouts/SubText";
const SideBar = ({ title, showDrop, data }) => {
  const [show, setShow] = useState(true);
  return (
    <section className="mb-14">
      {showDrop ? (
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
          {data.map((item) => (
            <InnerSideBar
              title={item.name}
              showSubDrop={item.hasOwnProperty("subCategory") ? true : false}
              color={item.hasOwnProperty("colorCode") && item.colorCode}
            >
              {item.hasOwnProperty("subCategory") &&
                item.subCategory.map((subItem) => (
                  <SubText title={subItem.name} />
                ))}
            </InnerSideBar>
          ))}
        </>
      )}
    </section>
  );
};

export default SideBar;
