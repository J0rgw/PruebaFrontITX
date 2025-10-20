import { describe, it, expect, beforeEach, vi } from 'vitest'
import { productService, cartService } from './api'

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('getAllProducts', () => {
    it('should fetch from API successfully', async () => {
      const result = await productService.getAllProducts()

      expect(result).toBeDefined()
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should return cached data on second call', async () => {
      const firstCall = await productService.getAllProducts()

      const cachedKey = 'cache_products_all'
      const cached = localStorage.getItem(cachedKey)
      expect(cached).toBeTruthy()

      const secondCall = await productService.getAllProducts()
      expect(secondCall).toEqual(firstCall)
    })
  })

  describe('getProductById', () => {
    it('should fetch product from API successfully', async () => {
      const result = await productService.getProductById('1')

      expect(result).toBeDefined()
      expect(result.id).toBe('1')
    })

    it('should return cached product on second call', async () => {
      const firstCall = await productService.getProductById('2')

      const cachedKey = 'cache_product_2'
      const cached = localStorage.getItem(cachedKey)
      expect(cached).toBeTruthy()

      const secondCall = await productService.getProductById('2')
      expect(secondCall).toEqual(firstCall)
    })
  })
})

describe('cartService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('addToCart', () => {
    it('should add product to cart and increment count', async () => {
      localStorage.setItem('cart_count', '5')

      const result = await cartService.addToCart('1', 'black', '128GB')

      expect(result.count).toBe(6)
      expect(localStorage.getItem('cart_count')).toBe('6')
    })

    it('should start count at 1 if no previous count exists', async () => {
      const result = await cartService.addToCart('1', 'black', '128GB')

      expect(result.count).toBe(1)
      expect(localStorage.getItem('cart_count')).toBe('1')
    })

    it('should throw error if API request fails', async () => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 400
      }))

      await expect(cartService.addToCart('1', 'black', '128GB')).rejects.toThrow('Error al añadir al carrito')
      vi.unstubAllGlobals()
    })
  })

  describe('getCartCount', () => {
    it('should return cart count from localStorage', () => {
      localStorage.setItem('cart_count', '10')

      const count = cartService.getCartCount()

      expect(count).toBe(10)
    })

    it('should return 0 if no count exists', () => {
      const count = cartService.getCartCount()

      expect(count).toBe(0)
    })
  })

  describe('setCartCount', () => {
    it('should update cart count in localStorage', () => {
      cartService.setCartCount(15)

      expect(localStorage.getItem('cart_count')).toBe('15')
    })
  })

  describe('clearCart', () => {
    it('should remove cart count from localStorage', () => {
      localStorage.setItem('cart_count', '5')

      cartService.clearCart()

      expect(localStorage.getItem('cart_count')).toBeNull()
    })
  })
})
