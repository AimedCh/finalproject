import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const CookiePolicy: React.FC = () => {
  const cookieTypes = [
    {
      category: 'Cookies Esenciales',
      description: 'Estas cookies son necesarias para el funcionamiento básico del sitio web y no se pueden desactivar.',
      purpose: 'Autenticación, seguridad, funcionalidad básica',
      duration: 'Sesión / 1 año',
      examples: ['cookie_consent', 'session_id', 'csrf_token', 'auth_token'],
      required: true
    },
    {
      category: 'Cookies Analíticas',
      description: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio web recopilando información de forma anónima.',
      purpose: 'Análisis de tráfico, comportamiento de usuarios, optimización del sitio',
      duration: '2 años',
      examples: ['_ga', '_gid', '_gat', '_gtag', '_gcl_au'],
      required: false
    },
    {
      category: 'Cookies de Marketing',
      description: 'Utilizadas para mostrar anuncios relevantes y medir la efectividad de las campañas publicitarias.',
      purpose: 'Publicidad personalizada, remarketing, análisis de campañas',
      duration: '1-2 años',
      examples: ['_fbp', '_fbc', 'ads_id', 'marketing_id', '_gcl_aw'],
      required: false
    },
    {
      category: 'Cookies Funcionales',
      description: 'Permiten recordar tus preferencias y configuraciones para mejorar tu experiencia.',
      purpose: 'Preferencias de usuario, configuraciones, personalización',
      duration: '1 año',
      examples: ['user_preferences', 'language', 'theme', 'notifications'],
      required: false
    }
  ];

  const thirdPartyServices = [
    {
      name: 'Google Analytics',
      purpose: 'Análisis de tráfico web y comportamiento de usuarios',
      cookies: ['_ga', '_gid', '_gat', '_gtag'],
      privacy: 'https://policies.google.com/privacy',
      optOut: 'https://tools.google.com/dlpage/gaoptout'
    },
    {
      name: 'Facebook Pixel',
      purpose: 'Seguimiento de conversiones y publicidad personalizada',
      cookies: ['_fbp', '_fbc'],
      privacy: 'https://www.facebook.com/privacy/explanation',
      optOut: 'https://www.facebook.com/settings?tab=ads'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Política de Cookies - Emprendedor Multidisciplinario</title>
        <meta name="description" content="Información detallada sobre el uso de cookies en nuestro sitio web, tipos de cookies utilizadas y cómo gestionar tus preferencias." />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Política de Cookies
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Información detallada sobre el uso de cookies en nuestro sitio web
              </p>
              <div className="text-sm text-gray-400">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="relative py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-6">¿Qué son las cookies?</h2>
                <div className="text-gray-300 space-y-4 leading-relaxed">
                  <p>
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
                    Nos ayudan a mejorar tu experiencia, recordar tus preferencias y analizar cómo utilizas nuestro sitio.
                  </p>
                  <p>
                    En cumplimiento con las regulaciones de privacidad (GDPR), te informamos sobre los tipos de cookies que utilizamos 
                    y te damos control sobre cuáles aceptar.
                  </p>
                </div>
              </motion.div>

              {/* Cookie Types */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-8">Tipos de Cookies que Utilizamos</h2>
                <div className="space-y-6">
                  {cookieTypes.map((type, index) => (
                    <motion.div
                      key={type.category}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {type.category}
                        </h3>
                        {type.required && (
                          <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                            Requerido
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4">{type.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-white">Propósito:</strong>
                          <p className="text-gray-300">{type.purpose}</p>
                        </div>
                        <div>
                          <strong className="text-white">Duración:</strong>
                          <p className="text-gray-300">{type.duration}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <strong className="text-white text-sm">Ejemplos de cookies:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {type.examples.map((cookie) => (
                            <span
                              key={cookie}
                              className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded border border-blue-500/30"
                            >
                              {cookie}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Third Party Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-8">Servicios de Terceros</h2>
                <div className="space-y-6">
                  {thirdPartyServices.map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                    >
                      <h3 className="text-xl font-semibold text-white mb-3">{service.name}</h3>
                      <p className="text-gray-300 mb-4">{service.purpose}</p>
                      <div className="space-y-3">
                        <div>
                          <strong className="text-white text-sm">Cookies utilizadas:</strong>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {service.cookies.map((cookie) => (
                              <span
                                key={cookie}
                                className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-500/30"
                              >
                                {cookie}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <a
                            href={service.privacy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-sm underline"
                          >
                            Política de privacidad
                          </a>
                          <a
                            href={service.optOut}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:text-red-300 text-sm underline"
                          >
                            Opt-out
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Management */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Gestionar tus Preferencias</h2>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <div className="text-gray-300 space-y-4">
                    <p>
                      Puedes gestionar tus preferencias de cookies en cualquier momento:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Utiliza el botón "Cambiar preferencias" en el footer del sitio</li>
                      <li>Borra las cookies desde la configuración de tu navegador</li>
                      <li>Utiliza los enlaces de opt-out de los servicios de terceros</li>
                    </ul>
                    <div className="mt-6">
                      <button
                        onClick={() => {
                          // Abrir modal de preferencias
                          window.dispatchEvent(new CustomEvent('openCookiePreferences'));
                        }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        Cambiar Preferencias de Cookies
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-white mb-6">¿Tienes Preguntas?</h2>
                <p className="text-gray-300 mb-6">
                  Si tienes alguna pregunta sobre nuestra política de cookies, no dudes en contactarnos.
                </p>
                <Link
                  to="/contact"
                  className="inline-block bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Contactar
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CookiePolicy;
