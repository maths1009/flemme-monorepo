'use client';

import { MoreHorizontal, Star } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/common/Header';
import { useRouter } from 'next/navigation';

// MOCK DATA
const MOCK_CONVERSATIONS = [
  {
    id: '1',
    user: {
      username: 'camille.cpla',
      avatar: '/images/mock/150.jpeg', // Mock avatar
      rating: 5,
      reviewsCount: 12,
      lastSeen: 'il y a 2h',
    },
    ad: {
      image: '/images/mock/150.jpeg', // Mock car/item
    },
  },
  {
    id: '2',
    user: {
      username: 'camille.cpla',
      avatar: '/images/mock/150.jpeg',
      rating: 5,
      reviewsCount: 12,
      lastSeen: 'il y a 2h',
    },
    ad: {
      image: '/images/mock/150.jpeg',
    },
  },
  {
    id: '3',
    user: {
      username: 'camille.cpla',
      avatar: '/images/mock/150.jpeg',
      rating: 5,
      reviewsCount: 12,
      lastSeen: 'il y a 2h',
    },
    ad: {
      image: '/images/mock/150.jpeg',
    },
  },
  {
    id: '4',
    user: {
      username: 'camille.cpla',
      avatar: '/images/mock/150.jpeg',
      rating: 5,
      reviewsCount: 12,
      lastSeen: 'il y a 2h',
    },
    ad: {
      image: '/images/mock/150.jpeg', // Food
    },
  },
  {
    id: '5',
    user: {
      username: 'camille.cpla',
      avatar: '/images/mock/150.jpeg',
      rating: 5,
      reviewsCount: 12,
      lastSeen: 'il y a 2h',
    },
    ad: {
      image: '/images/mock/150.jpeg',
    },
  },
];

export default function MessagesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Prevent the document click listener from firing for this click
    e.nativeEvent.stopImmediatePropagation();
    console.log('Toggled menu for:', id);
    setActiveMenuId(prev => prev === id ? null : id);
  };

  // Close menu when clicking elsewhere
  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      console.log('Click outside detected');
      setActiveMenuId(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        title={user?.username || user?.firstname || 'Messages'} 
        onBack={() => router.push('/profile')}
      />

      {/* Title */}
      <div className="px-4 py-4">
        <h2 className="text-xl font-bold text-gray-400">Messages</h2>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-50 pb-20">
        {MOCK_CONVERSATIONS.map((convo, index) => (
          <div key={index} className="relative flex items-start px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
            {/* Avatar Profile */}
            <div className="relative w-12 h-12 flex-shrink-0 mr-3">
              <Image
                src={convo.user.avatar}
                alt={convo.user.username}
                fill
                className="rounded-full object-cover border border-gray-200"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1 mb-0.5">
                <span className="font-semibold text-gray-900 text-sm">
                  {convo.user.username}
                </span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-500">
                  ({convo.user.reviewsCount})
                </span>
              </div>
              
              <p className="text-xs text-gray-500 mb-2">
                Dernière connexion : {convo.user.lastSeen}
              </p>

              {/* Ad Thumbnail */}
              <div className="relative w-12 h-8 rounded overflow-hidden">
                 <Image
                    src={convo.ad.image}
                    alt="Annonce"
                    fill
                    className="object-cover"
                 />
              </div>
            </div>

            {/* Actions */}
            <div className="relative">
              <button 
                onClick={(e) => toggleMenu(e, convo.id)}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {/* Dropdown Menu */}
              {activeMenuId === convo.id && (
                <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 overflow-hidden">
                  <button 
                    onClick={(e) => { e.stopPropagation(); console.log('Signaler', convo.id); setActiveMenuId(null); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Signaler
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); console.log('Supprimer', convo.id); setActiveMenuId(null); }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Repeating the last item to match the screenshot "long list" feel if needed */}
         <div className="flex items-start px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="relative w-12 h-12 flex-shrink-0 mr-3">
              <Image
                src="/images/mock/150.jpeg"
                alt="camille.cpla"
                fill
                className="rounded-full object-cover border border-gray-200"
              />
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center space-x-1 mb-0.5">
                <span className="font-semibold text-gray-900 text-sm">camille.cpla</span>
                 <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-500">(12)</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">Dernière connexion : il y a 2h</p>
               <div className="relative w-12 h-8 rounded overflow-hidden">
                 <Image
                    src="/images/mock/150.jpeg"
                    alt="Annonce"
                    fill
                    className="object-cover"
                 />
              </div>
            </div>
             <button className="p-2 -mr-2 text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
         </div>
      </div>
    </div>
  );
}
