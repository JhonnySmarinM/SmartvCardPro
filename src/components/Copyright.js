import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "./layouts/Container";
import Flex from "./layouts/Flex";

const Copyright = () => {
  const [date, setDate] = useState();

  const getYear = () => setDate(new Date().getFullYear());

  useEffect(() => {
    getYear();
  }, []);

  return (
    <section className="bg-[#F5F5F3]">
      <Container>
        <Flex className="flex items-center justify-center sm:justify-between sm:flex-row flex-col">
          <div className="flex gap-6  text-[#262626] text-2xl">
            <Link to="/">
              <FaFacebookF />
            </Link>
            <Link to="/">
              <FaLinkedinIn />
            </Link>
            <Link to="/">
              <FaInstagram />
            </Link>
          </div>
          <div>
            <h6 className="font-secondary sm:text-sm font-normal text-[#6D6D6D] text-[12px] sm:mt-0 mt-2 ">
              {date} apopttosis - Pines de madera inspirados en metal y rock
            </h6>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Copyright;
