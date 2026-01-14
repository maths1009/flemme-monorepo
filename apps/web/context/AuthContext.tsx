'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchClient } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: number) => Promise<void>;
  updateUser: (id: string, data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    // Si on a un token, on pourrait appeler un endpoint /me pour récupérer le user
    // Pour l'instant on suppose que si le token est là, c'est ok, ou on le décodera si besoin
    if (token) {
        // TODO: Implement /me or decode token if API supports it to get user details on load
        // For now, we rely on the fact that we stay logged in if token exists
    }
    setLoading(false);
  };

  const login = async (data: any) => {
    try {
      const res = await fetchClient<{ user: User; access_token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      localStorage.setItem('access_token', res.access_token);
      setUser(res.user);
      router.push('/'); 
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const res = await fetchClient<{ user: User; access_token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      localStorage.setItem('access_token', res.access_token);
      setUser(res.user);
      router.push('/auth/register/a2f');
    } catch (error) {
      console.error('Register failed', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetchClient('/auth/logout', { method: 'POST' });
    } catch (error){
      console.error('Logout API call failed', error);
    } finally {
      localStorage.removeItem('access_token');
      setUser(null);
      router.push('/auth/login');
    }
  };

  const verifyEmail = async (code: number) => {
    try {
      await fetchClient('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
      // Optionally update user state to reflect verified status if needed
       if (user) {
        setUser({ ...user, email_verified: true });
       }
    } catch (error) {
       console.error('Verify email failed', error);
       throw error;
    }
  };

  const updateUser = async (id: string, data: any) => {
      try {
          const res = await fetchClient<User>(`/users/${id}`, {
              method: 'PATCH',
              body: JSON.stringify(data),
          });
          setUser(res);
      } catch (error) {
          console.error('Update user failed', error);
          throw error;
      }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, verifyEmail, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
