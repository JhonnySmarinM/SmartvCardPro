import React from "react";
import { Link } from "react-router-dom";
import Container from "./layouts/Container";
import Flex from "./layouts/Flex";
import Product from "./layouts/Product";
import Title from "./layouts/Title";

const SpecialOffer = () => {
  return (
    <section >
      <Container>
        <Title title="Special Offers" className="mb-10" />
        <Flex className="flex items-center md:gap-10 flex-wrap gap-0 sm:justify-between lg:flex-nowrap justify-center">
          <div className="sm:max-w-[47%] mt-6 ">
            <Link>
              <Product
                src="./assets/special1.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6 ">
            <Link>
              <Product
                src="./assets/special2.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6 ">
            <Link>
              <Product
                src="./assets/special3.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6 ">
            <Link>
              <Product
                src="./assets/special4.webp"
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

export default SpecialOffer;
