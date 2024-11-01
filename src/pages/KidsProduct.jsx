import { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import ProductGrid from '../components/productsCard/ProductGrid'
import ProductCard from '../components/productsCard/ProductCard'
import { PackageX } from 'lucide-react'

export default function KidsProduct() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://api.storefront.wdb.skooldio.dev/products?categories=all-kids')
        
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()
        setProducts(data.data)
      } catch (error) {
        console.error('Error fetching products:', error)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const NoProductsFound = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-gray-500">
      <PackageX size={64} className="mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
      <p className="text-gray-400">Sorry, there are no products available in this category.</p>
    </div>
  )

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="animate-pulse space-y-4">
        <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-6 w-48 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <main className="container mx-auto p-8">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
              <div className="text-red-500">{error}</div>
            </div>
          ) : products.length === 0 ? (
            <NoProductsFound />
          ) : (
            <ProductGrid>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}
