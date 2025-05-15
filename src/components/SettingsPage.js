import React, { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';
import { companyInfo as initialCompanyInfo } from '../mock/company';

const SettingsPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyNif, setCompanyNif] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [invoiceSeries, setInvoiceSeries] = useState('');
  const [invoiceCounter, setInvoiceCounter] = useState('');

  useEffect(() => {
    const storedInfo = getStorage('companyInfo') || initialCompanyInfo;
    setCompanyName(storedInfo.name);
    setCompanyNif(storedInfo.nif);
    setCompanyAddress(storedInfo.address);
    setCompanyPhone(storedInfo.phone);
    setCompanyEmail(storedInfo.email);
    setInvoiceSeries(storedInfo.invoiceSeries);
    setInvoiceCounter(storedInfo.invoiceCounter);
  }, []);

  const handleSaveSettings = () => {
    const updatedInfo = {
      name: companyName,
      nif: companyNif,
      address: companyAddress,
      phone: companyPhone,
      email: companyEmail,
      invoiceSeries: invoiceSeries,
      invoiceCounter: parseInt(invoiceCounter, 10),
    };
    setStorage('companyInfo', updatedInfo);
    alert('Configuración guardada con éxito.');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Configuración de la Empresa</h2>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Datos de la Empresa</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de la Empresa:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">NIF:</label>
          <input
            type="text"
            value={companyNif}
            onChange={(e) => setCompanyNif(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
          <input
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
          <input
            type="tel"
            value={companyPhone}
            onChange={(e) => setCompanyPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-6 border-t pt-4 border-gray-200">Series de Facturación</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Serie de Factura:</label>
          <input
            type="text"
            value={invoiceSeries}
            onChange={(e) => setInvoiceSeries(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contador de Factura:</label>
          <input
            type="number"
            value={invoiceCounter}
            onChange={(e) => setInvoiceCounter(e.target.value)}
            min="0"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveSettings}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;