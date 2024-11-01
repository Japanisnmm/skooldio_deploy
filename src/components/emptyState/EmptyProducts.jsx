import { ShoppingBag } from 'lucide-react'

export default function EmptyProducts() {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">No Products Found</h3>
      <p className="text-gray-500">Sorry, this page is currently unavailable.</p>
      <p className="text-gray-500">Please check back later.</p>
    </div>
  )
} 