import { useEffect, useState, useMemo } from "react";
import { ProductCard, ProductGrid } from "../productsCard";

import { PackageX } from 'lucide-react';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const featuredProductIds = useMemo(
    () => [
      "XAz85aYa1UvboM88q7DL",
      "qkgJhtwob70HoMELcHn0",
      "UMcp5TasyJzU5XuQCNbv",
      "mLTFNsHxm2WRj9lFVVI6",
    ],
    []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.storefront.wdb.skooldio.dev/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        const productArray = Array.isArray(data)
          ? data
          : data.products
          ? data.products
          : data.data
          ? data.data
          : [];

        const filteredProducts = productArray
          .filter((product) => featuredProductIds.includes(product.id))
          .map((product) => ({
            ...product,
            rating: product.ratings, // Include the rating from API
          }));

        const sortedProducts = filteredProducts.sort(
          (a, b) =>
            featuredProductIds.indexOf(a.id) - featuredProductIds.indexOf(b.id)
        );

        setProducts(sortedProducts);
      } catch (err) {
        setError("Failed to load products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [featuredProductIds]);

  const featuredProducts = useMemo(
    () => products.filter((product) => featuredProductIds.includes(product.id)),
    [products, featuredProductIds]
  );

  const NoProductsFound = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500 px-4">
      <PackageX size={64} className="mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-center">No Featured Products Found</h3>
      <p className="text-gray-400 text-center">Sorry, there are no featured products available at the moment.</p>
    </div>
  );

  return (
    <div className="w-full">
      <div className="max-w-[1440px] mx-auto 
        px-4 md:px-8 lg:px-[160px]
        mt-12 md:mt-16 lg:mt-[118px] 
        mb-8 md:mb-12 lg:mb-[88px]">
        {loading ? (
          <div className="w-full">
            <div className="text-2xl md:text-3xl font-bold mb-6 md:mb-12 lg:mb-16 text-center 
              bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 
              animate-pulse h-8 w-48 mx-auto rounded-lg">
            </div>
            
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[50vh] px-4">
            <div className="text-red-500 text-center">{error}</div>
          </div>
        ) : !Array.isArray(products) || products.length === 0 ? (
          <NoProductsFound />
        ) : (
          <div>
            <div className="text-2xl md:text-3xl font-bold mb-6 md:mb-12 lg:mb-16 text-center">
              Featured Products
            </div>
            <ProductGrid variant="featured">
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-full md:w-auto">
                  <ProductCard product={product} />
                </div>
              ))}
            </ProductGrid>
          </div>
        )}
      </div>
    </div>
  );
}
