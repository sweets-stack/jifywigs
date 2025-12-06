// client/src/lib/validators.ts
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^\+?234\s?([7-9]\d{9}|\d{10})$/.test(phone.replace(/[\s\-\(\)]/g, ''));
};