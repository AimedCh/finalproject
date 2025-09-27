import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ShoppingCart from "../components/ShoppingCart";
import PayPalCheckout from "../components/PayPalCheckout";
import OrderTracking from "../components/OrderTracking";
import LoginModal from "../components/LoginModal";
import { productsAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useCookieConsent } from "../hooks/useCookieConsent";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  features: string[];
  is_active: boolean;
  rating?: number;
  reviews?: any[];
}

interface OrderData {
  productId: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const AirPods: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { showBanner } = useCookieConsent();

  const { user, isAuthenticated, logout } = useAuth();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from API...");
        const response = await productsAPI.getAll();
        console.log("API Response:", response);
        if (response.success) {
          console.log("Setting products:", response.data);
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback to mock data if API fails
        const fallbackProducts: Product[] = [
          {
            id: 1,
            name: "AirPods 4",
            price: 25.00,
            description:
              "Audio espacial personalizado y hasta 5 horas de autonomía.",
            image: "/img/imgAirPods/airpods4.jpeg",
            category: "airpods",
            stock: 50,
            features: [
              "Audio espacial personalizado",
              "Hasta 5 h de autonomía",
              "Oye Siri",
              "Aislamiento de voz",
              "Carga inalámbrica",
            ],
            is_active: true,
            rating: 4.4,
            reviews: [],
          },
          {
            id: 2,
            name: "AirPods 4 con cancelación activa de ruido",
            price: 25.00,
            description:
              "Cancelación activa de ruido y audio adaptativo con modo ambiente.",
            image: "/img/imgAirPods/airpods43.jpeg",
            category: "airpods",
            stock: 30,
            features: [
              "Cancelación activa de ruido",
              "Audio adaptativo y modo ambiente",
              "Hasta 5 h de autonomía (4 h con ANC)",
              "Oye Siri",
              "Carga inalámbrica",
            ],
            is_active: true,
            rating: 4.6,
            reviews: [],
          },
          {
            id: 3,
            name: "AirPods Pro 3",
            price: 30.00,
            description:
              "Cancelación activa de ruido 4x superior con medición de frecuencia cardiaca.",
            image: "/img/imgAirPods/airpodspro3.jpeg",
            category: "airpods",
            stock: 25,
            features: [
              "Cancelación activa de ruido 4x superior",
              "Audio espacial + adaptativo",
              "Medición de frecuencia cardiaca",
              "Hasta 8 h de autonomía",
              "Carga inalámbrica",
            ],
            is_active: true,
            rating: 4.8,
            reviews: [],
          },
          {
            id: 4,
            name: "AirPods Max",
            price: 35.00,
            description:
              "Cancelación activa de ruido profesional y audio espacial personalizado.",
            image: "/img/imgAirPods/airpodsmax.png",
            category: "airpods",
            stock: 15,
            features: [
              "Cancelación activa de ruido profesional",
              "Audio espacial personalizado",
              "Hasta 20 h de autonomía",
              "Digital Crown para control de volumen",
              "Diseño premium",
            ],
            is_active: true,
            rating: 4.7,
            reviews: [],
          },
        ];
        setProducts(fallbackProducts);
      }
    };

    fetchProducts();
  }, []);

  const generateTrackingCode = () => {
    return "AP" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]);
    }

    // Show cart briefly
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 2000);
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePayPalSuccess = () => {
    const trackingCode = generateTrackingCode();
    setTrackingCode(trackingCode);
    setPurchaseSuccess(true);
    setIsCheckoutOpen(false);
    setCartItems([]);

    // Show success message
    setTimeout(() => {
      setPurchaseSuccess(false);
    }, 5000);
  };

  const handlePayPalError = (error: any) => {
    console.error("PayPal error:", error);
    alert("Error en el pago. Por favor, inténtalo de nuevo.");
  };

  const handleLearnMore = () => {
    // Future implementation for product details modal
  };

  const handleOrder = async (orderData: OrderData) => {
    try {
      // Create order data for backend
      const orderPayload = {
        airpods_id: orderData.productId,
        quantity: orderData.quantity,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        shipping_address: `${orderData.shippingAddress}, ${orderData.city}, ${orderData.postalCode}, ${orderData.country}`,
        payment_method: 'contra_reembolso',
        notes: orderData.notes || '',
        total_amount: (products.find(p => p.id === orderData.productId)?.price || 0) * orderData.quantity + 3.50 // Add shipping cost
      };

      // Send to backend
      const response = await fetch('/backend/airpods/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload)
      });

      if (response.ok) {
        const result = await response.json();
        alert(`¡Orden confirmada! Número de pedido: ${result.order_number || result.id}`);
      } else {
        throw new Error('Error al procesar la orden');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error al procesar la orden. Por favor, inténtalo de nuevo.');
    }
  };

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Helmet>
        <title>AirPods - Nuestra Tienda</title>
        <meta
          name="description"
          content="AirPods 4, AirPods Pro 3, AirPods Max - Los mejores auriculares inalámbricos de Apple. Audio espacial personalizado, cancelación activa de ruido y hasta 20h de autonomía."
        />
        <meta property="og:title" content="AirPods - Nuestra Tienda" />
        <meta
          property="og:description"
          content="Descubre la nueva generación de AirPods con tecnología de vanguardia y diseño premium."
        />
        <meta
          property="og:image"
          content="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-4?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1726676100000"
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Apple-style Header */}
        <motion.header
          className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src="/img/imgAirPods/airlogo.png"
                    alt="Apple Logo"
                    className="w-8 h-8"
                  />
                  <span className="text-xl font-semibold text-gray-900">
                    Nuestra Tienda
                  </span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {[
                  {
                    name: "Comparar",
                    href: "/servicios/airpods/compare",
                    active: false,
                  },
                  {
                    name: "Accesorios",
                    href: "#accessories",
                    active: false,
                  },
                  {
                    name: "Apple Music",
                    href: "#apple-music",
                    active: false,
                  },
                  {
                    name: "Diferencias",
                    href: "#differences",
                    active: false,
                  },
                ].map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const sectionId = item.href.replace("#", "");
                      const element = document.getElementById(sectionId);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm font-medium transition-colors relative text-gray-600 hover:text-gray-900 cursor-pointer"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              {/* Auth & Cart Section */}
              <div className="flex items-center space-x-4">
                {/* Login/Logout Button */}
                <motion.button
                  onClick={handleAuthAction}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isAuthenticated
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-2">
                      <span>Hola, {user?.name}</span>
                      <span>•</span>
                      <span>Cerrar Sesión</span>
                    </div>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </motion.button>

                {/* Cart Icon */}
                <motion.button
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(true)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                    />
                  </svg>
                  {totalCartItems > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      {totalCartItems}
                    </motion.span>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Hero Video Section */}
        <section className="absolute inset-0 relative h-screen bg-black overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/img/imgAirPods/fourk.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center text-white max-w-4xl mx-auto px-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6">AirPods</h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                El sonido perfecto. Ahora con más funciones.
              </p>
              <motion.button
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver productos
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Price Comparison Section */}
        <section id="compare" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¿Por qué comprar con nosotros?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Productos originales con precios competitivos y servicio
                personalizado
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Nuestra Tienda */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-500"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16  rounded-full flex items-center justify-center mx-auto mb-4">
                  <img
  src="/img/imgAirPods/airlogo.png"
  alt="Apple Logo"
  className="w-16 h-16 object-contain"
