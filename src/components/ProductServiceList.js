import React, { useState } from 'react';
import { products, services } from '../mock/products';
import { formatPrice } from '../utils/formatters';
import { getStorage, setStorage } from '../utils/storage'; // Importar storage

const ProductServiceList = ({ products, services, setPage, setSelectedItemId, setProducts, setServices }) => {
  const [filterText, setFilterText] = useState('');
  const [filterType, setFilterType] = useState('all');

  const allItems = [...products.map(p => ({ ...p, type: 'product' })), ...services.map(s => ({ ...s, type: 'service' }))];

  const filteredItems = allItems.filter(item => {
    const matchesText = item.name.toLowerCase().includes(filterText.toLowerCase());
    const matchesType = filterType === 'all' ? true : item.type === filterType;
    return matchesText && matchesType;
  });

  const handleEditItem = (id, type) => {
    setSelectedItemId({ id, type });
    setPage('editProductService'); // Cambiar a la página de edición
  };

  const handleDeleteItem = (id, type) => {
    if (type === 'product') {
      const currentProducts = getStorage('products') || products;
      const updatedProducts = currentProducts.filter(p => p.id !== id);
      setStorage('products', updatedProducts);
      setProducts(updatedProducts); // Actualiza el estado en App.js
    } else {
      const currentServices = getStorage('services') || services;
      const updatedServices = currentServices.filter(s => s.id !== id);
      setStorage('services', updatedServices);
      setServices(updatedServices); // Actualiza el estado en App.js
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Productos y Servicios</h2>

      <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Buscar:</label>
          <input
            type="text"
            placeholder="Nombre"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Filtrar por Tipo:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">Todos</option>
            <option value="product">Producto</option>
            <option value="service">Servicio</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impuestos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type === 'product' ? 'Producto' : 'Servicio'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(item.price)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(item.taxRate * 100).toFixed(0)}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEditItem(item.id, item.type)}
                    className="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id, item.type)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setPage('createProductService')}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        Agregar Nuevo Item
      </button>
    </div>
  );
};

export default ProductServiceList;