import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navbar from "../Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Header/>
      <Outlet />
    </>
  );
};

export default RootLayout;
