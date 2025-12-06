// client/src/lib/formatters.ts
export const formatNaira = (amount: number): string => {
  return `₦${amount.toLocaleString()}`;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};