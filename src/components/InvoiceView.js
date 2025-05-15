import React from 'react';
import { invoices } from '../mock/invoices';
import { clients } from '../mock/clients';
import { products, services } from '../mock/products';
import { companyInfo } from '../mock/company';
import { formatDate, formatPrice } from '../utils/formatters';
import { calculateItemTotal, calculateInvoiceTotals } from '../utils/helpers';
import { getStorage, setStorage } from '../utils/storage'; // Importar storage

const InvoiceView = ({ invoiceId, setPage, setInvoices }) => {
  const invoice = invoices.find(inv => inv.id === invoiceId);
  const client = clients.find(cli => cli.id === invoice?.client);
  const totals = invoice ? calculateInvoiceTotals(invoice, products, services) : { subtotal: 0, tax: 0, total: 0 };

  if (!invoice) {
    return (
      <div className="p-6 text-center text-red-600">
        Factura no encontrada.
        <button onClick={() => setPage('invoices')} className="mt-4 text-blue-600 hover:underline">Volver al listado</button>
      </div>
    );
  }

  const handleExportPdf = () => {
    // Lógica real para exportar a PDF (simulada por ahora, pero sin alert)
    console.log(`Exportando a PDF la factura ${invoice.id}`);
    // Aquí iría la lógica para generar el PDF
  };

  const handleSendEmail = () => {
    // Lógica real para enviar por email (simulada por ahora, pero sin alert)
    console.log(`Enviando por email la factura ${invoice.id} a ${client?.email || 'cliente desconocido'}`);
    // Aquí iría la lógica para enviar el email
  };

  const handleMarkAsPaid = () => {
    const currentInvoices = getStorage('invoices') || [];
    const updatedInvoices = currentInvoices.map(inv =>
      inv.id === invoice.id ? { ...inv, status: 'Pagada' } : inv
    );
    setStorage('invoices', updatedInvoices);
    setInvoices(updatedInvoices); // Actualiza el estado en App.js
  };

  const handleCancelInvoice = () => {
    const currentInvoices = getStorage('invoices') || [];
    const updatedInvoices = currentInvoices.map(inv =>
      inv.id === invoice.id ? { ...inv, status: 'Anulada' } : inv
    );
    setStorage('invoices', updatedInvoices);
    setInvoices(updatedInvoices); // Actualiza el estado en App.js
  };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Factura #{invoice.id}</h1>
            <p className="text-gray-600">Fecha: {formatDate(invoice.date)}</p>
            <p className={`mt-2 text-lg font-semibold ${invoice.status === 'Pagada' ? 'text-green-600' : invoice.status === 'Pendiente' ? 'text-yellow-600' : 'text-red-600'}`}>
              Estado: {invoice.status}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-gray-800">{companyInfo.name}</h2>
            <p className="text-gray-600">{companyInfo.address}</p>
            <p className="text-gray-600">NIF: {companyInfo.nif}</p>
            <p className="text-gray-600">Tel: {companyInfo.phone}</p>
            <p className="text-gray-600">Email: {companyInfo.email}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Cliente:</h3>
          {client ? (
            <div>
              <p className="font-medium text-gray-900">{client.name}</p>
              <p className="text-gray-600">{client.address}</p>
              <p className="text-gray-600">NIF: {client.nif}</p>
              <p className="text-gray-600">Email: {client.email}</p>
              <p className="text-gray-600">Tel: {client.phone}</p>
            </div>
          ) : (
            <p className="text-red-600">Cliente no encontrado.</p>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Detalle de Items:</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impuestos</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoice.items.map((item, index) => {
                  const source = item.type === 'product' ? products : services;
                  const detail = source.find(s => s.id === item.id);
                  const itemTotal = detail ? calculateItemTotal({ ...item, price: detail.price, taxRate: detail.taxRate }) : 0;
                  const itemSubtotal = detail ? item.quantity * detail.price : 0;
                  const itemTax = detail ? itemSubtotal * detail.taxRate : 0;

                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{detail ? detail.name : 'Item Desconocido'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detail ? formatPrice(detail.price) : 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detail ? `${(detail.taxRate * 100).toFixed(0)}%` : 'N/A'} ({formatPrice(itemTax)})</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{formatPrice(itemTotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-right mb-8">
          <p className="text-lg font-semibold text-gray-800">Subtotal: {formatPrice(totals.subtotal)}</p>
          <p className="text-lg font-semibold text-gray-800">Impuestos: {formatPrice(totals.tax)}</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">Total: {formatPrice(totals.total)}</p>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setPage('invoices')}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors shadow-md"
          >
            Volver
          </button>
          <button
            onClick={handleExportPdf}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors shadow-md"
          >
            Exportar PDF
          </button>
          <button
            onClick={handleSendEmail}
            className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors shadow-md"
          >
            Enviar por Email
          </button>
          {invoice.status === 'Pendiente' && (
            <button
              onClick={handleMarkAsPaid}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              Marcar como Pagada
            </button>
          )}
          {invoice.status !== 'Anulada' && (
             <button
              onClick={handleCancelInvoice}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors shadow-md"
            >
              Anular Factura
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;