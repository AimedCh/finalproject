import React, { useState, useEffect } from "react";
import { assetUrl } from "../utils/assetUrl";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { image } from "framer-motion/client";
import { workshopAPI } from "../services/api";

interface Service {
  id: number;
  name: string;
  description: string;
  base_price: string;
  duration_hours: string;
  category: string;
  is_active: boolean;
  requirements: string[];
}

const Workshop: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log('Fetching services from API...');
        const response = await workshopAPI.getServices();
        console.log('Workshop API Response:', response);
        if (response.success) {
          console.log('Setting services:', response.data);
          setServices(response.data);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const basicServices = [
    {
      name: "DTC Reading/Clearing",
      description: "Professional diagnostic trouble code reading and clearing",
      image: assetUrl("img/imgTaller/dtcreading.png"),
      icon: "🔧",
    },
    {
      name: "Service Reset",
      description: "Oil change and service interval reset",
      image: assetUrl("img/imgTaller/serviceReset.png"),
      icon: "🔄",
    },
    {
      name: "Mileage Reading",
      description: "Real mileage verification and reading",
      image: assetUrl("img/imgTaller/mileageReading.png"),
      icon: "📊",
    },
    {
      name: "ABS/Airbag Diagnostic",
      description: "Advanced safety system diagnostics",
      image: assetUrl("img/imgTaller/absairbagdiagnostic.png"),
      icon: "🛡️",
    },
  ];

  const advancedServices = [
    {
      name: "Key Programming",
      description: "Car key and immobilizer programming",
      image: assetUrl("img/imgTaller/keyprogramming.png"),
      icon: "🔑",
    },
    {
      name: "ECU/BSI Repair",
      description: "Electronic control unit and body systems repair",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      icon: "⚡",
    },
    {
      name: "Airbag Reset",
      description: "Crash airbag system reset and repair",
      image: assetUrl("img/imgTaller/airbagreset.png"),
      icon: "🛡️",
    },
    {
      name: "ECU Cloning",
      description: "Engine control unit cloning and programming",
      image: assetUrl("img/imgTaller/ecucloning.png"),
      icon: "🔧",
    },
    {
      name: "Engine Tuning",
      description: "Engine remapping and performance tuning",
      image: assetUrl("img/imgTaller/engineTuning.png"),
      icon: "⚙️",
    },
  ];

  const mechanicsServices = [
    {
      name: "Shock Absorbers",
      description: "Shock absorber replacement and repair",
      image: assetUrl("img/imgTaller/shockabsorbers.png"),
      icon: "🔩",
    },
    {
      name: "Ball Joints",
      description: "Ball joint replacement and alignment",
      image: assetUrl("img/imgTaller/ballJoints.png"),
      icon: "⚙️",
    },
    {
      name: "Wheel Alignment",
      description: "Professional wheel alignment service",
      image: assetUrl("img/imgTaller/wheelalignment.png"),
      icon: "🎯",
    },
    {
      name: "Suspension",
      description: "Complete suspension system repair",
      image: assetUrl("img/imgTaller/suspension.png"),
      icon: "🔧",
    },
  ];

  const basicTools = [
    {
      name: "Renault CLIP",
      description: "Official Renault diagnostic tool",
      image: assetUrl("img/imgTaller/renaultclip.png"),
      icon: "🛠️",
    },
    {
      name: "VCDS",
      description: "VAG-COM diagnostic system",
      image: assetUrl("img/imgTaller/vcds.png"),
      icon: "💻",
    },
    {
      name: "Launch X431",
      description: "Multi-brand diagnostic scanner",
      image: assetUrl("img/imgTaller/launchx431.png"),
      icon: "📱",
    },
    {
      name: "Delphi/Autocom",
      description: "Professional diagnostic equipment",
      image: assetUrl("img/imgTaller/delphiautocom.png"),
      icon: "🔧",
    },
  ];

  const advancedTools = [
    {
      name: "Kess/Ktag",
      description: "Advanced ECU reading and writing tool",
      image: assetUrl("img/imgTaller/kessktag.png"),
      icon: "⚙️",
    },
    {
      name: "Autotuner",
      description: "Professional tuning software",
      image: assetUrl("img/imgTaller/autotunerr.png"),
      icon: "💻",
    },
    {
      name: "Flex",
      description: "Multi-protocol diagnostic tool",
      image: assetUrl("img/imgTaller/flex.png"),
      icon: "🔧",
    },
    {
      name: "CMD",
      description: "Command line diagnostic interface",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      icon: "💻",
    },
    {
      name: "FGTech",
      description: "Ferrari and exotic car diagnostics",
      image: assetUrl("img/imgTaller/fgtech.png"),
      icon: "🏎️",
    },
    {
      name: "UPA",
      description: "Universal programmer adapter",
      image: assetUrl("img/imgTaller/upa.png"),
      icon: "🔌",
    },
    {
      name: "VVDI",
      description: "Vehicle diagnostic and programming",
      image: assetUrl("img/imgTaller/vvdi.png"),
      icon: "🔧",
    },
    {
      name: "Orange5",
      description: "Advanced key programming tool",
      image: assetUrl("img/imgTaller/orange5.png"),
      icon: "🔑",
    },
    {
      name: "Xprog",
      description: "Universal chip programmer",
      image: assetUrl("img/imgTaller/xprog.png"),
      icon: "💾",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed B.",
      service: "Complete Diagnostic",
      rating: 5,
      comment:
        "Excellent service, precise diagnostic and fast repair. I highly recommend!",
      image: "img/imgTaller/cliente1.png",
    },
    {
      name: "Fatima K.",
      service: "Engine Reprogramming",
      rating: 5,
      comment:
        "Very professional, clear explanations and perfect results. Thank you!",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Omar S.",
      service: "ECU Repair",
      rating: 4,
      comment: "Quality work, reasonable price. I will definitely come back.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Taller Automotriz - Emprendedor Multidisciplinario</title>
        <meta
          name="description"
          content="Taller profesional especializado en diagnósticos avanzados, reparaciones mecánicas y reprogramación de vehículos. Herramientas profesionales y técnicos certificados."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-900">
        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={assetUrl("img/imgTaller/aimeddiagsolutions.jpg")} 
              alt="Aimed Diag Solution Workshop" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
          
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-6xl mx-auto">
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Taller Automotriz
              </motion.h1>
              
              <motion.p 
                className="text-2xl md:text-3xl mb-8 text-gray-200 font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Diagnósticos avanzados y reparaciones profesionales
              </motion.p>
                
              <motion.div 
                className="flex flex-wrap justify-center gap-6 text-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="bg-blue-500/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-blue-300/30">
                  <span className="font-bold text-white">🔧</span> Diagnóstico profesional
                </div>
                <div className="bg-purple-500/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-purple-300/30">
                  <span className="font-bold text-white">⚡</span> Tecnología avanzada
                </div>
                <div className="bg-red-500/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-red-300/30">
                  <span className="font-bold text-white">🚘</span> Todas las marcas
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Navigation Sections */}
        <section className="relative py-8 bg-gray-800 border-b border-gray-700 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-red-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    opacity: [0.2, 0.4, 0.2],
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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { key: "basic-services", label: "Servicios Básicos", icon: "🔧", section: "basic-services" },
                { key: "advanced-services", label: "Servicios Avanzados", icon: "⚡", section: "advanced-services" },
                { key: "mechanics", label: "Mecánica", icon: "🔩", section: "mechanics-services" },
                { key: "tools", label: "Herramientas", icon: "🛠️", section: "tools" },
                { key: "pricing", label: "Precios", icon: "💰", section: "pricing" },
                { key: "testimonials", label: "Testimonios", icon: "⭐", section: "testimonials" },
                { key: "videos", label: "Videos", icon: "🎥", section: "videos" },
              ].map((section, index) => (
                <motion.button
                  key={section.key}
                  onClick={() => {
                    const element = document.getElementById(section.section);
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="group relative bg-gray-700/50 backdrop-blur-sm hover:bg-gray-600/70 border border-gray-600/30 hover:border-blue-500/50 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 text-white transform hover:scale-105 hover:shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-lg">{section.icon}</span>
                  {section.label}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Basic Services */}
        <section id="basic-services" className="relative py-20 bg-gray-800 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-red-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0">
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
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
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
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                Servicios Básicos
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Servicios esenciales de diagnóstico y mantenimiento
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {basicServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 text-center group transform hover:-translate-y-2 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={`${service.name} - Servicio de diagnóstico automotriz profesional`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                    <motion.div 
                      className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-2xl">{service.icon}</span>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <motion.h3 
                      className="text-xl font-bold text-white mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {service.name}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {service.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Services */}
        <section id="advanced-services" className="relative py-20 bg-gray-900 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-red-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0">
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
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-red-400 bg-clip-text text-transparent">
                Servicios Avanzados
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Servicios especializados en electrónica y programación
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advancedServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 text-center group transform hover:-translate-y-2 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={`${service.name} - Servicio avanzado de electrónica automotriz`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                    <motion.div 
                      className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-2xl">{service.icon}</span>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <motion.h3 
                      className="text-xl font-bold text-white mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {service.name}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {service.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mechanics Services */}
        <section id="mechanics-services" className="relative py-20 bg-gray-800 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-blue-600/5 to-purple-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-red-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    opacity: [0.2, 0.4, 0.2],
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
                <span className="bg-gradient-to-r from-red-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Servicios Mecánicos
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Reparaciones mecánicas profesionales y mantenimiento
              </motion.p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mechanicsServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-300 text-center group transform hover:-translate-y-2 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={service.image}
                      alt={`${service.name} - Servicio mecánico automotriz profesional`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                    <motion.div 
                      className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-red-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-2xl">{service.icon}</span>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <motion.h3 
                      className="text-xl font-bold text-white mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {service.name}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {service.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="relative py-20 bg-gray-900 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-red-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
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
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                  Herramientas Profesionales
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Equipos de diagnóstico y reparación de última generación
              </motion.p>
            </motion.div>

            {/* Basic Tools */}
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Herramientas Básicas
                </span>
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {basicTools.map((tool, index) => (
                  <motion.div
                    key={index}
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 text-center group transform hover:-translate-y-2 hover:shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={tool.image}
                        alt={`${tool.name} - Herramienta de diagnóstico automotriz profesional`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                      <motion.div 
                        className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-2xl">{tool.icon}</span>
                      </motion.div>
                      </div>
                    <div className="p-6">
                      <motion.h3 
                        className="text-xl font-bold text-white mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {tool.name}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-300 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {tool.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Advanced Tools */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                  Herramientas Avanzadas
                </span>
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {advancedTools.map((tool, index) => (
                  <motion.div
                    key={index}
                    className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 text-center group transform hover:-translate-y-2 hover:shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={tool.image}
                        alt={`${tool.name} - Herramienta avanzada de diagnóstico automotriz`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                      <motion.div 
                        className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-red-600 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-2xl">{tool.icon}</span>
                      </motion.div>
                      </div>
                    <div className="p-6">
                      <motion.h3 
                        className="text-xl font-bold text-white mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {tool.name}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-300 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {tool.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Section */}
        <section id="videos" className="relative py-20 bg-gray-800 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-red-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0">
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
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
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
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                  Nuestro Taller en Acción
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Ve a nuestros técnicos profesionales trabajando con las mejores herramientas
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="relative aspect-video bg-gray-700/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/50 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/G_nCD0pIbGM?si=lwbQ0Stg0Nw5-dp-"
                    title="YouTube video player - Diagnóstico automotriz profesional"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className="w-full h-full"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="relative aspect-video bg-gray-700/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-600/50 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/qJ3V3135M_U?si=EsXs9LEtIKzxQ7F1"
                    title="YouTube video player - Reparación automotriz avanzada"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className="w-full h-full"
                ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
                </motion.div>
              </motion.div>
              </div>

            {/* Video Description */}
            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <motion.p 
                className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                Estos videos muestran nuestro proceso de trabajo profesional, desde el diagnóstico inicial 
                hasta la reparación completa, utilizando las herramientas más avanzadas del mercado.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="relative py-20 bg-gray-900 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-pink-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0">
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
                  Testimonios de Clientes
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Lo que dicen nuestros clientes satisfechos sobre nuestros servicios
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-6">
                    <motion.img
                      src={testimonial.image}
                      alt={`${testimonial.name} - Cliente satisfecho`}
                      className="w-16 h-16 rounded-full mr-4 object-cover border-2 border-purple-500/30"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <motion.h3 
                        className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {testimonial.name}
                      </motion.h3>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.span
                            key={i}
                            className={`text-lg ${
                              i < testimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }`}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 + i * 0.05 }}
                            viewport={{ once: true }}
                          >
                            ⭐
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <motion.p 
                    className="text-gray-300 mb-6 italic leading-relaxed group-hover:text-gray-200 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    "{testimonial.comment}"
                  </motion.p>
                  <motion.div 
                    className="border-t border-gray-700/50 pt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-sm text-purple-400 font-medium">
                      {testimonial.service}
                    </p>
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative py-20 bg-gray-800 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-red-600/5"></div>
            {/* Subtle floating particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    opacity: [0.2, 0.4, 0.2],
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
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent">
                  Precios de Servicios
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Precios transparentes para todos nuestros servicios
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Servicios Básicos",
                  price: "Desde €30",
                  color: "from-blue-600 to-blue-700",
                  borderColor: "border-blue-500/50",
                  features: ["Diagnóstico básico", "Lectura de códigos de error", "Reset de servicio"]
                },
                {
                  title: "Servicios Avanzados",
                  price: "Desde €80",
                  color: "from-purple-600 to-purple-700",
                  borderColor: "border-purple-500/50",
                  features: ["Servicios avanzados", "Reprogramación de motor", "Programación de llaves"],
                  popular: true
                },
                {
                  title: "Servicios Mecánicos",
                  price: "Presupuesto",
                  color: "from-green-600 to-green-700",
                  borderColor: "border-green-500/50",
                  features: ["Reparaciones mecánicas", "Trabajo de suspensión", "Alineación de ruedas"]
                }
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative bg-gray-800/50 backdrop-blur-sm border-2 ${plan.borderColor} rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group ${plan.popular ? 'scale-105' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Más Popular
                      </span>
                </div>
                  )}
                  
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-6 text-center group-hover:text-purple-400 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {plan.title}
                  </motion.h3>
                  
                  <motion.div 
                    className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mb-6 text-center`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {plan.price}
                  </motion.div>
                  
                  <motion.ul 
                    className="space-y-3 text-gray-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        className="flex items-center group-hover:text-gray-200 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10"></div>
            {/* Floating particles */}
            <div className="absolute inset-0">
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
                  ¿Necesitas un diagnóstico o reparación?
                </span>
              </motion.h2>
              <motion.p 
                className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Contacta con nosotros para una cita y te ayudaremos con tu vehículo
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <a
                  href="tel:+34XXXXXXXXX"
                  className="group relative bg-white hover:bg-gray-100 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <span className="relative z-10">📞 Llamar Ahora</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </a>
                <Link
                  to="/contact"
                  className="group relative bg-transparent border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-white/10"
                >
                  <span className="relative z-10">📧 Enviar Mensaje</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Workshop;



