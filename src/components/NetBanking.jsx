const NetBanking = ({ addFunds }) => {
    return (
      <div>
        <h3 className="text-xl mb-2">Select Your Bank</h3>
        <select className="w-full p-2 bg-gray-700 text-white rounded-md">
          <option>State Bank of India</option>
          <option>HDFC Bank</option>
          <option>ICICI Bank</option>
        </select>
        <button onClick={() => addFunds(500)} className="mt-3 bg-green-500 px-4 py-2 rounded">
          Pay ₹500
        </button>
      </div>
    );
  };
  
  export default NetBanking;
  