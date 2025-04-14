const CardPayment = ({ addFunds }) => {
    return (
      <div>
        <h3 className="text-xl mb-2">Enter Card Details</h3>
        <input type="text" placeholder="Card Number" className="w-full p-2 bg-gray-700 text-white rounded-md mb-2" />
        <input type="text" placeholder="Expiry Date" className="w-full p-2 bg-gray-700 text-white rounded-md mb-2" />
        <input type="text" placeholder="CVV" className="w-full p-2 bg-gray-700 text-white rounded-md mb-2" />
        <button onClick={() => addFunds(500)} className="mt-3 bg-green-500 px-4 py-2 rounded">
          Pay ₹500
        </button>
      </div>
    );
  };
  
  export default CardPayment;
  