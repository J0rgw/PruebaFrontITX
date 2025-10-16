import { test, expect } from '@playwright/test'

test.describe('Product Flow', () => {
  test('should navigate from product list to product details', async ({ page }) => {
    await page.goto('/')

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"], .product-card, article', {
      timeout: 10000
    })

    // Click on first product
    await page.locator('[data-testid="product-card"], .product-card, article').first().click()

    // Verify we're on the details page
    await expect(page).toHaveURL(/\/product\/\d+/)

    // Check that product details are visible
    await expect(page.locator('h1, .product-title')).toBeVisible()
  })

  test('should add product to cart with selections', async ({ page }) => {
    await page.goto('/')

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"], .product-card, article', {
      timeout: 10000
    })

    // Click on first product
    await page.locator('[data-testid="product-card"], .product-card, article').first().click()

    // Wait for product details to load
    await page.waitForLoadState('networkidle')

    // Select storage option (if multiple options exist)
    const storageButtons = page.locator('.selector-option').first()
    if (await storageButtons.isVisible()) {
      await storageButtons.click()
    }

    // Select color option (if multiple options exist)
    const colorButtons = page.locator('.color-option').first()
    if (await colorButtons.isVisible()) {
      await colorButtons.click()
    }

    // Wait for cart to be ready
    await page.waitForTimeout(500)

    // Click add to cart button
    await page.locator('button:has-text("Añadir al Carrito"), .add-to-cart-btn').click()

    // Wait for success message or cart update
    await page.waitForTimeout(1000)

    // Verify success feedback (either message or button state change)
    await expect(
      page.locator('text=/Añadido|success/i, .success')
    ).toBeVisible({ timeout: 5000 })
  })

  test('should display product information correctly', async ({ page }) => {
    await page.goto('/')

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"], .product-card, article', {
      timeout: 10000
    })

    // Verify product cards have essential information
    const firstProduct = page.locator('[data-testid="product-card"], .product-card, article').first()

    // Check that product has an image
    await expect(firstProduct.locator('img')).toBeVisible()

    // Check that product has a price
    await expect(firstProduct.locator('text=/€|\\$/i, .price')).toBeVisible()
  })

  test('should handle pagination if available', async ({ page }) => {
    await page.goto('/')

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"], .product-card, article', {
      timeout: 10000
    })

    // Check if pagination exists
    const pagination = page.locator('.pagination-container, [data-testid="pagination"]')

    if (await pagination.isVisible()) {
      // Click next page
      await page.locator('.pagination-btn:has-text("›"), button[aria-label*="siguiente"]').click()

      // Wait for page to update
      await page.waitForLoadState('networkidle')

      // Verify we're on a different page (URL or content changed)
      await page.waitForTimeout(500)

      // Products should still be visible
      await expect(page.locator('[data-testid="product-card"], .product-card, article').first()).toBeVisible()
    }
  })

  test('should load and display header with cart', async ({ page }) => {
    await page.goto('/')

    // Verify header is visible
    await expect(page.locator('header, [data-testid="header"]')).toBeVisible()

    // Verify cart icon is visible
    await expect(page.locator('.cart-icon, [data-testid="cart-icon"]').first()).toBeVisible()
  })
})
