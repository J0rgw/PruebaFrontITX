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
    <section className="actions-container" aria-labelledby="product-configuration">
      <h2 id="product-configuration" className="actions-title">Configurar Producto</h2>

      {/* Storage Selector */}
      <fieldset className="selector-group">
        <legend className="selector-label">Almacenamiento</legend>
        <div className="selector-options" role="group" aria-label="Opciones de almacenamiento">
          {storageOptions.length === 0 ? (
            <p className="no-options" role="status">No hay opciones disponibles</p>
          ) : (
            storageOptions.map((storage) => (
              <button
                key={storage.code}
                type="button"
                className={`selector-option ${
                  selectedStorage === storage.code ? 'selected' : ''
                }`}
                onClick={() => setSelectedStorage(storage.code)}
                aria-pressed={selectedStorage === storage.code}
                aria-label={`Seleccionar almacenamiento de ${storage.name}`}
              >
                {storage.name}
              </button>
            ))
          )}
        </div>
      </fieldset>

      {/* Color Selector */}
      <fieldset className="selector-group">
        <legend className="selector-label">Color</legend>
        <div className="selector-options" role="group" aria-label="Opciones de color">
          {colorOptions.length === 0 ? (
            <p className="no-options" role="status">No hay opciones disponibles</p>
          ) : (
            colorOptions.map((color) => (
              <button
                key={color.code}
                type="button"
                className={`selector-option color-option ${
                  selectedColor === color.code ? 'selected' : ''
                }`}
                onClick={() => setSelectedColor(color.code)}
                aria-pressed={selectedColor === color.code}
                aria-label={`Seleccionar color ${color.name}`}
              >
                {color.name}
              </button>
            ))
          )}
        </div>
      </fieldset>

      {/* Add to Cart Button */}
      <button
        type="button"
        className={`add-to-cart-btn ${addedSuccess ? 'success' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdding || !selectedStorage || !selectedColor}
        aria-live="polite"
        aria-atomic="true"
        aria-label={
          addedSuccess
            ? 'Producto añadido al carrito correctamente'
            : isAdding
            ? 'Añadiendo producto al carrito...'
            : !selectedStorage || !selectedColor
            ? 'Selecciona almacenamiento y color para añadir al carrito'
            : 'Añadir producto al carrito'
        }
      >
        {addedSuccess ? (
          <>
            <FiCheck className="btn-icon" aria-hidden="true" />
            Añadido al Carrito
          </>
        ) : (
          <>
            <FiShoppingCart className="btn-icon" aria-hidden="true" />
            {isAdding ? 'Añadiendo...' : 'Añadir al Carrito'}
          </>
        )}
      </button>
    </section>
  );
};

export default Actions;
