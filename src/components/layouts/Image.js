import React from "react";

const Image = ({ imgSrc, imgAlt, className }) => {
  return (
    <picture>
      <img className={className} src={imgSrc} alt={imgAlt} loading="lazy" />
    </picture>
  );
};

export default Image;
