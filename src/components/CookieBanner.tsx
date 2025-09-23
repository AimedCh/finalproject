import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '../hooks/useCookieConsent';
import { Link } from 'react-router-dom';

const CookieBanner: React.FC = () => {
  const { showBanner, acceptAll, rejectAll, setShowPreferences } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
        role="banner"
        aria-label="Cookie consent banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Contenido del banner */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🍪 Gestión de Cookies
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido. 
                Puedes gestionar tus preferencias en cualquier momento.
              </p>
              <div className="mt-2">
                <Link
                  to="/cookie-policy"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                  aria-label="Más información sobre cookies"
                >
                  Más información
                </Link>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <motion.button
                onClick={rejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Rechazar cookies no esenciales"
              >
                Rechazar
              </motion.button>
              
              <motion.button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Configurar preferencias de cookies"
              >
                Preferencias
              </motion.button>
              
              <motion.button
                onClick={acceptAll}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Aceptar todas las cookies"
              >
                Aceptar todas
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;