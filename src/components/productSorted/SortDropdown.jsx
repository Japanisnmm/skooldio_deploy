import { useState } from 'react'
import PropTypes from 'prop-types'

const sortOptions = [
  { value: 'low-to-high', label: 'Price - Low to high' },
  { value: 'high-to-low', label: 'Price - High to low' },
  { value: 'price-promotion', label: 'Price - Promotion', },
  { value: 'best-seller', label: 'Best seller' },
]

export default function SortDropdown({ selectedOption, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionClick = (value) => {
    onSortChange(value)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[105px] px-3 py-3 text-sm bg-white border-2 border-[#DEF81C] flex items-center hover:bg-[#DEF81C] transition-colors duration-200"
      >
        <span className="font-medium text-gray-900 mr-2">Sort by</span>
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-[200px] bg-white rounded shadow-lg z-10 border border-gray-200">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="w-full px-4 py-2 text-sm text-gray-900 hover:bg-[#DEF81C]/10 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                    selectedOption === option.value ? 'border-[#DEF81C]' : 'border-[#E1E1E1]'
                  }`}>
                    {selectedOption === option.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#DEF81C]" />
                    )}
                  </div>
                  {option.label}
                </div>
                {option.badge && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded">
                    {option.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

SortDropdown.propTypes = {
  selectedOption: PropTypes.string,
  onSortChange: PropTypes.func.isRequired,
}