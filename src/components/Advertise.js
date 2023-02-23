import React from "react";
import { Link } from "react-router-dom";
import Container from "./layouts/Container";
import Flex from "./layouts/Flex";
import Image from "./layouts/Image";

const Advertise = () => {
  return (
    <section className="lg:mt-[140px] mt-10">
      <Container>
        <Flex className="flex items-center gap-x-10">
          <div className="w-[50%]">
            <Link to="#">
              <Image
                className="block"
                imgSrc="./assets/add1.webp"
                imgAlt="add1"
              />
            </Link>
          </div>
          <div className="w-[45%] flex flex-col lg:gap-y-[80px] gap-y-8">
            <Link to="#">
              <Image
                className="inline-block"
                imgSrc="./assets/add2.webp"
                imgAlt="add1"
              />
            </Link>
            <Link to="#">
              <Image
                className="inline-block"
                imgSrc="./assets/add3.webp"
                imgAlt="add1"
              />
            </Link>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Advertise;
