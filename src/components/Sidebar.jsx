// components/Sidebar.jsx
import { useState } from "react";
import { X, UserCircle, History, Car, HelpCircle, CalendarCheck, Receipt, LogOut, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import VehiclePopup from "./VehiclePopup"; // Make sure the path is correct

const Sidebar = ({ isOpen, onClose, openAccount }) => {
  const [isVehiclePopupOpen, setIsVehiclePopupOpen] = useState(false);

  const user = {
    name: "Shrirup Inamdar",
    profileImage: "/images/shriiiii.jpg",
  };

  // Function to open the vehicle popup
  const openVehiclePopup = () => {
    setIsVehiclePopupOpen(true);
  };

  // Function to close the vehicle popup
  const closeVehiclePopup = () => {
    setIsVehiclePopupOpen(false);
  };

  return (
    <>
      <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">User Profile</h2>
          <button onClick={onClose}><X size={20} className="text-gray-600" /></button>
        </div>

        <div className="p-6 text-center">
          <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-2 shadow-md border-2 border-[#32CD32]" />
          <h3 className="text-base font-medium text-gray-700 mt-2">{user.name}</h3>
        </div>

        <div className="px-6 space-y-4">
          <button onClick={openAccount} className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full">
            <UserCircle size={18} /><span>My Account</span>
          </button>

          <SidebarItem to="/history" icon={<History size={18} />} label="Charging History" />

          <button
            onClick={openVehiclePopup}  // Trigger to open vehicle popup
            className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition w-full"
          >
            <Car size={18} />
            <span>My Vehicle</span>
          </button>

          <SidebarItem to="/support" icon={<HelpCircle size={18} />} label="Help & Support" />
          <SidebarItem to="/allBookingsDetail" icon={<CalendarCheck size={18} />} label="My Bookings" />
          <SidebarItem to="/transactions" icon={<Receipt size={18} />} label="My Transactions" />
          <hr className="border-t border-gray-300" />
          <SidebarItem to="/signin" icon={<ShieldCheck size={18} />} label="Sign In" />
          <SidebarItem to="/logout" icon={<LogOut size={18} />} label="Sign Out" />
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40" onClick={onClose}></div>}

      {isVehiclePopupOpen && (
        <VehiclePopup onClose={closeVehiclePopup} />
      )}
    </>
  );
};

const SidebarItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center space-x-3 text-gray-700 hover:text-[#32CD32] transition">
    <span>{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Sidebar;
