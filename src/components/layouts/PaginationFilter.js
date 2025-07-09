import React from "react";

const PaginationFilter = ({ id, title, children, className, onChange }) => {
  return (
    <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-x-3 gap-x-0">
      <label for={id}>{title}</label>
      <select
        onChange={onChange}
        id={id}
        className={`border border-[#F0F0F0]  p-2.5 outline-none capitalize ${className}`}
      >
        {children}
      </select>
    
    </div>
  );
};

export default PaginationFilter;
