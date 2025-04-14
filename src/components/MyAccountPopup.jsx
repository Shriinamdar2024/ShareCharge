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
      <div className="relative bg-white rounded-xl shadow-2xl z-50 w-full max-w-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">My Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          {/* Profile Photo */}
          <div className="text-center">
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
                className="w-24 h-24 mx-auto rounded-full object-cover border shadow"
              />
              <p className="text-sm text-blue-600 mt-1 hover:underline">Change Photo</p>
            </label>
          </div>

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            value={userInfo.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Mobile */}
          <input
            type="text"
            name="mobile"
            value={userInfo.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Pincode */}
          <input
            type="text"
            name="pincode"
            value={userInfo.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {/* Vehicle Category */}
          <div>
            <label className="font-semibold block mb-2">Vehicle Category</label>
            <div className="flex gap-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={userInfo.vehicleCategory.bike}
                  onChange={() => handleCheckbox("bike")}
                  className="mr-2"
                />
                Bike
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={userInfo.vehicleCategory.car}
                  onChange={() => handleCheckbox("car")}
                  className="mr-2"
                />
                Car
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#32CD32] hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccountPopup;
