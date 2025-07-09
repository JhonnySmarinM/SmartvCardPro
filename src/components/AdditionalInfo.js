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
            <p>🎸</p>
            <h5>Garantía de calidad en cada pin</h5>
          </div>
          <div className="flex items-center w-1/3  sm:w-1/4 sm:gap-4 gap-1 font-secondary font-normal text-[10px] sm:text-base">
            <p>
              <MdLocalShipping />
            </p>
            <h5>Envío gratis en pedidos seleccionados</h5>
          </div>
          <div className="flex items-center w-1/3  sm:w-1/4 sm:gap-4  gap-1 font-secondary font-normal text-[10px] sm:text-base">
            <p>
              <FaUndoAlt />
            </p>
            <h5>Devoluciones fáciles en 30 días</h5>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default AdditionalInfo;
