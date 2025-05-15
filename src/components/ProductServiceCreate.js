import React, { useState } from 'react';
import { getStorage, setStorage } from '../utils/storage';

const ProductServiceCreate = ({ setPage, setProducts, setServices }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('product');
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');

  const handleSaveItem = () => {
    if (!name || !price || !taxRate) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    const newItem = {
      id: `${type}-${Date.now()}`, // Genera un ID simple basado en timestamp y tipo
      name,
      price: parseFloat(price),
      taxRate: parseFloat(taxRate) / 100,
    };

    if (type === 'product') {
      const currentProducts = getStorage('products') || [];
      setStorage('products', [...currentProducts, newItem]);
      setProducts([...currentProducts, newItem]); // Actualiza el estado en App.js
    } else {
      const currentServices = getStorage('services') || [];
      setStorage('services', [...currentServices, newItem]);
      setServices([...currentServices, newItem]); // Actualiza el estado en App.js
    }

    setPage('products'); // Redirige al listado de productos/servicios
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Agregar Nuevo Item</h2>
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
            Guardar Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductServiceCreate;