import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Navbar from "../Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default RootLayout;
