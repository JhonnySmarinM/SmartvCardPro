import React from "react";

const Search = ({ className ,placeholder ,name ,id}) => {
  return (
    <input
      className={`${className} text-black`}
      type="search"
      name={name}
      id={id}
      placeholder={placeholder}
    />
  );
};

export default Search;
