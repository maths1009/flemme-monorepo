'use client';

import { Button, Input, PhotoUpload } from '@/components/common';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const CompleteProfilePage = () => {
  const router = useRouter();
  const [pseudo, setPseudo] = React.useState('');
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [error, setError] = React.useState('');

  const handleImageChange = (file: File | null, preview: string | null) => {
    setProfileImage(file);
    setError(''); // Clear any previous errors
  };

  const handleImageError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!pseudo.trim()) {
      setError('Le pseudo est obligatoire');
      return;
    }

    if (pseudo.length < 3) {
      setError('Le pseudo doit contenir au moins 3 caractères');
      return;
    }

    // Ici vous pourriez envoyer les données au serveur
    console.log('Pseudo:', pseudo);
    console.log('Profile Image:', profileImage);

    // Redirection vers la page de succès ou dashboard
    router.push('/auth/register/success');
  };

  return (
    <div className="relative mx-auto h-screen max-w-[390px] bg-primary/5">
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col gap-8 px-6 pt-12">
          {/* Titre principal */}
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-extrabold text-foreground text-center">
              Fais-toi une place ici !
            </h1>

            <p className="text-base text-foreground/80 leading-relaxed px-2">
              Choisis ton pseudo et ajoute une photo de profil si tu veux.
              Promis, pas besoin d'un shooting pro.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Champ Pseudo */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-foreground">
                Ton Pseudo
              </label>
              <Input
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                placeholder="@"
                className="text-base"
              />
            </div>

            {/* Section Photo de profil */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-foreground">
                Ta photo de profil{' '}
                <span className="text-sm font-normal text-foreground/60">
                  (Optionnel)
                </span>
              </label>

              <PhotoUpload
                size={120}
                onImageChange={handleImageChange}
                onError={handleImageError}
                maxSizeInMB={5}
                centered={false}
              />
            </div>

            {/* Message d'erreur */}
            {error && (
              <p className="text-sm text-destructive font-medium text-center">
                {error}
              </p>
            )}
          </form>
        </div>

        {/* Bouton en bas */}
        <div className="px-6 pb-8">
          <Button
            onClick={handleSubmit}
            variant="secondary"
            size="lg"
            className="w-full text-base"
          >
            Se connecter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
