import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "airpods",
      title: "AirPods Store",
      description:
        "Venta de auriculares inalámbricos Apple AirPods con garantía oficial y envío rápido.",
      image: "/img/imgAirPods/airlogo.png",
      features: [
        "Productos originales con garantía Apple",
        "Envío rápido y seguro",
        "Soporte técnico especializado",
        "Precios competitivos del mercado",
        "Accesorios y repuestos disponibles",
        "Asesoramiento personalizado"
      ],
      price: "Desde 149€",
      link: "/airpods",
      icon: "🎧", 
      color: "from-blue-500 to-blue-600",
      detailedDescription: "Nuestra tienda de AirPods ofrece los auriculares inalámbricos más populares del mercado con garantía oficial de Apple. Trabajamos directamente con distribuidores autorizados para garantizar la autenticidad de cada producto. Además de la venta, ofrecemos soporte técnico, accesorios originales y asesoramiento personalizado para ayudarte a elegir el modelo perfecto para tus necesidades.",
      benefits: [
        "Garantía oficial de Apple",
        "Productos 100% auténticos",
        "Envío en 24-48 horas",
        "Soporte post-venta",
        "Accesorios originales",
        "Precios sin competencia"
      ]
    },
    {
      id: "rentals",
      title: "Alquileres de Verano",
      description:
        "Apartamentos de verano en Mostaganem, Argelia. Ubicados cerca de la playa con todas las comodidades.",
      image: "/img/imgAlquieres/location-logo.png",
      features: [
        "4 apartamentos completamente equipados",
        "Ubicación privilegiada a 500m de la playa",
        "Precio accesible de 50€ por día",
        "Cancelación gratuita hasta 48h antes",
        "WiFi gratuito y aire acondicionado",
        "Aparcamiento privado incluido"
      ],
      price: "50€/día",
      link: "/rentals",
      icon: "🏖️",
      color: "from-green-500 to-green-600",
      detailedDescription: "Nuestros apartamentos de verano en Mostaganem ofrecen la combinación perfecta entre comodidad y ubicación privilegiada. Situados a solo 500 metros de las mejores playas de la región, nuestros 4 apartamentos están completamente equipados con todas las comodidades modernas. Cada apartamento incluye cocina completa, baño privado, aire acondicionado, WiFi gratuito y aparcamiento privado.",
      benefits: [
        "Ubicación excepcional cerca de la playa",
        "Apartamentos completamente equipados",
        "Precios muy competitivos",
        "Flexibilidad en cancelaciones",
        "Servicio de limpieza incluido",
        "Asistencia 24/7 durante tu estancia"
      ]
    },
    {
      id: "workshop",
      title: "Taller Automotriz",
      description:
        "Taller profesional especializado en diagnósticos avanzados, reparaciones mecánicas y reprogramación de vehículos.",
      image: "/img/imgTaller/aimeddiagsolutions.jpg",
      features: [
        "Diagnósticos profesionales con equipos de última generación",
        "Herramientas especializadas para todas las marcas",
        "Técnicos certificados y experimentados",
        "Reparaciones con garantía completa",
        "Servicio de reprogramación y chiptuning",
        "Atención personalizada y presupuestos sin compromiso"
      ],
      price: "Desde 30€",
      link: "/workshop",
      icon: "🔧",
      color: "from-purple-500 to-purple-600",
      detailedDescription: "Nuestro taller automotriz cuenta con la tecnología más avanzada del mercado y un equipo de técnicos altamente cualificados. Especializados en diagnósticos complejos, reparaciones mecánicas y reprogramación de vehículos, ofrecemos servicios profesionales para todas las marcas y modelos. Utilizamos herramientas de diagnóstico de última generación y repuestos de calidad garantizada.",
      benefits: [
        "Equipos de diagnóstico de última generación",
        "Técnicos certificados por las principales marcas",
        "Garantía en todas las reparaciones",
        "Servicio de reprogramación especializado",
        "Presupuestos detallados y sin compromiso",
        "Atención personalizada y seguimiento post-reparación"
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Nuestros Servicios - Emprendedor Multidisciplinario</title>
        <meta
          name="description"
          content="Descubre nuestros servicios profesionales: AirPods Store, Alquileres de Verano y Taller Automotriz. Soluciones de calidad garantizada para todas tus necesidades."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Status Badge */}
              <motion.div 
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 text-green-300 text-sm font-semibold mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                Servicios profesionales disponibles
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="block">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Nuestros
                  </span>
                </span>
                <motion.span 
                  className="block bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  Servicios
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Soluciones profesionales en tecnología, alojamiento y automoción. 
                Calidad garantizada y atención personalizada en cada proyecto.
              </motion.p>

              {/* Contact Methods */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Link
                  to="/contact"
                  className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10">Contactar Ahora</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/about"
                  className="group relative bg-transparent border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-white/10"
                >
                  Conoce Nuestra Historia
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              >
                {[
                  { number: "3", label: "Servicios Principales" },
                  { number: "500+", label: "Clientes Satisfechos" },
                  { number: "5+", label: "Años de Experiencia" },
                  { number: "24/7", label: "Soporte Disponible" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative py-20 bg-gray-800 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Nuestros Servicios
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Descubre nuestras soluciones profesionales diseñadas para satisfacer todas tus necesidades
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="relative z-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={`${service.title} - Servicio profesional`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {service.price}
                    </div>
                  </div>

                  <div className="p-6">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-300 mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {service.description}
                    </motion.p>

                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-white font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2"></span>
                        Características principales:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="text-gray-300 text-sm flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 + idx * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <span className="text-green-400 mr-3 text-lg">✓</span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <div className="flex gap-3">
                      <motion.div
                        className="flex-1 relative z-10 pointer-events-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={service.link}
                          className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg relative z-10 pointer-events-auto"
                          aria-label={`Ir a la página de ${service.title}`}
                        >
                          Ver Detalles
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                    <Link
                      to={service.link}
                          className="inline-flex items-center justify-center w-12 h-12 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 relative z-10 pointer-events-auto"
                          aria-label={`Ir a la página de ${service.title}`}
                    >
                          <span className="text-lg">→</span>
                    </Link>
                      </motion.div>
                    </div>
                  </div>
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative py-20 bg-gray-900 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-pink-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-12, 12, -12],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                ¿Por qué elegirnos?
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Compromiso con la excelencia y la satisfacción del cliente en cada proyecto
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🏆",
                  title: "Calidad Garantizada",
                  description: "Productos y servicios de la más alta calidad con garantía completa",
                },
                {
                  icon: "⚡",
                  title: "Servicio Rápido",
                  description: "Entrega rápida y eficiente en todos nuestros servicios",
                },
                {
                  icon: "🛡️",
                  title: "Confianza",
                  description: "Años de experiencia y miles de clientes satisfechos",
                },
                {
                  icon: "💬",
                  title: "Soporte 24/7",
                  description: "Atención al cliente disponible cuando lo necesites",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-3xl">{item.icon}</span>
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-300 group-hover:text-gray-200 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10"></div>
            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              ¿Listo para comenzar?
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Contacta con nosotros y descubre cómo podemos ayudarte a alcanzar tus objetivos
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/contact"
                  className="group relative bg-white hover:bg-gray-100 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10">Contactar Ahora</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </Link>
              <Link
                  to="/about"
                  className="group relative bg-transparent border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-white/10"
              >
                  <span className="relative z-10">Conoce Más</span>
              </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Service Details Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(() => {
                  const service = services.find(s => s.id === selectedService);
                  if (!service) return null;
                  
                  return (
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-3xl">{service.icon}</span>
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                            <p className="text-xl text-purple-400 font-semibold">{service.price}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedService(null)}
                          className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
                          aria-label="Cerrar modal"
                        >
                          <span className="text-xl">×</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <img
                            src={service.image}
                            alt={`${service.title} - Servicio profesional`}
                            className="w-full h-64 object-cover rounded-xl"
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-4">Descripción Completa</h3>
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {service.detailedDescription}
                          </p>
                          
                          <h4 className="text-xl font-bold text-white mb-4">Beneficios Principales</h4>
                          <ul className="space-y-2 mb-6">
                            {service.benefits.map((benefit, idx) => (
                              <li key={idx} className="text-gray-300 flex items-center">
                                <span className="text-green-400 mr-3 text-lg">✓</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-gray-700">
                        <h4 className="text-xl font-bold text-white mb-4">Características Detalladas</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-gray-300">
                              <span className="text-blue-400 mr-3 text-lg">•</span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 flex gap-4">
                        <Link
                          to={service.link}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105"
                        >
                          Ir a la Página
                        </Link>
                        <Link
                          to="/contact"
                          className="flex-1 bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-purple-400 hover:text-white px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105"
                        >
                          Contactar
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Services;