/>
</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Nuestra Tienda
                  </h3>
                  <p className="text-gray-600">
                    Emprendedor Multidisciplinario
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">AirPods 4</span>
                    <span className="font-bold text-green-600">€25</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">AirPods 4 con ANC</span>
                    <span className="font-bold text-green-600">€25</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">AirPods Pro 3</span>
                    <span className="font-bold text-green-600">€30</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">AirPods Max</span>
                    <span className="font-bold text-green-600">€35</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Productos 100% originales</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Garantía oficial</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Envío rápido y seguro</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Atención personalizada</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Soporte post-venta</span>
                  </div>
                </div>
              </motion.div>

              {/* Tienda Oficial */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img
                      src="/img/imgAirPods/applelogo.png"
                      alt="Apple Logo"
                      className="w-10 h-10"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Apple Store
                  </h3>
                  <p className="text-gray-600">Precios de referencia</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">AirPods 4</span>
                    <span className="font-bold text-gray-900">€129</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">AirPods 4 con ANC</span>
                    <span className="font-bold text-gray-900">€179</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">AirPods Pro 3</span>
                    <span className="font-bold text-gray-900">€249</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">AirPods Max</span>
                    <span className="font-bold text-gray-900">€549</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-gray-500">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Productos originales</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Garantía oficial</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Envío estándar</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Soporte oficial</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <span className="mr-2">✓</span>
                    <span className="text-sm">Tienda física</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  ¡Precios increíbles y accesibles!
                </h3>
                <p className="text-green-700">
                  Nuestros precios son más competitivos que otras tiendas,
                  manteniendo la misma calidad y garantía.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                La colección AirPods
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubre la gama completa de auriculares inalámbricos,
                diseñados para ofrecerte la mejor experiencia de audio.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                    onLearnMore={handleLearnMore}
                    onOrder={handleOrder}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Accessories Section */}
        <section id="accessories" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Accesorios para AirPods
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Protege y personaliza tus AirPods con nuestros accesorios
                premium
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Fundas de Silicona",
                  price: 5,
                  description: "Protección suave y cómoda para tus AirPods",
                  image: "/img/imgAirPods/funda.png",
                  colors: ["Negro", "Blanco", "Rosa", "Azul"],
                },
                {
                  name: "Cargador Inalámbrico",
                  price: 8,
                  description: "Carga rápida y eficiente para tu estuche",
                  image: "/img/imgAirPods/cargador.png",
                  colors: ["Blanco", "Negro"],
                },
                {
                  name: "Cables Lightning",
                  price: 6,
                  description: "Cables originales para carga rápida",
                  image: "/img/imgAirPods/cablelighting.png",
                  colors: ["Blanco", "Negro"],
                },
                {
                  name: "Adaptadores USB-C",
                  price: 4,
                  description: "Adaptadores para dispositivos modernos",
                  image: "/img/imgAirPods/adaptator.png",
                  colors: ["Blanco"],
                },
              ].map((accessory, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img
                      src={accessory.image}
                      alt={accessory.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      €{accessory.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {accessory.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {accessory.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Colores disponibles:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {accessory.colors.map((color, colorIndex) => (
                          <span
                            key={colorIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const newItem: CartItem = {
                          id: 1000 + index, // IDs únicos para accesorios
                          name: accessory.name,
                          price: accessory.price,
                          quantity: 1,
                          image: accessory.image
                        };
                        setCartItems(prev => {
                          const existingItem = prev.find(item => item.id === newItem.id);
                          if (existingItem) {
                            return prev.map(item =>
                              item.id === newItem.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                            );
                          }
                          return [...prev, newItem];
                        });
                        setIsCartOpen(true);
                      }}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Apple Music Integration */}
        <section
          id="apple-music"
          className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Música + AirPods
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Disfruta de la mejor experiencia musical con tus
                AirPods. Audio espacial, cancelación de ruido y calidad
                lossless.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🎵</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Audio Espacial
                  </h3>
                  <p className="text-blue-100">
                    Experiencia inmersiva con Dolby Atmos
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🔇</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Cancelación de Ruido
                  </h3>
                  <p className="text-blue-100">
                    Sumérgete completamente en tu música
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🎧</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Calidad Lossless
                  </h3>
                  <p className="text-blue-100">
                    Audio de alta fidelidad sin compresión
                  </p>
                </div>
              </div>
              <motion.a
                href="https://music.apple.com/es/trial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Probar música gratis
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Differences Section */}
        <section id="differences" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Diferencias entre Modelos
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Compara las características de cada modelo para encontrar el
                perfecto para ti
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Característica
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      AirPods (3ª gen)
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      AirPods Pro (2ª gen)
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                      AirPods Max
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Precio
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-green-600 font-semibold">
                      25€
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-blue-600 font-semibold">
                      25€
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-purple-600 font-semibold">
                      35€
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Cancelación de ruido
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-red-500">
                      ✗
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-green-500">
                      ✓
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-green-500">
                      ✓
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Audio espacial
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-green-500">
                      ✓
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-green-500">
                      ✓
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-green-500">
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Batería (auriculares)
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      6h
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      6h
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      20h
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      Resistencia al agua
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      IPX4
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-600">
                      IPX4
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-red-500">
                      ✗
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Reseñas de clientes
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex text-yellow-400 text-2xl">★★★★★</div>
                <span className="text-xl font-semibold text-gray-900">4.4</span>
                <span className="text-gray-600">(72 valoraciones)</span>
              </div>
              <p className="text-gray-600">
                Basado en reseñas de{" "}
                <a
                  href="https://www.milanuncios.com/valoraciones-usuario/aimed-carlos-231457457.htm?stc=sm-whatsapp-send_friend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Milanuncios
                </a>
              </p>
            </motion.div>

            {/* Imagen de valoraciones de Milanuncios */}
            <motion.div
              className="flex justify-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl w-full">
                <img
                  src="/img/imgAirPods/valoraciones.png"
                  alt="Valoraciones reales de clientes en Milanuncios - 4.4 estrellas con 72 valoraciones"
                  className="w-full h-auto rounded-xl"
                />
                <p className="text-center text-sm text-gray-500 mt-4">
                  Valoraciones reales de nuestros clientes en Milanuncios
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Aimed Carlos",
                  rating: 5,
                  comment:
                    "Excelente servicio y productos de calidad. Los AirPods Pro 3 superaron mis expectativas. Muy recomendable.",
                  verified: true,
                  service: "AirPods Pro 3",
                },
                {
                  name: "Cliente Verificado",
                  rating: 5,
                  comment:
                    "Productos 100% originales, envío rápido y atención personalizada. Los AirPods 4 con cancelación de ruido son perfectos.",
                  verified: true,
                  service: "AirPods 4 ANC",
                },
                {
                  name: "Usuario Satisfecho",
                  rating: 4,
                  comment:
                    "Muy buena experiencia de compra. Productos originales con garantía oficial. El seguimiento del pedido fue excelente.",
                  verified: true,
                  service: "AirPods Max",
                },
              ].map((review, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold text-gray-900">
                          {review.name}
                        </h3>
                        {review.verified && (
                          <span className="ml-2 text-blue-500 text-sm">
                            ✓ Verificado
                          </span>
                        )}
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "{review.comment}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500">{review.service}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Integration */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Síguenos en Instagram
              </h2>
              <p className="text-gray-600 mb-8">
                Mantente al día con las últimas novedades y ofertas especiales
              </p>
              <motion.a
                href="https://instagram.com/_airpods_alicante_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@_airpods_alicante_</span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Shopping Cart */}
        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
        />

        {/* Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Finalizar compra
                  </h2>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Resumen del pedido
                    </h3>
                    <div className="space-y-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>
                            €{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <div className="border-t pt-2 font-semibold">
                        <div className="flex justify-between">
                          <span>Total</span>
                          <span>€{subtotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Método de pago
                    </h3>
                    <PayPalCheckout
                      amount={subtotal}
                      cartItems={cartItems}
                      onSuccess={handlePayPalSuccess}
                      onError={handlePayPalError}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Purchase Success Modal */}
        {purchaseSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-green-600 text-2xl">✓</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ¡Compra realizada con éxito!
                </h3>
                <p className="text-gray-600 mb-6">
                  Tu pedido ha sido confirmado y está siendo procesado.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Código de seguimiento:
                  </p>
                  <p className="text-lg font-mono font-bold text-gray-900">
                    {trackingCode}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setPurchaseSuccess(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => {
                      setPurchaseSuccess(false);
                      setIsTrackingOpen(true);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Rastrear pedido
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Order Tracking */}
        <OrderTracking
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
        />

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </div>
    </>
  );
};

export default AirPods;




