import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
    itemsPerPage: 10,
    totalItems: 100
  }

  beforeEach(() => {
    vi.clearAllMocks()
    window.scrollTo = vi.fn()
  })

  it('should not render when totalPages is 1 or less', () => {
    const { container } = render(<Pagination {...defaultProps} totalPages={1} />)
    expect(container.firstChild).toBeNull()
  })

  it('should display correct item range info', () => {
    render(<Pagination {...defaultProps} />)
    expect(screen.getByText('Mostrando 1 - 10 de 100 productos')).toBeInTheDocument()
  })

  it('should calculate correct end item on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} totalItems={95} />)
    expect(screen.getByText('Mostrando 91 - 95 de 95 productos')).toBeInTheDocument()
  })

  it('should disable previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />)
    const prevButton = screen.getByLabelText('Página anterior')
    expect(prevButton).toBeDisabled()
  })

  it('should disable next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />)
    const nextButton = screen.getByLabelText('Página siguiente')
    expect(nextButton).toBeDisabled()
  })

  it('should call onPageChange when clicking next button', () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />)

    const nextButton = screen.getByLabelText('Página siguiente')
    fireEvent.click(nextButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('should call onPageChange when clicking previous button', () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)

    const prevButton = screen.getByLabelText('Página anterior')
    fireEvent.click(prevButton)

    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('should call onPageChange when clicking a page number', () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />)

    const pageButton = screen.getByRole('button', { name: '2' })
    fireEvent.click(pageButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('should scroll to top when changing page', () => {
    render(<Pagination {...defaultProps} />)

    const nextButton = screen.getByLabelText('Página siguiente')
    fireEvent.click(nextButton)

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('should show all pages when totalPages is 5 or less', () => {
    render(<Pagination {...defaultProps} totalPages={5} />)

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByRole('button', { name: String(i) })).toBeInTheDocument()
    }
  })

  it('should show ellipsis when there are many pages', () => {
    render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />)

    const ellipsis = screen.getAllByText('...')
    expect(ellipsis.length).toBeGreaterThan(0)
  })

  it('should show first and last page when totalPages > 5', () => {
    render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />)

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument()
  })

  it('should highlight current page', () => {
    render(<Pagination {...defaultProps} currentPage={2} />)

    const currentPageButton = screen.getByRole('button', { name: '2' })
    expect(currentPageButton).toHaveClass('active')
  })

  it('should not call onPageChange when clicking ellipsis', () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} totalPages={20} onPageChange={onPageChange} />)

    const ellipsis = screen.getAllByText('...')
    fireEvent.click(ellipsis[0])

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('should not call onPageChange when clicking current page', () => {
    const onPageChange = vi.fn()
    render(<Pagination {...defaultProps} currentPage={2} onPageChange={onPageChange} />)

    const currentPageButton = screen.getByRole('button', { name: '2' })
    fireEvent.click(currentPageButton)

    expect(onPageChange).not.toHaveBeenCalled()
  })
})
