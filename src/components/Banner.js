import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Image from "../components/layouts/Image";
const Banner = () => {
  const [dot, setDot] = useState(0)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay:true,
    beforeChange: (prev, next) => {
      setDot(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(-50%,-50%)",
          left: "8%",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dot
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "2px black solid",
                fontFamily: "DM Sans",
                fontWeight: "bold",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "2px white solid",
                fontFamily: "DM Sans",
                fontWeight: "bold",
              }
        }
      >
        0{i + 1}
      </div>
    ),
  };
  return (
    <Slider {...settings}>
      <Link to="#">
        <div className="flex justify-center items-center w-full h-80 bg-transparent">
          <Image imgSrc="./assets/apop1.jpg" imgAlt="banner" className="w-96 h-auto max-h-[32rem] object-contain" />
        </div>
      </Link>
      <Link to="#">
        <div className="flex justify-center items-center w-full h-80 bg-transparent">
          <Image imgSrc="./assets/apop1.jpg" imgAlt="banner" className="w-96 h-auto max-h-[32rem] object-contain" />
        </div>
      </Link>
      <Link to="#">
        <div className="flex justify-center items-center w-full h-80 bg-transparent">
          <Image imgSrc="./assets/apop1.jpg" imgAlt="banner" className="w-96 h-auto max-h-[32rem] object-contain" />
        </div>
      </Link>
    </Slider>
  );
};

export default Banner;
