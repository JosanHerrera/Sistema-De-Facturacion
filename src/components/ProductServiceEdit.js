import React, { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';
import { products as initialProducts, services as initialServices } from '../mock/products';

const ProductServiceEdit = ({ setPage, selectedItemId, setProducts, setServices }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('product');
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const currentProducts = getStorage('products') || initialProducts;
    const currentServices = getStorage('services') || initialServices;
    const allItems = [...currentProducts.map(p => ({ ...p, type: 'product' })), ...currentServices.map(s => ({ ...s, type: 'service' }))];
    const itemToEdit = allItems.find(item => item.id === selectedItemId.id && item.type === selectedItemId.type);

    if (itemToEdit) {
      setCurrentItem(itemToEdit);
      setName(itemToEdit.name);
      setType(itemToEdit.type);
      setPrice(itemToEdit.price.toString());
      setTaxRate((itemToEdit.taxRate * 100).toString());
    } else {
      // Manejar caso donde el item no se encuentra
      alert('Item no encontrado.');
      setPage('products');
    }
  }, [selectedItemId, setPage]);

  const handleSaveItem = () => {
    if (!name || !price || !taxRate) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const updatedItem = {
      ...currentItem,
      name,
      price: parseFloat(price),
      taxRate: parseFloat(taxRate) / 100,
    };

    if (type === 'product') {
      const currentProducts = getStorage('products') || initialProducts;
      const updatedProducts = currentProducts.map(p => p.id === updatedItem.id ? updatedItem : p);
      setStorage('products', updatedProducts);
      setProducts(updatedProducts); // Actualiza el estado en App.js
    } else {
      const currentServices = getStorage('services') || initialServices;
      const updatedServices = currentServices.map(s => s.id === updatedItem.id ? updatedItem : s);
      setStorage('services', updatedServices);
      setServices(updatedServices); // Actualiza el estado en App.js
    }

    setPage('products'); // Redirige al listado de productos/servicios
  };

  if (!currentItem) {
    return null; // O un loader
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Editar Item</h2>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tipo:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled // No permitir cambiar el tipo al editar
          >
            <option value="product">Producto</option>
            <option value="service">Servicio</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tasa de Impuestos (%):</label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setPage('products')}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors shadow-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveItem}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductServiceEdit;