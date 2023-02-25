import React from "react";

const Image = ({ imgSrc, imgAlt ,className }) => {
  return (
    <picture>
      <img className={className} src={imgSrc} alt={imgAlt} />
    </picture>
  );
};

export default Image;
