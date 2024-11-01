import { useState, useEffect } from 'react';
import ProductCard from '../productsCard/ProductCard';
import ProductGrid from '../productsCard/ProductGrid';
import PropTypes from 'prop-types';

const RelatedProducts = ({ currentProductId, currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // Get the first category of the current product
        const category = currentProduct?.categories?.[0];
        if (!category) return;

        const response = await fetch(
          `https://api.storefront.wdb.skooldio.dev/products?categories=${category}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch related products');
        const data = await response.json();
        
        // Filter out current product and get random 4 products
        const filteredProducts = data.data
          .filter(product => product.id !== currentProductId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        
        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId, currentProduct]);

  if (isLoading || relatedProducts.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">People also like these</h2>
      <ProductGrid variant="featured">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </div>
  );
};

RelatedProducts.propTypes = {
  currentProductId: PropTypes.string.isRequired,
  currentProduct: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default RelatedProducts; 