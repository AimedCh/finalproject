import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      key: 'airpods',
      path: '/airpods',
      icon: '🎧',
      color: 'from-slate-600 to-slate-800',
      bgColor: 'from-slate-50 to-slate-100'
    },
    {
      key: 'rentals',
      path: '/rentals',
      icon: '🏖️',
      color: 'from-emerald-600 to-emerald-800',
      bgColor: 'from-emerald-50 to-emerald-100'
    },
    {
      key: 'workshop',
      path: '/workshop',
      icon: '🔧',
      color: 'from-orange-600 to-orange-800',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <section className="py-20 section-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-blue-50/50"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-slate-200/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-blue-600 text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Mis Servicios
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('home.services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre mis tres negocios especializados, cada uno diseñado para ofrecerte la mejor experiencia y calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.key}
              to={service.path}
              className="group block"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="card card-hover relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative w-20 h-20 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-3xl text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {t(`home.services.${service.key}.title`)}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t(`home.services.${service.key}.description`)}
                  </p>
                  
                  {/* CTA */}
                  <div className={`flex items-center font-semibold transition-colors duration-300 ${
                    service.key === 'airpods' ? 'text-slate-600 group-hover:text-slate-700' :
                    service.key === 'rentals' ? 'text-emerald-600 group-hover:text-emerald-700' :
                    'text-orange-600 group-hover:text-orange-700'
                  }`}>
                    <span>Explorar servicio</span>
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
