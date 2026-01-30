'use client';

import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Bell, ChevronRight, Globe, Info, Lock, LogOut, ShieldCheck, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative flex items-center w-full px-6 py-4 border-b border-gray-100">
        <button onClick={() => router.back()} className="z-10 p-2 -ml-2">
          <ArrowLeft className="w-6 h-6 text-[#1A1A1A]" />
        </button>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-xl font-bold text-[#1A1A1A]">Paramètres</h1>
        </div>
      </div>

      <div className="flex flex-col pb-8">
        
        {/* Compte Section */}
        <SectionHeader title="Compte" />
        <SettingsItem 
            icon={User} 
            label="Profil" 
            description="Gérer vos informations personnelles"
            onClick={() => router.push('/profile/edit')} 
        />
        <SettingsItem 
            icon={Bell} 
            label="Notifications" 
            description="Configurer les alertes et notifications"
        />

        {/* Sécurité Section */}
        <SectionHeader title="Sécurité" />
        <SettingsItem 
            icon={Lock} 
            label="Confidentialité" 
            description="Contrôler vos données et préférences"
        />
        <SettingsItem 
            icon={ShieldCheck} 
            label="Sécurité" 
            description="Mot de passe et authentification"
        />

        {/* Préférences Section */}
        <SectionHeader title="Préférences" />
        <SettingsItem 
            icon={Globe} 
            label="Langue" 
            description="Choisir la langue de l'application"
        />

        {/* Support Section */}
        <SectionHeader title="Support" />
        <SettingsItem 
            icon={LogOut} 
            label="Se déconnecter" 
            description="Déconnexion de votre compte"
            onClick={handleLogout}
            className="text-red-500"
            iconClassName="text-red-500"
        />
        <SettingsItem 
            icon={Info} 
            label="À propos" 
            description="Version 1.0.0 - Informations légales"
        />

      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="px-6 py-4 bg-white mt-4 border-b border-gray-50">
            <h2 className="text-xl font-bold text-gray-400">{title}</h2>
        </div>
    );
}

function SettingsItem({ icon: Icon, label, description, onClick, className = "", iconClassName = "text-[#1A1A1A]" }: { icon: any, label: string, description: string, onClick?: () => void, className?: string, iconClassName?: string }) {
  return (
    <button 
        onClick={onClick}
        className="w-full flex items-center gap-8 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 bg-white"
    >
      <Icon className={`w-7 h-7 ${iconClassName}`} strokeWidth={2} />
      <div className="flex-1 text-left">
        <p className={`text-lg font-bold text-[#1A1A1A] ${className}`}>{label}</p>
        <p className="text-sm text-gray-500 mt-1 font-medium">{description}</p>
      </div>
    </button>
  );
}
