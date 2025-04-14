import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "../context/WalletContext";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ closePayment }) => {
  const { balance, addFunds } = useWallet();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [amount, setAmount] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!amount || amount <= 0) {
      setMessage("⚠️ Please enter a valid amount.");
      return;
    }

    if (!paymentDetails.trim()) {
      setMessage("⚠️ Please enter valid payment details.");
      return;
    }

    setLoading(true);
    setMessage("⏳ Processing Payment...");

    setTimeout(() => {
      addFunds(parseInt(amount));
      setMessage("✅ Payment Successful! Redirecting...");
      setLoading(false);

      setTimeout(() => {
        closePayment(); // ✅ Close Payment Popup
        navigate("/wallet"); // ✅ Redirect to Wallet after success
      }, 1500);
    }, 3000);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
      onClick={closePayment} // ✅ Close when clicking outside
    >
      <motion.div
        className="p-6 bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-lg relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={(e) => e.stopPropagation()} // ✅ Prevent closing when clicking inside
      >
        <h2 className="text-2xl font-bold mb-4">Add Money</h2>

        {/* Amount Input */}
        <label className="block mb-2">Enter Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-4 rounded-md text-black"
          placeholder="Enter amount"
        />

        {/* Payment Method Dropdown */}
        <label className="block mb-2">Select Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 mb-4 rounded-md text-black"
        >
          <option value="UPI">UPI (Google Pay, PhonePe, Paytm)</option>
          <option value="CreditCard">Credit Card</option>
          <option value="DebitCard">Debit Card</option>
          <option value="NetBanking">Internet Banking</option>
        </select>

        {/* Payment Details */}
        {paymentMethod === "UPI" && (
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            className="w-full p-2 mb-4 rounded-md text-black"
          />
        )}
        {["CreditCard", "DebitCard"].includes(paymentMethod) && (
          <>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 mb-2 rounded-md text-black"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="w-full p-2 mb-2 rounded-md text-black"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full p-2 mb-4 rounded-md text-black"
            />
          </>
        )}
        {paymentMethod === "NetBanking" && (
          <input
            type="text"
            placeholder="Enter Bank Name"
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            className="w-full p-2 mb-4 rounded-md text-black"
          />
        )}

        {/* Display Message */}
        {message && <p className="text-yellow-400 mb-4">{message}</p>}

        {/* Loading Animation */}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={closePayment} // ✅ Close on Cancel
            className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className="bg-green-500 px-6 py-2 rounded-md hover:bg-green-600 transition-all"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentForm;
