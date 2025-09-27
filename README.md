# Emprendedor Multidisciplinario 🚀

Una plataforma completa que combina tres servicios especializados: **AirPods Store**, **Alquileres de Verano** y **Taller Automotriz**. Desarrollado por Aimed Dine Chebili como un proyecto integral que demuestra habilidades en desarrollo full-stack moderno con **React + Laravel**.

## 🆕 Últimas Actualizaciones (Enero 2025)

- ✅ **Backend Laravel Completo** - Sistema CRUD completo con autenticación
- ✅ **Diseño Unificado** - Interfaz consistente en todo el backend
- ✅ **Base de Datos Optimizada** - Estructura simplificada y eficiente
- ✅ **Sistema de Reservas** - Gestión completa de alquileres
- ✅ **Panel de Administración** - Gestión de proveedores, reservas, compras y contacto
- ✅ **Formularios de Contacto** - Sistema funcional de mensajes
- ✅ **Timezone Configurado** - Hora correcta (Europe/Madrid)
- ✅ **Validaciones Robustas** - Control de errores y datos seguros

## 🚀 Características Principales

### 🎧 AirPods Store
- Catálogo completo de productos Apple AirPods
- Sistema de compras con seguimiento en tiempo real
- Integración con PayPal para pagos seguros
- Panel de administración para gestión de inventario
- Sistema de estados de pedido (pendiente, procesando, enviado, entregado)

### 🏖️ Alquileres de Verano
- Sistema de reservas con calendario de disponibilidad
- Gestión completa de clientes y equipos
- Control de fechas de entrada y salida
- Estados de reserva (pendiente, confirmado, en uso, devuelto, cancelado)
- Cálculo automático de precios y totales
- Generación de PDFs para reservas

### 🔧 Taller Automotriz
- Servicios de diagnóstico avanzado
- Reparaciones mecánicas profesionales
- Programación de ECUs y sistemas electrónicos
- Gestión de herramientas y equipos
- Sistema de citas y seguimiento de trabajos

### 📧 Sistema de Contacto
- Formulario de contacto público funcional
- Gestión de mensajes en panel de administración
- Estados de mensaje (nuevo, leído, respondido, cerrado)
- Categorización por servicios

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Framework principal con hooks modernos
- **TypeScript** - Tipado estático para mejor desarrollo
- **Tailwind CSS** - Estilos y diseño responsivo
- **Framer Motion** - Animaciones fluidas y transiciones
- **React Router** - Navegación SPA optimizada
- **React Helmet Async** - SEO y meta tags dinámicos
- **Axios** - Cliente HTTP para comunicación con API
- **Vite** - Build tool y dev server ultra-rápido

### Backend
- **Laravel 11** - Framework PHP robusto y escalable
- **SQLite** - Base de datos ligera y eficiente
- **Eloquent ORM** - Mapeo objeto-relacional elegante
- **Blade Templates** - Motor de plantillas de Laravel
- **Middleware de Autenticación** - Sistema de seguridad
- **Validación de Datos** - Control robusto de entrada
- **Migraciones** - Control de versiones de base de datos

### Herramientas de Desarrollo
- **Composer** - Gestor de dependencias PHP
- **Artisan** - CLI de Laravel para tareas administrativas
- **ESLint** - Linting de código JavaScript/TypeScript
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Compatibilidad de CSS

## 📁 Estructura del Proyecto

```
finalproject/
├── src/                          # Frontend React
│   ├── components/               # Componentes reutilizables
│   │   ├── Header.tsx           # Header con navegación
│   │   ├── Footer.tsx           # Footer del sitio
│   │   └── CookieBanner.tsx     # Banner de cookies GDPR
│   ├── pages/                    # Páginas principales
│   │   ├── Home.tsx             # Página de inicio
│   │   ├── AirPodsStore.tsx     # Tienda de AirPods
│   │   ├── Alquileres.tsx       # Sistema de alquileres
│   │   ├── Taller.tsx           # Servicios del taller
│   │   └── Contact.tsx          # Formulario de contacto
│   ├── services/                 # Servicios de API
│   │   └── api.ts               # Cliente HTTP configurado
│   ├── hooks/                    # Custom hooks
│   ├── utils/                    # Utilidades
│   ├── locales/                  # Archivos de idiomas
│   └── assets/                   # Recursos estáticos
├── crudlaravel/                  # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/     # Controladores
│   │   │   ├── Admin/           # Controladores de admin
│   │   │   ├── AlquileresController.php
│   │   │   ├── ContactoController.php
│   │   │   └── ProveedoresController.php
│   │   ├── Models/              # Modelos Eloquent
│   │   │   ├── AlquileresReserva.php
│   │   │   ├── AirpodsPurchase.php
│   │   │   ├── Contacto.php
│   │   │   └── Proveedores.php
│   │   └── Middleware/          # Middleware personalizado
│   ├── database/
│   │   ├── migrations/          # Migraciones de BD
│   │   └── seeders/             # Seeders de datos
│   ├── resources/views/         # Vistas Blade
│   │   ├── admin/              # Panel de administración
│   │   ├── layouts/            # Layouts base
│   │   └── auth/               # Vistas de autenticación
│   ├── routes/                 # Rutas de la aplicación
│   └── public/                 # Archivos públicos
├── img/                        # Imágenes del proyecto
├── public/                     # Archivos públicos del frontend
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- **PHP 8.1+** con extensiones: BCMath, Ctype, cURL, DOM, Fileinfo, JSON, Mbstring, OpenSSL, PCRE, PDO, Tokenizer, XML
- **Composer** - Gestor de dependencias PHP
- **Node.js** (v18 o superior)
- **npm** o **yarn**

### 1. Clonar el repositorio
```bash
git clone https://github.com/AimedCh/finalproject.git
cd finalproject
```

### 2. Configurar el Backend Laravel
```bash
cd crudlaravel

