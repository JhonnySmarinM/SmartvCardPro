import React from "react";
import Breadcrumbs from "../components/layouts/Breadcrumbs";
import Button from "../components/layouts/Button";
import Container from "../components/layouts/Container";
import InputField from "../components/layouts/InputField";
import Title from "../components/layouts/Title";

const Contact = () => {
  return (
    <section className="lg:mt-[124px] mt-[50px]">
      <Container>
        <Breadcrumbs
          link1="/"
          value1="home"
          link2="/{window.location.pathname.split('/')[1]}"
          value2={window.location.pathname.split("/")[1]}
        />
        <div className="mt-[125px]">
          <Title className="text-[39px] mb-11" title="Fill up a Form" />
          <InputField
            as="input"
            placeholder="Your name here"
            label="name"
            type="text"
          />
          <InputField
            as="input"
            placeholder="Your email here"
            label="email"
            type="email"
          />
          <InputField
            as="textarea"
            placeholder="Your Message here"
            label="Message"
            className="pb-20 resize-none "
          />
          <Button
            link="/viewcart"
            linkName="post"
            className="px-[85px] py-4 text-sm font-bold capitalize bg-[#262626]  font-secondary text-white"
          />
        </div>
      </Container>
    </section>
  );
};

export default Contact;
