import React from "react";

const InputField = (props) => {
  return (
    <div
      className={`${props.className} capitalize font-secondary mt-6 first:mt-0`}
    >
      <label htmlFor="" className="block text-base font-bold  text-[#262626]">
        {props.label}
      </label>
      <props.as
        className={`block text-sm font-normal py-4 w-full md:w-[780px] outline-none border-b-2 border-solid placeholder:text-[#767676] text-[#262626] ${props.className}`}
        placeholder={props.placeholder}
        type={props.type}
      />
    </div>
  );
};

export default InputField;
