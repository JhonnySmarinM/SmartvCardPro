import React, { useState, useEffect } from "react";
import Breadcrumbs from "../components/layouts/Breadcrumbs";
import Container from "../components/layouts/Container";
import Flex from "../components/layouts/Flex";
import Option from "../components/layouts/Option";
import Pagination from "../components/layouts/Pagination";
import PaginationFilter from "../components/layouts/PaginationFilter";
import LeftSideBar from "../components/LeftSideBar";
import { MdFilterAlt } from "react-icons/md";
import { RiFilterOffFill } from "react-icons/ri";
import { useRef } from "react";

const Shop = () => {
  const [pageShow, setPageShow] = useState(12);
  const [sideBarShow, setSideBarShow] = useState(true);
  const filterOnRef = useRef();
  const filterOffRef = useRef();

  const handleChange = (e) => {
    setPageShow(+e.target.value);
  };
  useEffect(() => {
    function resize() {
      if (window.innerWidth < 1024) {
        setSideBarShow(false);
      } else {
        setSideBarShow(true);
      }
    }
    resize();
    // window.addEventListener("resize", resize);
    // document.body.addEventListener("click", (e) => {
    //   if (filterOnRef.current.contains(e.target)) {
    //     setSideBarShow(true);
    //   } else {
    //     setSideBarShow(false);
    //   }
    //   // else if (e.target.parentElement == filterOffRef.current) {
    //   //   setSideBarShow(true);
    //   // }else{
    //   //   setSideBarShow(false);
    //   // }
    //   // if (e.target.parentElement == filterOffRef.current) {
    //   //   console.log("dfdf");
    //   // }
    // });
  }, [sideBarShow]);
  return (
    <section className="sm:mt-[124px] mt-[50px]">
      <Container>
        <Breadcrumbs
          link1="/"
          value1="inicio"
          link2="/{window.location.pathname.split('/')[1]}"
          value2={window.location.pathname.split("/")[1]}
        />
        <Flex className="flex gap-x-10 sm:mt-[130px] mt-[80px] relative">
          {sideBarShow && (
            <div
              className="w-full md:w-[25%] absolute top-0 left-0 z-50 md:static md:block bg-[#fcfcfc] p-2.5 md:bg-transparent"
              ref={filterOffRef}
            >
              <p
                className="flex items-center p-2.5 text-white bg-black md:hidden cursor-pointer mb-2"
                onClick={() => setSideBarShow(false)}
              >
                Cerrar Filtros <RiFilterOffFill />
              </p>
              <LeftSideBar />
            </div>
          )}
          <div className=" md:w-[75%] relative w-full">
            <div className="flex flex-col sm:flex-row sm:gap-x-10 sm:gap-y-0 gap-y-3 sm:mb-16 mb-3 font-secondary font-normal text-base text-[#767676] capitalize justify-end ">
              <p
                className="flex items-center p-2.5 text-white bg-black md:hidden cursor-pointer "
                onClick={() => setSideBarShow(true)}
                ref={filterOnRef}
              >
                Filtros <MdFilterAlt />
              </p>
              <PaginationFilter
                title="ordenar por:"
                id="shortBy"
                className="w-[239]"
              >
                <Option option="destacados" value="featured" />
                <Option option="precio mayor a menor" value="price high to low" />
                <Option option="precio menor a mayor" value="price low to high" />
              </PaginationFilter>
              <PaginationFilter
                title="mostrar:"
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
