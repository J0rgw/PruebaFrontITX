import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);

      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range if at the beginning or end
      if (currentPage <= 3) {
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination-container" aria-label="Paginación de productos" role="navigation">
      <div className="pagination-info" role="status" aria-live="polite" aria-atomic="true">
        Mostrando {startItem} - {endItem} de {totalItems} productos
      </div>

      <div className="pagination-controls" role="group" aria-label="Controles de paginación">
        <button
          type="button"
          className="pagination-btn pagination-arrow"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Ir a la página anterior"
        >
          <FiChevronLeft aria-hidden="true" />
        </button>

        <div className="pagination-numbers" role="group" aria-label="Números de página">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis" aria-hidden="true">
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                className={`pagination-btn pagination-number ${
                  currentPage === page ? 'active' : ''
                }`}
                onClick={() => handlePageClick(page)}
                aria-label={currentPage === page ? `Página actual: ${page}` : `Ir a página ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          type="button"
          className="pagination-btn pagination-arrow"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Ir a la página siguiente"
        >
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
