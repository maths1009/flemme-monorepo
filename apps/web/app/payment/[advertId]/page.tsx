'use client';

import { getAdvertById } from '@/lib/mockData';
import { MoreHorizontal, X } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import * as React from 'react';

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const advertId = params.advertId as string;
  const [selectedPayment, setSelectedPayment] = React.useState('apple-pay');

  // Récupération des données de l'annonce
  const advert = getAdvertById(advertId);

  if (!advert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Annonce non trouvée</p>
      </div>
    );
  }

  const serviceFee = 2.45;
  const subtotal = advert.price;
  const total = subtotal + serviceFee;

  // Date d'aujourd'hui formatée
  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePayment = () => {
    // TODO: Logique de paiement
    console.log('Procéder au paiement avec:', selectedPayment);
    router.push(`/payment/${advertId}/success`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4 pb-4">
        {/* Annonce */}
        <div className="bg-white rounded-lg p-4 mb-6 flex items-center space-x-4">
          <Image
            src={advert.image}
            alt={advert.title}
            width={80}
            height={80}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {advert.title}
            </h2>
          </div>
        </div>

        {/* Moyens de paiement */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Ajoutez un moyen de paiement
          </h3>

          <div className="space-y-3">
            {/* Carte de crédit */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === 'card'}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-5 h-5"
              />
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/payement/bank-card.png"
                  alt="Carte bancaire"
                  width={32}
                  height={24}
                  className="w-8 h-6 object-contain"
                />
                <span className="text-gray-800">
                  Carte de crédit ou de débit
                </span>
              </div>
            </label>

            {/* Apple Pay */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="apple-pay"
                checked={selectedPayment === 'apple-pay'}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-5 h-5"
              />
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/payement/apple-pay.png"
                  alt="Apple Pay"
                  width={32}
                  height={24}
                  className="w-8 h-6 object-contain"
                />
                <span className="text-gray-800">Apple Pay</span>
              </div>
            </label>

            {/* Google Pay */}
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="google-pay"
                checked={selectedPayment === 'google-pay'}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="w-5 h-5"
              />
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/payement/google-pay.png"
                  alt="Google Pay"
                  width={32}
                  height={24}
                  className="w-8 h-6 object-contain"
                />
                <span className="text-gray-800">Google Pay</span>
              </div>
            </label>
          </div>
        </div>

        {/* Détails de la commande */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Détails de la commande
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-800">{advert.title}</span>
            <span className="text-gray-800">{advert.price}€</span>
          </div>
        </div>

        {/* Récapitulatif */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Récapitulatif
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sous-total</span>
              <span className="text-gray-800">{subtotal}€</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Frais de service</span>
              <span className="text-gray-800">{serviceFee}€</span>
            </div>

            <hr className="border-gray-200" />

            <div className="flex justify-between items-center font-semibold">
              <span className="text-gray-800">Total</span>
              <span className="text-gray-800">{total}€</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Total</span>
              <span className="text-gray-600">{total}€</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Date</span>
              <span className="text-gray-600">{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Bouton de paiement */}
        <button
          onClick={handlePayment}
          className="w-full bg-gray-800 text-white py-4 rounded-full text-lg font-medium hover:bg-gray-900 transition-colors"
        >
          Procéder au paiement
        </button>
      </div>
    </div>
  );
}
