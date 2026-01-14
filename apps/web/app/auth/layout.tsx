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
    // If we are not loading and have a user, or if we find a token in storage
    const token = localStorage.getItem('access_token');
    if (!loading && (user || token)) {
      router.replace('/');
    }
  }, [user, loading, router]);

  // If loading, we can show a spinner or just nothing
  // If redirecting, we also don't want to show the auth pages
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  
  if (!loading && (user || token)) {
      return null; // Or a spinner
  }

  return <>{children}</>;
}
