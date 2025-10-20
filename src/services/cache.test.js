import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cacheService } from './cache'

describe('cacheService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('set', () => {
    it('should store data with timestamp in localStorage', () => {
      const testData = { id: 1, name: 'Test' }
      const testKey = 'test_key'

      cacheService.set(testKey, testData)

      const stored = localStorage.getItem(testKey)
      expect(stored).toBeTruthy()
      expect(stored).toContain('"data"')
      expect(stored).toContain('"timestamp"')

      const parsed = JSON.parse(stored)
      expect(parsed.data).toEqual(testData)
      expect(parsed.timestamp).toBeDefined()
    })

  })

  describe('get', () => {
    it('should retrieve non-expired data from cache', () => {
      const testData = { id: 1, name: 'Test' }
      const cacheItem = {
        data: testData,
        timestamp: Date.now()
      }

      localStorage.setItem('test_key', JSON.stringify(cacheItem))

      const result = cacheService.get('test_key')

      expect(result).toEqual(testData)
    })

    it('should return null if cache does not exist', () => {
      const result = cacheService.get('nonexistent_key')

      expect(result).toBeNull()
    })

    it('should return null and remove expired cache', () => {
      const expiredCacheItem = {
        data: { id: 1 },
        timestamp: Date.now() - (61 * 60 * 1000) // 61 minutes ago
      }

      localStorage.setItem('expired_key', JSON.stringify(expiredCacheItem))

      const result = cacheService.get('expired_key')

      expect(result).toBeNull()
      expect(localStorage.getItem('expired_key')).toBeNull()
    })

    it('should handle errors when reading from cache', () => {
      localStorage.setItem('test_key', 'invalid json')

      const result = cacheService.get('test_key')

      expect(result).toBeNull()
    })
  })

  describe('clear', () => {
    it('should remove specific cache item', () => {
      localStorage.setItem('test_key', 'value')

      cacheService.clear('test_key')

      expect(localStorage.getItem('test_key')).toBeNull()
    })

  })

  describe('clearAll', () => {
    it('should clear all cache items with cache_ prefix', () => {
      localStorage.setItem('cache_product_1', 'val1')
      localStorage.setItem('cache_product_2', 'val2')
      localStorage.setItem('other_key', 'val3')
      localStorage.setItem('cache_cart', 'val4')

      cacheService.clearAll()

      expect(localStorage.getItem('cache_product_1')).toBeNull()
      expect(localStorage.getItem('cache_product_2')).toBeNull()
      expect(localStorage.getItem('cache_cart')).toBeNull()
      expect(localStorage.getItem('other_key')).toBe('val3')
    })

  })
})
