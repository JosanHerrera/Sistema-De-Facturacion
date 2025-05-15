import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import DashboardOverview from './components/DashboardOverview';
import InvoiceList from './components/InvoiceList';
import InvoiceCreate from './components/InvoiceCreate';
import InvoiceView from './components/InvoiceView';
import ClientList from './components/ClientList';
import ClientCreate from './components/ClientCreate';
import ClientView from './components/ClientView';
import ClientEdit from './components/ClientEdit';
import ProductServiceList from './components/ProductServiceList';
import ProductServiceCreate from './components/ProductServiceCreate';
import ProductServiceEdit from './components/ProductServiceEdit';
import SettingsPage from './components/SettingsPage';

import { createStorage, getStorage } from './utils/storage';
import { invoices as initialInvoices } from './mock/invoices';
import { clients as initialClients } from './mock/clients';
import { products as initialProducts, services as initialServices } from './mock/products';
import { companyInfo as initialCompanyInfo } from './mock/company';

const App = () => {
  const [page, setPage] = useState('dashboard');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null); // { id, type }

  // Inicializar datos en localStorage si no existen
  useEffect(() => {
    createStorage('invoices', initialInvoices);
    createStorage('clients', initialClients);
    createStorage('products', initialProducts);
    createStorage('services', initialServices);
    createStorage('companyInfo', initialCompanyInfo);
  }, []);

  // Cargar datos desde localStorage para pasarlos a los componentes
  const currentInvoices = getStorage('invoices') || [];
  const currentClients = getStorage('clients') || [];
  const currentProducts = getStorage('products') || [];
  const currentServices = getStorage('services') || [];

  // Estados para forzar re-renderizado cuando se actualiza localStorage
  const [invoices, setInvoices] = useState(currentInvoices);
  const [clients, setClients] = useState(currentClients);
  const [products, setProducts] = useState(currentProducts);
  const [services, setServices] = useState(currentServices);

  // Sincronizar estados con localStorage en cada render
  useEffect(() => {
    setInvoices(getStorage('invoices') || []);
    setClients(getStorage('clients') || []);
    setProducts(getStorage('products') || []);
    setServices(getStorage('services') || []);
  }, [page]); // Sincroniza cuando cambia de página

  let content;
  switch (page) {
    case 'dashboard':
      content = <DashboardOverview setPage={setPage} />;
      break;
    case 'invoices':
      content = <InvoiceList invoices={invoices} setPage={setPage} setSelectedInvoiceId={setSelectedInvoiceId} setInvoices={setInvoices} />;
      break;
    case 'createInvoice':
      content = <InvoiceCreate setPage={setPage} setInvoices={setInvoices} />;
      break;
    case 'viewInvoice':
      content = <InvoiceView invoiceId={selectedInvoiceId} setPage={setPage} setInvoices={setInvoices} />;
      break;
    case 'clients':
      content = <ClientList clients={clients} setPage={setPage} setSelectedClientId={setSelectedClientId} setClients={setClients} />;
      break;
    case 'createClient':
      content = <ClientCreate setPage={setPage} setClients={setClients} />;
      break;
    case 'viewClient':
      content = <ClientView clientId={selectedClientId} setPage={setPage} />;
      break;
    case 'editClient':
      content = <ClientEdit setPage={setPage} clientId={selectedClientId} setClients={setClients} />;
      break;
    case 'products':
      content = <ProductServiceList products={products} services={services} setPage={setPage} setSelectedItemId={setSelectedItemId} setProducts={setProducts} setServices={setServices} />;
      break;
    case 'createProductService':
      content = <ProductServiceCreate setPage={setPage} setProducts={setProducts} setServices={setServices} />;
      break;
    case 'editProductService':
      content = <ProductServiceEdit setPage={setPage} selectedItemId={selectedItemId} setProducts={setProducts} setServices={setServices} />;
      break;
    case 'settings':
      content = <SettingsPage />;
      break;
    default:
      content = <DashboardOverview setPage={setPage} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <LayoutHeader setPage={setPage} />
      <main className="container mx-auto py-6">
        {content}
      </main>
    </div>
  );
};

export default App;

// DONE