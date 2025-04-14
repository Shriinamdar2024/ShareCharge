import React from "react";

const BackgroundDesign = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      {/* Glowing Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-green-300 opacity-30 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-300 opacity-20 rounded-full filter blur-[120px]" />

      {/* Dot Grid Overlay */}
      <div
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        className="absolute inset-0"
      />
    </div>
  );
};

export default BackgroundDesign;
