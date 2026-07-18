/**
 * Formats a number to Indian currency format (e.g., ₹1,25,00,000)
 */
export function formatIndianCurrency(value: number): string {
  if (isNaN(value)) return "₹0";
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(value);
}

/**
 * Formats a number with Indian commas without the currency symbol (e.g., 1,25,00,000)
 */
export function formatIndianNumber(value: number): string {
  if (isNaN(value)) return "0";
  
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(value);
}