# Instalar dependencias PHP
composer install

# Copiar archivo de configuración
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate

# Configurar base de datos (SQLite)
touch database/database.sqlite

# Ejecutar migraciones
php artisan migrate

# (Opcional) Crear datos de prueba
php artisan db:seed
```

### 3. Configurar el Frontend React
```bash
cd .. # Volver al directorio raíz

# Instalar dependencias
npm install
```

### 4. Configurar variables de entorno

#### Backend Laravel (crudlaravel/.env)
```env
APP_NAME="Emprendedor Multidisciplinario"
APP_ENV=local
APP_KEY=base64:tu-clave-generada-automaticamente
APP_DEBUG=true
APP_URL=http://localhost:8000
APP_TIMEZONE=Europe/Madrid

DB_CONNECTION=sqlite
DB_DATABASE=/ruta/completa/a/database/database.sqlite

SESSION_DRIVER=file
SESSION_LIFETIME=120

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=tu-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

#### Frontend React (.env)
```env
VITE_API_URL=http://localhost:8000
VITE_PAYPAL_CLIENT_ID=tu-paypal-client-id
```

### 5. Ejecutar el proyecto

#### Desarrollo
```bash
# Terminal 1 - Backend Laravel
cd crudlaravel
php artisan serve --host=127.0.0.1 --port=8000

# Terminal 2 - Frontend React
npm run dev
```

#### Producción
```bash
# Build del frontend
npm run build

# Optimizar Laravel para producción
cd crudlaravel
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 📱 Funcionalidades Implementadas

### 🎧 AirPods Store
- ✅ Catálogo de productos con información detallada
- ✅ Sistema de compras con seguimiento
- ✅ Estados de pedido (pendiente, procesando, enviado, entregado)
- ✅ Panel de administración completo
- ✅ Gestión de inventario y precios
- ✅ Generación de PDFs para facturas

### 🏖️ Alquileres de Verano
- ✅ Sistema de reservas completo
- ✅ Gestión de fechas de entrada y salida
- ✅ Control de disponibilidad
- ✅ Estados de reserva (pendiente, confirmado, en uso, devuelto, cancelado)
- ✅ Cálculo automático de precios
- ✅ Panel de administración para gestión
- ✅ Generación de PDFs para reservas

### 🔧 Taller Automotriz
- ✅ Catálogo de servicios
- ✅ Sistema de citas
- ✅ Gestión de herramientas
- ✅ Seguimiento de trabajos
- ✅ Panel de técnicos

### 📧 Sistema de Contacto
- ✅ Formulario público funcional
- ✅ Gestión de mensajes en admin
- ✅ Estados de mensaje (nuevo, leído, respondido, cerrado)
- ✅ Categorización por servicios
- ✅ Respuestas automáticas por email

### 👨‍💼 Panel de Administración
- ✅ **Proveedores** - Gestión completa con teléfono y dirección
- ✅ **Reservas** - Control total de alquileres
- ✅ **Compras AirPods** - Administración de pedidos
- ✅ **Contacto** - Gestión de mensajes
- ✅ **Dashboard** - Estadísticas y resumen
- ✅ **Autenticación** - Sistema de login seguro

## 🎨 Diseño Unificado

### Paleta de Colores del Backend
- **Primario**: Azul (#4a90e2)
- **Éxito**: Verde (#28a745)
- **Advertencia**: Amarillo (#ffc107)
- **Peligro**: Rojo (#dc3545)
- **Info**: Azul claro (#17a2b8)
- **Fondo**: Gris claro (#f8f9fa)

### Características de Diseño
- **Diseño Unificado** - Componentes consistentes en todo el backend
- **Responsive** - Adaptable a todos los dispositivos
- **Iconos FontAwesome** - Con fallbacks emoji
- **Animaciones Suaves** - Transiciones CSS optimizadas
- **Tipografía Moderna** - Segoe UI para mejor legibilidad
- **Cards y Tablas** - Estilo consistente y profesional

## 🔧 API Endpoints

### Autenticación
```
POST   /admin/login              # Login de administrador
POST   /admin/logout             # Logout
```

### Proveedores
```
GET    /admin/proveedores        # Listar proveedores
POST   /admin/proveedores        # Crear proveedor
GET    /admin/proveedores/{id}   # Ver proveedor
PUT    /admin/proveedores/{id}   # Actualizar proveedor
DELETE /admin/proveedores/{id}   # Eliminar proveedor
```

### Reservas
```
GET    /admin/reservas           # Listar reservas
POST   /admin/reservas           # Crear reserva
GET    /admin/reservas/{id}      # Ver reserva
PUT    /admin/reservas/{id}      # Actualizar reserva
DELETE /admin/reservas/{id}      # Eliminar reserva
GET    /admin/reservas/{id}/pdf  # Generar PDF
```

### Compras AirPods
```
GET    /admin/airpods-purchases  # Listar compras
POST   /admin/airpods-purchases  # Crear compra
GET    /admin/airpods-purchases/{id}  # Ver compra
PUT    /admin/airpods-purchases/{id}  # Actualizar compra
DELETE /admin/airpods-purchases/{id}  # Eliminar compra
GET    /admin/airpods-purchases/{id}/pdf  # Generar PDF
```

### Contacto
```
GET    /admin/contacto           # Listar mensajes
POST   /admin/contacto           # Crear mensaje
GET    /admin/contacto/{id}      # Ver mensaje
PUT    /admin/contacto/{id}      # Actualizar mensaje
DELETE /admin/contacto/{id}      # Eliminar mensaje
POST   /backend/contacto/public  # Formulario público
```

### Alquileres (Frontend)
```
POST   /backend/alquileres/reserve  # Crear reserva desde frontend
```

## 📊 Base de Datos

### Tablas Principales
- **users** - Usuarios del sistema
- **administradors** - Administradores del panel
- **proveedores** - Proveedores con teléfono y dirección
- **alquileres_reservas** - Reservas de alquileres
- **airpods_purchases** - Compras de AirPods
- **contacto** - Mensajes de contacto
- **mensajes** - Sistema de mensajería

### Relaciones
- **AlquileresReserva** → **User** (opcional)
- **AirpodsPurchase** → **User** (opcional)
- **Contacto** → **User** (opcional)

## 🚀 Despliegue

### Frontend (Vercel/Netlify)
```bash
npm run build
# Subir carpeta dist/ a tu plataforma de hosting
```

### Backend Laravel (Railway/Heroku/DigitalOcean)
```bash
cd crudlaravel

