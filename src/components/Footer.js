import React from "react";
import Container from "./layouts/Container";
import Flex from "./layouts/Flex";
import Image from "./layouts/Image";
import List from "./layouts/List";
import NavItem from "./layouts/NavItem";

const Footer = () => {
  return (
    <footer className="py-14 bg-fondo text-texto sm:mt-36 mt-28">
      <Container>
        <Flex className="flex flex-wrap gap-8 lg:gap-36">
          <div>
            <h5
              className="capitalize font-bold font-secondary text-[#262626] text-base mb-4
            "
            >
              menú
            </h5>
            <NavItem className="font-secondary font-normal text-sm text-[#6D6D6D]">
              <List className="mb-2" itemName="Home" link="/" />
              <List className="mb-2" itemName="Tienda" link="/products" />
              <List className="mb-2" itemName="Sobre nosotros" link="/about" />
              <List className="mb-2" itemName="Contacto" link="/contact" />
              <List className="mb-2" itemName="Blog" link="/journal" />
            </NavItem>
          </div>
          <div>
            <h5
              className="capitalize font-bold font-secondary text-[#262626] text-base mb-4
            "
            >
              TIENDA
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
              AYUDA
            </h5>
            <NavItem className="font-secondary font-normal text-sm text-[#6D6D6D]">
              <List
                className="mb-2"
                itemName="Política de Privacidad"
                link="/Privacy Policy"
              />
              <List
                className="mb-2"
                itemName="Términos y Condiciones"
                link="/Terms & Conditions"
              />
              <List
                className="mb-2"
                itemName="Tienda Especial"
                link="/Special E-shop"
              />
              <List className="mb-2" itemName="Envíos" link="/Shipping" />
              <List className="mb-2" itemName="Pagos Seguros" link="/Secure Payments" />
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
            <Image imgSrc="assets/logo.webp" imgAlt="logo apopttosis" className="w-20 h-auto max-h-14 mx-auto"/>
          </div>
        </Flex>
      </Container>
    </footer>
  );
};

export default Footer;
