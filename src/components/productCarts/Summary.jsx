// src/components/Summary.js

import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Summary = ({ cart, totalItems }) => {
  const navigate = useNavigate();
  
  // Calculate subtotal from cart items
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const handleContinueShopping = () => {
    // Go back to the previous page
    navigate(-1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md relative">
      <h2 className="text-xl font-bold mb-4">Summary</h2>

      {/* Display total items count in the top right */}
      <div className="absolute top-6 right-6 text-gray-600">
        <span>{totalItems} items</span>
      </div>

      {/* Display each item with quantity and calculated total */}
      <div className="space-y-2 mt-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>{(item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {/* Subtotal and shipping fee */}
      <div className="flex justify-between text-gray-700">
        <span>Subtotal</span>
        <span>{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </div>
      <div className="flex justify-between text-gray-700">
        <span>Shipping fee</span>
        <span>{shippingFee === 0 ? "Free" : shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </div>

      <hr className="my-4" />

      {/* Total */}
      <div className="flex justify-between text-lg font-bold text-gray-900">
        <span>Total</span>
        <span>{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
      </div>

      {/* Buttons */}
      <button className="w-full mt-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition">Check out</button>
      <button 
        className="w-full mt-4 py-3 border border-gray-300 text-gray-600 rounded-md font-semibold hover:bg-gray-100 transition"
        onClick={handleContinueShopping}
      >
        Continue shopping
      </button>
    </div>
  );
};

// Add PropTypes validation
Summary.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  totalItems: PropTypes.number.isRequired
};

export default Summary;
