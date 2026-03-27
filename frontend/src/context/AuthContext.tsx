'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Tenant } from '@/types';

interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  token: string | null;
  isLoading: boolean;
}

type UserRole = 'ADMIN' | 'ATTENDANT' | 'TECHNICIAN';

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkEmailExists: (email: string) => Promise<boolean>;
  isAuthenticated: boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null, tenant: null, token: null, isLoading: true,
  });

  useEffect(() => {
    const token  = localStorage.getItem('at_token');
    const user   = localStorage.getItem('at_user');
    const tenant = localStorage.getItem('at_tenant');
    if (token && user && tenant) {
      setState({ token, user: JSON.parse(user), tenant: JSON.parse(tenant), isLoading: false });
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const checkEmailExists = async (email: string): Promise<boolean> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error('Erro ao verificar e-mail.');
    const data = await res.json();
    return data.exists as boolean;
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message ?? 'Senha incorreta.');
    }
    const data = await res.json();
    localStorage.setItem('at_token', data.token);
    localStorage.setItem('at_user', JSON.stringify(data.user));
    localStorage.setItem('at_tenant', JSON.stringify(data.tenant));
    setState({ token: data.token, user: data.user, tenant: data.tenant, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem('at_token');
    localStorage.removeItem('at_user');
    localStorage.removeItem('at_tenant');
    setState({ user: null, tenant: null, token: null, isLoading: false });
    window.location.href = '/auth/login';
  };

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!state.user) return false;
    return Array.isArray(role)
      ? role.includes(state.user.role as UserRole)
      : state.user.role === role;
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout,
      checkEmailExists,
      isAuthenticated: !!state.user,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}