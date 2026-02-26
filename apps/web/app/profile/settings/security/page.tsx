'use client';

import { ArrowLeft, CheckCircle, Mail, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/common/InputOTP';
import { useAuth } from '@/context/AuthContext';
import { fetchClient } from '@/lib/api';

export default function SecuritySettingsPage() {
  const router = useRouter();
  const { user, verifyEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const resetMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleResendVerification = async () => {
    resetMessages();
    setIsLoading(true);
    try {
      await fetchClient('/auth/resend-email-verification', { method: 'POST' });
      setSuccessMessage('Email de vérification envoyé ! Veuillez entrer le code ci-dessous.');
      setShowOtpInput(true);
    } catch (error) {
      setErrorMessage("Erreur lors de l'envoi de l'email");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (otp.length !== 6) {
      setErrorMessage('Le code doit contenir 6 chiffres');
      return;
    }

    resetMessages();
    setIsLoading(true);
    try {
      await verifyEmail(parseInt(otp));
      setSuccessMessage('Email vérifié avec succès !');
      setShowOtpInput(false);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || 'Code invalide ou expiré');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    resetMessages();
    setIsLoading(true);
    try {
      if (!user?.email) return;
      await fetchClient('/auth/request-password-reset', {
        body: JSON.stringify({ email: user.email }),
        method: 'POST',
      });
      setSuccessMessage('Email de réinitialisation envoyé !');
    } catch (error) {
      setErrorMessage('Erreur lors de la demande de réinitialisation');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="Sécurité" />

      <div className="flex flex-col p-6 space-y-8">
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

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Email</h2>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-[#1A1A1A] font-medium">{user?.email}</span>
              {user?.email_verified && (
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Vérifié
                </span>
              )}
            </div>

            {!user?.email_verified && (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-500">
                  Votre email n'est pas vérifié. Vérifiez-le pour sécuriser votre compte.
                </p>

                {showOtpInput ? (
                  <div className="flex flex-col items-center gap-4">
                    <InputOTP maxLength={6} onChange={value => setOtp(value)} value={otp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

                    <button
                      className="w-full py-2.5 px-4 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                      onClick={handleVerifyCode}
                    >
                      {isLoading ? 'Validation...' : 'Valider le code'}
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-full py-2.5 px-4 bg-black text-white rounded-lg font-semibold text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    onClick={handleResendVerification}
                  >
                    {isLoading ? 'Envoi...' : "Renvoyer l'email de vérification"}
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Password Section */}
        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Mot de passe</h2>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-start gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-[#1A1A1A] font-medium">Réinitialiser le mot de passe</p>
                <p className="text-sm text-gray-500 mt-1">
                  Vous recevrez un email avec un lien pour modifier votre mot de passe.
                </p>
              </div>
            </div>

            <button
              className="w-full py-2.5 px-4 border border-gray-300 bg-white text-[#1A1A1A] rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              onClick={handlePasswordReset}
            >
              {isLoading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
