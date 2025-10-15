import { useState } from 'react';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import { cartService } from '../../services/api';
import './Actions.css';

const Actions = ({ product }) => {
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Initialize with first option if only one is available
  useState(() => {
    if (product.options?.storages?.length === 1) {
      setSelectedStorage(product.options.storages[0].code);
    }
    if (product.options?.colors?.length === 1) {
      setSelectedColor(product.options.colors[0].code);
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!selectedStorage || !selectedColor) {
      alert('Por favor selecciona almacenamiento y color');
      return;
    }

    try {
      setIsAdding(true);
      await cartService.addToCart(
        product.id,
        selectedColor,
        selectedStorage
      );

      // Show success message
      setAddedSuccess(true);

      // Dispatch custom event for cart update (same-tab)
      window.dispatchEvent(new Event('cartUpdated'));

      // Hide success message after 2 seconds
      setTimeout(() => {
        setAddedSuccess(false);
      }, 2000);

    } catch (error) {
      alert('Error al añadir al carrito: ' + error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const storageOptions = product.options?.storages || [];
  const colorOptions = product.options?.colors || [];

  return (
    <div className="actions-container">
      <h3 className="actions-title">Configurar Producto</h3>

      {/* Storage Selector */}
      <div className="selector-group">
        <label className="selector-label">Almacenamiento</label>
        <div className="selector-options">
          {storageOptions.length === 0 ? (
            <p className="no-options">No hay opciones disponibles</p>
          ) : (
            storageOptions.map((storage) => (
              <button
                key={storage.code}
                className={`selector-option ${
                  selectedStorage === storage.code ? 'selected' : ''
                }`}
                onClick={() => setSelectedStorage(storage.code)}
              >
                {storage.name}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Color Selector */}
      <div className="selector-group">
        <label className="selector-label">Color</label>
        <div className="selector-options">
          {colorOptions.length === 0 ? (
            <p className="no-options">No hay opciones disponibles</p>
          ) : (
            colorOptions.map((color) => (
              <button
                key={color.code}
                className={`selector-option color-option ${
                  selectedColor === color.code ? 'selected' : ''
                }`}
                onClick={() => setSelectedColor(color.code)}
              >
                {color.name}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        className={`add-to-cart-btn ${addedSuccess ? 'success' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdding || !selectedStorage || !selectedColor}
      >
        {addedSuccess ? (
          <>
            <FiCheck className="btn-icon" />
            Añadido al Carrito
          </>
        ) : (
          <>
            <FiShoppingCart className="btn-icon" />
            {isAdding ? 'Añadiendo...' : 'Añadir al Carrito'}
          </>
        )}
      </button>
    </div>
  );
};

export default Actions;
