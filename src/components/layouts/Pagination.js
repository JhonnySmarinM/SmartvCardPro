import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Flex from "./Flex";
import Product from "./Product";
// Example items, to simulate fetching from another resources.
const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,32,33,34,35,36,37,38,39,40
];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div className=" w-full mt-5 lg:mt-0 lg:max-w-[30%] first:mt-0">
            <Link>
              <Product
                key={index}
                src="./assets/product5.webp"
                badge={false}
                price="44.00"
                category="black"
                productTitle="Basic Crew Neck Tee"
              />
            </Link>
          </div>
        ))}
    </>
  );
}
const Pagination = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [lastSelected, setLastSelected] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
      // console.log(pageCount - 1);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setLastSelected(event.selected === pageCount - 1);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Flex className="sm:flex sm:items-center sm:flex-wrap sm:gap-x-[35px] sm:gap-y-5 xl:gap-x-12">
        <Items currentItems={currentItems} />
      </Flex>
      <ReactPaginate
        breakLabel="..."
        breakClassName="flex items-end"
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel=""
        renderOnZeroPageCount={null}
        pageClassName="border border-solid border-[#F0F0F0]  py-2 px-3.5 text-[#767676] font-secondary font-normal text-sm"
        pageLinkClassName="page-item"
        previousClassName="hidden"
        nextClassName="hidden"
        containerClassName="flex gap-x-4 mt-12 flex-wrap gap-y-4 "
        activeClassName="bg-black text-white border-[#000]"
      />

      <p className="lg:absolute mt-3 lg:mt-3text-[#767676] font-secondary font-normal text-sm bottom-2 right-0">
        Products from {itemOffset === 0 ? 1 : itemOffset} to{" "}
        {lastSelected ? items.length : endOffset} of {items.length}
      </p>
    </>
  );
};

export default Pagination;
