import React, { useEffect } from "react";
import "react-slideshow-image/dist/styles.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import HomeFeature from "../../Components/HomeFeature";
import Partners from "../../Components/Partners";
import FeatureProduct from "../../Components/FeatureProduct";
import Stats from "../../Components/Stats";

const Dashboard = () => {
  // for authentication
  useEffect(() => {
    const authentication = localStorage.getItem("token");
    if (!authentication) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div>
        <Navbar />
        <HomeFeature />
        <Partners />
        <FeatureProduct />
        <Stats />
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
