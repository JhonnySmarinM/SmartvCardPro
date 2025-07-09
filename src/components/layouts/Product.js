import React from "react";
import { Badge } from "./Badge";
import Flex from "./Flex";
import Image from "./Image";
import { GoGitCompare } from "react-icons/go";
import { AiFillHeart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

const Product = ({ src, alt, badge, productTitle, price, category }) => {
  return (
    <>
      <div className="relative overflow-hidden group">
        <Image imgSrc={src} imgAlt={alt} className="w-full"/>
        {badge && <Badge title="new" />}
        <div className="absolute bottom-[-112px] left-0 w-full p-6 bg-white group-hover:bottom-0 ease-linear duration-300 text-[#767676] font-secondary font-normal text-base text-right ">
          <p className="hover:font-bold text-[#262626]">
            Add to Wish List
            <FaShoppingCart className="inline-block text-[#262626] ml-4" />
          </p>
          <p className="hover:font-bold text-[#262626]">
            Compare
            <GoGitCompare className="inline-block text-[#262626]  ml-4" />
          </p>
          <p className="hover:font-bold text-[#262626]">
            Add to Cart
            <AiFillHeart className="inline-block text-[#262626] ml-4" />
          </p>
        </div>
      </div>
      <Flex className="flex items-center justify-between md:text-base text-[20px] font-bold font-secondary mt-6 mb-4 capitalize text-[#262626]">
        <h4>{productTitle}</h4>
        <p className="text-base font-normal text-[#767676]">
          <span>$</span>
          {price}
        </p>
      </Flex>
      <p className="text-base font-normal capitalize font-secondary text-[#767676]">
        {category}
      </p>
    </>
  );
};

export default Product;
