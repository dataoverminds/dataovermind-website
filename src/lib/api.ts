/**
 * FastAPI Integration Utility
 * 
 * This module provides a typed API client for connecting to the
 * FastAPI backend service. Configure NEXT_PUBLIC_API_URL in .env.local.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number;
}

interface ApiError {
  message: string;
  status: number;
  detail?: unknown;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {}, cache, revalidate } = options;

    const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      cache,
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    if (revalidate !== undefined) {
      fetchOptions.next = { revalidate };
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, fetchOptions);

    if (!response.ok) {
      const error: ApiError = {
        message: `API Error: ${response.statusText}`,
        status: response.status,
      };
      try {
        error.detail = await response.json();
      } catch {
        // ignore parse error
      }
      throw error;
    }

    return response.json();
  }

  // Convenience methods
  get<T>(endpoint: string, options?: Omit<ApiOptions, "method" | "body">) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T>(endpoint: string, body: Record<string, unknown>, options?: Omit<ApiOptions, "method" | "body">) {
    return this.request<T>(endpoint, { ...options, method: "POST", body });
  }

  put<T>(endpoint: string, body: Record<string, unknown>, options?: Omit<ApiOptions, "method" | "body">) {
    return this.request<T>(endpoint, { ...options, method: "PUT", body });
  }

  delete<T>(endpoint: string, options?: Omit<ApiOptions, "method" | "body">) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const api = new ApiClient(API_BASE_URL);
