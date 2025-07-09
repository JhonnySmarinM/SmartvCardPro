import React from "react";
import { Outlet } from "react-router-dom";
import Copyright from "../Copyright";
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
      <Copyright/>
    </>
  );
};

export default RootLayout;
