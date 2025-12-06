// client/src/lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  products: {
    getById: (id: string) => fetch(`${API_BASE}/products/${id}`).then(res => res.json()),
    update: (id: string, data: any) => 
      fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => res.json()),
  },
  bookings: {
    getById: (id: string) => fetch(`${API_BASE}/bookings/${id}`).then(res => res.json()),
  },
};