import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletProvider } from "./context/WalletContext";
import "./index.css"; // Ensure you have this file for Tailwind styles
import './assets/styles/globals.css';
// main.jsx or App.jsx


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);
