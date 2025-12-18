'use client';

import { OfferMessage } from '@/components/messages';
import { getAdvertById } from '@/lib/mockData';
import { MoreHorizontal, Plus, Send, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';

interface Message {
  id: string;
  type: 'text' | 'offer';
  sender: 'user' | 'vendor';
  content?: string;
  timestamp: string;
  offer?: {
    originalPrice: number;
    proposedPrice: number;
    status: 'pending' | 'accepted' | 'refused';
  };
}

export default function MessagePage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.advertId as string;
  const [message, setMessage] = React.useState('');

  // Récupération des données de l'annonce
  const advert = getAdvertById(advertId);

  // Messages mockés - en réalité, cela viendrait d'une API
  // Par défaut, pas d'offre - seulement des messages texte
  const [messages] = React.useState<Message[]>([
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
    // Une offre ne sera ajoutée que si quelqu'un en fait une
    // Exemple d'offre (à décommenter pour tester) :
    // {
    //   id: '3',
    //   type: 'offer',
    //   sender: 'vendor',
    //   timestamp: '14:35',
    //   offer: {
    //     originalPrice: advert.price,
    //     proposedPrice: 4.00,
    //     status: 'pending'
    //   }
    // }
  ]);

  if (!advert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Annonce non trouvée</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Logique d'envoi de message
      console.log(
        "Message envoyé pour l'annonce:",
        advertId,
        'Message:',
        message,
      );
      setMessage('');
    }
  };

  const handleAddPhoto = () => {
    // TODO: Logique d'ajout de photo
    console.log('Ajouter une photo');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              {advert.user.avatar ? (
                <img
                  src={advert.user.avatar}
                  alt={`Avatar de ${advert.user.name}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {advert.user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-semibold text-gray-800">
                    {advert.user.name}
                  </h1>
                  <img
                    src="/images/messages/stars.svg"
                    alt="Star"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    ({advert.user.reviews})
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Dernière connexion: il y a 2h
                </p>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Contexte de l'annonce */}
      <div className="bg-blue-50 border-b border-blue-100 px-4 py-3">
        <div className="flex items-center space-x-3">
          <img
            src={advert.image}
            alt={advert.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{advert.title}</h3>
            <p className="text-sm text-gray-600">
              {advert.price}€ • {advert.location}
            </p>
          </div>
        </div>
      </div>

      {/* Zone de messages */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => {
            if (msg.sender === 'vendor') {
              // Messages du vendeur (à gauche avec avatar)
              return (
                <div
                  key={msg.id}
                  className="flex justify-start items-start space-x-3"
                >
                  {advert.user.avatar ? (
                    <img
                      src={advert.user.avatar}
                      alt={`Avatar de ${advert.user.name}`}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-600">
                        {advert.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {msg.type === 'text' ? (
                    <div
                      className="border border-gray-800 text-gray-800 max-w-xs"
                      style={{
                        borderRadius: '4px',
                        padding: '12px 18px',
                      }}
                    >
                      <p>{msg.content}</p>
                    </div>
                  ) : (
                    <OfferMessage
                      originalPrice={msg.offer!.originalPrice}
                      proposedPrice={msg.offer!.proposedPrice}
                      status={msg.offer!.status}
                      onAccept={() => console.log('Offre acceptée')}
                      onRefuse={() => console.log('Offre refusée')}
                      onMakeOffer={() => console.log('Faire une contre-offre')}
                    />
                  )}
                </div>
              );
            } else {
              // Messages de l'utilisateur (à droite avec avatar)
              return (
                <div
                  key={msg.id}
                  className="w-full flex justify-end items-start space-x-3"
                >
                  {msg.type === 'text' ? (
                    <div
                      className="border border-gray-800 text-gray-800 max-w-xs"
                      style={{
                        borderRadius: '4px',
                        padding: '12px 18px',
                      }}
                    >
                      <p>{msg.content}</p>
                    </div>
                  ) : (
                    <OfferMessage
                      originalPrice={msg.offer!.originalPrice}
                      proposedPrice={msg.offer!.proposedPrice}
                      status={msg.offer!.status}
                      onAccept={() => console.log('Offre acceptée')}
                      onRefuse={() => console.log('Offre refusée')}
                      onMakeOffer={() => console.log('Faire une contre-offre')}
                    />
                  )}
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-gray-600">
                      U
                    </span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Barre de saisie */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          {/* Bouton ajouter photo */}
          <button
            onClick={handleAddPhoto}
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            aria-label="Ajouter une photo"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 border border-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className={`p-2 rounded-full transition-colors ${
              message.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!message.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
