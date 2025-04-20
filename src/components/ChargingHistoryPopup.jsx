import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "animate.css";

const ChargingHistoryPopup = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [isOpen, setIsOpen] = useState(true);

  const noSessionsImageUrl = "images/nosession.png"; // Replace with your image path

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with 60% opacity and blur */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={closePopup}
      ></div>

      {/* Popup Container */}
      <div className="relative bg-white bg-opacity-60 backdrop-blur-lg rounded-xl shadow-2xl z-50 w-full max-w-lg p-4 animate__animated animate__fadeInUp">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-wide">
          Charging Sessions
        </h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          {["ongoing", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-lg font-medium rounded-full shadow-inner transition-all duration-300 ease-in-out focus:outline-none ${
                activeTab === tab
                  ? "bg-[#00b894] text-white scale-105 shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* No Sessions Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center px-6"
          >
            <motion.img
              src={noSessionsImageUrl}
              alt="No Sessions"
              className="w-44 h-auto mx-auto mb-4 animate-bounce-slow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <p className="text-gray-600 text-lg">
              {activeTab === "ongoing"
                ? "No ongoing sessions found."
                : "No completed sessions found."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChargingHistoryPopup;
  