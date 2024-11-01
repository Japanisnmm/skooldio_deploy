import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import PropTypes from 'prop-types'
import { navigationConfig } from "../../config/navigationConfig"

export default function SidebarNavigation({ onCategorySelect, pageType = 'men' }) {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  // Get categories from navigationConfig
  const categories = navigationConfig[pageType]?.categories || {}

  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null)
      setActiveItem(null)
      // Use defaultCategory from navigationConfig
      onCategorySelect(navigationConfig[pageType].defaultCategory)
    } else {
      setExpandedCategory(category)
      setActiveItem(null)
    }
  }

  const handleItemClick = (categoryKey, item) => {
    setActiveItem(item.id)
    onCategorySelect(item.apiCategory)
  }

  return (
    <nav className="w-60 ml-31 mt-16" aria-label="Product categories">
      {Object.entries(categories).map(([key, category]) => (
        <div key={key} className="mb-1">
          <button
            onClick={() => toggleCategory(key)}
            className={`w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg ${
              expandedCategory === key && !activeItem ? 'bg-[#DEF81C]' : ''
            }`}
            aria-expanded={expandedCategory === key}
            aria-controls={`${key}-items`}
          >
            <span className="font-medium">{category.name}</span>
            {expandedCategory === key ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <div
            id={`${key}-items`}
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              expandedCategory === key ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="py-1">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(key, item)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    activeItem === item.id
                      ? "bg-[#DEF81C]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </nav>
  )
}
SidebarNavigation.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
  pageType: PropTypes.oneOf(Object.keys(navigationConfig).filter(key => key !== 'home')),
}
