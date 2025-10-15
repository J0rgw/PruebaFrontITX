// Cache service with 1-hour expiration
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export const cacheService = {
  // Set item in cache with timestamp
  set: (key, data) => {
    const cacheItem = {
      data,
      timestamp: Date.now()
    };
    try {
      localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  },

  // Get item from cache if not expired
  get: (key) => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const cacheItem = JSON.parse(cached);
      const now = Date.now();
      const age = now - cacheItem.timestamp;

      // Check if cache has expired (older than 1 hour)
      if (age > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  },

  // Clear specific cache item
  clear: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  },

  // Clear all cache
  clearAll: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing all cache:', error);
    }
  }
};
