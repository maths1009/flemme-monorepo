'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
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

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from local storage', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  };

  const login = async (data: any) => {
    try {
      const res = await fetchClient<{ user: User }>('/auth/login', {
        body: JSON.stringify(data),
        method: 'POST',
      });

      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      router.push('/auth/login/success');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const res = await fetchClient<{ user: User }>('/auth/register', {
        body: JSON.stringify(data),
        method: 'POST',
      });

      localStorage.setItem('user', JSON.stringify(res.user));
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
    } catch (error) {
      console.error('Logout API call failed', error);
    } finally {
      localStorage.removeItem('user');
      setUser(null);
      router.push('/auth/login');
    }
  };

  const verifyEmail = async (code: number) => {
    try {
      await fetchClient('/auth/verify-email', {
        body: JSON.stringify({ code }),
        method: 'POST',
      });
      
      if (user) {
        const updatedUser = { ...user, email_verified: true };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Verify email failed', error);
      throw error;
    }
  };

  const updateUser = async (id: string, data: any) => {
    try {
      const res = await fetchClient<User>(`/users/${id}`, {
        body: JSON.stringify(data),
        method: 'PATCH',
      });
      setUser(res);
      localStorage.setItem('user', JSON.stringify(res));
    } catch (error) {
      console.error('Update user failed', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ loading, login, logout, register, updateUser, user, verifyEmail }}>
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
