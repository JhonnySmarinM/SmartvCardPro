import React from "react";
import { Link } from "react-router-dom";
import Container from "./layouts/Container";
import Product from "./layouts/Product";
import Title from "./layouts/Title";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <span className="w-16 h-16 bg-[#C7C7C7] rounded-full !flex items-center justify-center text-white text-2xl font-bold absolute top-[35%] right-[30px] z-10  translate-y-[-50%] cursor-pointer" style={{ ...style }} onClick={onClick}>
      <BsArrowRight />
    </span>
  );
}
function SamplePrevArrow(props) {
  const {  style, onClick } = props;
  return (
    <span
      className="w-16 h-16 bg-[#C7C7C7] rounded-full !flex items-center justify-center text-white text-2xl font-bold absolute top-[35%] left-0 z-10  translate-y-[-50%] cursor-pointer"
      style={{ ...style }}
      onClick={onClick}
    >
      <BsArrowLeft />
    </span>
  );
}
const NewArrival = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <section className="mt-[128px] ">
      <Container>
        <Title title="New Arrival" className="mb-10 text-[39px]" />
        <Slider {...settings}>
          <div className="sm:max-w-[90%] ">
            <Link>
              <Product
                src="./assets/product1.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[90%] ">
            <Link>
              <Product
                src="./assets/product2.webp"
                badge={true}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[90%]">
            <Link>
              <Product
                src="./assets/product3.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[90%]">
            <Link>
              <Product
                src="./assets/product4.webp"
                badge={true}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[90%] ">
            <Link>
              <Product
                src="./assets/product4.webp"
                badge={true}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[90%] ">
            <Link>
              <Product
                src="./assets/product4.webp"
                badge={true}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          {/* <Flex className="flex items-center gap-10 mt-12"></Flex> */}
        </Slider>
      </Container>
    </section>
  );
};

export default NewArrival;
