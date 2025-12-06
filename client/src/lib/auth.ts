// client/src/lib/auth.ts
export const getToken = () => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(/token=([^;]+)/);
    return match ? match[1] : null;
  }
  return null;
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const logout = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  window.location.href = '/login';
};