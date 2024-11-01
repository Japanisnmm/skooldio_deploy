import { useState, useEffect, useCallback } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import SidebarNavigation from '../components/sideBarNavigation/SideBarNavigation'
import ProductGrid from '../components/productsCard/ProductGrid'
import ProductCard from '../components/productsCard/ProductCard'
import { LoadingSkeleton } from '../components/loading/ProductSkeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SortDropdown from '../components/productSorted/SortDropdown'
import EmptyProducts from '../components/emptyState/EmptyProducts'

export default function ShoesProduct() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageLoading, setPageLoading] = useState(false)
  const [itemsPerPage] = useState(6)
  const [sortOption, setSortOption] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const urls = selectedCategory === 'all' ? 
        [
          'https://api.storefront.wdb.skooldio.dev/products?categories=men-shoes',
          'https://api.storefront.wdb.skooldio.dev/products?categories=ladies-shoes'
        ] : 
        [`https://api.storefront.wdb.skooldio.dev/products?categories=${selectedCategory}`]

      const responses = await Promise.all(
        urls.map(url => fetch(url + (sortOption ? getSortParam(sortOption) : '')))
      )
      
      if (!responses.every(response => response.ok)) {
        throw new Error('Failed to fetch products')
      }

      const data = await Promise.all(responses.map(response => response.json()))
      let processedProducts = data.flatMap(d => d.data || [])
      
      if (processedProducts.length === 0) {
        setProducts([])
        return
      }
      
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

  const getSortParam = (option) => {
    switch (option) {
      case 'high-to-low':
        return '&sort=price:desc'
      case 'low-to-high':
        return '&sort=price:asc'
      default:
        return ''
    }
  }

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption)
    setCurrentPage(1)
  }

  const handlePageChange = async (pageNumber) => {
    setPageLoading(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    await new Promise(resolve => setTimeout(resolve, 500))
    setCurrentPage(pageNumber)
    setPageLoading(false)
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setSortOption('')
  }

  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-8">
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

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(products.length / itemsPerPage)

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="hidden lg:block">
          <SidebarNavigation 
            onCategorySelect={handleCategorySelect}
            pageType="shoes"
          />
        </div>
        <main className="flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold">Shoes Collection</div>
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
                    {currentItems.map((product) => (
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
