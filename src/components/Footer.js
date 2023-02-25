import React from "react";
import Container from "./layouts/Container";
import Flex from "./layouts/Flex";
import Image from "./layouts/Image";
import List from "./layouts/List";
import NavItem from "./layouts/NavItem";

const Footer = () => {
  return (
    <footer className="py-14 bg-[#F5F5F3] mt-36">
      <Container>
        <Flex className="flex  gap-36">
          <div>
            <h5
              className="capitalize font-bold font-secondary text-[#262626] text-base mb-4
            "
            >
              menu
            </h5>
            <NavItem className="font-secondary font-normal text-sm text-[#6D6D6D]">
              <List className="mb-2" itemName="Home" link="/" />
              <List className="mb-2" itemName="Shop" link="/shop" />
              <List className="mb-2" itemName="About" link="/about" />
              <List className="mb-2" itemName="Contact" link="/contact" />
              <List className="mb-2" itemName="Journal" link="/journal" />
            </NavItem>
          </div>
          <div>
            <h5
              className="capitalize font-bold font-secondary text-[#262626] text-base mb-4
            "
            >
              SHOP
            </h5>
            <NavItem className="font-secondary font-normal text-sm text-[#6D6D6D]">
              <List className="mb-2" itemName="Category 1" link="/Category" />
              <List className="mb-2" itemName="Category 1" link="/Category" />
              <List className="mb-2" itemName="Category 1" link="/Category" />
              <List className="mb-2" itemName="Category 1" link="/Category" />
              <List className="mb-2" itemName="Category 1" link="/Category" />
            </NavItem>
          </div>
          <div>
            <h5
              className="capitalize font-bold font-secondary text-[#262626] text-base mb-4
            "
            >
              HELP
            </h5>
            <NavItem className="font-secondary font-normal text-sm text-[#6D6D6D]">
              <List
                className="mb-2"
                itemName="Privacy Policy"
                link="/Privacy Policy"
              />
              <List
                className="mb-2"
                itemName="Terms & Conditions"
                link="/Terms & Conditions"
              />
              <List
                className="mb-2"
                itemName="Special E-shop"
                link="/Special E-shop"
              />
              <List className="mb-2" itemName="Shipping" link="/Shipping" />
              <List
                className="mb-2"
                itemName="Secure Payments"
                link="/Secure Payments"
              />
            </NavItem>
          </div>
          <div className="font-bold font-secondary text-[#262626] text-base">
            <h5>
              <a href="tel:+(052) 611-5711">(052) 611-5711</a>
            </h5>
            <h5>
              <a href="mailto:company@domain.com">company@domain.com</a>
            </h5>
            <h6 className="font-normal font-secondary text-[#6D6D6D] text-sm mt-4">
              575 Crescent Ave. Quakertown, PA 18951
            </h6>
          </div>
          <div>
            <Image imgSrc="assets/footer_logo.webp" imgAlt="footer_logo"/>
          </div>
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;
