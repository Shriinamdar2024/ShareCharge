import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentForm = ({ amount, showAmount = true, onSuccess }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
      if (formattedValue.length > 19) return; // 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (value.length > 5) return;
    }

    // Limit CVV to 3 digits
    if (name === 'cvv' && value.length > 3) return;

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {showAmount && (
        <motion.div
          className="text-center mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-3xl font-bold text-[#00b894]"
            animate={{
              textShadow: [
                "0 0 0px rgba(0,184,148,0)",
                "0 0 10px rgba(0,184,148,0.5)",
                "0 0 0px rgba(0,184,148,0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ₹{amount}
          </motion.div>
          <div className="text-sm text-gray-600 mt-1">Premium Membership</div>
        </motion.div>
      )}

      <div className="space-y-4">
        <motion.div
          className="relative"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b894] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
              required
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Holder Name
          </label>
          <input
            type="text"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b894] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
            required
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            className="relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <div className="relative">
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b894] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <div className="relative">
              <input
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00b894] focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                required
                maxLength="3"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>
          </motion.div>
        </div>
            </div>

      <motion.button
        type="submit"
        className="w-full bg-[#00b894] text-white py-3 rounded-lg hover:bg-[#00a382] transition-all duration-300 font-medium relative overflow-hidden group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <motion.div
            className="flex items-center justify-center text-white"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Processing...
        </motion.div>
        ) : (
          <>
            <span className="relative z-10">Pay ₹{amount}</span>
            <motion.div
              className="absolute inset-0 bg-[#00a382]"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}
      </motion.button>

      <motion.div 
        className="text-center text-sm text-gray-600 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Lock className="inline-block w-4 h-4 mr-1 text-gray-500" />
        Your payment information is secure and encrypted
      </motion.div>
    </motion.form>
  );
};

export default PaymentForm;