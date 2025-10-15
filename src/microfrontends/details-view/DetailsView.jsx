import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { productService } from '../../services/api';
import Actions from '../../components/Actions/Actions';
import './DetailsView.css';

const DetailsView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        if (!data) {
          setError('Producto no encontrado');
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Cargando detalles del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-error">
        <p>Error: {error}</p>
        <Link to="/" className="back-link">
          <FiArrowLeft /> Volver a la lista
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="details-error">
        <p>Producto no encontrado</p>
        <Link to="/" className="back-link">
          <FiArrowLeft /> Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="details-view">
      <div className="details-container">
        <Link to="/" className="back-link">
          <FiArrowLeft /> Volver a la lista
        </Link>

        <div className="details-content">
          {/* Left Column - Image */}
          <div className="details-image-column">
            <div className="image-wrapper">
              <img
                src={product.imgUrl}
                alt={product.model}
                className="product-detail-image"
              />
            </div>
          </div>

          {/* Right Column - Description and Actions */}
          <div className="details-info-column">
            {/* Product Header */}
            <div className="product-header">
              <h1 className="product-title">{product.brand} {product.model}</h1>
              <p className="product-price-large">
                {product.price ? `€${product.price}` : 'Precio no disponible'}
              </p>
            </div>

            {/* Product Specifications */}
            <div className="product-specs">
              <h3 className="specs-title">Especificaciones</h3>

              <div className="spec-item">
                <span className="spec-label">Marca:</span>
                <span className="spec-value">{product.brand || 'N/A'}</span>
              </div>

              <div className="spec-item">
                <span className="spec-label">Modelo:</span>
                <span className="spec-value">{product.model || 'N/A'}</span>
              </div>

              <div className="spec-item">
                <span className="spec-label">CPU:</span>
                <span className="spec-value">{product.cpu || 'N/A'}</span>
              </div>

              <div className="spec-item">
                <span className="spec-label">RAM:</span>
                <span className="spec-value">{product.ram || 'N/A'}</span>
              </div>

              <div className="spec-item">
                <span className="spec-label">Sistema Operativo:</span>
                <span className="spec-value">{product.os || 'N/A'}</span>
              </div>

              <div className="spec-item">
                <span className="spec-label">Resolución:</span>
                <span className="spec-value">{product.displayResolution || 'N/A'}</span>
              </div>

              <div className="spec-item">
                <span className="spec-label">Batería:</span>
                <span className="spec-value">{product.battery || 'N/A'}</span>
              </div>

              <div className="spec-item">
                <span className="spec-label">Cámaras:</span>
                <span className="spec-value">
                  {product.primaryCamera || product.secondaryCmera
                    ? `Principal: ${product.primaryCamera || 'N/A'}, Frontal: ${product.secondaryCmera || 'N/A'}`
                    : 'N/A'}
                </span>
              </div>

              <div className="spec-item">
                <span className="spec-label">Dimensiones:</span>
                <span className="spec-value">{product.dimentions || 'N/A'}</span>
              </div>

              <div className="spec-item">
                <span className="spec-label">Peso:</span>
                <span className="spec-value">{product.weight || 'N/A'}</span>
              </div>
            </div>

            {/* Actions Component */}
            <Actions product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
