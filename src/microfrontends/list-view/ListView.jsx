import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/api';

const ListView = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Productos</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {products.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              <img
                src={product.imgUrl}
                alt={product.model}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <h3>{product.brand}</h3>
              <p>{product.model}</p>
              <p><strong>Precio: ${product.price || 'N/A'}</strong></p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListView;
