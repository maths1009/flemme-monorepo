'use client';

import { useAnnonce } from '@/hooks/useAnnonces';
import { ArrowLeft, Flag, MoreHorizontal, Plus, Send, Star } from 'lucide-react';
import { PriceTag } from '@/components/common/PriceTag';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import * as React from 'react';

interface Message {
  id: string;
  type: 'text';
  sender: 'user' | 'vendor';
  content: string;
  timestamp: string;
}

export default function MessagePage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.advertId as string;
  const [inputText, setInputText] = React.useState('');
  const [showOptions, setShowOptions] = React.useState(false);

  const { annonce: advert, loading, error } = useAnnonce(advertId);

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      type: 'text',
      sender: 'vendor',
      content: 'Bonjour ! Je suis intéressé par votre demande.',
      timestamp: '14:30',
    },
    {
      id: '2',
      type: 'text',
      sender: 'user',
      content: 'Parfait ! Quand êtes-vous disponible ?',
      timestamp: '14:32',
    },
  ]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'text',
        sender: 'user',
        content: inputText,
        timestamp: new Date().toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Chargement de la conversation...</p>
      </div>
    );
  }

  if (error || !advert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Annonce non trouvée</p>
      </div>
    );
  }

  const user = advert.user;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
             
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              {user.profile_picture_url ? (
                <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image
                    src={user.profile_picture_url}
                    alt={`Avatar de ${user.firstname}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {user.firstname.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-semibold text-gray-800">
                    {user.firstname} {user.lastname}
                  </h1>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-800">
                    (4.8)
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  En ligne maintenant
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>

            {showOptions && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowOptions(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-20 py-1">
                  <button
                    onClick={() => {
                      console.log('Signaler annonce');
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <Flag className="w-4 h-4" />
                    <span>Signaler l'annonce</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contexte de l'annonce */}
      <div className="bg-blue-50 border-b border-blue-100 px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden relative">
             <Image
               src={`https://picsum.photos/seed/${advert.id}/100/100`}
               alt={advert.title}
               fill
               className="object-cover"
             />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 line-clamp-1">{advert.title}</h3>
            <div className="mt-1">
              <PriceTag price={advert.price} size="small" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => {
            if (msg.sender === 'vendor') {
              
              return (
                <div
                  key={msg.id}
                  className="flex justify-start items-start space-x-3"
                >
                  {user.profile_picture_url ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
                      <Image
                        src={user.profile_picture_url}
                        alt={`Avatar de ${user.firstname}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-600">
                        {user.firstname.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div
                    className="bg-transparent text-[#282924] max-w-[75%] flex flex-col justify-center items-start gap-2"
                    style={{
                      borderRadius: '4px',
                      padding: '8px 12px',
                      border: '1px solid #282924',
                    }}
                  >
                    <p>{msg.content}</p>
                    <span className="text-[10px] text-gray-500 block w-full text-right">{msg.timestamp}</span>
                  </div>
                </div>
              );
            } else {
              
              return (
                <div
                  key={msg.id}
                  className="w-full flex justify-end items-start space-x-3"
                >
                  <div
                    className="bg-transparent text-[#282924] max-w-[75%] flex flex-col justify-center items-start gap-2"
                    style={{
                      borderRadius: '4px',
                      padding: '8px 12px',
                      border: '1px solid #282924',
                    }}
                  >
                    <p>{msg.content}</p>
                    <span className="text-[10px] text-gray-500 block w-full text-right">{msg.timestamp}</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            aria-label="Ajouter une photo"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent text-gray-800"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className={`p-2 rounded-full transition-colors ${
              inputText.trim()
                ? 'bg-gray-800 text-white hover:bg-gray-900'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!inputText.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
