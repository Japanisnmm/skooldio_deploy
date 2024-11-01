import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlideshow from "./ImageSlideShow";
import ProductDetail from "./ProductDetail";
import ProductCustomization from "./ProductCustomization";
import RelatedProducts from "./RelatedProducts";
import PropTypes from 'prop-types';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const LoadingSpinner = () => (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800"></div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
    <div className="text-center">
      <p className="text-xl font-semibold text-red-600">{message}</p>
      <button 
        onClick={onRetry} 
        className="mt-4 rounded bg-gray-800 px-6 py-2 text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
      >
        Try Again
      </button>
    </div>
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

const NotFound = () => (
  <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
    <p className="text-xl text-gray-600">Product not found</p>
  </div>
);

function PageProductDetail() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [cartId, setCartId] = useState(() => {
    // Get cartId from localStorage if it exists
    return localStorage.getItem('cartId') || null;
  });
  const { permalink } = useParams();

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.storefront.wdb.skooldio.dev/products/${permalink}`
      );
      setProduct(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch product:", err);
      setError("Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  }, [permalink]);

  useEffect(() => {
    if (permalink) {
      fetchProduct();
    }
  }, [permalink, fetchProduct]);

  const handleAddToCart = async (selectedVariant, quantity) => {
    try {
      // Use existing cartId if available, otherwise use product.id
      const currentCartId = cartId || product.id;
      
      const response = await axios.post(
        `https://api.storefront.wdb.skooldio.dev/carts/${currentCartId}/items`,
        {
          items: [{
            skuCode: selectedVariant.skuCode,
            quantity: quantity
          }]
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        // Save the cartId from the response
        const newCartId = response.data.id;
        setCartId(newCartId);
        // Store cartId in localStorage for persistence
        localStorage.setItem('cartId', newCartId);
        
        setShowCartNotification(true);
        setTimeout(() => setShowCartNotification(false), 3000);
        return true;
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      setError("Failed to add item to cart");
      return false;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchProduct} />;
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <>
      <Navbar/>
      <main className="mx-4 md:mx-8 lg:mx-[124px] mt-8 md:mt-12 lg:mt-16 mb-8">
        {/* Main product grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left column - Image slideshow */}
          <section >
            <ImageSlideshow product={product} />
          </section>

          {/* Right column - Product details and customization */}
          <section >
            <div className="space-y-8">
              <ProductDetail product={product} />
              <ProductCustomization 
                product={product} 
                onAddToCart={handleAddToCart}
                cartId={cartId}
              />
            </div>
          </section>
        </div>

        {/* Cart Notification */}
        {showCartNotification && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 md:px-6 py-3 rounded-lg shadow-lg z-50">
            Item added to cart successfully!
          </div>
        )}

        {/* Related Products section */}
        <div className="mt-16">
          <RelatedProducts 
            currentProductId={product.id} 
            currentProduct={product}
          />
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default PageProductDetail;
