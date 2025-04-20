// components/CongratulationsPopup.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Crown, Sparkles } from 'lucide-react';

const CongratulationsPopup = () => {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.6, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Main Content Container */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 w-[90%] max-w-md shadow-2xl text-center relative overflow-hidden">
        {/* Floating Crown */}
        <motion.div
          initial={{ y: -50, rotate: -15 }}
          animate={{ 
            y: [-50, -30, -50],
            rotate: [-15, 15, -15],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute -top-10 left-1/2 transform -translate-x-1/2"
        >
          <Crown size={60} className="text-yellow-500" />
        </motion.div>

        {/* Lightning Bolt Animation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: [0, 1, 0.5, 1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="flex justify-center mb-6"
        >
          <Zap size={48} className="text-yellow-500" />
        </motion.div>

        {/* Dynamic Sparkles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, Math.random() * 20 - 10],
                y: [0, Math.random() * 20 - 10],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative z-10"
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-800 mb-4"
            animate={{
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 0 10px rgba(255,215,0,0.5)",
                "0 0 0px rgba(0,0,0,0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Congratulations! 🎉
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Welcome to Premium Features
          </motion.p>
          
          <motion.p 
            className="text-gray-600"
            animate={{
              color: ["#4B5563", "#F59E0B", "#4B5563"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            You now have access to all premium features on ShareCharge
          </motion.p>

          {/* Floating Sparkles Icon */}
          <motion.div
            className="mt-6"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles size={32} className="text-yellow-500 mx-auto" />
          </motion.div>
      </motion.div>
    </div>
    </motion.div>
  );
};

export default CongratulationsPopup;
