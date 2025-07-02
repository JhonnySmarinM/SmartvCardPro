import React, { useEffect, useRef, useState } from "react";
import Container from "./layouts/Container";
import Dropdown from "./layouts/Dropdown";
import Flex from "./layouts/Flex";
import { RiBarChartHorizontalLine } from "react-icons/ri";
import { FaSearch, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import NavItem from "./layouts/NavItem";
import List from "./layouts/List";
import Search from "./layouts/Search";
import Image from "./layouts/Image";
import Button from "./layouts/Button";
const Header = () => {
  const [categoryShow, setCategoryShow] = useState(false);
  const [userShow, setUserShow] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  let categoryRef = useRef();
  let userRef = useRef();
  let cartRef = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (categoryRef.current.contains(e.target)) {
        setCategoryShow(!categoryShow);
      } else {
        setCategoryShow(false);
      }
      if (userRef.current.contains(e.target)) {
        setUserShow(!userShow);
      } else {
        setUserShow(false);
      }
      if (cartRef.current.contains(e.target)) {
        setCartShow(!cartShow);
      } else {
        setCartShow(false);
      }
    });
  }, [categoryShow, userShow, cartShow]);
  return (
    <header className="bg-fondoClaro py-8 shadow-lg">
      <Container>
        <Flex className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="lg:w-[160px] w-[80px]">
            <Dropdown
              className="relative flex items-center justify-start gap-3 z-50"
              dropRef={categoryRef}
            >
              <RiBarChartHorizontalLine className="inline-block font-bold" />
              <p className="hidden text-sm font-normal cursor-pointer font-secondary lg:block">
                Shop by Category
              </p>
              {categoryShow && (
                <NavItem className="absolute  top-[42px] left-0 bg-[#262626]  text-[#D9D9D9] w-[263px] box-border font-secondary font-normal text-sm">
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
          <div className="lg:w-[601px] w-[550px] relative lg:mr-0 mr-2">
            <Search
              className="w-full px-8 py-5 bg-white rounded-lg border-2 border-acento text-lg placeholder:font-secondary placeholder:font-normal placeholder:text-base placeholder:text-[#C4C4C4] capitalize font-secondary font-normal outline-acento shadow-lg"
              placeholder="Buscar productos..."
              id="search"
            />
            <label htmlFor="search">
              <FaSearch className="absolute cursor-pointer right-6 top-5 text-2xl text-acento" />
            </label>
          </div>
          <div className="w-[160px]">
            <Flex className="flex items-center justify-around ">
              <Dropdown className="relative z-50" dropRef={userRef}>
                <div className="flex w-1/3 gap-2 cursor-pointer">
                  <p>
                    <FaUserAlt />
                  </p>
                  <p>
                    <VscTriangleDown />
                  </p>
                </div>
                {userShow && (
                  <NavItem className="absolute top-[42px] right-0 w-[200px] box-border font-secondary font-normal text-sm text-center capitalize drop-shadow-md bg-white">
                    <List
                      className=" p-4  transition-all duration-[300ms] hover:font-bold bg-[#2B2B2B] text-white"
                      itemName="My Account"
                      link="/myaccount"
                    />
                    <List
                      className=" p-4  transition-all hover:font-bold duration-[300ms] text-[#262626] "
                      itemName="Log Out"
                      link="/logout"
                    />
                  </NavItem>
                )}
              </Dropdown>
              <Dropdown className="relative z-50" dropRef={cartRef}>
                <div className="w-1/3 cursor-pointer flex justify-center items-center">
                  <p>
                    <FaShoppingCart className="text-3xl text-acento drop-shadow-lg" />
                  </p>
                </div>
                {cartShow && (
                  <Flex className="flex flex-col w-[360px] absolute top-[42px] right-0 drop-shadow-md box-border">
                    <Flex className="flex items-center justify-between  bg-[#F5F5F3] p-5">
                      <div className="w-[30%] border border-solid border-[#5252529d]">
                        <Image
                          imgSrc="./assets/cart_image.webp"
                          imgAlt="cart_image"
                        />
                      </div>
                      <div className="w-[50%] font-bold font-secondary text-sm">
                        <p>Black Smart Watch</p>
                        <p>
                          <span>$</span>44.00
                        </p>
                      </div>
                      <div className="w-[5%]">
                        <p className="cursor-pointer">
                          <ImCross />
                        </p>
                      </div>
                    </Flex>
                    <Flex className="flex flex-col p-5 bg-white">
                      <Flex className="flex gap-3 ">
                        <p className="text-base font-normal font-secondary text-[#767676]">
                          Subtotal:
                        </p>
                        <p className="text-base font-bold font-secondary text-[#262626]">
                          <span>$</span>
                          <span>44.00</span>
                        </p>
                      </Flex>
                      <Flex className="flex gap-5 mt-3">
                        <Button
                          link="/viewcart"
                          linkName="view cart"
                          className="px-10 py-4 text-sm font-bold capitalize bg-transparent border font-secondary border-solid border-[#262626] "
                        />
                        <Button
                          link="/checkout"
                          c
                          linkName="Checkout"
                          className="px-10 py-4 capitalize bg-[#262626] text-white text-sm font-bold  font-secondary"
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                )}
              </Dropdown>
            </Flex>
          </div>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
