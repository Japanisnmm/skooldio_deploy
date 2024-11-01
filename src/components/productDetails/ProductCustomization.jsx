import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Shirt_Size from "../../assets/Shirt_Size.webp";
import Shoe_Size from "../../assets/Shoe_Size.png";
import PropTypes from 'prop-types';

const ProductCustomization = ({ product, onAddToCart,  }) => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  if (!product) return null;

  const { name, price, promotionalPrice, imageUrls, variants } = product;

  const uniqueColors = Array.from(
    new Set(variants.map((variant) => variant.color))
  );
  const uniqueSizes = Array.from(
    new Set(variants.map((variant) => variant.size))
  ).sort(
    (a, b) =>
      ["XS", "S", "M", "L", "XL"].indexOf(a) -
      ["XS", "S", "M", "L", "XL"].indexOf(b)
  );

  const colorCodes = uniqueColors.reduce((acc, color) => {
    const variant = variants.find((variant) => variant.color === color);
    if (variant) acc[color] = variant.colorCode;
    return acc;
  }, {});

  const getAvailableQuantity = () => {
    const selectedVariant = variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize
    );
    return selectedVariant ? selectedVariant.remains : 0;
  };

  const handleAddToCart = async () => {
    const selectedVariant = variants.find(
      (variant) => variant.color === selectedColor && variant.size === selectedSize
    );

    if (!selectedVariant) {
      alert("Selected combination is not available");
      return;
    }

    try {
      const success = await onAddToCart(selectedVariant, quantity);
      if (success) {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleViewCart = () => {
    handleCloseModal();
    navigate('/cart');
  };

  return (
    <div className="">
      <div className="flex flex-col pt-4 lg:pt-6">
        {/* Colors Section */}
        <div className="font-semibold text-lg">Colors:</div>
        <div className="flex flex-wrap md:flex-nowrap gap-4 pt-4">
          {uniqueColors.map((color) => (
            <div
              key={color}
              className="flex flex-col items-center cursor-pointer w-[80px] md:w-[100px] h-[82px]"
              onClick={() => setSelectedColor(color)}
            >
              <div className={`w-[54px] h-[54px] grid grid-cols-5 grid-rows-5 gap-[2px] mx-auto
                ${selectedColor === color ? 'border-[3px] border-[#c1cd00] shadow-md' : 'border border-gray-200'}`}
              >
                {[...Array(25)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-full"
                    style={{ backgroundColor: colorCodes[color] }}
                  />
                ))}
              </div>
              <div className="text-center mt-2 text-sm md:text-base">{color}</div>
            </div>
          ))}
        </div>

        {/* Size Section */}
        <div className="flex justify-between items-center pt-6">
          <div className="font-semibold text-lg">Size</div>
          <button
            className="text-blue-500 underline cursor-pointer text-sm md:text-base"
            onClick={() => setIsSizeChartOpen(true)}
          >
            What&apos;s my size?
          </button>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {uniqueSizes.map((size) => (
            <button
              key={size}
              className={`w-full md:w-[149.6px] h-[54px] px-4 py-2.5
                ${selectedSize === size 
                  ? 'border-2 border-[#c1cd00] shadow-md font-bold' 
                  : 'border border-gray-200'
                } bg-white text-gray-800`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Quantity Section */}
        <div className="pt-6">
          <div className="font-semibold text-lg">Qty.</div>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full md:w-[149.6px] h-[54px] border border-gray-200 rounded px-2.5 text-base
              text-gray-800 appearance-none bg-white disabled:bg-gray-100"
          >
            {[...Array(getAvailableQuantity())].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart Button */}
        <button
          className="h-[54px] px-2.5 py-[7px] bg-[#222222] justify-center items-center gap-2 inline-flex text-white text-base font-normal leading-tight mt-6"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>

      {/* Cart Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[900px] h-auto md:h-[374px] bg-white rounded-lg overflow-hidden relative">
            <div className="flex justify-between items-center p-6">
              <div>
                <span className="text-2xl font-bold">Items added to your cart</span>
               
              </div>
              <button
                onClick={handleCloseModal}
                className="text-2xl hover:text-gray-600"
              >
                &times;
              </button>
            </div>

            <div className="flex items-center px-6 h-[208px]">
              <img
                src={imageUrls[0]}
                alt={name}
                className="w-40 h-40 mr-6 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold m-0">{name}</h3>
                <p className="text-sm text-gray-600 mt-1.5">QTY: {quantity}</p>
              </div>
              <p className="text-lg font-bold">
                THB {(promotionalPrice || price).toLocaleString()}.00
              </p>
            </div>

            <div className="flex border-t border-gray-200 h-[60px]">
              <button
                className="flex-1 mx-6 my-6 bg-gray-800 text-white font-bold h-[54px]"
                onClick={handleViewCart}
              >
                View Cart
              </button>
              <button
                className="flex-1 mx-6 my-6 bg-white text-gray-800 font-bold h-[54px]"
                onClick={handleCloseModal}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-[500px] bg-white p-5 rounded-lg relative text-center">
            <h1 className="text-xl font-semibold">Size Chart</h1>
            <p className="mt-4">Here is the Shirt Size Chart: </p>
            <img
              src={Shirt_Size}
              alt="Shirt Size Chart"
              className="w-full mt-5 rounded-lg"
            />
            <p className="mt-4">Here is the Shoes Size Chart: </p>
            <img
              src={Shoe_Size}
              alt="Shoe Size Chart"
              className="w-full mt-5 rounded-lg"
            />
            <button
              onClick={() => setIsSizeChartOpen(false)}
              className="absolute top-2.5 right-2.5 text-2xl hover:text-gray-600"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ProductCustomization.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    promotionalPrice: PropTypes.number,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        colorCode: PropTypes.string.isRequired,
        remains: PropTypes.number.isRequired,
        skuCode: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  onAddToCart: PropTypes.func.isRequired,
  cartId: PropTypes.string,
};

export default ProductCustomization;
