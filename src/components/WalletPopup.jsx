import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "../context/WalletContext";
import PaymentPopup from "./PaymentPopup"; // ✅ Import Payment Popup

const WalletPopup = ({ closeWallet }) => {
  const { balance } = useWallet();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false); // ✅ Track Payment Form state

  return (
    <>
      {/* Wallet Overlay */}
      <div 
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
        onClick={closeWallet}
      >
        <motion.div
          className="p-6 bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-lg relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
          <p className="text-4xl font-semibold mb-6">₹{balance}</p>

          {/* ✅ Add Money / Pay Button */}
          <button
            onClick={() => setIsPaymentOpen(true)} // ✅ Open Payment Form
            className="bg-yellow-500 text-black px-6 py-3 rounded-md hover:bg-yellow-600 transition-all w-full"
          >
            Add Money / Pay
          </button>

          {/* ❌ Close Button */}
          <button
            onClick={closeWallet}
            className="absolute top-2 right-2 text-white text-xl hover:text-gray-400"
          >
            ✖
          </button>
        </motion.div>
      </div>

      {/* ✅ Payment Form Popup */}
      {isPaymentOpen && <PaymentPopup closePayment={() => setIsPaymentOpen(false)} />}
    </>
  );
};

export default WalletPopup;
