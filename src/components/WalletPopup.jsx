import { useState } from "react";
import { motion } from "framer-motion";
import { useWallet } from "../context/WalletContext";
import PaymentForm from "./PaymentForm";

const WalletPopup = ({ closeWallet }) => {
  const { balance } = useWallet();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      {!isPaymentOpen ? (
        <motion.div
          className="p-6 bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-lg relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
          <p className="text-4xl font-semibold mb-6">₹{balance}</p>

          <button
            onClick={() => setIsPaymentOpen(true)}
            className="bg-yellow-500 text-black px-6 py-3 rounded-md hover:bg-yellow-600 transition-all w-full"
          >
            Add Money / Pay
          </button>

          <button
            onClick={closeWallet}
            className="absolute top-2 right-2 text-white text-xl hover:text-gray-400"
          >
            ✖
          </button>
        </motion.div>
      ) : (
        <PaymentForm
          closePayment={() => {
            setIsPaymentOpen(false); // Close Payment
            // Wallet popup remains open
          }}
        />
      )}
    </div>
  );
};

export default WalletPopup;
