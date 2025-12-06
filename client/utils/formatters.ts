// utils/formatters.ts
export const formatCurrency = (amount: number, currency: string = 'NGN'): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG')}`;
};

// Format date
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format rating
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};