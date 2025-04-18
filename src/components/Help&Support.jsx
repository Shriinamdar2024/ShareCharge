import React, { useState } from "react";
import { X } from "lucide-react";
import "animate.css";

const HelpAndSupport = ({ closePopup }) => {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert("Please enter a message before sending.");
      return;
    }
    const mailtoLink = `mailto:support@sharecharge.com?subject=Customer%20Support%20Query&body=${encodeURIComponent(
      message
    )}`;
    window.location.href = mailtoLink;
    setMessage(""); // Clear the message box after sending
  };

  const handleContactClick = () => {
    setShowContactOptions(true);
  };

  const handleCallClick = () => {
    window.location.href = "tel:+18001234567";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay with 60% opacity and blur */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={closePopup}
      ></div>

      {/* Popup Container */}
      <div className="relative bg-white bg-opacity-60 backdrop-blur-lg rounded-xl shadow-2xl z-50 w-full max-w-lg p-6 animate__animated animate__fadeInUp">
        {/* Close Button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-wide">
          Help & Support
        </h2>

        {/* Message Box */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Send a Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-3 border rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00b894] transition-all duration-300 transform hover:scale-105 shadow-lg"
            rows="4"
          ></textarea>
          <button
            onClick={handleSendMessage}
            className="mt-4 px-6 py-2 bg-[#00b894] text-white rounded-lg hover:bg-green-700 transition-transform duration-300 transform hover:scale-105"
          >
            Send Message
          </button>
        </div>

        {/* Contact Us Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleContactClick}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105"
          >
            Contact Us
          </button>
        </div>

        {/* Contact Options */}
        {showContactOptions && (
          <div className="mt-6 text-center space-y-4">
            <button
              onClick={() =>
                (window.location.href = "mailto:shriinamdar88@gmail.com")
              }
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-transform duration-300 transform hover:scale-105"
            >
              Email Us
            </button>
            <button
              onClick={handleCallClick}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-transform duration-300 transform hover:scale-105"
            >
              Call Customer Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpAndSupport;