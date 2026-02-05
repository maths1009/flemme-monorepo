'use client';

import { useAuth } from '@/context/AuthContext';
import { Toggle } from '@/components/common/Toggle';
import { Header } from '@/components/common/Header';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotificationsPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEnabled(user.notif_enabled ?? false);
    }
  }, [user]);

  const handleToggle = async (newValue: boolean) => {
    if (!user) return;
    setLoading(true);
    setEnabled(newValue); // Optimistic update

    try {
      await updateUser(user.id, { notif_enabled: newValue });
    } catch (error) {
      console.error('Failed to update notification settings:', error);
      setEnabled(!newValue); // Revert on error
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header title="Notifications" sticky />

      <div className="p-6">
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
          <div className="flex-1 pr-4">
            <h3 className="text-base font-bold text-[#1A1A1A]">Notifications push</h3>
            <p className="text-sm text-gray-500 mt-1">
              Recevoir des alertes pour les nouveaux messages et mises à jour importantes.
            </p>
          </div>
          
          <Toggle 
            enabled={enabled} 
            onChange={handleToggle} 
            disabled={loading} 
          />
        </div>
      </div>
    </div>
  );
}
