import React, { useState } from 'react';
import { clients } from '../mock/clients';
import { products, services } from '../mock/products';
import { calculateItemTotal, calculateInvoiceTotals, generateInvoiceId } from '../utils/helpers';
import { getStorage, setStorage } from '../utils/storage';
import { formatPrice } from '../utils/formatters'; // Importar formatPrice

const InvoiceCreate = ({ setPage, setInvoices }) => {
  const [selectedClient, setSelectedClient] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState('product');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const availableItems = selectedItemType === 'product' ? products : services;
  const selectedItemDetail = availableItems.find(item => item.id === selectedItemId);

  const handleAddItem = () => {
    if (selectedItemId && quantity > 0 && selectedItemDetail) {
      const newItem = {
        type: selectedItemType,
        id: selectedItemId,
        quantity: parseInt(quantity, 10),
        price: selectedItemDetail.price,
        taxRate: selectedItemDetail.taxRate,
      };
      setItems([...items, newItem]);
      setSelectedItemType('product');
      setSelectedItemId('');
      setQuantity(1);
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSaveInvoice = () => {
    if (!selectedClient || items.length === 0) {
      alert('Por favor, selecciona un cliente y agrega al menos un item.');
      return;
    }

    const companyInfo = getStorage('companyInfo');
    const newInvoiceCounter = companyInfo.invoiceCounter + 1;
    const newInvoiceId = generateInvoiceId(companyInfo.invoiceSeries, newInvoiceCounter);

    const newInvoice = {
      id: newInvoiceId,
      date: invoiceDate,
      client: selectedClient,
      items: items,
      status: 'Pendiente', // Nueva factura por defecto es Pendiente
    };

    const currentInvoices = getStorage('invoices') || [];
    setStorage('invoices', [...currentInvoices, newInvoice]);
    setInvoices([...currentInvoices, newInvoice]); // Actualiza el estado en App.js

    setStorage('companyInfo', { ...companyInfo, invoiceCounter: newInvoiceCounter });

    setPage('invoices'); // Redirige al listado de facturas
  };

  const totals = calculateInvoiceTotals({ items }, products, services);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Crear Nueva Factura</h2>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Cliente:</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Selecciona un cliente</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Fecha:</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4">Items de la Factura</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo:</label>
            <select
              value={selectedItemType}
              onChange={(e) => setSelectedItemType(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="product">Producto</option>
              <option value="service">Servicio</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">{selectedItemType === 'product' ? 'Producto' : 'Servicio'}:</label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Selecciona un item</option>
              {availableItems.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddItem}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Agregar Item
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Items Agregados:</h4>
          {items.length === 0 ? (
            <p className="text-gray-500">No hay items agregados aún.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map((item, index) => {
                const source = item.type === 'product' ? products : services;
                const detail = source.find(s => s.id === item.id);
                const itemTotal = detail ? calculateItemTotal({ ...item, price: detail.price, taxRate: detail.taxRate }) : 0;
                return (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-900">{detail ? detail.name : 'Item Desconocido'} ({item.quantity})</p>
                      <p className="text-sm text-gray-500">{item.type === 'product' ? 'Producto' : 'Servicio'} - {detail ? formatPrice(detail.price) : 'N/A'} c/u</p>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800 mr-4">{formatPrice(itemTotal)}</span>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-right">
          <p className="text-lg font-semibold text-gray-800">Subtotal: {formatPrice(totals.subtotal)}</p>
          <p className="text-lg font-semibold text-gray-800">Impuestos: {formatPrice(totals.tax)}</p>
          <p className="text-xl font-bold text-blue-600 mt-2">Total: {formatPrice(totals.total)}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setPage('invoices')}
          className="mr-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors shadow-md"
        >
          Cancelar
        </button>
        <button
          onClick={handleSaveInvoice}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Guardar Factura
        </button>
      </div>
    </div>
  );
};

export default InvoiceCreate;

// DONE