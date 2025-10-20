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
      <div className="details-loading" role="status" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true"></div>
        <p>Cargando detalles del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-error" role="alert" aria-live="assertive">
        <p>Error: {error}</p>
        <Link to="/" className="back-link" aria-label="Volver a la lista de productos">
          <FiArrowLeft aria-hidden="true" /> Volver a la lista
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="details-error" role="alert" aria-live="assertive">
        <p>Producto no encontrado</p>
        <Link to="/" className="back-link" aria-label="Volver a la lista de productos">
          <FiArrowLeft aria-hidden="true" /> Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <main id="main-content" className="details-view">
      <div className="details-container">
        <nav aria-label="Navegación de regreso">
          <Link to="/" className="back-link" aria-label="Volver a la lista de productos">
            <FiArrowLeft aria-hidden="true" /> Volver a la lista
          </Link>
        </nav>

        <article className="details-content">
          {/* Left Column - Image */}
          <div className="details-image-column">
            <figure className="image-wrapper">
              <img
                src={product.imgUrl}
                alt={`${product.brand} ${product.model}`}
                className="product-detail-image"
              />
            </figure>
          </div>

          {/* Right Column - Description and Actions */}
          <div className="details-info-column">
            {/* Product Header */}
            <header className="product-header">
              <h1 className="product-title">{product.brand} {product.model}</h1>
              <p className="product-price-large" aria-label={`Precio: ${product.price ? product.price + ' euros' : 'Fuera de stock'}`}>
                {product.price ? `€${product.price}` : 'Fuera de stock'}
              </p>
            </header>

            {/* Product Specifications */}
            <section className="product-specs" aria-labelledby="specs-heading">
              <h2 id="specs-heading" className="specs-title">Especificaciones técnicas</h2>

              <dl className="specs-list">
                <div className="spec-item">
                  <dt className="spec-label">Marca:</dt>
                  <dd className="spec-value">{product.brand || 'N/A'}</dd>
                </div>

                <div className="spec-item">
                  <dt className="spec-label">Modelo:</dt>
                  <dd className="spec-value">{product.model || 'N/A'}</dd>
                </div>

                <div className="spec-item">
                  <dt className="spec-label">CPU:</dt>
                  <dd className="spec-value">{product.cpu || 'N/A'}</dd>
                </div>

                <div className="spec-item">
                  <dt className="spec-label">RAM:</dt>
                  <dd className="spec-value">{product.ram || 'N/A'}</dd>
                </div>

                <div className="spec-item">
                  <dt className="spec-label">Sistema Operativo:</dt>
                  <dd className="spec-value">{product.os || 'N/A'}</dd>
                </div>

                <div className="spec-item">
                  <dt className="spec-label">Resolución de pantalla:</dt>
                  <dd className="spec-value">{product.displayResolution || 'N/A'}</dd>
                </div>

                <div className="spec-item">
                  <dt className="spec-label">Batería:</dt>
                  <dd className="spec-value">{product.battery || 'N/A'}</dd>
                </div>

                <div className="spec-item">
                  <dt className="spec-label">Cámaras:</dt>
                  <dd className="spec-value">
                    {product.primaryCamera || product.secondaryCmera
                      ? `Principal: ${product.primaryCamera || 'N/A'}, Frontal: ${product.secondaryCmera || 'N/A'}`
                      : 'N/A'}
                  </dd>
                </div>

                <div className="spec-item">
                  <dt className="spec-label">Dimensiones:</dt>
                  <dd className="spec-value">{product.dimentions || 'N/A'}</dd>
                </div>

                <div className="spec-item">
                  <dt className="spec-label">Peso:</dt>
                  <dd className="spec-value">{product.weight || 'N/A'}</dd>
                </div>
              </dl>
            </section>

            {/* Actions Component */}
            <Actions product={product} />
          </div>
        </article>
      </div>
    </main>
  );
};

export default DetailsView;
