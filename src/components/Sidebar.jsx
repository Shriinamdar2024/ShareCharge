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
} from "lucide-react";
import { Link } from "react-router-dom";
import VehiclePopup from "./VehiclePopup";
import ChargingHistoryPopup from "./ChargingHistoryPopup"; // Import the popup
import MyBookings from "./MyBookings"; // Import MyBookings Popup
import MyTransactions from "./MyTransactions"; // Adjust the path if necessary
const Sidebar = ({ isOpen, onClose, openAccount }) => {
  const [isVehiclePopupOpen, setIsVehiclePopupOpen] = useState(false);
  const [isChargingPopupOpen, setIsChargingPopupOpen] = useState(false);
  const [isBookingsPopupOpen, setIsBookingsPopupOpen] = useState(false); // New state for MyBookings popup

  const user = {
    name: "Shrirup Inamdar",
    profileImage: "/images/shriiiii.jpg",
  };

  // --- Vehicle Popup Handlers ---
  const openVehiclePopup = () => {
    setIsVehiclePopupOpen(true);
  };

  const closeVehiclePopup = () => {
    setIsVehiclePopupOpen(false);
  };

  // --- Charging History Popup Handlers ---
  const openChargingPopup = () => {
    // Reset the state before reopening
    setIsChargingPopupOpen(false);
    setTimeout(() => {
      setIsChargingPopupOpen(true);
    }, 50); // Slight delay to force re-render
  };

  const closeChargingPopup = () => {
    setIsChargingPopupOpen(false);
  };

  // --- MyBookings Popup Handlers ---
  const openBookingsPopup = () => {
    setIsBookingsPopupOpen(true);
  };

  const closeBookingsPopup = () => {
    setIsBookingsPopupOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
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
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-2 shadow-md border-2 border-[#32CD32]"
          />
          <h3 className="text-base font-medium text-gray-700 mt-2">
            {user.name}
          </h3>
        </div>

        <div className="px-6 space-y-4">
          <button
            onClick={openAccount}
            className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full"
          >
            <UserCircle size={18} />
            <span>My Account</span>
          </button>

          {/* Open Charging History Popup */}
          <button
            onClick={openChargingPopup}
            className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full"
          >
            <History size={18} />
            <span>Charging History</span>
          </button>

          {/* Open Vehicle Popup */}
          <button
            onClick={openVehiclePopup}
            className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full"
          >
            <Car size={18} />
            <span>My Vehicle</span>
          </button>

          {/* Open My Bookings Popup */}
          <button
            onClick={openBookingsPopup} // This triggers the popup
            className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full"
          >
            <CalendarCheck size={18} />
            <span>My Bookings</span>
          </button>

          <SidebarItem
            to="/Help&Support"
            icon={<HelpCircle size={18} />}
            label="Help & Support"
          />
          <SidebarItem
            to="/MyTransactions"
            icon={<Receipt size={18} />}
            label="My Transactions"
          />
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

      {/* Background blur overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => {
            onClose();
            closeVehiclePopup();
            closeChargingPopup();
            closeBookingsPopup(); // Close bookings popup if background is clicked
          }}
        ></div>
      )}

      {/* Popups rendered independently */}
      {isVehiclePopupOpen && <VehiclePopup onClose={closeVehiclePopup} />}
      {isChargingPopupOpen && (
        <ChargingHistoryPopup onClose={closeChargingPopup} />
      )}
      {isBookingsPopupOpen && (
        <MyBookings closeBookings={closeBookingsPopup} /> // Render the MyBookings Popup
      )}
    </>
  );
};

// Sidebar navigation item
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
