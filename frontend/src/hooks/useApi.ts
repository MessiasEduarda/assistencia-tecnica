import { useCallback } from 'react';

export function useApi() {
  const request = useCallback(async <T>(path: string, options?: RequestInit): Promise<T> => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('at_token') : null;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erro desconhecido' }));
      throw new Error(err.message ?? 'Erro na requisição');
    }
    return res.json();
  }, []);

  return {
    get:   <T>(path: string) => request<T>(path),
    post:  <T>(path: string, body: unknown) => request<T>(path, { method: 'POST',  body: JSON.stringify(body) }),
    put:   <T>(path: string, body: unknown) => request<T>(path, { method: 'PUT',   body: JSON.stringify(body) }),
    patch: <T>(path: string, body: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
    del:   <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  };
}
