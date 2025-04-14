const UPI = ({ addFunds }) => {
    return (
      <div>
        <h3 className="text-xl mb-2">Select UPI App</h3>
        <select className="w-full p-2 bg-gray-700 text-white rounded-md">
          <option>Google Pay</option>
          <option>PhonePe</option>
          <option>Paytm</option>
        </select>
        <button onClick={() => addFunds(500)} className="mt-3 bg-green-500 px-4 py-2 rounded">
          Pay ₹500
        </button>
      </div>
    );
  };
  
  export default UPI;
  