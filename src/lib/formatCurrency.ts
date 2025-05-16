export default function formatCurrency(price: number): string {
  return '$' + price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
}