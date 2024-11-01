import { Star } from 'lucide-react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const renderStars = (rating) => {
    const numericRating = Number(rating) || 0;
    
    return (
      <div className="flex items-center gap-1">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFullStar = star <= Math.floor(numericRating);
            const isPartialStar = !isFullStar && star === Math.ceil(numericRating);
            const partialFill = isPartialStar ? (numericRating % 1) * 100 : 0;

            return (
              <div key={star} className="relative">
                <Star className="w-5 h-5 fill-star-empty text-star-empty" />
                {(isFullStar || isPartialStar) && (
                  <div 
                    className="absolute inset-0 overflow-hidden" 
                    style={{ width: isPartialStar ? `${partialFill}%` : '100%' }}
                  >
                    <Star className="w-5 h-5 fill-star text-star" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="group overflow-hidden bg-white w-full transition-all duration-300 hover:shadow-lg">
      <Link to={`/product-detail/${product.permalink}`} className="block">
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden">
          <img
            src={product.imageUrls[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center 
              group-hover:scale-105 transition-transform duration-300"
          />
          {product.promotionalPrice > 0 && product.promotionalPrice < product.price && (
            <div className="absolute top-4 right-0 bg-[#FF000D] text-white px-3 py-1.5 
              text-sm font-bold shadow-md">
              -{Math.round(((product.price - product.promotionalPrice) / product.price) * 100)}%
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-blue-600 
            transition-colors duration-200">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px] mt-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="mt-3">
            {product.ratings > 0 && renderStars(product.ratings)}
          </div>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2 justify-end">
            {product.promotionalPrice > 0 && product.promotionalPrice < product.price ? (
              <>
                <span className="text-sm text-gray-500 line-through">
                  THB {product.price.toLocaleString()}
                </span>
                <span className="text-xl font-bold text-[#FF000D]">
                  THB {product.promotionalPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                THB {product.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    promotionalPrice: PropTypes.number,
    ratings: PropTypes.number,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired 
  }).isRequired,
  imageIndex: PropTypes.number
}