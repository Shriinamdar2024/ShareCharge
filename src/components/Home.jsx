import React from "react";
import HomeSlider from "../components/HomeSlider";
import ChargingMap from "../components/ChargingMap";

const HomePage = () => {
  return (
    <div className="bg-white m-0 p-0">
      <HomeSlider />

      <div className="my-0 px-4"> {/* Set my-0 to remove margin */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Nearby Charging Stations
        </h2>
        <ChargingMap />
      </div>
    </div>
  );
};

export default HomePage;
