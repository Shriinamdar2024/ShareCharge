import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, LogIn, User } from "lucide-react";
import WalletPopup from "./WalletPopup";
import MyAccountPopup from "./MyAccountPopup";
import Sidebar from "./Sidebar";
import { checkSession,logout } from "../auth/user"; // 👈 import session checker

const Navbar = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMyAccountOpen, setIsMyAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 state to track login

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
    navigate("/login");
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
            <Link to="/contact" className="text-white hover:text-black transition">Contact</Link>

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

            <button onClick={() => setIsSidebarOpen(true)} className="hover:text-black transition">
              <User size={24} />
            </button>
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
      />
    </>
  );
};

export default Navbar;
