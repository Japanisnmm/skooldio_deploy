import PropTypes from 'prop-types';
import heart from "../../assets/heart.svg";
import Star_Off from "../../assets/Star_Off.svg";
import Star_On from "../../assets/Star_On.svg";

const ProductDetail = ({ product }) => {
  if (!product) return null;

  const { id, name, description, price, promotionalPrice, ratings } = product;
  const filledStars = Math.floor(ratings);
  const totalStars = 5;

  return (
    <div>
      {/* Header with ID and Heart Icon */}
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-900 truncate text-left">
          ID : {id}
        </div>
        <img 
          src={heart} 
          alt="Favorite" 
          className="w-8 h-8 cursor-pointer hover:opacity-80"
        />
      </div>

      {/* Product Name */}
      <div className=" text-5xl font-bold text-gray-900 truncate text-left pt-4">
        {name}
      </div>

      {/* Product Description */}
      <div className="text-lg text-gray-600 leading-relaxed mt-4 mb-6">
        {description}
      </div>

      {/* Pricing Section */}
      <div>
        {promotionalPrice < price ? (
          <>
            <div className="inline-block">
              <span className="bg-[#FF000D] text-white text-[32px] sm:text-[40px] font-bold px-4 py-1">
                THB {promotionalPrice.toLocaleString()}.00
              </span>
            </div>
            <div className="mt-1">
              <span className="text-[16px] sm:text-[20px] text-gray-600">
                From <span className="line-through">THB {price.toLocaleString()}.00</span>
              </span>
            </div>
          </>
        ) : (
          <div className="inline-block text-black text-[32px] sm:text-[40px] ">
            THB {price.toLocaleString()}.00
          </div>
        )}
      </div>

      {/* Star Rating */}
      <div className="flex items-center  space-x-3">
        {[...Array(totalStars)].map((_, i) => (
          <img
            key={i}
            src={i < filledStars ? Star_On : Star_Off}
            alt={i < filledStars ? "Filled Star" : "Empty Star"}
            className="w-[22.29px] h-[21.36px]"
          />
        ))}
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    promotionalPrice: PropTypes.number.isRequired,
    ratings: PropTypes.number.isRequired,
  }),
};

export default ProductDetail;
