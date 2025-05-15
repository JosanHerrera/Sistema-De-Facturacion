import React from 'react';

const LayoutHeader = ({ setPage }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">FacturaPro</h1>
        <nav>
          <button onClick={() => setPage('dashboard')} className="ml-4 hover:underline">Dashboard</button>
          <button onClick={() => setPage('invoices')} className="ml-4 hover:underline">Facturas</button>
          <button onClick={() => setPage('clients')} className="ml-4 hover:underline">Clientes</button>
          <button onClick={() => setPage('products')} className="ml-4 hover:underline">Productos/Servicios</button>
          <button onClick={() => setPage('settings')} className="ml-4 hover:underline">Configuración</button>
        </nav>
      </div>
    </header>
  );
};

export default LayoutHeader;