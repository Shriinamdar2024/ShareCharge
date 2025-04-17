import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Wallet from "./components/wallet";
import PaymentForm from "./components/PaymentForm";
import AboutUs from "./components/AboutUs";
import PaymentPopup from "./components/PaymentPopup"; 
import Footer from "./components/Footer";
import MyAccountPopup from "./components/MyAccountPopup";
import BackgroundDesign from "./components/BackgroundDesign";
import VehiclePopup from "./components/VehiclePopup";
import HomeSlider from "./components/HomeSlider";
import Signup from "./components/singup";
import Login from "./components/login";
import AllBookingsDetail from "./components/allBookingsDetail";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/payment-popup" element={<PaymentPopup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/vehicle" element={<VehiclePopup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allBookingsDetail" element={<AllBookingsDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
