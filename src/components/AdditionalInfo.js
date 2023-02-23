import React from "react";
import Container from "./layouts/Container";
import Flex from "./layouts/Flex";
import { FaUndoAlt } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const AdditionalInfo = () => {
  return (
    <section className="border border-solid border-[#F2F2F2] sm:py-8 py-2 mt-[-5px]">
      <Container>
        <Flex className="flex items-center justify-between ">
          <div className="flex items-center sm:gap-4 gap-1 w-1/3 font-secondary font-normal text-[10px] sm:w-1/4 sm:text-base">
            <p>2</p>
            <h5>Two years warranty</h5>
          </div>
          <div className="flex items-center w-1/3  sm:w-1/4 sm:gap-4 gap-1 font-secondary font-normal text-[10px] sm:text-base">
            <p>
              <MdLocalShipping />
            </p>
            <h5>Free shipping</h5>
          </div>
          <div className="flex items-center w-1/3  sm:w-1/4 sm:gap-4  gap-1 font-secondary font-normal text-[10px] sm:text-base">
            <p>
              <FaUndoAlt />
            </p>
            <h5>Return policy in 30 days</h5>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default AdditionalInfo;
