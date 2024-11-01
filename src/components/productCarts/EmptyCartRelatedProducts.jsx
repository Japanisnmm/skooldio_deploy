import { useState, useEffect } from 'react';
import ProductCard from '../productsCard/ProductCard';
import ProductGrid from '../productsCard/ProductGrid';

const EmptyCartRelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch(
          'https://api.storefront.wdb.skooldio.dev/products'
        );
        
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        
        // Get random 4 products
        const randomProducts = data.data
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        
        setRelatedProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  if (isLoading || relatedProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">You might also like</h2>
      <ProductGrid variant="featured">
        {relatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductGrid>
    </div>
  );
};

export default EmptyCartRelatedProducts; 