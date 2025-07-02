import React from "react";
import { Link } from "react-router-dom";
import Container from "./layouts/Container";
import Flex from "./layouts/Flex";
import Product from "./layouts/Product";
import Title from "./layouts/Title";

const SpecialOffer = () => {
  return (
    <section>
      <Container>
        <Title title="Ofertas especiales" className="mb-10 text-[39px]" />
        <Flex className="flex items-center md:gap-10 flex-wrap gap-0 sm:justify-between lg:flex-nowrap justify-center">
          <div className="sm:max-w-[47%] mt-6 ">
            <Link>
              <Product
                src="./assets/apop1.jpg"
                badge={false}
                price="90.00"
                category="metal"
                productTitle="Pin Llama Oscura"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6 ">
            <Link>
              <Product
                src="./assets/apop2.jpg"
                badge={false}
                price="95.00"
                category="rock"
                productTitle="Pin Rueda de Fuego"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6 ">
            <Link>
              <Product
                src="./assets/apop4.jpg"
                badge={false}
                price="100.00"
                category="metal"
                productTitle="Pin Serpiente"
              />
            </Link>
          </div>
          <div className="sm:max-w-[47%] mt-6 ">
            <Link>
              <Product
                src="./assets/apop1.jpg"
                badge={false}
                price="110.00"
                category="rock"
                productTitle="Pin Gárgola"
              />
            </Link>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default SpecialOffer;
