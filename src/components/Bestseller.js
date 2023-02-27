import React from "react";
import { Link } from "react-router-dom";
import Container from "./layouts/Container";
import Flex from "./layouts/Flex";
import Product from "./layouts/Product";
import Title from "./layouts/Title";

const Bestseller = () => {
  return (
    <section className="mt-[118px]">
      <Container>
        <Title title="Our Bestsellers" className="mb-10 text-[39px]" />
        <Flex className="flex items-center md:gap-10 flex-wrap gap-0 sm:justify-between lg:flex-nowrap justify-center">
          <div className="sm:max-w-[47%] mt-6">
            <Link>
              <Product
                src="./assets/product5.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6">
            <Link>
              <Product
                src="./assets/product6.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6">
            <Link>
              <Product
                src="./assets/product7.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6">
            <Link>
              <Product
                src="./assets/product8.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Bestseller;
