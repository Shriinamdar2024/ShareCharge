import React from "react";
import BackgroundDesign from "./BackgroundDesign";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <BackgroundDesign />
      <Navbar />
      <main className="pt-20 px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
