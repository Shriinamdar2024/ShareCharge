import React, { useState } from "react";
import { FaCreditCard, FaGooglePay, FaPhone, FaTimes } from "react-icons/fa";


const PaymentPopup = ({ closePayment, setBalance }) => {
  const [amount, setAmount] = useState("");

  const handlePayment = () => {
    if (amount && amount > 0) {
      setBalance((prev) => prev + parseInt(amount));
      closePayment();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Money</h2>
          <FaTimes className="cursor-pointer" onClick={closePayment} />
        </div>

        <input
          type="number"
          placeholder="Enter Amount"
          className="w-full mt-4 p-2 border rounded-lg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <h3 className="mt-4 font-semibold">Select Payment Method</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <button className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
            <FaGooglePay className="text-2xl" /> GPay
          </button>
          <button className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
            <FaPhone className="text-2xl" /> PhonePe
          </button>
          <button className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
            <FaCreditCard className="text-2xl" /> Card
          </button>
          <button className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
            <FaBank className="text-2xl" /> Net Banking
          </button>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white p-2 rounded-lg mt-4 hover:bg-green-600 transition"
        >
          Add ₹{amount}
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
