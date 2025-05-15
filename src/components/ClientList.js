import React, { useState } from 'react';
import { clients } from '../mock/clients';
import { getStorage, setStorage } from '../utils/storage'; // Importar storage

const ClientList = ({ clients, setPage, setSelectedClientId, setClients }) => {
  const [filterText, setFilterText] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(filterText.toLowerCase()) ||
    client.nif.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleViewClient = (id) => {
    setSelectedClientId(id);
    setPage('viewClient');
  };

  const handleEditClient = (id) => {
    setSelectedClientId(id);
    setPage('editClient');
  };

  const handleDeleteClient = (id) => {
    const currentClients = getStorage('clients') || [];
    const updatedClients = currentClients.filter(cli => cli.id !== id);
    setStorage('clients', updatedClients);
    setClients(updatedClients); // Actualiza el estado en App.js
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Listado de Clientes</h2>

      <div className="mb-6 p-4 bg-white rounded-xl shadow-md border border-gray-200">
        <label className="block text-gray-700 text-sm font-bold mb-2">Buscar Cliente:</label>
        <input
          type="text"
          placeholder="Nombre o NIF"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.nif}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewClient(client.id)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => handleEditClient(client.id)}
                    className="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client.id)}
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
        onClick={() => setPage('createClient')}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        Agregar Nuevo Cliente
      </button>
    </div>
  );
};

export default ClientList;