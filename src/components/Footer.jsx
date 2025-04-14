import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0a1f44] text-white py-3 mt-6">
      <div className="container mx-auto text-center">
        <p className="text-xs">&copy; {new Date().getFullYear()} ShareCharge. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

