import { useState } from "react";
import { X } from "lucide-react";
import vehicleBg from "../assets/animated-vehicle-bg.gif";

const VehiclePopup = ({ onClose, closeSidebar }) => {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    registration: "",
    vin: "",
    category: "", // <-- New field for vehicle category
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  const makes = [
    "Tata.Ev", "Hyundai.Ev", "Tesla", "Volkswagen", "Ford", "BMW",
    "Kia", "Nissan", "Mercedes", "Audi", "MG", "Volvo", "Jaguar", "Porsche",
    "Mahindra", "BYD","Ola", "Ather", "TVS iQube", "Revolt Motors", "Hero Electric Optima",
    "Bajaj Chetak", 
  ];

  const models = {
    "Tata.Ev": ["Tata Nexon EV", "Tata Tigor EV", "Tata Tiago EV"],
    "Hyundai.Ev": ["Hyundai Kona Electric", "Hyundai Ioniq 5", "Hyundai Ioniq 6"],
    "Tesla": ["Model 3", "Model S", "Model X", "Model Y"],
    "Volkswagen": ["ID.3", "ID.4", "ID. Buzz"],
    "Ford": ["Mustang Mach-E", "Ford F-150 Lightning", "Ford Escape PHEV"],
    "BMW": ["BMW i4", "BMW iX3", "BMW iX"],
    "Kia": ["Kia EV6", "Kia Niro EV", "Kia Soul EV"],
    "Nissan": ["Nissan Leaf", "Nissan Ariya"],
    "Mercedes": ["Mercedes EQC", "Mercedes EQS", "Mercedes EQA"],
    "Audi": ["Audi e-tron", "Audi e-tron GT", "Audi Q4 e-tron"],
    "MG": ["MG ZS EV", "MG Hector EV"],
    "Volvo": ["Volvo XC40 Recharge", "Volvo C40 Recharge"],
    "Jaguar": ["Jaguar I-Pace"],
    "Porsche": ["Porsche Taycan", "Porsche Taycan Cross Turismo"],
    "Mahindra": ["Mahindra e2o Plus", "Mahindra XUV400"],
    "BYD": ["BYD Atto 3", "BYD Tang EV"], 
    "Ola": ["Ola S1 Pro", "Ola S1 Air","Ola S1 X","Ola S1 X+","Ola S1 Z","Ola S1 Pro Plus"],
    "Ather": ["Ather 450X", "Ather 450S", "Ather 450 Apex"],
    "TVS iQube": ["TVS iQube", "TVS iQube S", "TVS iQube ST"],
    "Revolt Motors": ["Revolt RV400", "Revolt RV300"],
    "Hero Electric Optima": ["Hero Electric Optima CX", "Hero Electric NYX", "Hero Electric Photon", "Hero Electric Atria", "Hero Electric Flash"],
    "Bajaj Chetak": ["Bajaj Chetak Premium", "Bajaj Chetak Urbane"],


  };

  const addVehicle = () => {
    if (!formData.make || !formData.model || !formData.registration || !formData.vin || !formData.category) {
      alert("Please fill in all fields.");
      return;
    }
    setVehicles([...vehicles, formData]);
    setFormData({ make: "", model: "", registration: "", vin: "", category: "" });
    setShowForm(false);
    setSelectedVehicle(null);
  };

  const handleMakeSelect = (make) => {
    setFormData({ ...formData, make, model: "" });
    setDropdownOpen(false);
    setModelDropdownOpen(false);
  };

  const handleModelSelect = (model) => {
    setFormData({ ...formData, model });
    setModelDropdownOpen(false);
  };

  const handleOpenPopup = () => {
    closeSidebar();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-lg flex items-center justify-center px-4">
      <div className="bg-white text-gray-800 w-full max-w-lg rounded-2xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh] transform transition-all duration-500 ease-in-out scale-95 hover:scale-100 shadow-2xl hover:shadow-3xl backdrop-blur-lg bg-opacity-40">
        <button
          onClick={() => {
            onClose();
            closeSidebar();
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-all duration-300 transform hover:rotate-45"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-semibold text-center mb-6 text-[#32CD32] transform transition-all duration-500 hover:scale-105">
          My Vehicles
        </h2>

        {!showForm && vehicles.length === 0 && (
          <div className="text-center space-y-4">
            <p className="text-gray-500">No vehicle added yet!</p>
            <button
              onClick={() => {
                setShowForm(true);
                handleOpenPopup();
              }}
              className="px-6 py-2 bg-[#32CD32] text-white rounded-lg hover:bg-green-700 transition-transform duration-300 transform hover:scale-105"
            >
              Add Vehicle
            </button>
          </div>
        )}

        {!showForm && vehicles.length > 0 && (
          <div className="space-y-3">
            {vehicles.map((vehicle, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedVehicle(vehicle)}
                className="w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 text-left transition-transform duration-300 transform hover:scale-105"
              >
                <strong>{vehicle.make}</strong> - {vehicle.model}
              </button>
            ))}
            <button
              onClick={() => {
                setShowForm(true);
                handleOpenPopup();
              }}
              className="w-full mt-4 px-4 py-2 bg-[#32CD32] text-white rounded-lg hover:bg-green-700 transition-transform duration-300 transform hover:scale-105"
            >
              Add Another Vehicle
            </button>
          </div>
        )}

        {selectedVehicle && !showForm && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-bold text-gray-700 mb-3">Vehicle Info</h3>
            <p><strong>Make:</strong> {selectedVehicle.make}</p>
            <p><strong>Model:</strong> {selectedVehicle.model}</p>
            <p><strong>Reg. Number:</strong> {selectedVehicle.registration}</p>
            <p><strong>VIN:</strong> {selectedVehicle.vin}</p>
            <p><strong>Category:</strong> {selectedVehicle.category}</p>
            <button
              onClick={() => setSelectedVehicle(null)}
              className="mt-4 inline-block text-blue-600 underline transition-all duration-300 transform hover:scale-105"
            >
              Back to List
            </button>
          </div>
        )}

        {showForm && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-bold text-gray-700 mb-3">Add Vehicle</h3>

            {/* Vehicle Make Dropdown */}
            <div className="mb-6 relative">
              <label className="block text-gray-700 font-semibold mb-2 text-lg">Choose Vehicle Make</label>
              <input
                type="text"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full p-3 border rounded-md mb-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32CD32] cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg"
                placeholder="Select Make"
              />
              {dropdownOpen && (
                <div className="absolute left-0 right-0 bg-white border mt-1 rounded-lg max-h-64 overflow-y-auto z-10 shadow-xl transition-all duration-300 transform scale-95 hover:scale-100">
                  {makes
                    .filter((make) => make.toLowerCase().includes(formData.make.toLowerCase()))
                    .map((make) => (
                      <div
                        key={make}
                        onClick={() => handleMakeSelect(make)}
                        className={`cursor-pointer p-4 text-lg text-center font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                          formData.make === make
                            ? "bg-[#32CD32] text-white shadow-xl ring-2 ring-green-300"
                            : "bg-white text-gray-800 hover:bg-green-50"
                        }`}
                      >
                        {make}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Vehicle Model Dropdown */}
            <div className="mb-6 relative">
              <label className="block text-gray-700 font-semibold mb-2 text-lg">Choose Vehicle Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                className="w-full p-3 border rounded-md mb-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32CD32] cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg"
                placeholder="Select Model"
              />
              {modelDropdownOpen && formData.make && (
                <div className="absolute left-0 right-0 bg-white border mt-1 rounded-lg max-h-64 overflow-y-auto z-10 shadow-xl transition-all duration-300 transform scale-95 hover:scale-100">
                  {models[formData.make]
                    .filter((model) => model.toLowerCase().includes(formData.model.toLowerCase()))
                    .map((model) => (
                      <div
                        key={model}
                        onClick={() => handleModelSelect(model)}
                        className={`cursor-pointer p-4 text-lg text-center font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                          formData.model === model
                            ? "bg-[#32CD32] text-white shadow-xl ring-2 ring-green-300"
                            : "bg-white text-gray-800 hover:bg-green-50"
                        }`}
                      >
                        {model}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Registration Number */}
            <input
              type="text"
              placeholder="Vehicle Registration Number"
              value={formData.registration}
              onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
              className="w-full p-3 border rounded-md mb-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32CD32] transition-all duration-300 transform hover:scale-105 shadow-lg"
            />

            {/* VIN */}
            <input
              type="text"
              placeholder="Vehicle VIN"
              value={formData.vin}
              onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
              className="w-full p-3 border rounded-md mb-6 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#32CD32] transition-all duration-300 transform hover:scale-105 shadow-lg"
            />

            {/* Category Radio Buttons */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 text-lg">Select Vehicle Category</label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="Bike"
                    checked={formData.category === "Bike"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="text-green-600"
                  />
                  <span className="text-gray-700 font-medium">Bike</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="Car"
                    checked={formData.category === "Car"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="text-green-600"
                  />
                  <span className="text-gray-700 font-medium">Car</span>
                </label>
              </div>
            </div>

            <button
              onClick={addVehicle}
              className="w-full px-6 py-3 bg-[#32CD32] text-white font-semibold rounded-lg hover:bg-green-700 transition-transform duration-300 transform hover:scale-105"
            >
              Save Vehicle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclePopup;
