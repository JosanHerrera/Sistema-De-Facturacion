import React, { useState } from 'react';
import { getStorage, setStorage } from '../utils/storage';

const ClientCreate = ({ setPage, setClients }) => {
  const [name, setName] = useState('');
  const [nif, setNif] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSaveClient = () => {
    if (!name || !nif) {
      alert('El nombre y NIF son obligatorios.');
      return;
    }

    const newClient = {
      id: `cli-${Date.now()}`, // Genera un ID simple basado en timestamp
      name,
      nif,
      address,
      email,
      phone,
    };

    const currentClients = getStorage('clients') || [];
    const updatedClients = [...currentClients, newClient]; // Agregar el nuevo cliente
    setStorage('clients', updatedClients);
    setClients(updatedClients); // Actualiza el estado en App.js

    setPage('clients'); // Redirige al listado de clientes
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Agregar Nuevo Cliente</h2>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">NIF:</label>
          <input
            type="text"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setPage('clients')}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors shadow-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSaveClient}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-md"
          >
            Guardar Cliente
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCreate;