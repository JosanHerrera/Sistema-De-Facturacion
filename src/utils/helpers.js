export const calculateItemTotal = (item) => {
  const subtotal = item.quantity * item.price;
  const tax = subtotal * item.taxRate;
  return subtotal + tax;
};

export const calculateInvoiceTotals = (invoice, allProducts, allServices) => {
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  invoice.items.forEach(item => {
    const source = item.type === 'product' ? allProducts : allServices;
    const detail = source.find(s => s.id === item.id);
    if (detail) {
      const itemSubtotal = item.quantity * detail.price;
      const itemTax = itemSubtotal * detail.taxRate;
      subtotal += itemSubtotal;
      tax += itemTax;
      total += itemSubtotal + itemTax;
    }
  });

  return { subtotal, tax, total };
};

export const generateInvoiceId = (series, counter) => {
  return `${series}${String(counter).padStart(4, '0')}`;
};