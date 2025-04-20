import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, LogIn, User, Crown } from "lucide-react";
import WalletPopup from "./WalletPopup";
import MyAccountPopup from "./MyAccountPopup";
import Sidebar from "./Sidebar";
import { checkSession, logout } from "../auth/user"; // 👈 import session checker
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMyAccountOpen, setIsMyAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 state to track login
  const [isPremium, setIsPremium] = useState(false); // New state for premium status

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Check if user is logged in
  useEffect(() => {
    const verify = async () => {
      // console.log("verify in navbar");
      try {
        const status = await checkSession();
        setIsLoggedIn(status);
        console.log(status,"status in navbar");
        // Check premium status from localStorage or your backend
        const premiumStatus = localStorage.getItem('isPremium') === 'true';
        setIsPremium(premiumStatus);
      } catch (err) {
        console.error("Session check failed");
      }
    };

    verify();
  }, []);

  // 👇 Logout handler
  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
    setIsPremium(false);
    navigate("/login");
  };

  // Function to update premium status
  const handlePremiumUpdate = () => {
    setIsPremium(true);
    localStorage.setItem('isPremium', 'true');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#32CD32]/60 backdrop-blur-lg shadow-md" : "bg-[#32CD32]"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold tracking-wide" style={{ textShadow: "0 0 10px #32CD32" }}>
            ⚡ ShareCharge
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/home" className="text-white hover:text-black transition">Home</Link>
            <Link to="/about" className="text-white hover:text-black transition">About</Link>

            {/* 👇 Show Logout if logged in, else Signup */}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-white hover:text-black transition">Logout</button>
            ) : (
              <Link to="/signup" className="text-white hover:text-black transition">Signup</Link>
            )}
          </div>

          <div className="flex space-x-4 text-white">
            <button onClick={() => setIsWalletOpen(true)} className="hover:text-black transition">
              <Wallet size={24} />
            </button>

            {/* Login icon shown only if not logged in */}
            {!isLoggedIn && (
              <Link to="/login" className="hover:text-black transition">
                <LogIn size={24} />
              </Link>
            )}

            <motion.button 
              onClick={() => setIsSidebarOpen(true)} 
              className="hover:text-black transition relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPremium ? (
                <div className="relative group">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="relative"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <User size={24} className="relative text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(255, 215, 0, 0.4)",
                          "0 0 0 4px rgba(255, 215, 0, 0.4)",
                          "0 0 0 8px rgba(255, 215, 0, 0.2)",
                          "0 0 0 0 rgba(255, 215, 0, 0.4)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-500"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              ) : (
                <User size={24} />
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Popups */}
      {isWalletOpen && <WalletPopup closeWallet={() => setIsWalletOpen(false)} />}
      {isMyAccountOpen && <MyAccountPopup onClose={() => setIsMyAccountOpen(false)} />}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        openAccount={() => {
          setIsMyAccountOpen(true);
          setIsSidebarOpen(false);
        }}
        isPremium={isPremium}
        onPremiumUpdate={handlePremiumUpdate}
      />
    </>
  );
};

export default Navbar;
