'use client';

import { Button, Input, PasswordInput } from '@/components/common';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<React.ReactNode>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Reset error
    setError('');

    // Simple validation (remplacez par votre logique d'authentification)
    const isError =
      email.trim().toLowerCase().includes('wrong') || !email || !password;

    if (isError) {
      setError(
        <>
          Adresse mail ou mot de passe incorrect, tu veux{' '}
          <a
            href="/forgot-password"
            className="underline text-blue-600 hover:text-blue-800"
          >
            réinitialiser
          </a>{' '}
          ou même ça t'as la flemme ?
        </>,
      );
      return;
    }

    // Redirection vers la page de succès
    router.push('/success');
  }

  return (
    <div className="relative mx-auto h-screen max-w-[390px] bg-primary/5">
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col gap-8 px-6 pt-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            Se connecter
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-sm text-foreground/80">Ton mail</label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-primary px-4 py-3 text-foreground placeholder:text-foreground/40 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-foreground/80">
                Ton mot de passe
              </label>
              <PasswordInput
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-primary px-4 py-3 text-foreground placeholder:text-foreground/40 outline-none"
              />
              {error && (
                <p className="text-xs text-destructive mt-1">{error}</p>
              )}
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="w-full text-base mt-[114px]"
            >
              Se connecter
            </Button>

            <button
              type="button"
              className="text-center text-sm text-foreground/60"
              onClick={() => router.push('/forgot-password')}
            >
              Mot de passe oublié ?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
