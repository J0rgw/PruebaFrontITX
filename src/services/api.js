import { cacheService } from './cache';

const API_BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export const productService = {
  getAllProducts: async () => {
    const cacheKey = 'cache_products_all';

    // Try to get from cache first
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // If not in cache, fetch from API
    try {
      const response = await fetch(`${API_BASE_URL}/product`);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      const data = await response.json();

      // Store in cache
      cacheService.set(cacheKey, data);

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    const cacheKey = `cache_product_${id}`;

    // Try to get from cache first
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // If not in cache, fetch from API
    try {
      const response = await fetch(`${API_BASE_URL}/product/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener producto');
      }
      const data = await response.json();

      // Store in cache
      cacheService.set(cacheKey, data);

      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};

export const cartService = {
  // Add product to cart via API
  addToCart: async (id, colorCode, storageCode) => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          colorCode,
          storageCode
        })
      });

      if (!response.ok) {
        throw new Error('Error al añadir al carrito');
      }

      const data = await response.json();

      console.log('API Response:', data);

      // The API always returns count: 1, so we need to increment our local counter
      // Get current count from localStorage
      const currentCount = cartService.getCartCount();
      const newCount = currentCount + 1;

      // Update localStorage with incremented count
      localStorage.setItem('cart_count', newCount.toString());
      console.log('Cart count incremented to:', newCount);

      // Return data with our local count
      return { ...data, count: newCount };
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Get current cart count from localStorage
  getCartCount: () => {
    const count = localStorage.getItem('cart_count');
    return count ? parseInt(count, 10) : 0;
  },

  // Update cart count in localStorage
  setCartCount: (count) => {
    localStorage.setItem('cart_count', count.toString());
  },

  // Clear cart count
  clearCart: () => {
    localStorage.removeItem('cart_count');
  }
};
