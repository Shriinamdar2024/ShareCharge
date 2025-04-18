import React from "react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";  // Import icons from react-icons
import { HiLocationMarker, HiMail } from "react-icons/hi";  // Location and Email icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-[#1C1C1C] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-12 justify-between">
          
          {/* Left section with about text */}
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-3xl font-bold text-[#32CD32]">ShareCharge</h2>
            <p className="text-lg">
              ShareCharge brings all EV charging stations into a unified platform for easy and seamless charging experiences. Join us on the journey towards a sustainable future.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-6 mt-4">
              {/* Social Media Icons */}
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="text-white hover:text-[#32CD32] transition" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} className="text-white hover:text-[#32CD32] transition" />
              </a>
              <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} className="text-white hover:text-[#32CD32] transition" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} className="text-white hover:text-[#32CD32] transition" />
              </a>
            </div>
          </div>

          {/* Middle section with contact and details */}
          <div className="flex flex-col items-center space-y-4 md:items-start">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <div className="flex items-center text-sm space-x-3">
              <HiLocationMarker size={18} />
              <span className="text-gray-400">123, EV Street, Green City</span>
            </div>
            <div className="flex items-center text-sm space-x-3">
              <HiMail size={18} />
              <span className="text-gray-400">contact@sharecharge.com</span>
            </div>
          </div>

          {/* Right section with quick links */}
          <div className="flex flex-col items-center space-y-4 md:items-start">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/home" className="text-gray-400 hover:text-[#32CD32] transition">Home</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-[#32CD32] transition">About Us</a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-[#32CD32] transition">Services</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-[#32CD32] transition">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section for copyright */}
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>© 2025 ShareCharge, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
