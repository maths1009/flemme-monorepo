'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAnnonce } from '@/hooks/useAnnonces';
import { AnnoncesService } from '@/services/annonces.service';
import { Button, Input } from '@/components/common';
import { ArrowLeft, Loader2, MapPin } from 'lucide-react';

export default function EditAdvertPage() {
  const router = useRouter();
  const params = useParams();
  const advertId = params.id as string;
  const { annonce, loading, error } = useAnnonce(advertId);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    latitude: 0,
    longitude: 0,
    address: '' // For display/search
  });
  const [submitting, setSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const formatAddress = (data: any) => {
    if (!data.address) return data.display_name;
    const { road, house_number, postcode, city, town, village } = data.address;
    const cityResult = city || town || village || '';
    const parts = [];
    
    if (house_number) parts.push(house_number);
    if (road) parts.push(road);
    if (postcode) parts.push(postcode);
    if (cityResult) parts.push(cityResult);
    
    return parts.length > 0 ? parts.join(', ') : data.display_name;
  };

  useEffect(() => {
    if (annonce) {
      setFormData({
        title: annonce.title,
        description: annonce.description,
        price: annonce.price.toString(),
        latitude: annonce.latitude,
        longitude: annonce.longitude,
        address: '' 
      });

      if (annonce.latitude && annonce.longitude) {
         fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${annonce.latitude}&lon=${annonce.longitude}&addressdetails=1`)
           .then(res => res.json())
           .then(data => {
             if (data) {
               setFormData(prev => ({ ...prev, address: formatAddress(data) }));
             }
           })
           .catch(() => {});
      }
    }
  }, [annonce]);

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, address: value }));
    
    if (value.length > 2) {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5&countrycodes=fr&addressdetails=1`);
        const data = await res.json();
        setSuggestions(data || []);
        setShowSuggestions(true);
      } catch (err) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (s: any) => {
    setFormData(prev => ({
      ...prev,
      address: formatAddress(s),
      latitude: parseFloat(s.lat),
      longitude: parseFloat(s.lon)
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await AnnoncesService.update(advertId, {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        latitude: formData.latitude,
        longitude: formData.longitude
      });
      router.push(`/adverts/${advertId}`);
    } catch (err) {
      console.error('Failed to update advert', err);
      alert('Erreur lors de la mise à jour (Vérifiez les champs)');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (error || !annonce) return <div className="min-h-screen flex items-center justify-center">Annonce non trouvée</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4 flex items-center border-b border-gray-100">
        <button onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Modifier l'annonce</h1>
      </div>

      <div className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
            <Input 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Titre de l'annonce"
              required
            />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
             <div className="relative">
               <div className="relative">
                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <Input
                   value={formData.address}
                   onChange={handleAddressChange}
                   placeholder="Rechercher une adresse..."
                   className="pl-10"
                 />
               </div>
               
               {showSuggestions && suggestions.length > 0 && (
                 <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                   {suggestions.map((s, idx) => (
                     <button
                       key={idx}
                       type="button"
                       onClick={() => selectSuggestion(s)}
                       className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm"
                     >
                       {formatAddress(s)}
                     </button>
                   ))}
                 </div>
               )}
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full min-h-[120px] rounded-2xl border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-black/5"
              placeholder="Description détaillée"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="0.00"
              required
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
