import { X } from "lucide-react";
import { useState } from "react";

const MyAccountPopup = ({ onClose }) => {
  const [userInfo, setUserInfo] = useState({
    profilePhoto: "",
    fullName: "John Doe",
    email: "john@example.com",
    mobile: "9876543210",
    pincode: "411001",
    vehicleCategory: {
      bike: true,
      car: false
    }
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (vehicle) => {
    setUserInfo((prev) => ({
      ...prev,
      vehicleCategory: {
        ...prev.vehicleCategory,
        [vehicle]: !prev.vehicleCategory[vehicle]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Info:", userInfo);
    onClose(); // You can remove this if you want to keep popup open after save
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Main Popup */}
      <div className="relative bg-white bg-opacity-60 backdrop-blur-lg rounded-xl shadow-2xl z-50 w-full max-w-lg p-4 animate__animated animate__fadeInUp">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black transition-all duration-300 transform hover:scale-110"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">My Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          {/* Profile Photo */}
          <div className="text-center mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  profilePhoto: URL.createObjectURL(e.target.files[0]),
                })
              }
              className="hidden"
              id="profile-upload"
            />
            <label htmlFor="profile-upload" className="cursor-pointer inline-block">
              <img
                src={userInfo.profilePhoto || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-20 h-20 mx-auto rounded-full object-cover border-4 border-green-400 shadow-lg transition-all duration-300 transform hover:scale-110"
              />
              <p className="text-sm text-blue-600 mt-2 hover:underline">Change Photo</p>
            </label>
          </div>

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            value={userInfo.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-300 transform hover:scale-105"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-300 transform hover:scale-105"
            required
          />

          {/* Mobile */}
          <input
            type="text"
            name="mobile"
            value={userInfo.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-300 transform hover:scale-105"
            required
          />

          {/* Pincode */}
          <input
            type="text"
            name="pincode"
            value={userInfo.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md transition-all duration-300 transform hover:scale-105"
            required
          />

          {/* Vehicle Category */}
          <div>
            <label className="font-semibold block mb-2 text-gray-700">Vehicle Category</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center transition-all duration-300 transform hover:scale-110">
                <input
                  type="checkbox"
                  checked={           userInfo.vehicleCategory.bike}
                  onChange={() => handleCheckbox("bike")}
                  className="mr-2 transition-all duration-300 transform hover:scale-110"
                />
                Bike
              </label>
              <label className="inline-flex items-center transition-all duration-300 transform hover:scale-110">
                <input
                  type="checkbox"
                  checked={userInfo.vehicleCategory.car}
                  onChange={() => handleCheckbox("car")}
                  className="mr-2 transition-all duration-300 transform hover:scale-110"
                />
                Car
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#32CD32] hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccountPopup;
