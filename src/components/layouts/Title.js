import React from 'react'

const Title = ({ className,title }) => {
  return (
    <h2 className={`font-bold font-secondary text-[39px] capitalize ${className}`}>
      {title}
    </h2>
  );
};

export default Title