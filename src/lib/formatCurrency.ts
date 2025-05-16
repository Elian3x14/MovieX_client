export default function formatCurrency(price: number): string {
  return new Number(price).toLocaleString('en-US', {
    style: 'currency',
    maximumFractionDigits: 2,
    currency: 'USD'
  });
}
