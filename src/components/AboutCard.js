import React from 'react'

const AboutCard = ({ title, details }) => {
  return (
    <div className="capitalize font-secondary w-[32%]">
      <h3 className="text-2xl mb-4 text-[#262626] font-bold ">{title}</h3>
      <p className={`text-sm font-normal text-[#767676]`}>
        {details}
      </p>
    </div>
  );
};

export default AboutCard