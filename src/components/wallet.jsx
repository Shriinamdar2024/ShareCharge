import React, { useState } from "react";
import { FaWallet, FaPlus, FaCreditCard, FaGooglePay, FaPhone } from "react-icons/fa";
import PaymentPopup from "./PaymentPopup"; // Payment Popup Component

const Wallet = () => {
  const [balance, setBalance] = useState(2450); // Example balance
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Wallet</h1>
        <p className="text-gray-600 mt-1">Manage your balance and add money easily.</p>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FaWallet className="text-4xl text-blue-500" />
          <div>
            <h2 className="text-lg font-semibold">Current Balance</h2>
            <p className="text-2xl font-bold">₹{balance}.00</p>
          </div>
        </div>
        <button
          onClick={() => setIsPaymentOpen(true)}
          className="bg-green-500 text-white px-5 py-2 rounded-lg flex items-center hover:bg-green-600 transition"
        >
          <FaPlus className="mr-2" /> Add Money
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction History</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-600">No recent transactions</p>
        </div>
      </div>

      {/* Payment Popup */}
      {isPaymentOpen && <PaymentPopup closePayment={() => setIsPaymentOpen(false)} setBalance={setBalance} />}
    </div>
  );
};

export default Wallet;
