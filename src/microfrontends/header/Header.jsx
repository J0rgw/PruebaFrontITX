import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiSmartphone } from 'react-icons/fi';
import gsap from 'gsap';
import { cartService, productService } from '../../services/api';
import './Header.css';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [productName, setProductName] = useState('');
  const location = useLocation();
  const cartBadgeRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // Load cart count from localStorage on mount
    const count = cartService.getCartCount();
    setCartCount(count);

    // Animate header on mount - Delayed to ensure DOM is ready
    const timer = setTimeout(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        );
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Animate cart badge when count changes
    if (cartBadgeRef.current && cartCount > 0) {
      gsap.fromTo(
        cartBadgeRef.current,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.3,
          ease: 'back.out(3)',
          yoyo: true,
          repeat: 1
        }
      );
    }
  }, [cartCount]);

  // Listen for storage changes (cart updates)
  useEffect(() => {
    const handleStorageChange = () => {
      const count = cartService.getCartCount();
      setCartCount(count);
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);

  // Fetch product name when on product detail page
  useEffect(() => {
    const fetchProductName = async () => {
      const productIdMatch = location.pathname.match(/^\/product\/(.+)$/);

      if (productIdMatch) {
        const productId = productIdMatch[1];
        try {
          const product = await productService.getProductById(productId);
          if (product) {
            setProductName(`${product.brand} ${product.model}`);
          }
        } catch (error) {
          console.error('Error fetching product for breadcrumb:', error);
          setProductName('');
        }
      } else {
        setProductName('');
      }
    };

    fetchProductName();
  }, [location.pathname]);

  // Generate breadcrumbs based on current route
  const getBreadcrumbs = () => {
    const path = location.pathname;

    if (path === '/') {
      return [{ label: 'Productos', path: '/' }];
    }

    if (path.startsWith('/product/')) {
      const detailsLabel = productName ? `Detalles de ${productName}` : 'Detalles';
      return [
        { label: 'Productos', path: '/' },
        { label: detailsLabel, path: path }
      ];
    }

    return [];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header ref={headerRef} className="header">
      <div className="header-container">
        {/* Logo/Brand */}
        <Link to="/" className="header-logo">
          <FiSmartphone className="logo-icon" />
          <span className="logo-text">ITX Mobile Store</span>
        </Link>

        {/* Breadcrumbs */}
        <nav className="header-breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.path} className="breadcrumb-item">
              {index > 0 && <span className="breadcrumb-separator">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="breadcrumb-current">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="breadcrumb-link">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        {/* Cart Counter */}
        <div className="header-cart">
          <FiShoppingCart className="cart-icon" />
          {cartCount > 0 && (
            <span ref={cartBadgeRef} className="cart-badge">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
