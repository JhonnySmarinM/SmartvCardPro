import React from "react";

const Title = ({ className, title }) => {
  return (
    <h2
      className={`font-bold font-secondary text-[#262626] capitalize ${className}`}
    >
      {title}
    </h2>
  );
};

export default Title;
