import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../../services/api';

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

  if (loading) return <div>Cargando detalles del producto...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ marginBottom: '20px', display: 'inline-block' }}>
        ← Volver a la lista
      </Link>

      <div style={{
        border: '1px solid #ddd',
        padding: '30px',
        borderRadius: '5px'
      }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <img
            src={product.imgUrl}
            alt={product.model}
            style={{
              width: '300px',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '5px'
            }}
          />

          <div style={{ flex: 1 }}>
            <h1>{product.brand}</h1>
            <h2>{product.model}</h2>
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Precio:</strong> ${product.price || 'No disponible'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsView;
