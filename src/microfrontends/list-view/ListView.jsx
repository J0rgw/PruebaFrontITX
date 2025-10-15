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

  // Get current page products using useMemo for optimization
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="list-view-loading">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="list-view-error">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="list-view">
      <div className="list-view-container">
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por marca o modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron productos que coincidan con tu búsqueda</p>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {currentProducts.map((product, index) => (
                <FadeContent key={product.id} delay={index * 0.05}>
                  <Link
                    to={`/product/${product.id}`}
                    className="product-card-link"
                  >
                    <div className="product-card">
                      <div className="product-image-wrapper">
                        <img
                          src={product.imgUrl}
                          alt={product.model}
                          className="product-image"
                          loading="lazy"
                        />
                      </div>
                      <div className="product-info">
                        <h3 className="product-brand">{product.brand}</h3>
                        <p className="product-model">{product.model}</p>
                        <p className="product-price">
                          {product.price ? `€${product.price}` : 'Precio no disponible'}
                        </p>
                      </div>
                    </div>
                  </Link>
                </FadeContent>
              ))}
            </div>

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
    </div>
  );
};

export default ListView;
