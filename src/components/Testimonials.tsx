import React from 'react';
import { useTranslation } from 'react-i18next';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: "María García",
      role: "Cliente AirPods",
      content: "Excelente servicio y productos de calidad. Los AirPods llegaron perfectos y con garantía oficial.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Jean Dupont",
      role: "Huésped Mostaganem",
      content: "El apartamento era perfecto, muy cerca de la playa y con todas las comodidades. ¡Volveré!",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Ahmed Benali",
      role: "Cliente Taller",
      content: "Diagnóstico rápido y preciso. Solucionaron el problema de mi coche en tiempo récord.",
      rating: 5,
      avatar: "👨‍🔧"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.testimonials.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card text-center">
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

