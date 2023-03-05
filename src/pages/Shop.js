import React, { useState } from "react";
import Breadcrumbs from "../components/layouts/Breadcrumbs";
import Container from "../components/layouts/Container";
import Flex from "../components/layouts/Flex";
import Option from "../components/layouts/Option";
import Pagination from "../components/layouts/Pagination";
import PaginationFilter from "../components/layouts/PaginationFilter";


const Shop = () => {
  const [pageShow, setPageShow] = useState(12);
  const handleChange = (e) => {
    setPageShow(+e.target.value);
  };
  return (
    <section className="mt-[124px]">
      <Container>
        <Breadcrumbs
          link1="/"
          value1="home"
          link2="/products"
          value2={window.location.pathname.split("/")[1]}
        />
        <Flex className="flex gap-x-10 mt-[130px]">
          <div className="bg-red-500 w-[25%]">asdasd</div>
          <div className=" w-[75%] relative">
            <div className="flex flex-col sm:flex-row sm:gap-x-10 sm:gap-y-0 gap-y-3 sm:mb-16 mb-3 font-secondary font-normal text-base text-[#767676] capitalize justify-end ">
              <PaginationFilter
                title="short by:"
                id="shortBy"
                className="w-[239]"
              >
                <Option option="featured" value="featured" />
                <Option option="price high to low" value="price high to low" />
                <Option option="price low to high" value="price low to high" />
              </PaginationFilter>
              <PaginationFilter
                title="show:"
                id="show"
                className="w-[139]"
                onChange={handleChange}
              >
                <Option option="12" value="12" selected="selected" />
                <Option option="24" value="24" />
                <Option option="48" value="48" />
              </PaginationFilter>
            </div>

            <Pagination itemsPerPage={pageShow} />
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Shop;
