export const navigationConfig = {
  home: {
    name: 'Home',
    path: '/',
    defaultCategory: ''
  },
  men: {
    name: 'Men',
    path: '/men-product',
    defaultCategory: 'all-men',
    categories: {
      tops: {
        name: "Tops",
        items: [
          { id: "all-items", name: "All Items", apiCategory: "men-shirts" },
          { id: "t-shirts", name: "T-Shirts", apiCategory: "men-t-shirts" },
          { id: "cardigans", name: "Cardigans", apiCategory: "men-cardigans" },
          { id: "knitwear", name: "Knitwear & Sweaters", apiCategory: "men-knitwear" },
          { id: "hoodies", name: "Sweatshirts & Hoodies", apiCategory: "men-hoodies" },
        ]
      },
      bottoms: {
        name: "Bottoms",
        items: [
          { id: "all-bottoms", name: "All Bottoms", apiCategory: "men-bottoms" },
          { id: "pants", name: "Pants", apiCategory: "men-pants" },
          { id: "shorts", name: "Shorts", apiCategory: "men-shorts" },
        ]
      },
      dressJumpsuits: {
        name: "Dress & Jumpsuits",
        items: [
          { id: "all-dress", name: "All Dress & Jumpsuits", apiCategory: "men-dress" },
          { id: "casual-dress", name: "Casual Dress", apiCategory: "men-casual-dress" },
          { id: "formal-dress", name: "Formal Dress", apiCategory: "men-formal-dress" },
        ]
      },
      accessories: {
        name: "Accessories",
        items: [
          { id: "all-accessories", name: "All Accessories", apiCategory: "men-accessories" },
          { id: "bags", name: "Bags", apiCategory: "men-bags" },
          { id: "jewelry", name: "Jewelry", apiCategory: "men-jewelry" },
        ]
      },
      collections: {
        name: "Collections",
        items: [
          { id: "all-collections", name: "All Collections", apiCategory: "all-men" },
          { id: "new-arrivals", name: "New Arrivals", apiCategory: "men-new-arrivals" },
          { id: "best-sellers", name: "Best Sellers", apiCategory: "men-best-sellers" },
        ]
      }
    }
  },
  women: {
    name: 'Women',
    path: '/women-product',
    defaultCategory: 'all-ladies',
    categories: {
      // Similar structure as men's categories
      tops: {
        name: "Tops",
        items: [
          { id: "all-items", name: "All Items", apiCategory: "ladies-shirts" },
          { id: "t-shirts", name: "T-Shirts", apiCategory: "ladies-t-shirts" },
          { id: "cardigans", name: "Cardigans", apiCategory: "ladies-cardigans" },
          { id: "knitwear", name: "Knitwear & Sweaters", apiCategory: "ladies-knitwear" },
        ]
      },
     bottoms: {
      name: "Bottoms",
      defaultCategory: "all-ladies",
      items: [
        { id: "all-bottoms", name: "All Bottoms", apiCategory: "ladies-bottoms" },
        { id: "pants", name: "Pants", apiCategory: "ladies-pants" },
        { id: "shorts", name: "Shorts", apiCategory: "ladies-shorts" },
      ],
    },
    dressJumpsuits: {
      name: "Dress & Jumpsuits",
      defaultCategory: "all-ladies",
      items: [
        { id: "all-dresses", name: "All Dresses", apiCategory: "ladies-dresses" },
        { id: "casual", name: "Casual Dresses", apiCategory: "ladies-casual-dresses" },
        { id: "formal", name: "Formal Dresses", apiCategory: "ladies-formal-dresses" },
      ],
    },
    accessories: {
      name: "Accessories",
      defaultCategory: "all-ladies",
      items: [
        { id: "all-accessories", name: "All Accessories", apiCategory: "ladies-accessories" },
        { id: "bags", name: "Bags", apiCategory: "ladies-bags" },
        { id: "jewelry", name: "Jewelry", apiCategory: "ladies-jewelry" },
      ],
    },
    collections: {
      name: "Collections",
      defaultCategory: "all-ladies",
      items: [
        { id: "all-collections", name: "All Collections", apiCategory: "all-ladies" },
        { id: "new-arrivals", name: "New Arrivals", apiCategory: "ladies-new-arrivals" },
        { id: "best-sellers", name: "Best Sellers", apiCategory: "ladies-best-sellers" },
      ],
    },
    }
  },
  kids: {
    name: 'Kids',
    path: '/kids-product',
    defaultCategory: 'all-kids',
    categories: {
      boysClothing: {
        name: "Boys' Clothing",
        items: [
          { id: "all-boys", name: "All Boys' Items", apiCategory: "boys-clothing" },
          { id: "boys-tops", name: "Tops", apiCategory: "boys-tops" },
          { id: "boys-bottoms", name: "Bottoms", apiCategory: "boys-bottoms" },
        ]
      },
      girlsClothing: {
        name: "Girls' Clothing",
        items: [
          { id: "all-girls", name: "All Girls' Items", apiCategory: "girls-clothing" },
          { id: "girls-tops", name: "Tops", apiCategory: "girls-tops" },
          { id: "girls-bottoms", name: "Bottoms", apiCategory: "girls-bottoms" },
        ]
      },
      kidsAccessories: {
        name: "Kids' Accessories",
        items: [
          { id: "all-kids-accessories", name: "All Accessories", apiCategory: "kids-accessories" },
          { id: "kids-bags", name: "Bags", apiCategory: "kids-bags" },
          { id: "kids-shoes", name: "Shoes", apiCategory: "kids-shoes" },
        ]
      }
    }
  },
  shoes: {
    name: 'Shoes',
    path: '/shoes-product',
    defaultCategory: 'all',
    categories: {
      menShoes: {
        name: "Men Shoes",
        items: [
          { id: "all-men-shoes", name: "All Men's Shoes", apiCategory: "men-shoes" },
          { id: "men-sneakers", name: "Sneakers", apiCategory: "men-sneakers" },
          { id: "men-boots", name: "Boots", apiCategory: "men-boots" },
        ]
      },
      womenShoes: {
        name: "Women Shoes",
        items: [
          { id: "all-ladies-shoes", name: "All Women's Shoes", apiCategory: "ladies-shoes" },
          { id: "ladies-sneakers", name: "Sneakers", apiCategory: "ladies-sneakers" },
          { id: "ladies-heels", name: "Heels", apiCategory: "ladies-heels" },
        ]
      }
    }
  },
  accessories: {
    name: 'Accessories',
    path: '/accessories-product',
    defaultCategory: 'all',
    categories: {
      // Accessories categories structure
      menAccessories: {
      name: "Men Accessories",
      defaultCategory: "men-accessories",
      items: [
        { id: "all-men-accessories", name: "All Men's Accessories", apiCategory: "men-accessories" },
        { id: "men-bags", name: "Bags", apiCategory: "men-bags" },
        { id: "men-jewelry", name: "Jewelry", apiCategory: "men-jewelry" },
        { id: "men-belts", name: "Belts", apiCategory: "men-belts" },
      ],
    },
    womenAccessories: {
      name: "Women Accessories",
      defaultCategory: "ladies-accessories",
      items: [
        { id: "all-ladies-accessories", name: "All Women's Accessories", apiCategory: "ladies-accessories" },
        { id: "ladies-bags", name: "Bags", apiCategory: "ladies-bags" },
        { id: "ladies-jewelry", name: "Jewelry", apiCategory: "ladies-jewelry" },
        { id: "ladies-scarves", name: "Scarves", apiCategory: "ladies-scarves" },
      ],
    },
    }
  }
} 