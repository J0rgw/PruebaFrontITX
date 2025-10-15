import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{
      padding: '20px',
      backgroundColor: '#333',
      color: 'white',
      marginBottom: '20px'
    }}>
      <h1>Tienda de Productos</h1>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '15px' }}>
          Lista de Productos
        </Link>
      </nav>
    </header>
  );
};

export default Header;
