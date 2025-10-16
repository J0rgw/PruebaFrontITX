import { http, HttpResponse } from 'msw'

const API_BASE_URL = 'https://itx-frontend-test.onrender.com/api'

// Mock data
const mockProducts = [
  {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 15',
    price: '999',
    imgUrl: '/images/iphone.jpg',
    networkTechnology: '5G',
    networkSpeed: 'LTE',
    storage: ['128GB', '256GB', '512GB'],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'White', code: '#FFFFFF' }
    ]
  }
]

const mockProductDetail = {
  id: '1',
  brand: 'Apple',
  model: 'iPhone 15',
  price: '999',
  imgUrl: '/images/iphone.jpg',
  networkTechnology: '5G',
  networkSpeed: 'LTE',
  storage: ['128GB', '256GB', '512GB'],
  colors: [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' }
  ],
  description: 'Latest iPhone model'
}

export const handlers = [
  // Get all products
  http.get(`${API_BASE_URL}/product`, () => {
    return HttpResponse.json(mockProducts)
  }),

  // Get product by ID
  http.get(`${API_BASE_URL}/product/:id`, ({ params }) => {
    return HttpResponse.json({ ...mockProductDetail, id: params.id })
  }),

  // Add to cart
  http.post(`${API_BASE_URL}/cart`, async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      count: 1,
      ...body
    })
  }),
]
