import React from "react";
import AdditionalInfo from "../components/AdditionalInfo";
import Advertise from "../components/Advertise";
import Banner from "../components/Banner";
import Bestseller from "../components/Bestseller";
import NewArrival from "../components/NewArrival";

const Home = () => {
  return (
   <>
     <Banner />
     <AdditionalInfo/>
     <Advertise/>
     <NewArrival/>
     <Bestseller/>
   </>
  )
};

export default Home;
