// client/src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  products: {
    list: () => fetch(`${API_BASE}/products`).then((res) => res.json()),
    get: (id: string) => fetch(`${API_BASE}/products/${id}`).then((res) => res.json()),
  },
};