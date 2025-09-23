# Emprendedor Multidisciplinario 🚀

Una plataforma completa que combina tres servicios especializados: **AirPods Store**, **Alquileres de Verano** y **Taller Automotriz**. Desarrollado por Aimed Dine Chebili como un proyecto integral que demuestra habilidades en desarrollo full-stack moderno.


- ✅ **Sistema de Cookies GDPR Compliant** - Banner de consentimiento con preferencias granulares
- ✅ **Imágenes Optimizadas** - Todas las imágenes de alquileres ahora cargan correctamente
- ✅ **Mejoras de UX** - Animaciones fluidas y diseño responsivo mejorado
- ✅ **Documentación Completa** - Guías de testing y documentación técnica
- ✅ **Limpieza de Código** - Estructura optimizada y mejor mantenibilidad

## 🚀 Características Principales

### 🎧 AirPods Store
- Catálogo completo de productos Apple AirPods
- Sistema de pedidos con seguimiento en tiempo real
- Integración con PayPal para pagos seguros
- Reseñas y calificaciones de clientes
- Panel de administración para gestión de inventario

### 🏖️ Alquileres de Verano
- Listado de apartamentos en Mostaganem, Argelia con imágenes reales
- Sistema de reservas con calendario de disponibilidad
- 4 apartamentos completamente configurados con detalles
- Gestión de clientes y pagos integrada
- Políticas de cancelación flexibles
- Integración con mapas y ubicaciones
- Imágenes optimizadas y carga rápida

### 🔧 Taller Automotriz
- Servicios de diagnóstico avanzado
- Reparaciones mecánicas profesionales
- Programación de ECUs y sistemas electrónicos
- Gestión de herramientas y equipos
- Sistema de citas y seguimiento de trabajos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Framework principal con hooks modernos
- **TypeScript** - Tipado estático para mejor desarrollo
- **Tailwind CSS** - Estilos y diseño responsivo
- **Framer Motion** - Animaciones fluidas y transiciones
- **React Router** - Navegación SPA optimizada
- **React Helmet Async** - SEO y meta tags dinámicos
- **Sistema de Cookies** - Gestión GDPR compliant
- **Componentes Reutilizables** - Arquitectura modular

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Nodemailer** - Servicio de email
- **Express Validator** - Validación de datos

### Herramientas de Desarrollo
- **Vite** - Build tool y dev server
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Compatibilidad de CSS

## 📁 Estructura del Proyecto

```
emprendedor-multidisciplinario/
├── src/                          # Frontend React
│   ├── components/               # Componentes reutilizables
│   ├── pages/                    # Páginas principales
│   ├── hooks/                    # Custom hooks
│   ├── utils/                    # Utilidades
│   ├── locales/                  # Archivos de idiomas
│   └── assets/                   # Recursos estáticos
├── backend/                      # Backend Node.js
│   ├── src/
│   │   ├── controllers/          # Controladores de API
│   │   ├── models/               # Modelos de base de datos
│   │   ├── routes/               # Rutas de API
│   │   ├── middleware/           # Middleware personalizado
│   │   ├── config/               # Configuración
│   │   └── utils/                # Utilidades del backend
│   └── package.json
├── img/                          # Imágenes del proyecto
├── public/                       # Archivos públicos
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (local o en la nube)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/AimedCh/finalproject.git
cd finalproject
```

### 2. Instalar dependencias del frontend
```bash
npm install
```

### 3. Instalar dependencias del backend
```bash
cd backend
npm install
cd ..
```

### 4. Configurar variables de entorno

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=tu-paypal-client-id
```

#### Backend (backend/.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/emprendedor-multidisciplinario
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-app-password
CONTACT_EMAIL=chebiliaimed9@gmail.com
JWT_SECRET=tu-super-secret-jwt-key
```

### 5. Ejecutar el proyecto

#### Desarrollo
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

#### Producción
```bash
# Build del frontend
npm run build

# Iniciar backend en producción
cd backend
npm start
```

## 📱 Funcionalidades por Servicio

### AirPods Store
- ✅ Catálogo de productos con filtros
- ✅ Carrito de compras
- ✅ Proceso de checkout con PayPal
- ✅ Seguimiento de pedidos
- ✅ Sistema de reseñas
- ✅ Panel de administración

### Alquileres de Verano
- ✅ Listado de 4 apartamentos completamente configurados
- ✅ Imágenes reales optimizadas (habitacion1-4.png)
- ✅ Sistema de reservas con formulario interactivo
- ✅ Gestión de pagos y disponibilidad
- ✅ Políticas de cancelación flexibles
- ✅ Información detallada de ubicación en Mostaganem
- ✅ Diseño responsivo y animaciones fluidas

