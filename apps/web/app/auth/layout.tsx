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
    if (!loading && user) {
      router.replace('/');
    }
  }, [user, loading, router]);

  if (!loading && user) {
    return (
      <div className="mx-auto flex min-h-screen max-w-[390px] flex-col items-center justify-center bg-primary/5 px-6 text-center">
        <p className="text-base font-medium text-foreground/80">Redirection…</p>
      </div>
    );
  }

  return children;
}
