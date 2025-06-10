export default function formatCurrency(price: number): string {
  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0, // Không có số lẻ
  });
}
