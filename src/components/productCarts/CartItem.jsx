// src/components/CartItem.js
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

const CartItem = ({ item, defaultColor, defaultSize, defaultQuantity, onDelete, onUpdate }) => {
    const [color, setColor] = useState(defaultColor);
    const [size, setSize] = useState(defaultSize);
    const [quantity, setQuantity] = useState(defaultQuantity);

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setColor(newColor);
        onUpdate(quantity, newColor, size);
    };

    const handleSizeChange = (e) => {
        const newSize = e.target.value;
        setSize(newSize);
        onUpdate(quantity, color, newSize);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = Number(e.target.value);
        setQuantity(newQuantity);
        onUpdate(newQuantity, color, size);
    };

    return (
        <div className="flex flex-col md:flex-row items-start border-b py-4 px-2 md:px-4 relative bg-white md:shadow-sm rounded-lg mb-4">
            {/* Delete Button - Top Right */}
            <button onClick={onDelete} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="h-5 w-5 md:h-6 md:w-6" />
            </button>

            {/* Product Image */}
            <div className="flex items-center justify-center w-full md:w-auto mb-4 md:mb-0">
                <img src={item.image} alt={item.name} className="w-32 h-32 md:w-24 md:h-24 object-cover rounded-md" />
            </div>

            {/* Product Details and Price Wrapper */}
            <div className="flex flex-1 flex-col justify-between w-full md:flex-row md:ml-4">
                <div className="flex-1">
                    <h2 className="text-md md:text-lg font-semibold text-gray-800">{item.name}</h2>

                    {/* Options Row - Color, Size, and Quantity */}
                    <div className="mt-2 flex flex-col md:flex-row md:space-x-4">
                        {/* Color Selector */}
                        <div className="flex flex-col mb-3 md:mb-0">
                            <label className="text-sm text-gray-500">Color</label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                value={color}
                                onChange={handleColorChange}
                            >
                                {item.colors.map((colorOption) => (
                                    <option key={colorOption} value={colorOption}>{colorOption}</option>
                                ))}
                            </select>
                        </div>

                        {/* Size Selector */}
                        <div className="flex flex-col mb-3 md:mb-0">
                            <label className="text-sm text-gray-500">Size</label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                value={size}
                                onChange={handleSizeChange}
                            >
                                {item.sizes.map((sizeOption) => (
                                    <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-500">Qty.</label>
                            <select
                                className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                value={quantity}
                                onChange={handleQuantityChange}
                            >
                                {[...Array(10).keys()].map((qty) => (
                                    <option key={qty} value={qty + 1}>{qty + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Price - Aligned to Bottom Right on All Screen Sizes */}
                <div className="text-lg font-semibold text-gray-900 self-end mt-4 md:mt-0">
                    <p>THB {item.price.toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        colors: PropTypes.arrayOf(PropTypes.string).isRequired,
        sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
        promotionalPrice: PropTypes.number,
        quantity: PropTypes.number.isRequired,
        imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    defaultColor: PropTypes.string.isRequired,
    defaultSize: PropTypes.string.isRequired,
    defaultQuantity: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default CartItem;
