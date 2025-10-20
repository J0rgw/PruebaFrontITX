import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { productService } from '../../services/api';
import FadeContent from '../../components/FadeContent/FadeContent';
import Pagination from '../../components/Pagination/Pagination';
import './ListView.css';

const ITEMS_PER_PAGE = 16;

const ListView = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products in real-time as user types
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      setCurrentPage(1); // Reset to first page when clearing search
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = products.filter(product => {
      const brand = product.brand?.toLowerCase() || '';
      const model = product.model?.toLowerCase() || '';
      return brand.includes(term) || model.includes(term);
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when searching
  }, [searchTerm, products]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // Sort products: products with price first, then out of stock at the end
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const aHasPrice = a.price && a.price !== null && a.price !== '';
      const bHasPrice = b.price && b.price !== null && b.price !== '';

      if (aHasPrice && !bHasPrice) return -1;
      if (!aHasPrice && bHasPrice) return 1;
      return 0;
    });
  }, [filteredProducts]);

  // Get current page products using useMemo for optimization
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="list-view-loading" role="status" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-view-error" role="alert" aria-live="assertive">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <main id="main-content" className="list-view">
      <div className="list-view-container">
        {/* Search Bar */}
        <div className="search-container" role="search">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" aria-hidden="true" />
            <label htmlFor="product-search" className="sr-only">
              Buscar productos por marca o modelo
            </label>
            <input
              id="product-search"
              type="search"
              className="search-input"
              placeholder="Buscar por marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos por marca o modelo"
              aria-describedby="search-results-count"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Results Count */}
        <div
          id="search-results-count"
          className="results-count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="sr-only">
            {filteredProducts.length === 0
              ? 'No se encontraron productos'
              : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}`
            }
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-results" role="region" aria-label="Sin resultados">
            <p>No se encontraron productos que coincidan con tu búsqueda</p>
          </div>
        ) : (
          <>
            <section className="product-grid" role="region" aria-label="Resultados de productos">
              {currentProducts.map((product, index) => {
                const isOutOfStock = !product.price || product.price === null || product.price === '';
                return (
                  <FadeContent key={product.id} delay={index * 0.05}>
                    <article className="product-card-wrapper">
                      <Link
                        to={`/product/${product.id}`}
                        className="product-card-link"
                        aria-label={`Ver detalles de ${product.brand} ${product.model}${product.price ? `, precio ${product.price} euros` : ', fuera de stock'}`}
                      >
                        <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
                          <div className="product-image-wrapper">
                            <img
                              src={product.imgUrl}
                              alt={`${product.brand} ${product.model}`}
                              className="product-image"
                              loading="lazy"
                            />
                          </div>
                          <div className="product-info">
                            <h2 className="product-brand">{product.brand}</h2>
                            <p className="product-model">{product.model}</p>
                            <p className="product-price" aria-label={`Precio: ${product.price ? product.price + ' euros' : 'Fuera de stock'}`}>
                              {product.price ? `€${product.price}` : 'Fuera de stock'}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </FadeContent>
                );
              })}
            </section>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={filteredProducts.length}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default ListView;
