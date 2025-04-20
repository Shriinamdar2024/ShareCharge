import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
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
import WalletPopup from "./components/WalletPopup";
import ChargingHistoryPopup from "./components/ChargingHistoryPopup"; // adjust path as needed
import MyBookings from "./components/MyBookings";
import HelpSupport from "./components/HelpSupport";
import MyTransactions from "./components/MyTransactions";
import CongratulationsPopup from "./components/CongratulationsPopup";
import ChargingProcess from './components/ChargingProcess';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/history" element={<ChargingHistoryPopup />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/payment-popup" element={<PaymentPopup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/vehicle" element={<VehiclePopup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/MyBookings" element={<MyBookings/>} />
        <Route path="/HelpSupport" element={<HelpSupport/>} />
        <Route path="/MyTransactions" element={<MyTransactions/>} />



      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
