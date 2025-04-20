// components/PremiumSubscriptionPopup.jsx
import { useState } from "react";
import { X, Crown } from "lucide-react";
import { motion } from "framer-motion";
import PaymentForm from "./PremiumPaymentForm";

const PremiumPopup = ({ onClose, onSuccess }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const handleProceedToPay = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);       // Hide payment form
    setShowCongrats(true);           // Show congratulations popup
    onSuccess?.();                   // Trigger profile icon update

    setTimeout(() => {
      setShowCongrats(false);       // Hide congratulations popup
      onClose();                    // Close main PremiumPopup
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
      {showCongrats ? (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-2xl text-center relative"
        >
          <h2 className="text-2xl font-bold text-yellow-600 mb-2">🎉 Congratulations!</h2>
          <p className="text-gray-700">You are now a Premium member.</p>
        </motion.div>
      ) : showPaymentForm ? (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          className="bg-white rounded-2xl p-6 w-[90%] max-w-lg shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
            Premium Payment - ₹299
          </h2>
          <PaymentForm amount={299} showAmount={true} onSuccess={handlePaymentSuccess} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="flex justify-center items-center text-yellow-500 mb-4">
              <Crown size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Go Premium</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Unlock exclusive features and priority access to EV charging stations.
            </p>

            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-4">
              <p className="text-sm font-medium">Premium Plan: ₹299/month</p>
            </div>

            <button
              onClick={handleProceedToPay}
              className="w-full bg-yellow-500 text-white py-2 rounded-full hover:bg-yellow-600 transition font-semibold"
            >
              Get Premium Now
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PremiumPopup;
