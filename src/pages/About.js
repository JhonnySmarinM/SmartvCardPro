import React from "react";
import { Link } from "react-router-dom";
import AboutCard from "../components/AboutCard";
import Breadcrumbs from "../components/layouts/Breadcrumbs";
import Container from "../components/layouts/Container";
import Flex from "../components/layouts/Flex";
import Image from "../components/layouts/Image";

const About = () => {
  return (
    <section className="mt-[124px]">
      <Container>
        <Breadcrumbs
          link1="/"
          value1="home"
          link2="/about"
          value2={window.location.pathname.split("/")[1]}
        />
        <Flex className="flex items-center gap-x-5 mt-[147px]">
          <Link to="/ourbrands">
            <div>
              <Image
                className="inline-block w-full"
                imgSrc="./assets/about1.png"
                imgAlt="about2"
              />
            </div>
          </Link>
          <Link to="/products">
            <div>
              <Image
                className="inline-block w-full"
                imgSrc="./assets/about2.png"
                imgAlt="about1"
              />
            </div>
          </Link>
        </Flex>
        <p className="font-normal font-secondary text-[39px] mt-[128px] mb-[118px]">
          Orebi is one of the world’s leading ecommerce brands and is
          internationally recognized for celebrating the essence of classic
          Worldwide cool looking style.
        </p>
        <Flex className="flex gap-x-10">
          <AboutCard
            title="Our Vision"
            details="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an   printer took a galley of type and scrambled it to make a type specimen book."
          />
          <AboutCard
            title="Our Story"
            details="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic."
          />
          <AboutCard
            title="Our Brands"
            details="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley."
          />
        </Flex>
      </Container>
    </section>
  );
};

export default About;
