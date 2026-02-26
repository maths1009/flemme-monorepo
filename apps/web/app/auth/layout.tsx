'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    
    const token = localStorage.getItem('access_token');
    if (!loading && (user || token)) {
      router.replace('/');
    }
  }, [user, loading, router]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  if (!loading && (user || token)) {
      return null;
  }

  return <>{children}</>;
}
