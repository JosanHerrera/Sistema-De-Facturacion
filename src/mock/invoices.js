export const invoices = [
  {
    id: 'inv-2023-0001',
    date: '2023-10-26',
    client: 'cli-1',
    items: [
      { type: 'product', id: 'prod-1', quantity: 1, price: 1200, taxRate: 0.16 },
      { type: 'service', id: 'serv-1', quantity: 10, price: 50, taxRate: 0.16 },
    ],
    status: 'Pagada',
  },
  {
    id: 'inv-2023-0002',
    date: '2023-10-25',
    client: 'cli-2',
    items: [
      { type: 'product', id: 'prod-2', quantity: 2, price: 450, taxRate: 0.16 },
      { type: 'service', id: 'serv-2', quantity: 5, price: 75, taxRate: 0.16 },
    ],
    status: 'Pendiente',
  },
  {
    id: 'inv-2023-0003',
    date: '2023-10-24',
    client: 'cli-3',
    items: [
      { type: 'product', id: 'prod-3', quantity: 5, price: 80, taxRate: 0.16 },
      { type: 'product', id: 'prod-4', quantity: 10, price: 30, taxRate: 0.16 },
    ],
    status: 'Anulada',
  },
];