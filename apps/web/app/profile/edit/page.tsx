'use client';

import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Save, User } from 'lucide-react';
import { Header } from '@/components/common/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        username: user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!user) return;
      
      await updateUser(user.id, formData);
      setSuccess('Profil mis à jour avec succès');
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (err: any) {
      console.error('Update failed:', err);
      setError('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      <Header title="Modifier le profil" sticky />

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
            
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-lg">
                 {user?.profile_picture_url ? (
                    <img
                        src={user.profile_picture_url}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                 ) : (
                    <User className="w-10 h-10 text-gray-400" />
                 )}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-500 p-4 rounded-xl text-sm font-medium">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-all"
                placeholder="Votre prénom"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-all"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-all"
                placeholder="@username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] transition-all"
                placeholder="email@exemple.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#1A1A1A' }}
            className="w-full py-4 text-white rounded-xl font-bold flex items-center justify-center gap-2 mt-8 active:scale-[0.98] transition-all disabled:opacity-70 bg-gray-900"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                    <Save className="w-5 h-5" />
                    Enregistrer
                </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
