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
        <Title title="Más vendidos" className="mb-10 text-[39px]" />
        <Flex className="flex items-center md:gap-10 flex-wrap gap-0 sm:justify-between lg:flex-nowrap justify-center">
          <div className="sm:max-w-[47%] mt-6">
            <Link>
              <Product
                src="./assets/apop1.jpg"
                badge={false}
                price="120.00"
                category="metal"
                productTitle="Pin Guitarra Skull"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6">
            <Link>
              <Product
                src="./assets/apop2.jpg"
                badge={false}
                price="110.00"
                category="rock"
                productTitle="Pin Mano Cornuta"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6">
            <Link>
              <Product
                src="./assets/apop4.jpg"
                badge={false}
                price="130.00"
                category="metal"
                productTitle="Pin Pentagrama"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6">
            <Link>
              <Product
                src="./assets/apop1.jpg"
                badge={false}
                price="125.00"
                category="rock"
                productTitle="Pin Calavera Tribal"
              />
            </Link>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Bestseller;
