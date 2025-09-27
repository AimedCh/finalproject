import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Apartment {
  id: number;
  name: string;
  description: string;
  address?: string;
  city?: string;
  price: number;
  price_per_night?: string;
  max_guests?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  images: string[];
  image: string;
  rating: number;
  features: string[];
  capacity: number;
  is_active?: boolean;
  available?: boolean;
  distanceToBeach?: number;
  latitude?: number;
  longitude?: number;
}

interface BookingFormProps {
  apartment: Apartment;
  onClose: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ apartment, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: apartment.capacity
  });
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateNights = (checkIn: string, checkOut: string) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'checkIn' || name === 'checkOut') {
      const newCheckIn = name === 'checkIn' ? value : formData.checkIn;
      const newCheckOut = name === 'checkOut' ? value : formData.checkOut;
      const calculatedNights = calculateNights(newCheckIn, newCheckOut);
      setNights(calculatedNights);
      setTotalPrice(calculatedNights * apartment.price);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Enviar datos al backend Laravel
      const response = await fetch('/backend/alquileres/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombre_cliente: formData.name,
          email_cliente: formData.email,
          telefono_cliente: formData.phone,
          numero_huespedes: formData.guests,
          tipo_equipo: apartment.name,
          descripcion_equipo: apartment.description,
          fecha_entrada: formData.checkIn,
          fecha_salida: formData.checkOut,
          precio_dia: apartment.price
        })
      });

      const result = await response.json();
      
      console.log('Response status:', response.status);
      console.log('Response data:', result);
      
      if (response.ok) {
        alert('¡Reserva confirmada exitosamente! Te contactaremos pronto.');
        onClose();
      } else {
        console.error('Error response:', result);
        
        // Manejar errores específicos de disponibilidad
        if (response.status === 409 && result.error === 'availability_conflict') {
          const errorMessage = result.message || 'La habitación no está disponible para las fechas seleccionadas.';
          throw new Error(errorMessage);
        }
        
        // Manejar otros errores de validación
        const errorMessage = result.errors ? 
          Object.values(result.errors).flat().join(', ') : 
          result.message || 'Error al procesar la reserva';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error en la reserva:', error);
      alert(`Error al procesar la reserva: ${error.message}. Por favor, inténtalo de nuevo.`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t('rentals.booking.title')}
              </h2>
              <p className="text-gray-600">{apartment.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Apartment Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{apartment.name}</h3>
                <p className="text-sm text-gray-600">{apartment.capacity} personas • {apartment.distanceToBeach}m de la playa</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-600">
                  €{apartment.price}/día
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Huéspedes
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  {[...Array(apartment.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'persona' : 'personas'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {/* Price Summary */}
            {nights > 0 && (
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        {nights} {nights === 1 ? 'noche' : 'noches'} × €{apartment.price}/día
                      </p>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      €{totalPrice}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Servicios incluidos</span>
                    <span>Gratis</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Impuestos</span>
                    <span>Incluidos</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <div className="text-2xl font-bold text-primary-600">
                        €{totalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Información sobre el proceso de reserva */}
            {nights > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="text-blue-500 text-xl">ℹ️</div>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">
                      Proceso de Reserva
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Esta es una reserva sin pago online. Te contactaremos para confirmar los detalles y coordinar el pago.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button 
                type="submit"
                className="btn-primary flex-1"
                disabled={nights === 0 || isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </div>
                ) : (
                  `Confirmar Reserva - €${totalPrice}`
                )}
              </button>
              <button 
                type="button"
                className="btn-secondary flex-1"
                onClick={onClose}
                disabled={isProcessing}
              >
                {t('common.close')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

