import React, { useEffect, useState } from 'react';
import { getStorage } from '../utils/storage';
import { clients as initialClients } from '../mock/clients';

const ClientView = ({ clientId, setPage }) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const currentClients = getStorage('clients') || initialClients;
    const foundClient = currentClients.find(cli => cli.id === clientId);
    setClient(foundClient);
  }, [clientId]); // Dependencia en clientId para actualizar si cambia

  if (!client) {
    return (
      <div className="p-6 text-center text-red-600">
        Cliente no encontrado.
        <button onClick={() => setPage('clients')} className="mt-4 text-blue-600 hover:underline">Volver al listado</button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Detalle del Cliente</h2>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">Nombre:</p>
          <p className="text-gray-900 text-lg">{client.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">NIF:</p>
          <p className="text-gray-900 text-lg">{client.nif}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">Dirección:</p>
          <p className="text-gray-900 text-lg">{client.address}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">Email:</p>
          <p className="text-gray-900 text-lg">{client.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 text-sm font-bold mb-1">Teléfono:</p>
          <p className="text-gray-900 text-lg">{client.phone}</p>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setPage('clients')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Volver al Listado
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientView;