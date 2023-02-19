import React, { useEffect, useRef, useState } from "react";
import Container from "./layouts/Container";
import Dropdown from "./layouts/Dropdown";
import Flex from "./layouts/Flex";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import NavItem from "./layouts/NavItem";
import List from "./layouts/List";
import Search from "./layouts/Search";
const Header = () => {
  const [show, setShow] = useState(false);
  let ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current.contains(e.target)) {
        setShow(!show);
      } else {
        setShow(false);
      }
    });
  }, [show]);
  return (
    <header className="bg-[#F5F5F3]">
      <Container>
        <Flex className="flex items-center justify-between">
          <div className="w-1/5">
            <Dropdown
              className="relative flex items-center justify-start gap-3"
              dropRef={ref}
            >
              <RiBarChartHorizontalLine className="inline-block font-bold" />
              <p className="text-sm font-normal cursor-pointer font-secondary">
                Shop by Category
              </p>
              {show && (
                <NavItem className="absolute top-7 left-0 bg-[#262626]  text-[#D9D9D9] w-[263px] box-border font-secondary font-normal text-sm">
                  <List
                    className=" border-[#575656]  border-b border-solid py-4 px-5 hover:text-white hover:px-8  transition-all duration-[300ms] "
                    itemName="Accessories"
                    link="/accessories"
                  />
                  <List
                    className=" border-[#575656] border-b border-solid py-4 px-5 hover:text-white hover:px-8 transition-all duration-[300ms]"
                    itemName="Furniture"
                    link="/accessories"
                  />
                  <List
                    className=" border-[#575656] border-b border-solid py-4 px-5 hover:text-white hover:px-8 transition-all duration-[300ms]"
                    itemName="Electronics"
                    link="/accessories"
                  />
                  <List
                    className=" border-[#575656] border-b border-solid py-4 px-5 hover:text-white hover:px-8 transition-all duration-[300ms]"
                    itemName="Clothes"
                    link="/accessories"
                  />
                  <List
                    className=" border-[#575656] border-b border-solid py-4 px-5 hover:text-white hover:px-8 transition-all duration-[300ms]"
                    itemName="Bags"
                    link="/accessories"
                  />
                  <List
                    className=" border-[#575656] border-b border-solid py-4 px-5 hover:text-white hover:px-8 transition-all duration-[300ms]"
                    itemName="Home appliances "
                    link="/accessories"
                  />
                </NavItem>
              )}
            </Dropdown>
          </div>
          <div className="w-[601px] relative">
            <Search
              className="w-full px-5 py-4 bg-white placeholder:font-secondary placeholder:font-normal placeholder:text-sm placeholder:text-[#C4C4C4] capitalize font-secondary font-normal text-sm outline-[#DAC4F6]"
              placeholder="Search Products"
              id="search"
            />
            <label htmlFor="search">
              <FaSearch className="absolute cursor-pointer right-4 top-4" />
            </label>
          </div>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
