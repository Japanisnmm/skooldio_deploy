import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { navigationConfig } from '../../config/navigationConfig'
import Logo from '../../assets/Logo.svg'

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('main')
  const [cartCount, setCartCount] = useState(0)
  const cartId = localStorage.getItem('cartId');

  // Check if current page is cart
  const isCartPage = location.pathname === '/cart';

  // Fetch cart data using cartId
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!cartId) {
        setCartCount(0);
        return;
      }

      try {
        const response = await fetch(`https://api.storefront.wdb.skooldio.dev/carts/${cartId}`);
        if (response.ok) {
          const data = await response.json();
          const itemCount = data.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
          setCartCount(itemCount);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error('Failed to fetch cart count:', error);
        setCartCount(0);
      }
    };

    fetchCartCount();

    // Set up an interval to refresh cart count every 5 seconds
    const intervalId = setInterval(fetchCartCount, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [cartId]);

  const handleLogoClick = () => {
    setActiveLink('')
    setIsMenuOpen(false)
    setActiveMenu('main')
    sessionStorage.clear()
  }

  const handleNavClick = (link, category = null) => {
    setActiveLink(link.name)
    setIsMenuOpen(false)
    setActiveMenu('main')
    sessionStorage.setItem('selectedCategory', category?.apiCategory || link.defaultCategory)
    window.location.href = link.path
  }

  const handleCartClick = () => {
    navigate('/cart');
    setIsMenuOpen(false);
  };

  // Generate nested menus structure
  const getNestedMenus = () => {
    const menus = {
      main: {
        title: '',
        items: [
          { id: 'home', label: 'Home', link: navigationConfig.home.path },
          ...Object.entries(navigationConfig)
            .filter(([key]) => key !== 'home')
            .map(([key, category]) => ({
              id: key,
              label: category.name,
              submenu: key,
              path: category.path,
            })),
        ],
      },
    }

    // Add category submenus
    Object.entries(navigationConfig)
      .filter(([key]) => key !== 'home')
      .forEach(([key, category]) => {
        menus[key] = {
          title: category.name,
          parent: 'main',
          items: Object.entries(category.categories).map(([subKey, subCategory]) => ({
            id: subKey,
            label: subCategory.name,
            submenu: `${key}-${subKey}`,
          })),
        }

        // Add subcategory menus
        Object.entries(category.categories).forEach(([subKey, subCategory]) => {
          menus[`${key}-${subKey}`] = {
            title: subCategory.name,
            parent: key,
            items: subCategory.items.map(item => ({
              id: item.id,
              label: item.name,
              onClick: () => handleNavClick(category, item),
            })),
          }
        })
      })

    return menus
  }

  const menus = getNestedMenus()
  const currentMenu = menus[activeMenu] || menus.main

  const handleBack = () => {
    if (currentMenu.parent && menus[currentMenu.parent]) {
      setActiveMenu(currentMenu.parent)
    } else {
      setActiveMenu('main')
    }
  }

  return (
    <nav className="bg-black text-white py-2.5 px-4 md:px-6 lg:px-40 relative">
      {/* Header Content */}
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block lg:hidden z-20 p-2 hover:text-[#DEF81C] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/" className="flex items-center cursor-pointer z-20" onClick={handleLogoClick}>
            <img src={Logo} alt="Logo" className="w-8 h-8" />
            <span className="text-lg font-bold pl-2.5 pr-6 md:pr-8 lg:pr-10">WDB</span>
          </Link>
        </div>

        {/* Desktop Navigation - Unchanged */}
        <div className="hidden lg:flex items-center flex-1">
          <div className="flex items-center space-x-6">
            {Object.values(navigationConfig)
              .filter(link => link.name !== 'Home')
              .map((link) => (
                <button
                  key={link.name}
                  className={`py-3 transition-colors ${
                    activeLink === link.name ? 'text-[#DEF81C]' : ''
                  } hover:text-[#DEF81C]`}
                  onClick={() => handleNavClick(link)}
                >
                  {link.name}
                </button>
              ))}
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <i className="fas fa-search cursor-pointer hover:text-[#DEF81C] text-base md:text-lg"></i>
          <i className="fa-regular fa-heart cursor-pointer hover:text-[#DEF81C] text-base md:text-lg"></i>
          <i className="fa-regular fa-user cursor-pointer hover:text-[#DEF81C] text-base md:text-lg"></i>
          <div className="relative">
            <i 
              className={`fas fa-shopping-basket cursor-pointer text-base md:text-lg
                ${isCartPage ? 'text-[#DEF81C]' : 'hover:text-[#DEF81C]'}`}
              onClick={handleCartClick}
              role="button"
              aria-label="View shopping cart"
            ></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#DEF81C] text-black text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Nested Menu */}
      <div
        className={`fixed inset-y-0 left-0 w-[93%] sm:w-[60%] lg:hidden
          bg-white text-black z-50
          transition-transform duration-300 ease-in-out 
          rounded-tr-2xl rounded-br-2xl
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Menu Header - Simplified */}
        {currentMenu.parent && (
          <div className="flex items-center p-4">
            <button
              onClick={handleBack}
              className="flex items-center text-2xl font-bold text-black"
            >
              <ChevronLeft className="w-6 h-6 mr-10" />
              {currentMenu.title}
            </button>
          </div>
        )}

        {/* Menu Items */}
        <nav className="p-2 mt-2">
          {currentMenu.items.map((item) => {
            if (item.submenu) {
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.submenu)}
                  className="flex items-center justify-between w-full p-3 text-lg  text-black transition-colors"
                >
                  {item.label}
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              )
            }

            return (
              <button
                key={item.id}
                onClick={item.onClick || (() => handleNavClick({ path: item.link, name: item.label }))}
                className="w-full p-3 text-left text-lg text-black transition-colors"
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300
          ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />
    </nav>
  )
}
