import React from 'react';

interface Apartment {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  features: string[];
  capacity: number;
  distanceToBeach: number;
  available: boolean;
  rating: number;
}

interface ApartmentCardProps {
  apartment: Apartment;
  onBook: () => void;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, onBook }) => {
  return (
    <div className="card hover:shadow-xl transition-all duration-300">
      <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
        <img 
          src={apartment.image} 
          alt={apartment.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-4xl">🏖️</span></div>';
          }}
        />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {apartment.name}
      </h3>
      
      <p className="text-gray-600 mb-4">
        {apartment.description}
      </p>
      
      <div className="flex items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`text-sm ${
                i < Math.floor(apartment.rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ⭐
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500 ml-2">({apartment.rating})</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">👥</span>
          <span>{apartment.capacity} personas</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">🏖️</span>
          <span>{apartment.distanceToBeach}m de la playa</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">Características:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {apartment.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
          {apartment.features.length > 3 && (
            <li className="text-gray-500">
              +{apartment.features.length - 3} más...
            </li>
          )}
        </ul>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-primary-600">
          €{apartment.price}/día
        </div>
        <button 
          className="btn-primary"
          onClick={onBook}
          disabled={!apartment.available}
        >
          {apartment.available ? 'Reservar' : 'No disponible'}
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;

