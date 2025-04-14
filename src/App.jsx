import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Wallet from "./components/Wallet";
import PaymentForm from "./components/PaymentForm";
import AboutUs from "./components/AboutUs";
import PaymentPopup from "./components/PaymentPopup"; 
import Footer from "./components/Footer";
import MyAccountPopup from "./components/MyAccountPopup";
import BackgroundDesign from "./components/BackgroundDesign";

import HomeSlider from "./components/HomeSlider";






function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/wallet" element={<Wallet />} />

        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/payment" element={<PaymentPopup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