### Taller Automotriz
- ✅ Catálogo de servicios
- ✅ Sistema de citas
- ✅ Gestión de herramientas
- ✅ Seguimiento de trabajos
- ✅ Reseñas de servicios
- ✅ Panel de técnicos

## � Sistema de Cookies GDPR

### Características del Sistema
- **Banner de Consentimiento** - Aparece automáticamente al usuario
- **Gestión Granular** - Control por categorías (esenciales, analíticas, marketing, funcionales)
- **Cumplimiento GDPR** - Totalmente conforme con regulaciones europeas
- **Sincronización Backend** - Guarda preferencias en servidor si hay sesión
- **Accesibilidad Completa** - Navegación por teclado y lectores de pantalla
- **Política Detallada** - Página dedicada con información completa

### Categorías de Cookies
- 🔒 **Esenciales** - Necesarias para el funcionamiento (no desactivables)
- 📊 **Analíticas** - Google Analytics y métricas de uso
- 📢 **Marketing** - Publicidad y remarketing
- 🔧 **Funcionales** - Preferencias de usuario y personalización

## �🎨 Diseño y UX

### Paleta de Colores
- **Primario**: Negro (#000000)
- **Secundario**: Gris (#1f2937, #374151)
- **Acentos**: Azul (#3b82f6, #2563eb)
- **Texto**: Blanco (#ffffff)

### Características de Diseño
- Diseño responsivo (mobile-first)
- Animaciones suaves con Framer Motion
- Tipografía moderna con Inter
- Iconos emoji para mejor UX
- Gradientes y efectos de vidrio
- Navegación intuitiva
- Sistema de cookies integrado
- Carga optimizada de imágenes

## 🔧 API Endpoints

### AirPods Store
```
GET    /api/airpods/products          # Obtener productos
GET    /api/airpods/products/:id      # Obtener producto por ID
POST   /api/airpods/orders            # Crear pedido
GET    /api/airpods/orders/:id        # Obtener pedido
GET    /api/airpods/orders/tracking/:code  # Seguimiento
```

### Alquileres
```
GET    /api/rentals/apartments        # Obtener apartamentos
GET    /api/rentals/apartments/:id    # Obtener apartamento
POST   /api/rentals/bookings          # Crear reserva
GET    /api/rentals/bookings/:id      # Obtener reserva
```

### Taller
```
GET    /api/workshop/services         # Obtener servicios
POST   /api/workshop/appointments     # Crear cita
GET    /api/workshop/appointments/:id # Obtener cita
PUT    /api/workshop/appointments/:id/status  # Actualizar estado
```

### Contacto
```
POST   /api/contact/send              # Enviar mensaje
GET    /api/contact/messages          # Obtener mensajes (admin)
```

## 📊 Base de Datos

### Modelos Principales
- **AirPods** - Productos y catálogo
- **Order** - Pedidos y seguimiento
- **Apartment** - Apartamentos disponibles
- **Booking** - Reservas de alojamiento
- **Service** - Servicios del taller
- **Appointment** - Citas y trabajos
- **ContactMessage** - Mensajes de contacto
- **Review** - Reseñas y calificaciones

## 🚀 Despliegue

### Frontend (Vercel/Netlify)
```bash
npm run build
# Subir carpeta dist/ a tu plataforma de hosting
```

### Backend (Railway/Heroku)
```bash
cd backend
# Configurar variables de entorno en la plataforma
# Conectar con MongoDB Atlas
# Desplegar automáticamente desde GitHub
```

## 📈 Próximas Mejoras

- [ ] Backend Laravel con CRUD completo
- [ ] Sistema de autenticación JWT
- [ ] Panel de administración web
- [ ] Notificaciones push y email
- [ ] Integración con WhatsApp Business
- [ ] Sistema de pagos múltiples (Stripe, PayPal)
- [ ] App móvil nativa (React Native)
- [ ] Analytics avanzados y métricas
- [ ] Chat en tiempo real con Socket.io
- [ ] Sistema de reviews y calificaciones
- [ ] Integración con Google Maps API

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Aimed Dine Chebili**
- 📧 Email: chebiliaimed9@gmail.com
- 💼 LinkedIn: [aimed-dinechebili](https://www.linkedin.com/in/aimed-dine-chebili-/)
- 🐙 GitHub: [AimedCh](https://github.com/AimedCh)

## 🙏 Agradecimientos

- Apple por la inspiración en el diseño de AirPods
- La comunidad de React y Node.js
- Todos los usuarios que han probado y mejorado el proyecto

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐
