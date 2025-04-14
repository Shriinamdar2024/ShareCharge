import { useState } from "react";
import Wallet from "./Wallet"; // ✅ Capitalized correctly
import PaymentPopup from "./PaymentPopup"; // ✅ Ensure this file exists

const MainComponent = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [showWallet, setShowWallet] = useState(true);

  return (
    <>
      {/* ✅ Show Wallet only when NOT in Payment Mode */}
      {showWallet && (
        <Wallet
          openPayment={() => {
            setShowWallet(false); // Hide wallet
            setIsPaymentOpen(true); // Open Payment Form
          }}
        />
      )}

      {/* ✅ Payment Form Popup */}
      {isPaymentOpen && (
        <PaymentPopup
          closePayment={() => {
            setIsPaymentOpen(false); // Close Payment
            setShowWallet(true); // Show Original Wallet again
          }}
        />
      )}
    </>
  );
};

export default MainComponent;
