import React, { useState } from "react";
import { assetUrl } from "../utils/assetUrl";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ApartmentCard from "../components/ApartmentCard";
import BookingForm from "../components/BookingForm";
import destinationsData from "../data/destinations.json";

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

const Rentals: React.FC = () => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Smooth scroll to inspiration section
    const inspirationSection = document.getElementById("inspiration-section");
    if (inspirationSection) {
      inspirationSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Pre-defined apartments data for instant loading
  const mockApartments: Apartment[] = [
            {
              id: 1,
              name: "Apartamento Playa Dorada",
      description: "Apartamento moderno con vista al mar, perfecto para familias",
              address: "Calle de la Playa, 123",
              city: "Mostaganem",
              price: 50,
              price_per_night: "50",
              max_guests: 4,
              bedrooms: 2,
              bathrooms: 1,
              amenities: ["WiFi", "Kitchen", "Parking"],
              images: [
                assetUrl("img/imgAlquieres/habitacion1.png"),
                assetUrl("img/imgAlquieres/habitacion1.png"),
                assetUrl("img/imgAlquieres/habitacion1.png"),
              ],
              image: assetUrl("img/imgAlquieres/habitacion1.png"),
              features: [
                "2 habitaciones",
                "1 baño",
                "Cocina equipada",
                "Terraza con vista al mar",
              ],
              capacity: 4,
              distanceToBeach: 300,
              available: true,
              rating: 4.8,
            },
            {
              id: 2,
              name: "Estudio Marina",
      description: "Estudio acogedor ideal para parejas, a solo 200m de la playa",
              price: 50,
              image: assetUrl("img/imgAlquieres/habitacion2.png"),
              images: [
                assetUrl("img/imgAlquieres/habitacion2.png"),
                assetUrl("img/imgAlquieres/habitacion2.png"),
                assetUrl("img/imgAlquieres/habitacion2.png"),
              ],
              features: [
                "1 habitación",
                "1 baño",
                "Cocina americana",
                "Balcón privado",
              ],
              capacity: 2,
              distanceToBeach: 200,
              available: true,
              rating: 4.6,
            },
            {
              id: 3,
              name: "Casa Familiar Costa",
      description: "Casa espaciosa para grupos grandes, con jardín privado",
              price: 50,
              image: assetUrl("img/imgAlquieres/habitacion3.png"),
              images: [
                assetUrl("img/imgAlquieres/habitacion3.png"),
                assetUrl("img/imgAlquieres/habitacion3.png"),
                assetUrl("img/imgAlquieres/habitacion3.png"),
              ],
              features: [
                "3 habitaciones",
                "2 baños",
                "Cocina completa",
                "Jardín privado",
              ],
              capacity: 6,
              distanceToBeach: 500,
              available: true,
              rating: 4.9,
            },
            {
              id: 4,
              name: "Loft Moderno Seaview",
      description: "Loft de diseño con terraza panorámica y jacuzzi privado",
              price: 50,
              image: assetUrl("img/imgAlquieres/habitacion4.png"),
              images: [
                assetUrl("img/imgAlquieres/habitacion4.png"),
                assetUrl("img/imgAlquieres/habitacion4.png"),
                assetUrl("img/imgAlquieres/habitacion4.png"),
              ],
              features: [
                "1 habitación",
                "1 baño",
                "Jacuzzi privado",
                "Terraza panorámica",
              ],
              capacity: 2,
              distanceToBeach: 400,
              available: true,
              rating: 4.7,
            },
  ];

  // Use mock data directly for now
  const apartments = mockApartments;

  return (
    <>
      <Helmet>
        <title>Alquileres de Verano - Emprendedor Multidisciplinario</title>
        <meta
          name="description"
          content="Apartamentos de verano en Mostaganem, Argelia. Ubicados cerca de la playa con todas las comodidades. 4 apartamentos disponibles desde 50€ por día."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
        {/* Video Hero Section */}
        <section className="relative h-screen overflow-hidden bg-black">
            {/* Imagen de fondo como fallback */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
               style={{
                 backgroundImage: `url('${assetUrl("img/imgAlquieres/mostaganem.jpg")}')`,
                 zIndex: 0
               }}
            />

            {/* Video de fondo */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 1 }}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={assetUrl("img/imgAlquieres/mostaganem.jpg")}
              onError={(e) => {
                console.error('Error loading video:', e);
                // Hide video element on error and show background image
                e.currentTarget.style.display = 'none';
              }}
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onPlay={() => console.log('Video started playing')}
              onLoadedData={() => console.log('Video data loaded')}
            >
              <source src={assetUrl("img/imgAlquieres/mosta4k.mp4")} type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" style={{ zIndex: 2 }}></div>

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-6xl mx-auto">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              ></motion.div>

              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-blue-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Location Mostaganem
              </motion.h1>

              <motion.p
                className="text-2xl md:text-3xl mb-8 text-orange-100 font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                Apartamentos familiares en Ben Abdelmalek Ramdane
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-6 text-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <div className="bg-orange-500/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-300/30">
                  <span className="font-bold text-white">🏖️ 4</span>{" "}
                  apartamentos de lujo
                </div>
                <div className="bg-yellow-500/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-yellow-300/30">
                  <span className="font-bold text-white">☀️ 50€</span> por día
                </div>
                <div className="bg-blue-500/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-blue-300/30">
                  <span className="font-bold text-white">🌊 500m</span> de la
                  playa
                </div>
                <div className="bg-green-500/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-green-300/30">
                  <span className="font-bold text-white">⭐ 4.6</span> Google
                  Reviews
                </div>
              </motion.div>

              {/* Facebook Link */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <motion.a
                  href="https://www.facebook.com/location.familiale.mosta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📘 Síguenos en Facebook
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Apartments Section */}
        <section className="py-20 bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Nuestros Hogares de Vacaciones
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Apartamentos modernos y cómodos perfectos para tus vacaciones de
                verano
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {apartments.map((apartment, index) => (
                <motion.div
                  key={apartment.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-orange-200/50"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={apartment.image}
                      alt={apartment.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        console.error(`Error loading image: ${apartment.image}`);
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDQwMCAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                      onLoad={() => console.log(`Image loaded: ${apartment.image}`)}
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      🏠 Disponible
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
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
                            className={`text-lg ${
                              i < Math.floor(apartment.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-600 ml-2">
                        ({apartment.rating})
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                        {apartment.price}€/día
                      </div>
                      <motion.button
                        onClick={() => setSelectedApartment(apartment)}
                        className="bg-gradient-to-r from-orange-500 via-yellow-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🏖️ Reservar Ahora
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspiration Section with Real Data */}
        <section
          id="inspiration-section"
          className="py-20 bg-gradient-to-br from-orange-900 via-yellow-900 to-blue-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Inspiración para futuras escapadas
              </h2>
              <p className="text-xl text-orange-200 max-w-3xl mx-auto">
                Descubre las mejores categorías de destinos cerca de Ben
                Abdelmalek Ramdane
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {destinationsData.categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="text-center group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300 ${category.color} text-white shadow-lg hover:shadow-xl`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{category.icon}</span>
                  </motion.div>
                  <p className="text-sm font-medium text-orange-200 group-hover:text-white transition-colors duration-300">
                    {category.name}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Show category details when selected */}
            {selectedCategory && (
              <motion.div
                className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {(() => {
                  const category = destinationsData.categories.find(
                    (c) => c.id === selectedCategory
                  );
                  if (!category) return null;

                  return (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <span className="text-3xl mr-3">{category.icon}</span>
                          <h3 className="text-2xl font-bold text-white">
                            {category.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className="text-white/60 hover:text-white text-2xl"
                        >
                          ✕
                        </button>
                      </div>

                      <p className="text-orange-200 mb-8">
                        {category.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.items.map((item, itemIndex) => (
                          <motion.div
                            key={item.id}
                            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: itemIndex * 0.1,
                            }}
                          >
                            <img
                              src={assetUrl(item.image)}
                              alt={item.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                              onError={(e) => {
                                console.error(`Error loading image: ${item.image}`);
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDMwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iNjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5Q0EzQUYiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiI+SW1hZ2VuIG5vIGRpc3BvbmlibGU8L3RleHQ+Cjwvc3ZnPgo=';
                              }}
                              onLoad={() => console.log(`Image loaded: ${item.image}`)}
                            />
                            <h4 className="text-white font-semibold mb-2">
                              {item.name}
                            </h4>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-orange-300 text-sm">
                                📍 {item.distance}
                              </span>
                              <span className="text-yellow-300 text-sm">
                                ⭐ {item.rating}
                              </span>
                            </div>
                            <p className="text-gray-300 text-sm mb-3">
                              {item.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="bg-orange-500/20 text-orange-200 px-2 py-1 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">Ubicación</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Descubre la hermosa ciudad de Mostaganem y sus alrededores
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Interactive Google Map */}
              <div className="aspect-video bg-gray-700 rounded-lg mb-6 overflow-hidden relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102400.73!2d0.0833!3d35.9333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e5b6b6b6b6b6b%3A0x6b6b6b6b6b6b6b6b!2sMostaganem%2C%20Algeria!5e0!3m2!1sen!2ses!4v1234567890123!5m2!1sen!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>

                {/* Overlay with link to full map */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.a
                    href="https://maps.app.goo.gl/Kbwos62CmhGT6i2y8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🗺️ Ver mapa completo
                  </motion.a>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Ben Abdelmalek Ramdane, Mostaganem
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Location Mostaganem - Apartamentos familiares en la hermosa
                  costa argelina. Plage Chaibia con excelentes reseñas en Google
                  Maps.
                </p>

                {/* Google Reviews */}
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-white font-bold ml-2 text-xl">
                      4.6
                    </span>
                    <span className="text-gray-300 ml-2">(61 reseñas)</span>
                  </div>
                  <p className="text-orange-200 text-sm">
                    Plage Chaibia - شقق عطلات للإيجار
                  </p>
                </div>

                {/* Location highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-600/20 border border-blue-500/30 px-4 py-3 rounded-lg">
                    <span className="text-blue-300 text-sm">
                      🏖️ Plage Chaibia
                    </span>
                    <div className="font-semibold text-white">200-500m</div>
                  </div>
                  <div className="bg-green-600/20 border border-green-500/30 px-4 py-3 rounded-lg">
                    <span className="text-green-300 text-sm">🌡️ Clima</span>
                    <div className="font-semibold text-white">Mediterráneo</div>
                  </div>
                  <div className="bg-orange-600/20 border border-orange-500/30 px-4 py-3 rounded-lg">
                    <span className="text-orange-300 text-sm">
                      🎡 Mostaland
                    </span>
                    <div className="font-semibold text-white">10km</div>
                  </div>
                </div>

                {/* Quick access buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  <motion.a
                    href="https://maps.app.goo.gl/Kbwos62CmhGT6i2y8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    📍 Ver en Google Maps
                  </motion.a>
                  <motion.a
                    href="https://www.facebook.com/location.familiale.mosta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    📘 Facebook
                  </motion.a>
                  <button
                    onClick={() => handleCategoryClick("playas")}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    🏖️ Ver playas cercanas
                  </button>
                  <button
                    onClick={() => handleCategoryClick("actividades")}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    🎡 Mostaland
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Policies Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Políticas y Servicios
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Información importante sobre nuestras políticas de reserva y
                servicios incluidos
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "✓",
                  title: "Cancelación gratuita",
                  description: "Hasta 24 horas antes del check-in",
                  color: "bg-green-600",
                },
                {
                  icon: "🕒",
                  title: "Check-in",
                  description: "A partir de las 15:00",
                  color: "bg-blue-600",
                },
                {
                  icon: "🚪",
                  title: "Check-out",
                  description: "Hasta las 11:00",
                  color: "bg-purple-600",
                },
                {
                  icon: "📅",
                  title: "Estancia mínima",
                  description: "2 noches",
                  color: "bg-orange-600",
                },
              ].map((policy, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`w-16 h-16 ${policy.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-white text-2xl">{policy.icon}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-gray-300">{policy.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        {selectedApartment && (
          <BookingForm
            apartment={selectedApartment}
            onClose={() => setSelectedApartment(null)}
          />
        )}
      </div>
    </>
  );
};

export default Rentals;
