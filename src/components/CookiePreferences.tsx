import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '../hooks/useCookieConsent';
import type { CookieConsent } from '../hooks/useCookieConsent';
import { Link } from 'react-router-dom';

interface CookieCategory {
  id: keyof CookieConsent;
  title: string;
  description: string;
  required: boolean;
  cookies: string[];
}

const cookieCategories: CookieCategory[] = [
  {
    id: 'essential',
    title: 'Cookies Esenciales',
    description: 'Necesarias para el funcionamiento básico del sitio web. No se pueden desactivar.',
    required: true,
    cookies: ['cookie_consent', 'session_id', 'csrf_token']
  },
  {
    id: 'analytics',
    title: 'Cookies Analíticas',
    description: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio web recopilando información de forma anónima.',
    required: false,
    cookies: ['_ga', '_gid', '_gat', '_gtag']
  },
  {
    id: 'marketing',
    title: 'Cookies de Marketing',
    description: 'Utilizadas para mostrar anuncios relevantes y medir la efectividad de las campañas publicitarias.',
    required: false,
    cookies: ['_fbp', '_fbc', 'ads_id', 'marketing_id']
  },
  {
    id: 'functional',
    title: 'Cookies Funcionales',
    description: 'Permiten recordar tus preferencias y configuraciones para mejorar tu experiencia.',
    required: false,
    cookies: ['user_preferences', 'language', 'theme', 'notifications']
  }
];

const CookiePreferences: React.FC = () => {
  const { consent, setConsent, showPreferences, setShowPreferences } = useCookieConsent();
  const [localConsent, setLocalConsent] = useState<CookieConsent>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  // Sincronizar con el consentimiento actual cuando se abre el modal
  useEffect(() => {
    if (showPreferences && consent) {
      setLocalConsent(consent);
    }
  }, [showPreferences, consent]);

  const handleToggle = (category: keyof CookieConsent) => {
    if (category === 'essential') return; // No se puede desactivar
    
    setLocalConsent(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSave = () => {
    setConsent(localConsent);
  };

  const handleCancel = () => {
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    setLocalConsent({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const handleRejectAll = () => {
    setLocalConsent({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  if (!showPreferences) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        onClick={handleCancel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="cookie-preferences-title" className="text-2xl font-bold">
                  🍪 Preferencias de Cookies
                </h2>
                <p className="text-blue-100 mt-1">
                  Gestiona tus preferencias de cookies por categoría
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="text-white hover:text-gray-200 transition-colors p-2"
                aria-label="Cerrar preferencias de cookies"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. 
                Puedes elegir qué tipos de cookies aceptar. Las cookies esenciales son necesarias 
                para el funcionamiento básico del sitio.
              </p>
              <div className="mt-3">
                <Link
                  to="/cookie-policy"
                  className="text-blue-600 hover:text-blue-800 font-medium underline"
                  aria-label="Ver política completa de cookies"
                >
                  Ver política completa de cookies
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              {cookieCategories.map((category) => (
                <motion.div
                  key={category.id}
                  className="border border-gray-200 rounded-xl p-4"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.title}
                        </h3>
                        {category.required && (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Requerido
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {category.description}
                      </p>
                      <div className="text-xs text-gray-500">
                        <strong>Cookies utilizadas:</strong> {category.cookies.join(', ')}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localConsent[category.id]}
                          onChange={() => handleToggle(category.id)}
                          disabled={category.required}
                          className="sr-only"
                          aria-describedby={`${category.id}-description`}
                        />
                        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                          localConsent[category.id] 
                            ? 'bg-blue-600' 
                            : 'bg-gray-200'
                        } ${category.required ? 'opacity-50' : ''}`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${
                            localConsent[category.id] ? 'translate-x-5' : 'translate-x-0.5'
                          } mt-0.5`} />
                        </div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="flex gap-2">
                <motion.button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Rechazar todas
                </motion.button>
                <motion.button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Aceptar todas
                </motion.button>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  onClick={handleCancel}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Guardar preferencias
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookiePreferences;
