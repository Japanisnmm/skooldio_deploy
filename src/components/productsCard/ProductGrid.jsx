import PropTypes from 'prop-types'

export default function ProductGrid({  children, variant = 'default' }) {
  return (
    <div className={`
      grid gap-4 sm:gap-6 
      ${variant === "featured" 
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }
    `}>
      {children}
    </div>
  )
}

ProductGrid.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'featured'])
}