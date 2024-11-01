import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import SidebarNavigation from '../components/sideBarNavigation/SideBarNavigation'
import ProductGrid from '../components/productsCard/ProductGrid'
import ProductCard from '../components/productsCard/ProductCard'
import { LoadingSkeleton } from '../components/loading/ProductSkeleton'
import SortDropdown from '../components/productSorted/SortDropdown'
import EmptyProducts from '../components/emptyState/EmptyProducts'

export default function MenProduct() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageLoading, setPageLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 6
  const [sortOption, setSortOption] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all-men')

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      let url = `https://api.storefront.wdb.skooldio.dev/products?categories=${selectedCategory}`
      
      if (sortOption) {
        switch (sortOption) {
          case 'high-to-low':
            url += '&sort=price:desc'
            break
          case 'low-to-high':
            url += '&sort=price:asc'
            break
          case 'best-seller':
            break
        }
      }

      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      let processedProducts = data.data || []
      
      if (sortOption === 'price-promotion') {
        processedProducts = processedProducts.filter(product => 
          product.promotionalPrice !== null && 
          product.promotionalPrice !== undefined &&
          product.promotionalPrice < product.price
        )
        
        processedProducts.sort((a, b) => a.promotionalPrice - b.promotionalPrice)
      }

      setProducts(processedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
      setError('Failed to load products. Please try again later.')
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, sortOption])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Calculate pagination values
  const totalPages = Math.ceil(products.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  const handlePageChange = async (pageNumber) => {
    setPageLoading(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    await new Promise(resolve => setTimeout(resolve, 500))
    setCurrentPage(pageNumber)
    setPageLoading(false)
  }

  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-8 mb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === i + 1
              ? 'bg-[#DEF81C] text-black font-medium'
              : 'hover:bg-gray-100'
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption)
    setCurrentPage(1)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setSortOption('')
  }

  return (
    <div>
      <Navbar 
        pageType="men"
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <div className="flex">
        <div className="hidden lg:block">
          <SidebarNavigation 
            onCategorySelect={handleCategorySelect} 
            pageType="men"
          />
        </div>
        <main className="flex-1 mt-16 mx-10">
          <div className="flex justify-between items-center mb-6">
            <div className="text-[32px] font-bold">Men&apos;s Collection</div>
            <SortDropdown selectedOption={sortOption} onSortChange={handleSortChange} />
          </div>
          {loading ? (
            <LoadingSkeleton variant="default" />
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-red-500">{error}</div>
            </div>
          ) : (
            <>
              {pageLoading ? (
                <LoadingSkeleton variant="default" />
              ) : sortOption === 'best-seller' || products.length === 0 ? (
                <EmptyProducts />
              ) : (
                <>
                  <ProductGrid variant="default">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </ProductGrid>
                  <Pagination />
                </>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  )
}
