import React from "react";

const Image = ({ imgSrc, imgAlt }) => {
  return (
    <picture>
      <img src={imgSrc} alt={imgAlt} />
    </picture>
  );
};

export default Image;
