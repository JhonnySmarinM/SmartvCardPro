import React from "react";

const Option = ({ option, selected, value }) => {
  return (
    <option selected={selected} value={value}>
      {option}
    </option>
  );
};

export default Option;
