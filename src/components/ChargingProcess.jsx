import { useState, useEffect } from 'react';
import { MapPin, Clock, Coffee, ShoppingCart, Car, Users, X, Navigation2, Power, Zap, Crown, ChevronDown, Wallet, Star, Battery } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumPopup from './PremiumPopup';

const ChargingProcess = ({ onClose }) => {
  const [selectedConnector, setSelectedConnector] = useState(null);
  const [showChargingForm, setShowChargingForm] = useState(false);
  const [showPreBookForm, setShowPreBookForm] = useState(false);
  const [showPremiumMessage, setShowPremiumMessage] = useState(false);
  const [chargingTime, setChargingTime] = useState(1);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [walletBalance, setWalletBalance] = useState(500); // This would come from user context in real app
  const [subscriptionInProgress, setSubscriptionInProgress] = useState(false);
  const [chargingPercentage, setChargingPercentage] = useState(50); // Default to 50%
  const [chargingType, setChargingType] = useState(null); // 'time' or 'percentage'

  // Mock user's EVs data with charging rates and battery capacity
  const userEVs = [
    { 
      id: 1, 
      name: "Tata Nexon EV", 
      battery: "30.2 kWh", 
      range: "312 km",
      chargingRate: 3.3, // AC charger rate in kW
      batteryCapacity: 30.2 // kWh
    },
    { 
      id: 2, 
      name: "MG ZS EV", 
      battery: "44.5 kWh", 
      range: "419 km",
      chargingRate: 3.3, // AC charger rate in kW
      batteryCapacity: 44.5 // kWh
    }
  ];

  const [selectedEV, setSelectedEV] = useState(userEVs[0]);

  // Generate time slots with AM/PM format
  const generateTimeSlots = () => {
    const slots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Round up to next hour
    let startHour = currentMinute > 0 ? currentHour + 1 : currentHour;
    
    for (let i = 0; i < 12; i++) {
      const hour = (startHour + i) % 24;
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM/PM
      const timeString = `${displayHour}:00 ${period}`;
      slots.push({
        time: timeString,
        available: Math.random() > 0.3 // Random availability for demo
      });
    }
    
    return slots;
  };

  const [timeSlots] = useState(generateTimeSlots());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const station = {
    name: "Shell Recharge Talegaon",
    address: "Talagoan Lonavala Highway, Somhatne Phata, Pune, Maharashtra, 410506, India",
    coordinates: { lat: 18.7557, lng: 73.6754 },
    hours: "12:00am to 11:59pm",
    status: "Open Now",
    amenities: [
      { icon: <Users size={20} />, label: "Restrooms" },
      { icon: <ShoppingCart size={20} />, label: "Store" },
      { icon: <Coffee size={20} />, label: "Cafe" },
      { icon: <Car size={20} />, label: "Car Care" },
    ],
    chargers: [
      {
        id: "SR-TAL Charger 1",
        type: "DC",
        power: "120kW",
        price: "₹ 24.0/kWh",
        connectors: [
          { 
            id: 1, 
            type: "CCS-2", 
            status: "in_use", 
            vehicleInfo: "Tata Nexon EV",
            startTime: "10:30 AM",
            duration: "45 mins"
          },
          { id: 2, type: "CCS-2", status: "available" },
        ],
      },
      {
        id: "SR-TAL Charger 2",
        type: "AC",
        power: "3.3kW",
        price: "₹ 20.0/kWh",
        connectors: [
          { 
            id: 1, 
            type: "Type 2", 
            status: "in_use", 
            vehicleInfo: "MG ZS EV",
            startTime: "11:15 AM",
            duration: "30 mins"
          },
        ],
      },
      {
        id: "SR-TAL Charger 3",
        type: "AC",
        power: "3.3kW",
        price: "₹ 20.0/kWh",
        connectors: [
          { id: 1, type: "Type 2", status: "available" },
        ],
      },
      {
        id: "SR-TAL Charger 4",
        type: "AC",
        power: "3.3kW",
        price: "₹ 20.0/kWh",
        connectors: [
          { id: 1, type: "Wall", status: "available" },
        ],
      },
    ],
  };

  const handleConnectorSelect = (chargerId, connectorId) => {
    const charger = station.chargers.find(c => c.id === chargerId);
    const connector = charger?.connectors.find(conn => conn.id === connectorId);
    
    if (connector && connector.status === 'available') {
      setSelectedConnector({ chargerId, connectorId });
    }
  };

  const isConnectorSelected = (chargerId, connectorId) => {
    return selectedConnector?.chargerId === chargerId && 
           selectedConnector?.connectorId === connectorId;
  };

  const openGoogleMaps = () => {
    const { lat, lng } = station.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const renderConnectorStatus = (connector) => {
    if (connector.status === 'in_use') {
      return (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Zap size={16} className="text-yellow-500" />
            </motion.div>
            <div>
              <span className="text-sm font-medium text-yellow-700">Currently Charging</span>
              <p className="text-sm text-yellow-600 mt-1">{connector.vehicleInfo}</p>
              <div className="flex items-center space-x-3 mt-1 text-xs text-yellow-600">
                <span>Started: {connector.startTime}</span>
                <span>•</span>
                <span>Duration: {connector.duration}</span>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const handleCloseForm = () => {
    setShowChargingForm(false);
    setShowPreBookForm(false);
    setSelectedSlot(null);
    setChargingTime(1);
    setChargingPercentage(50);
    setChargingType(null);
  };

  const handleStartCharging = () => {
    setShowChargingForm(true);
    setShowPreBookForm(false);
  };

  const handlePreBook = () => {
    if (isPremiumUser) {
      setShowPreBookForm(true);
      setShowChargingForm(false);
    } else {
      setShowPremiumMessage(true);
    }
  };

  const handlePremiumMessageClose = () => {
    setShowPremiumMessage(false);
  };

  const handleTimeChange = (e) => {
    setChargingTime(parseInt(e.target.value));
  };

  const handlePercentageChange = (e) => {
    setChargingPercentage(parseInt(e.target.value));
  };

  const handleChargingTypeSelect = (type) => {
    setChargingType(type);
  };

  const calculatePrice = () => {
    const charger = station.chargers.find(c => c.id === selectedConnector?.chargerId);
    const pricePerKWh = parseFloat(charger?.price.replace('₹ ', '').replace('/kWh', ''));
    
    if (chargingType === 'time') {
      // Calculate based on AC charger rate (3.3kW) and time
      const energyConsumed = 3.3 * chargingTime; // kWh
      return (energyConsumed * pricePerKWh).toFixed(2);
    } else if (chargingType === 'percentage') {
      // Calculate based on vehicle's battery capacity and percentage
      const energyNeeded = (selectedEV.batteryCapacity * chargingPercentage) / 100; // kWh
      return (energyNeeded * pricePerKWh).toFixed(2);
    }
    return "0.00";
  };

  const calculateEstimatedTime = () => {
    if (chargingType === 'time') {
      return `${chargingTime} hour${chargingTime > 1 ? 's' : ''}`;
    } else if (chargingType === 'percentage') {
      const energyNeeded = (selectedEV.batteryCapacity * chargingPercentage) / 100;
      const timeNeeded = energyNeeded / 3.3; // Using AC charger rate of 3.3kW
      return `${timeNeeded.toFixed(1)} hours`;
    }
    return '';
  };

  const handleBookNow = () => {
    const totalPrice = parseFloat(calculatePrice());
    if (walletBalance >= totalPrice) {
      // Process booking
      setWalletBalance(prev => prev - totalPrice);
      setShowPreBookForm(false);
      setShowChargingForm(false);
      // Show success message or redirect
    } else {
      setInsufficientFunds(true);
    }
  };

  // Check premium status on component mount
  useEffect(() => {
    const checkPremiumStatus = () => {
      const premiumStatus = localStorage.getItem('isPremiumUser') === 'true';
      setIsPremiumUser(premiumStatus);
    };
    checkPremiumStatus();
  }, []);

  const handleMakePremium = () => {
    // Set user as premium
    localStorage.setItem('isPremiumUser', 'true');
    setIsPremiumUser(true);
    setShowPremiumMessage(false);
    setShowPreBookForm(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden relative max-h-[90vh] overflow-y-auto flex flex-col"
      >
        {/* Main Content - Will fade when form is shown */}
        <motion.div
          animate={{ 
            opacity: showChargingForm || showPreBookForm ? 0.3 : 1,
            scale: showChargingForm || showPreBookForm ? 0.95 : 1
          }}
          transition={{ duration: 0.3 }}
          className="relative z-0 flex-1"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="p-6 pt-12 bg-white">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{station.name}</h2>
              <button
                onClick={openGoogleMaps}
                className="flex items-center space-x-2 text-[#32CD32] hover:text-[#2db82d] transition-colors"
              >
                <Navigation2 size={20} />
                <span className="text-sm font-medium">Navigate</span>
              </button>
            </div>
            
            {/* Location */}
            <div className="flex items-start space-x-3 mb-4">
              <MapPin className="text-yellow-500 mt-1 flex-shrink-0" size={20} />
              <p className="text-gray-600">{station.address}</p>
            </div>
            
            {/* Hours */}
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="text-[#32CD32] flex-shrink-0" size={20} />
              <div>
                <span className="text-[#32CD32] font-medium">{station.status}</span>
                <span className="text-gray-600 ml-2">• {station.hours}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50">
              {station.amenities.map((amenity, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div className="text-gray-600">{amenity.icon}</div>
                  <span className="text-xs text-gray-600">{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chargers and Connectors */}
          <div className="px-6 space-y-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Available Chargers</h3>
            {station.chargers.map((charger) => (
              <motion.div
                key={charger.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg p-4 space-y-3"
              >
                {/* Charger Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-800">{charger.id}</h3>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">{charger.type}</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">{charger.power}</span>
                    </div>
                  </div>
                  <span className="text-gray-800 font-medium">{charger.price}</span>
                </div>

                {/* Connectors */}
                <div className="space-y-2">
                  {charger.connectors.map((connector) => (
                    <div key={connector.id} className="space-y-2">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: connector.id * 0.1 }}
                        onClick={() => handleConnectorSelect(charger.id, connector.id)}
                        className={`p-4 rounded-lg flex items-center justify-between cursor-pointer transition-all duration-200 ${
                          connector.status === 'available'
                            ? isConnectorSelected(charger.id, connector.id)
                              ? 'bg-green-100 border-2 border-[#32CD32] shadow-md'
                              : 'bg-white border-2 border-gray-200 hover:border-[#32CD32] hover:bg-green-50'
                            : 'bg-white border-2 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Power 
                            size={20} 
                            className={connector.status === 'available' ? 'text-[#32CD32]' : 'text-gray-400'}
                          />
                          <div>
                            <span className="text-gray-800 font-medium">Connector {connector.id}</span>
                            <p className="text-sm text-gray-600">{connector.type}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${
                          connector.status === 'available' ? 'text-[#32CD32]' : 'text-gray-400'
                        }`}>
                          {connector.status === 'available' ? 'Available' : 'Not Available'}
                        </span>
                      </motion.div>
                      {renderConnectorStatus(connector)}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-white">
            <div className="flex space-x-4">
              <button 
                className={`flex-1 py-4 rounded-lg text-lg font-medium transition-colors ${
                  selectedConnector
                    ? 'bg-[#32CD32] text-white hover:bg-[#2db82d]' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleStartCharging}
                disabled={!selectedConnector}
              >
                Start Charging
              </button>
              
              <button
                className={`flex-1 py-4 rounded-lg text-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                  selectedConnector
                    ? isPremiumUser
                      ? 'bg-white border-2 border-[#32CD32] text-[#32CD32] hover:bg-green-50'
                      : 'bg-white border-2 border-[#32CD32] text-[#32CD32] hover:bg-green-50'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handlePreBook}
                disabled={!selectedConnector}
              >
                <Crown size={20} className={isPremiumUser ? 'text-[#32CD32]' : 'text-[#32CD32]'} />
                <span>Pre-book</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Start Charging Form */}
        <AnimatePresence>
          {showChargingForm && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="w-full bg-white border-t border-gray-200"
            >
              <div className="p-6">
                {/* Form Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">Start Charging</h2>
                  <button
                    onClick={handleCloseForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Charging Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Select Charging Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleChargingTypeSelect('time')}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        chargingType === 'time'
                          ? 'border-[#32CD32] bg-green-50 text-[#32CD32]'
                          : 'border-gray-200 hover:border-[#32CD32]'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <Clock size={24} className="mb-2" />
                        <span className="font-medium">Fixed Time</span>
                        <span className="text-sm text-gray-500">Charge for specific duration</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleChargingTypeSelect('percentage')}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        chargingType === 'percentage'
                          ? 'border-[#32CD32] bg-green-50 text-[#32CD32]'
                          : 'border-gray-200 hover:border-[#32CD32]'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <Battery size={24} className="mb-2" />
                        <span className="font-medium">Fixed Percentage</span>
                        <span className="text-sm text-gray-500">Charge to specific level</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Time Selection - Only shown when time is selected */}
                {chargingType === 'time' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-800">Charging Duration</h3>
                      <span className="text-2xl font-bold text-[#32CD32]">{chargingTime} hr</span>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={chargingTime}
                        onChange={handleTimeChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-2">
                        {[1, 2, 3, 4, 5, 6].map((hour) => (
                          <span
                            key={hour}
                            className={`text-sm font-medium ${
                              chargingTime === hour ? 'text-[#32CD32]' : 'text-gray-500'
                            }`}
                          >
                            {hour}h
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Percentage Selection - Only shown when percentage is selected */}
                {chargingType === 'percentage' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-800">Charging Percentage</h3>
                      <span className="text-2xl font-bold text-[#32CD32]">{chargingPercentage}%</span>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={chargingPercentage}
                        onChange={handlePercentageChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-2">
                        {[0, 25, 50, 75, 100].map((percent) => (
                          <span
                            key={percent}
                            className={`text-sm font-medium ${
                              chargingPercentage === percent ? 'text-[#32CD32]' : 'text-gray-500'
                            }`}
                          >
                            {percent}%
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium">Charging Cost</span>
                    <span className="text-lg font-semibold text-gray-800">₹{calculatePrice()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Price per kWh</span>
                    <span className="font-medium">{station.chargers.find(c => c.id === selectedConnector?.chargerId)?.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span>Charger Type</span>
                    <span className="font-medium">
                      {station.chargers.find(c => c.id === selectedConnector?.chargerId)?.type} 
                      {station.chargers.find(c => c.id === selectedConnector?.chargerId)?.power}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span>Estimated Time</span>
                    <span className="font-medium">{calculateEstimatedTime()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span>Wallet Balance</span>
                    <span className="flex items-center font-medium">
                      <Wallet size={16} className="mr-1" />
                      ₹{walletBalance}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className="w-full py-4 bg-[#32CD32] text-white rounded-lg font-medium hover:bg-[#2db82d] transition-colors"
                >
                  Start Charging Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Message Popup */}
        {showPremiumMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
              <div className="text-center">
                <Crown size={48} className="mx-auto text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-6">
                  Become a premium member to access pre-booking and other exclusive features.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handlePremiumMessageClose}
                    className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleMakePremium}
                    className="flex-1 py-3 bg-[#32CD32] text-white rounded-lg hover:bg-[#2db82d]"
                  >
                    Become Premium
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pre-book Form */}
        <AnimatePresence>
          {showPreBookForm && isPremiumUser && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="w-full bg-white border-t border-gray-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-2xl font-semibold text-gray-800">Pre-book Charging</h2>
                    <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                      <Crown size={16} className="text-yellow-500" />
                      <span className="text-xs font-medium text-yellow-700">Premium</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* EV Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Select Your EV</h3>
                  <div className="space-y-3">
                    {userEVs.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => setSelectedEV(ev)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedEV.id === ev.id
                            ? 'border-[#32CD32] bg-green-50'
                            : 'border-gray-200 hover:border-[#32CD32]'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{ev.name}</span>
                          <span className="text-sm text-gray-500">{ev.battery}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Range: {ev.range}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Charging Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Select Charging Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleChargingTypeSelect('time')}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        chargingType === 'time'
                          ? 'border-[#32CD32] bg-green-50 text-[#32CD32]'
                          : 'border-gray-200 hover:border-[#32CD32]'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <Clock size={24} className="mb-2" />
                        <span className="font-medium">Fixed Time</span>
                        <span className="text-sm text-gray-500">Charge for specific duration</span>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleChargingTypeSelect('percentage')}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        chargingType === 'percentage'
                          ? 'border-[#32CD32] bg-green-50 text-[#32CD32]'
                          : 'border-gray-200 hover:border-[#32CD32]'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <Battery size={24} className="mb-2" />
                        <span className="font-medium">Fixed Percentage</span>
                        <span className="text-sm text-gray-500">Charge to specific level</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Time Selection - Only shown when time is selected */}
                {chargingType === 'time' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-800">Charging Duration</h3>
                      <span className="text-2xl font-bold text-[#32CD32]">{chargingTime} hr</span>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min="1"
                        max="6"
                        value={chargingTime}
                        onChange={handleTimeChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-2">
                        {[1, 2, 3, 4, 5, 6].map((hour) => (
                          <span
                            key={hour}
                            className={`text-sm font-medium ${
                              chargingTime === hour ? 'text-[#32CD32]' : 'text-gray-500'
                            }`}
                          >
                            {hour}h
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Percentage Selection - Only shown when percentage is selected */}
                {chargingType === 'percentage' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-800">Charging Percentage</h3>
                      <span className="text-2xl font-bold text-[#32CD32]">{chargingPercentage}%</span>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={chargingPercentage}
                        onChange={handlePercentageChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between mt-2">
                        {[0, 25, 50, 75, 100].map((percent) => (
                          <span
                            key={percent}
                            className={`text-sm font-medium ${
                              chargingPercentage === percent ? 'text-[#32CD32]' : 'text-gray-500'
                            }`}
                          >
                            {percent}%
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 font-medium">Booking Cost</span>
                    <span className="text-lg font-semibold text-gray-800">₹{calculatePrice()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Price per kWh</span>
                    <span className="font-medium">{station.chargers.find(c => c.id === selectedConnector?.chargerId)?.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span>Estimated Time</span>
                    <span className="font-medium">{calculateEstimatedTime()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                    <span>Wallet Balance</span>
                    <span className="flex items-center font-medium">
                      <Wallet size={16} className="mr-1" />
                      ₹{walletBalance}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleBookNow}
                  className="w-full py-4 bg-[#32CD32] text-white rounded-lg font-medium hover:bg-[#2db82d] transition-colors"
                  disabled={!selectedSlot}
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Insufficient Funds Popup */}
        <AnimatePresence>
          {insufficientFunds && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl p-6 max-w-sm w-full mx-4"
              >
                <div className="text-center">
                  <Wallet size={48} className="mx-auto text-red-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Insufficient Funds</h3>
                  <p className="text-gray-600 mb-6">
                    Please add money to your wallet to complete the booking.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setInsufficientFunds(false)}
                      className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setInsufficientFunds(false);
                        // Navigate to wallet page
                      }}
                      className="flex-1 py-3 bg-[#32CD32] text-white rounded-lg hover:bg-[#2db82d]"
                    >
                      Add Money
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click outside to close form */}
        {(showChargingForm || showPreBookForm) && (
          <div 
            className="absolute inset-0 bg-transparent z-5"
            onClick={handleCloseForm}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ChargingProcess; 