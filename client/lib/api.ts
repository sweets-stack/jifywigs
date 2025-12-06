// client/lib/api.ts
class ApiClient {
  private baseUrl = '/api';

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // Products
  products = {
    get: () => this.request<any[]>('/admin/products'),
    getById: (id: string) => this.request<any>(`/admin/products/${id}`),
    create: (data: any) => this.request('/admin/products', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: any) => this.request(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => this.request(`/admin/products/${id}`, { method: 'DELETE' }),
  };

  // Orders
  orders = {
    get: () => this.request<any[]>('/admin/orders'),
    getById: (id: string) => this.request<any>(`/admin/orders/${id}`),
    updateStatus: (id: string, status: string) => 
      this.request(`/admin/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  };

  // Bookings
  bookings = {
    get: () => this.request<any[]>('/admin/bookings'),
    getById: (id: string) => this.request<any>(`/admin/bookings/${id}`),
    updateStatus: (id: string, status: string) => 
      this.request(`/admin/bookings/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  };

  // Customers
  customers = {
    get: () => this.request<any[]>('/admin/customers'),
    getById: (id: string) => this.request<any>(`/admin/customers/${id}`),
  };

  // Analytics
  analytics = {
    get: (range: string = 'month') => 
      this.request<any>(`/admin/analytics?range=${range}`),
  };
}

export const api = new ApiClient();