# Configurar variables de entorno en la plataforma
# Configurar base de datos (PostgreSQL/MySQL en producción)
# Ejecutar migraciones en producción
php artisan migrate --force

# Optimizar para producción
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🔧 Comandos Útiles

### Laravel
```bash
# Limpiar caché
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Regenerar autoload
composer dump-autoload

# Verificar estado de migraciones
php artisan migrate:status

# Crear migración
php artisan make:migration nombre_de_la_migracion

# Crear modelo
php artisan make:model NombreModelo

# Crear controlador
php artisan make:controller NombreController
```

### Frontend
```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📈 Próximas Mejoras

- [ ] **Sistema de Notificaciones** - Email y push notifications
- [ ] **Integración WhatsApp** - Business API para comunicación
- [ ] **Sistema de Pagos** - Stripe, PayPal integrados
- [ ] **App Móvil** - React Native para iOS/Android
- [ ] **Analytics Avanzados** - Métricas detalladas de uso
- [ ] **Chat en Tiempo Real** - Socket.io para comunicación instantánea
- [ ] **Sistema de Reviews** - Calificaciones y comentarios
- [ ] **Google Maps API** - Integración de mapas para ubicaciones
- [ ] **Multi-idioma** - Soporte completo para ES/EN/FR
- [ ] **Backup Automático** - Sistema de respaldos programados

## 🐛 Solución de Problemas

### Error 419 Page Expired
```bash
# Regenerar APP_KEY
php artisan key:generate

# Limpiar caché de sesión
php artisan session:clear
```

### Error de Base de Datos
```bash
# Verificar migraciones
php artisan migrate:status

# Ejecutar migraciones pendientes
php artisan migrate

# Recrear base de datos
rm database/database.sqlite
touch database/database.sqlite
php artisan migrate
```

### Error de CORS
```bash
# Verificar configuración de Vite
# Asegurar que el proxy esté configurado correctamente
```

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
- 💼 LinkedIn: [aimed-dine-chebili-](https://www.linkedin.com/in/aimed-dine-chebili-/)
- 🐙 GitHub: [AimedCh](https://github.com/AimedCh)

## 🙏 Agradecimientos

- Laravel Community por el framework excepcional
- React Team por la biblioteca de componentes
- Tailwind CSS por el sistema de diseño
- FontAwesome por los iconos
- Todos los usuarios que han probado y mejorado el proyecto

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐
<<<<<<< HEAD

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- 📧 Email: chebiliaimed9@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/AimedCh/finalproject/issues)
- 📖 Documentación: Este README y comentarios en el código
=======
>>>>>>> 596f92b6c7597c12d559ad4fd6a4dc65743634d4
