import React, { Children, useState } from "react";
import Title from "./layouts/Title";
import { HiPlusSm } from "react-icons/hi";
const InnerSideBar = ({ title, showSubDrop, children ,color}) => {
  const [show, setShow] = useState(false);
  const [drop, setDrop] = useState(showSubDrop);
  return (
    <section>
      {drop ? (
        <div
          onClick={() => setShow(!show)}
          className={
            show
              ? "flex items-center justify-between cursor-pointer font-secondary font-bold text-base text-[#767676] mt-9 border-b border-solid border-[#F0F0F0] pb-5 capitalize"
              : "flex items-center justify-between cursor-pointer font-secondary font-normal text-base text-[#767676] mt-9 border-b border-solid border-[#F0F0F0] pb-5 capitalize"
          }
        >
          <p className="text-base"> {title}</p>
          {show ? (
            <HiPlusSm className="text-[#767676]" />
          ) : (
            <HiPlusSm className="text-[#767676]" />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between font-secondary font-normal text-base text-[#767676] mt-9 border-b border-solid border-[#F0F0F0] pb-5 capitalize">
          <p className="text-base">
            {color && (
              <span
                className="w-3 h-3 mr-3 rounded-full inline-block "
                style={{ background: `${color}` }}
              ></span>
            )}
            {title}
          </p>
        </div>
      )}
      {show && <>{children}</>}
    </section>
  );
};

export default InnerSideBar;
