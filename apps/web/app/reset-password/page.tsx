'use client';

import { fetchClient } from '@/lib/api';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const resetMessages = () => {
        setSuccessMessage(null);
        setErrorMessage(null);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        resetMessages();

        if (!token) {
            setErrorMessage('Token invalide ou manquant.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        if (newPassword.length < 8) {
            setErrorMessage('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        setIsLoading(true);

        try {
            await fetchClient('/auth/confirm-password-reset', {
                method: 'POST',
                body: JSON.stringify({ token, newPassword }),
            });
            setSuccessMessage('Mot de passe réinitialisé avec succès ! Vous allez être redirigé...');
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        } catch (error: any) {
            console.error(error);
            setErrorMessage(error.message || 'Erreur lors de la réinitialisation. Le lien a peut-être expiré ou est invalide.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Lien invalide</h1>
                <p className="text-gray-500 mb-6">Le lien de réinitialisation est manquant ou invalide.</p>
                <button
                    onClick={() => router.push('/auth/login')}
                    className="px-6 py-2.5 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors"
                >
                    Retour à la connexion
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col px-6 pt-12">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">Nouveau mot de passe</h1>
                <p className="text-gray-500">Choisissez un nouveau mot de passe sécurisé pour votre compte.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                 {successMessage && (
                    <div className="p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-100">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100">
                        {errorMessage}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#1A1A1A]">Nouveau mot de passe</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                                placeholder="Au moins 8 caractères"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#1A1A1A]">Confirmer le mot de passe</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                                placeholder="Confirmez votre mot de passe"
                                required
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-black text-white rounded-xl font-bold text-lg shadow-lg shadow-black/5 hover:shadow-black/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Réinitialisation...' : 'Changer le mot de passe'}
                </button>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
