// Small shared formatting helpers used across pages.

// Formats a number as Indian Rupees, e.g. 200000 -> "₹2,00,000"
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
