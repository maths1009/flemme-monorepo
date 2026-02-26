'use client';

import { Button, Input, PasswordInput } from '@/components/common';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const RegisterPage = () => {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<string[]>([]);

  const { register } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    if (!firstName || !lastName || !email || !phone || !password) {
      setErrors(['Tous les champs sont obligatoires']);
      return;
    }

    if (password.length < 6) {
      setErrors(['Le mot de passe doit contenir au moins 6 caractères']);
      return;
    }

    try {
      
      await register({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      });
      
    } catch (err: any) {
      console.error(err);
      
      import('@/lib/error-formatter').then(({ formatApiErrors }) => {
        setErrors(formatApiErrors(err));
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl p-6">
        <h1 className="mb-6 text-4xl font-extrabold text-foreground text-center">
          S'inscrire
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ligne prénom + nom */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-base font-semibold text-foreground">
                Ton Prénom
              </label>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-base font-semibold text-foreground">
                Ton Nom
              </label>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nom"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-base font-semibold text-foreground">
              Saisit ton mail
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="mb-1 block text-base font-semibold text-foreground">
              Saisit ton téléphone
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tel"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="mb-1 block text-base font-semibold text-foreground">
              Saisit mot de passe
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          {/* Erreur(s) */}
          {errors.length > 0 && (
            <div className="text-sm text-red-500 font-medium">
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}

          {/* Cases à cocher */}
          <div className="space-y-3 pt-2">
            <label className="flex items-start gap-2 text-xs text-foreground/70">
              <input type="checkbox" className="mt-1" required />
              <span>
                En vous inscrivant, vous jurez solennellement avoir lu (ou au
                moins survolé) nos{' '}
                <a
                  href="#"
                  className="underline text-blue-500 hover:text-blue-600"
                >
                  Conditions Générales d’Utilisation
                </a>
              </span>
            </label>

            <label className="flex items-start gap-2 text-xs text-foreground/70">
              <input type="checkbox" className="mt-1" />
              En cochant cette case, je m’inscris à la newsletter pour recevoir
              (de temps en temps) des nouvelles, des offres et un peu de fun par
              email. Pas de spam, juré.
            </label>
          </div>

          {/* Bouton */}
          <Button
            type="submit"
            variant="secondary"
            size="lg"
            className="w-full mt-4 rounded-full"
          >
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
