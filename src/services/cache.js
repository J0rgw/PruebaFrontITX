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
    } catch {
      // Silently fail if localStorage is not available
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
    } catch {
      // Silently fail and return null if cache is corrupted
      return null;
    }
  },

  // Clear specific cache item
  clear: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail if localStorage is not available
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
    } catch {
      // Silently fail if localStorage is not available
    }
  }
};
