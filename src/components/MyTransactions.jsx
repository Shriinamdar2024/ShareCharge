import React, { useState } from "react";
import { X } from "lucide-react";
import noTransactionsImage from "/images/notransactions.png";

const MyTransactions = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("wallet");

  // Sample transactions data
  const walletTransactions = [];
  const evTransactions = [];
  const transactionsToShow =
    activeTab === "wallet" ? walletTransactions : evTransactions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 relative animate-slideInUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">My Transactions</h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("wallet")}
            className={`px-4 py-2 rounded-full font-medium ${
              activeTab === "wallet" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Wallet Transactions
          </button>
          <button
            onClick={() => setActiveTab("ev")}
            className={`px-4 py-2 rounded-full font-medium ${
              activeTab === "ev" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            EV Transactions
          </button>
        </div>

        {transactionsToShow.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
            <img src={noTransactionsImage} alt="No transactions" className="w-48 h-48 mb-4 opacity-80" />
            <p className="text-lg font-medium">
              No {activeTab === "wallet" ? "wallet" : "EV"} transactions yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto px-2">
            {transactionsToShow.map((txn, index) => (
              <div key={index} className="border border-gray-300 p-4 rounded-xl shadow bg-gray-50">
                <p className="text-gray-800 font-medium">
                  Transaction ID: <span className="font-normal">{txn.id}</span>
                </p>
                <p className="text-gray-800">Amount: ₹{txn.amount}</p>
                <p className="text-gray-600 text-sm">Date: {txn.date}</p>
                <p className="text-gray-600 text-sm">Time: {txn.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTransactions;
