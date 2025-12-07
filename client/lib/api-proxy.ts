// client/lib/api-proxy.ts
const EXPRESS_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ProxyOptions {
  method?: string;
  transformRequest?: (body: any) => any;
  transformResponse?: (data: any) => any;
  headers?: Record<string, string>;
}

export async function proxyToExpress(
  req: Request,
  expressPath: string,
  options?: ProxyOptions
): Promise<{ status: number; data: any }> {
  try {
    const method = options?.method || req.method;
    const url = new URL(req.url);
    const query = url.searchParams.toString();
    
    // Construct Express URL
    const expressUrl = `${EXPRESS_API_URL}${expressPath}${query ? `?${query}` : ''}`;
    
    console.log(`🔄 Proxying ${method} ${req.url} -> ${expressUrl}`);
    
    // Get request headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };
    
    // Forward Authorization header if present
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }
    
    // Forward other important headers
    const contentType = req.headers.get('Content-Type');
    if (contentType && contentType !== 'application/json') {
      headers['Content-Type'] = contentType;
    }
    
    // Get request body if needed
    let body: any = undefined;
    if (method !== 'GET' && method !== 'HEAD') {
      if (contentType === 'application/json') {
        body = await req.json();
        if (options?.transformRequest) {
          body = options.transformRequest(body);
        }
      } else {
        // For non-JSON requests (like FormData, etc.)
        body = await req.text();
      }
    }
    
    // Forward request to Express
    const response = await fetch(expressUrl, {
      method,
      headers,
      ...(body !== undefined && { body: typeof body === 'string' ? body : JSON.stringify(body) }),
    });
    
    // Parse response
    let data: any;
    const responseContentType = response.headers.get('content-type');
    
    if (responseContentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    // Transform response if needed
    if (options?.transformResponse) {
      data = options.transformResponse(data);
    }
    
    return {
      status: response.status,
      data,
    };
  } catch (error: any) {
    console.error('❌ Proxy error:', error);
    throw new Error(`Failed to proxy request: ${error.message}`);
  }
}

// Helper for GET requests
export async function proxyGet(req: Request, expressPath: string, options?: Omit<ProxyOptions, 'method'>) {
  return proxyToExpress(req, expressPath, { ...options, method: 'GET' });
}

// Helper for POST requests
export async function proxyPost(req: Request, expressPath: string, options?: Omit<ProxyOptions, 'method'>) {
  return proxyToExpress(req, expressPath, { ...options, method: 'POST' });
}

// Helper for PUT requests
export async function proxyPut(req: Request, expressPath: string, options?: Omit<ProxyOptions, 'method'>) {
  return proxyToExpress(req, expressPath, { ...options, method: 'PUT' });
}

// Helper for DELETE requests
export async function proxyDelete(req: Request, expressPath: string, options?: Omit<ProxyOptions, 'method'>) {
  return proxyToExpress(req, expressPath, { ...options, method: 'DELETE' });
}