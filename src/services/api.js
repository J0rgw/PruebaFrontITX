const API_BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/product`);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const products = await productService.getAllProducts();
      return products.find(product => product.id === id);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
