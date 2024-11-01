import PropTypes from 'prop-types'

export function LoadingSkeleton({ variant = 'default' }) {
  const gridClasses = {
    default: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3", // 3 columns
    featured: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" // 4 columns
  }

  const skeletonCount = variant === 'featured' ? 4 : 6; // 4 for featured, 6 for default

  return (
    <div className="max-w-[1200px] mx-auto px-0 py-0">
      <div className={`grid ${gridClasses[variant]} gap-6 w-full`}>
        {[...Array(skeletonCount)].map((_, index) => (
          <div key={index} className="animate-pulse">
            {/* Image placeholder */}
            <div className="relative w-full max-w-[370px] aspect-square bg-gray-200"></div>
            
            {/* Content placeholders */}
            <div className="pt-4 space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              
              {/* Rating placeholder */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
                ))}
              </div>
              
              {/* Price placeholder */}
              <div className="flex justify-end">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

LoadingSkeleton.propTypes = {
  variant: PropTypes.oneOf(['default', 'featured'])
}