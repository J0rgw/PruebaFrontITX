import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Actions from './Actions'
import { cartService } from '../../services/api'

vi.mock('../../services/api', () => ({
  cartService: {
    addToCart: vi.fn()
  }
}))

describe('Actions Component', () => {
  const mockProduct = {
    id: '1',
    price: 599,
    options: {
      storages: [
        { code: '128GB', name: '128 GB' },
        { code: '256GB', name: '256 GB' }
      ],
      colors: [
        { code: 'black', name: 'Negro' },
        { code: 'white', name: 'Blanco' }
      ]
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
    window.alert = vi.fn()
    window.dispatchEvent = vi.fn()
  })

  it('should render storage and color options', () => {
    render(<Actions product={mockProduct} />)

    expect(screen.getByText('128 GB')).toBeInTheDocument()
    expect(screen.getByText('256 GB')).toBeInTheDocument()
    expect(screen.getByText('Negro')).toBeInTheDocument()
    expect(screen.getByText('Blanco')).toBeInTheDocument()
  })

  it('should disable add button when no options selected', () => {
    render(<Actions product={mockProduct} />)

    const addButton = screen.getByRole('button', { name: /añadir al carrito/i })

    expect(addButton).toBeDisabled()
  })

  it('should allow selecting storage and color', () => {
    render(<Actions product={mockProduct} />)

    const storageButton = screen.getByText('128 GB')
    const colorButton = screen.getByText('Negro')

    fireEvent.click(storageButton)
    fireEvent.click(colorButton)

    expect(storageButton).toHaveClass('selected')
    expect(colorButton).toHaveClass('selected')
  })

  it('should call addToCart with correct parameters when all options selected', async () => {
    cartService.addToCart.mockResolvedValue({ count: 1 })
    render(<Actions product={mockProduct} />)

    const storageButton = screen.getByText('128 GB')
    const colorButton = screen.getByText('Negro')
    const addButton = screen.getByRole('button', { name: /añadir al carrito/i })

    fireEvent.click(storageButton)
    fireEvent.click(colorButton)
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(cartService.addToCart).toHaveBeenCalledWith('1', 'black', '128GB')
    })
  })

  it('should dispatch cartUpdated event after successful add', async () => {
    cartService.addToCart.mockResolvedValue({ count: 1 })
    render(<Actions product={mockProduct} />)

    const storageButton = screen.getByText('128 GB')
    const colorButton = screen.getByText('Negro')
    const addButton = screen.getByRole('button', { name: /añadir al carrito/i })

    fireEvent.click(storageButton)
    fireEvent.click(colorButton)
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(window.dispatchEvent).toHaveBeenCalledWith(expect.any(Event))
    })
  })

  it('should show success message after adding to cart', async () => {
    cartService.addToCart.mockResolvedValue({ count: 1 })
    render(<Actions product={mockProduct} />)

    const storageButton = screen.getByText('128 GB')
    const colorButton = screen.getByText('Negro')
    const addButton = screen.getByRole('button', { name: /añadir al carrito/i })

    fireEvent.click(storageButton)
    fireEvent.click(colorButton)
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText(/añadido al carrito/i)).toBeInTheDocument()
    })
  })

  it('should show alert on error', async () => {
    cartService.addToCart.mockRejectedValue(new Error('Network error'))
    render(<Actions product={mockProduct} />)

    const storageButton = screen.getByText('128 GB')
    const colorButton = screen.getByText('Negro')
    const addButton = screen.getByRole('button', { name: /añadir al carrito/i })

    fireEvent.click(storageButton)
    fireEvent.click(colorButton)
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Error al añadir al carrito: Network error')
    })
  })

  it('should show no options message when no storage available', () => {
    const productNoOptions = {
      id: '1',
      price: 599,
      options: {
        storages: [],
        colors: []
      }
    }

    render(<Actions product={productNoOptions} />)

    const noOptionsMessages = screen.getAllByText('No hay opciones disponibles')
    expect(noOptionsMessages).toHaveLength(2)
  })

  it('should enable add button when both options selected', () => {
    render(<Actions product={mockProduct} />)

    const storageButton = screen.getByText('128 GB')
    const colorButton = screen.getByText('Negro')
    const addButton = screen.getByRole('button', { name: /añadir al carrito/i })

    expect(addButton).toBeDisabled()

    fireEvent.click(storageButton)
    fireEvent.click(colorButton)

    expect(addButton).not.toBeDisabled()
  })

  it('should show out of stock banner and disable actions when product has no price', () => {
    const productWithoutPrice = {
      id: '1',
      price: null,
      options: {
        storages: [
          { code: '128GB', name: '128 GB' }
        ],
        colors: [
          { code: 'black', name: 'Negro' }
        ]
      }
    }

    render(<Actions product={productWithoutPrice} />)

    expect(screen.getByText('Este producto está actualmente fuera de stock')).toBeInTheDocument()

    const addButton = screen.getByRole('button', { name: /fuera de stock/i })
    expect(addButton).toBeDisabled()

    const storageButton = screen.getByText('128 GB')
    const colorButton = screen.getByText('Negro')
    expect(storageButton).toBeDisabled()
    expect(colorButton).toBeDisabled()
  })
})
