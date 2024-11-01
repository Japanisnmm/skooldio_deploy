import { useNavigate } from 'react-router-dom';
import EmptyCartPic from '../../assets/EmptyCart.svg';

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-12 px-4">
      <div className="w-full max-w-[721px] mx-auto text-center">
        {/* Image Container */}
        <div className="relative w-full max-w-[721px] mx-auto">
          <img
            src={EmptyCartPic}
            alt="Empty Cart"
            className="w-[250px] h-[250px] 
              sm:w-[350px] sm:h-[350px] 
              md:w-[403px] md:h-[403px] 
              relative mx-auto mb-8 
              opacity-50
              object-contain
              transition-all duration-300"
          />
        </div>

        {/* Content */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 text-sm sm:text-base">
          Looks like you have not added anything to your cart.
          <br />
          Go ahead & explore top categories.
        </p>
        <button 
          className="px-6 py-3 bg-black text-white rounded-md 
            hover:bg-gray-800 transition-colors duration-200
            text-sm sm:text-base font-medium"
          onClick={handleContinueShopping}
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
