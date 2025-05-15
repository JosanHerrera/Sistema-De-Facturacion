import React, { useState } from 'react';
import { formatDate } from '../utils/formatters';
import { clients } from '../mock/clients';
import { getStorage, setStorage } from '../utils/storage'; // Importar storage

const InvoiceList = ({ invoices, setPage, setSelectedInvoiceId, setInvoices }) => {
  const [filterDate, setFilterDate] = useState('');
  const [filterClient, setFilterClient] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredInvoices = invoices.filter(invoice => {
    const matchesDate = filterDate ? invoice.date === filterDate : true;
    const client = clients.find(c => c.id === invoice.client);
    const matchesClient = filterClient ? client && client.name.toLowerCase().includes(filterClient.toLowerCase()) : true;
    const matchesStatus = filterStatus ? invoice.status === filterStatus : true;
    return matchesDate && matchesClient && matchesStatus;
  });

  const handleViewInvoice = (id) => {
    setSelectedInvoiceId(id);
    setPage('viewInvoice');
  };

  const handleEditInvoice = (id) => {
    setSelectedInvoiceId(id);
    setPage('editInvoice'); // Asumiendo que crearás una página de edición de factura
  };

  const handleExportPdf = (invoiceId) => {
    // Lógica real para exportar a PDF (simulada por ahora, pero sin alert)
    console.log(`Exportando a PDF la factura ${invoiceId}`);
    // Aquí iría la lógica para generar el PDF
  };

  const handleSendEmail = (invoiceId) => {
    // Lógica real para enviar por email (simulada por ahora, pero sin alert)
    console.log(`Enviando por email la factura ${invoiceId}`);
    // Aquí iría la lógica para enviar el email
  };

  const handleCancelInvoice = (invoiceId) => {
    const currentInvoices = getStorage('invoices') || [];
    const updatedInvoices = currentInvoices.map(inv =>
      inv.id === invoiceId ? { ...inv, status: 'Anulada' } : inv
    );
    setStorage('invoices', updatedInvoices);
    setInvoices(updatedInvoices); // Actualiza el estado en App.js
  };

  const handleDeleteInvoice = (invoiceId) => {
    const currentInvoices = getStorage('invoices') || [];
    const updatedInvoices = currentInvoices.filter(inv => inv.id !== invoiceId);
    setStorage('invoices', updatedInvoices);
    setInvoices(updatedInvoices); // Actualiza el estado en App.js
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Listado de Facturas</h2>

      <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Filtrar por Fecha:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Filtrar por Cliente:</label>
          <input
            type="text"
            placeholder="Nombre del cliente"
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Filtrar por Estado:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Todos</option>
            <option value="Pagada">Pagada</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Anulada">Anulada</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map(invoice => {
              const client = clients.find(c => c.id === invoice.client);
              return (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(invoice.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client ? client.name : 'Cliente Desconocido'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewInvoice(invoice.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Ver
                    </button>
                     {/* Botón de Editar (si se implementa la edición de facturas) */}
                    {/* <button
                      onClick={() => handleEditInvoice(invoice.id)}
                      className="text-yellow-600 hover:text-yellow-900 mr-4"
                    >
                      Editar
                    </button> */}
                    <button
                      onClick={() => handleExportPdf(invoice.id)}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => handleSendEmail(invoice.id)}
                      className="text-yellow-600 hover:text-yellow-900 mr-4"
                    >
                      Email
                    </button>
                    {invoice.status !== 'Anulada' && (
                       <button
                        onClick={() => handleCancelInvoice(invoice.id)}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        Anular
                      </button>
                    )}
                     <button
                      onClick={() => handleDeleteInvoice(invoice.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setPage('createInvoice')}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        Crear Nueva Factura
      </button>
    </div>
  );
};

export default InvoiceList;