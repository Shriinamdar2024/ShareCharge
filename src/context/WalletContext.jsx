import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(500); // Starting balance

  const addFunds = (amount) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  return (
    <WalletContext.Provider value={{ balance, addFunds }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
