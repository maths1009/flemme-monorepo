'use client';

import { MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: {
    address: string;
    lat: number;
    lng: number;
  }) => void;
  placeholder?: string;
  className?: string;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder = "Saisissez votre adresse...",
  className,
}) => {
  const [address, setAddress] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setAddress(value);
  }, [value]);

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

  const fetchAddressSuggestions = async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=fr&addressdetails=1`,
      );
      const data = await response.json();
      setSuggestions(data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAddress(newValue);
    onChange(newValue);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (newValue.length > 2) {
      timeoutRef.current = setTimeout(() => {
        fetchAddressSuggestions(newValue);
      }, 300);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: any) => {
    const formattedAddress = formatAddress(suggestion);
    setAddress(formattedAddress);
    setShowSuggestions(false);
    onSelect({
      address: formattedAddress,
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
    });
  };

  return (
    <div className={`relative ${className}`}>
        <div
        className="flex items-center border border-gray-300 bg-white focus-within:border-gray-800 focus-within:ring-1 focus-within:ring-gray-800 transition-colors"
        style={{ borderRadius: '16px' }}
        >
        <div className="px-4 text-gray-400 text-base">
            <MapPin className="w-5 h-5" />
        </div>
        <div className="w-px h-6 bg-gray-200"></div>
        <input
            type="text"
            value={address}
            onChange={handleInputChange}
            onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 text-base bg-transparent border-none outline-none placeholder-gray-400 text-gray-800"
        />
        </div>

        {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
            <button
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
                <div className="text-sm text-gray-800 font-medium">
                {formatAddress(suggestion)}
                </div>
            </button>
            ))}
        </div>
        )}
    </div>
  );
};
