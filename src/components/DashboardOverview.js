import React from 'react';

const DashboardOverview = ({ setPage }) => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]"> {/* Centra el contenido */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Sistema de Facturación</h2>
        <p className="text-lg text-gray-600">Bienvenidos al panel de control. Selecciona una opción para comenzar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"> {/* 3 columnas para los primeros 3 */}
        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Icono de Clientes mejorado (SVG manual) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Clientes</h3>
            <p className="text-gray-700 text-sm">Gestiona tu base de datos de clientes: añade, edita o elimina registros.</p>
          </div>
          <button
            onClick={() => setPage('clients')}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Ir a Clientes
          </button>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Icono sencillo de Productos/Servicios (SVG manual) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2m7 7h.01" />
            </svg>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Productos/Servicios</h3>
            <p className="text-gray-700 text-sm">Administra tu catálogo de productos o servicios, incluyendo precios y detalles.</p>
          </div>
          <button
            onClick={() => setPage('products')}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            Ir a Items
          </button>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Icono sencillo de Facturas (SVG manual) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Facturas</h3>
            <p className="text-gray-700 text-sm">Consulta, crea y administra todas tus facturas emitidas.</p>
          </div>
          <button
            onClick={() => setPage('invoices')}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md"
          >
            Ir a Facturas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 w-full max-w-xs mt-6"> {/* 1 columna para el de Nueva Factura */}
         <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
          <div>
            {/* Icono sencillo de Nueva Factura (SVG manual) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">+ Nueva Factura</h3>
            <p className="text-gray-700 text-sm">Crea una nueva factura rápidamente.</p>
          </div>
          <button
            onClick={() => setPage('createInvoice')}
            className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors shadow-md"
          >
            Crear Factura
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

// DONE