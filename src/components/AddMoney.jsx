import { useState } from "react";
import { useWallet } from "../context/WalletContext";

const AddMoney = ({ closeForm }) => {
  const [amount, setAmount] = useState(0);
  const { addMoney } = useWallet();

  const handleSubmit = (e) => {
    e.preventDefault();
    addMoney(Number(amount));
    closeForm();
  };

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-bold">Add Money</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          placeholder="Enter amount"
          className="w-full p-2 mt-2 rounded bg-gray-700"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit" className="w-full mt-3 bg-blue-500 py-2 rounded-lg hover:bg-blue-600">
          Add Funds
        </button>
      </form>
    </div>
  );
};

export default AddMoney;
