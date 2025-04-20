  // components/Sidebar.jsx
  import { useState } from "react";
  import {
    X,
    UserCircle,
    History,
    Car,
    HelpCircle,
    CalendarCheck,
    Receipt,
    LogOut,
    ShieldCheck,
    Crown,
  } from "lucide-react";
  import { Link } from "react-router-dom";
  import VehiclePopup from "./VehiclePopup";
  import ChargingHistoryPopup from "./ChargingHistoryPopup";
  import MyBookings from "./MyBookings";
  import MyTransactions from "./MyTransactions";
  import PremiumPopup from "./PremiumPopup";
  import HelpSupport from "./HelpSupport";
  import { motion } from "framer-motion";


  const Sidebar = ({ isOpen, onClose, openAccount, isPremium, onPremiumUpdate }) => {
    const [isVehiclePopupOpen, setIsVehiclePopupOpen] = useState(false);
    const [isChargingPopupOpen, setIsChargingPopupOpen] = useState(false);
    const [isBookingsPopupOpen, setIsBookingsPopupOpen] = useState(false);
    const [isPremiumPopupOpen, setIsPremiumPopupOpen] = useState(false);
    const [isHelpSupport, setHelpSupport] = useState(false);

    const user = {
      name: "Shrirup Inamdar",
      profileImage: "/images/shriiiii.jpg",
    };

    // Vehicle Popup
    const openVehiclePopup = () => {
      onClose();
      setTimeout(() => setIsVehiclePopupOpen(true), 300);
    };
    const closeVehiclePopup = () => setIsVehiclePopupOpen(false);

    // Charging History Popup
    const openChargingPopup = () => {
      onClose();
      setTimeout(() => {
        setIsChargingPopupOpen(true);
      }, 300);
    };
    const closeChargingPopup = () => setIsChargingPopupOpen(false);

    // MyBookings Popup
    const openBookingsPopup = () => {
      onClose();
      setTimeout(() => setIsBookingsPopupOpen(true), 300);
    };
    const closeBookingsPopup = () => setIsBookingsPopupOpen(false);

    // Premium Popup
    const openPremiumPopup = () => {
      onClose();
      setTimeout(() => setIsPremiumPopupOpen(true), 300);
    };
    const closePremiumPopup = () => setIsPremiumPopupOpen(false);

    const openHelpSupport = () => {
      onClose();
      setTimeout(() => setHelpSupport(true), 300);
    };
    const closeHelpSupport = () => setHelpSupport(false);

    return (
      <>
        {/* Sidebar Panel */}
        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">User Profile</h2>
            <button onClick={onClose}>
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="p-6 text-center">
            <div className="relative group">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="relative"
              >
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className={`w-24 h-24 rounded-full mx-auto mb-2 shadow-md border-2 ${
                    isPremium ? "border-yellow-500" : "border-[#32CD32]"
                  }`}
                />
                {isPremium && (
                  <motion.div
                    className="absolute -top-2 -right-2"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-yellow-500 rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <Crown size={16} className="relative text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                    </div>
                  </motion.div>
                )}
                {isPremium && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(255, 215, 0, 0.4)",
                        "0 0 0 4px rgba(255, 215, 0, 0.4)",
                        "0 0 0 0 rgba(255, 215, 0, 0.4)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
            </div>
            <h3 className="text-base font-medium text-gray-700 mt-2">
              {user.name}
            </h3>
            {isPremium && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-1"
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-medium shadow-lg">
                  <Crown size={14} className="mr-1" />
                  Premium Member
                </div>
              </motion.div>
            )}
          </div>

          <div className="px-6 space-y-4">
            <button
              onClick={() => {
                onClose();
                openAccount();
              }}
              className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full"
            >
              <UserCircle size={18} />
              <span>My Account</span>
            </button>

            <button
              onClick={openChargingPopup}
              className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full"
            >
              <History size={18} />
              <span>Charging History</span>
            </button>

            <button
              onClick={openVehiclePopup}
              className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full"
            >
              <Car size={18} />
              <span>My Vehicle</span>
            </button>

            <button
              onClick={openBookingsPopup}
              className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full"
            >
              <CalendarCheck size={18} />
              <span>My Bookings</span>
            </button>

            <SidebarItem
              to="/HelpSupport"
              icon={<HelpCircle size={18} />}
              label="HelpSupport"
            />
            <SidebarItem
              to="/MyTransactions"
              icon={<Receipt size={18} />}
              label="My Transactions"
            />

            {!isPremium && (
              <button
                onClick={openPremiumPopup}
                className="flex items-center space-x-3 text-gray-700 hover:text-[#FFD700] transition w-full"
              >
                <ShieldCheck size={18} className="text-yellow-500" />
                <span className="font-semibold">Get Premium</span>
              </button>
            )}

            <hr className="border-t border-gray-300" />

            <SidebarItem
              to="/signin"
              icon={<ShieldCheck size={18} />}
              label="Sign In"
            />
            <SidebarItem
              to="/logout"
              icon={<LogOut size={18} />}
              label="Sign Out"
            />
          </div>
        </div>

        {/* Background Blur - closes sidebar + all popups */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
            onClick={() => {
              onClose();
              closeVehiclePopup();
              closeChargingPopup();
              closeBookingsPopup();
              closePremiumPopup();
              closeHelpSupport();
            }}
          ></div>
        )}

        {/* Popups */}
        {isVehiclePopupOpen && <VehiclePopup onClose={closeVehiclePopup} />}
        {isChargingPopupOpen && (
          <ChargingHistoryPopup onClose={closeChargingPopup} />
        )}
        {isBookingsPopupOpen && (
          <MyBookings closeBookings={closeBookingsPopup} />
        )}
        {isPremiumPopupOpen && (
          <PremiumPopup 
            onClose={closePremiumPopup} 
            onSuccess={onPremiumUpdate}
          />
        )}
         {isHelpSupport && (
          <HelpSupport onClose={closeHelpSupport} />
        )}
      </>
    );
  };

  const SidebarItem = ({ to, icon, label }) => (
    <Link
      to={to}
      className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );

  export default Sidebar;
