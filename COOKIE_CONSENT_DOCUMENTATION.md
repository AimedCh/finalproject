# Sistema de Gestión de Cookies - Documentación Completa

## 📋 Resumen

Sistema completo de gestión de cookies que cumple con GDPR y buenas prácticas de privacidad, implementado en React + TypeScript (frontend) y Laravel (backend).

## 🏗️ Arquitectura del Sistema

### Frontend (React + TypeScript)
- **Hook personalizado**: `useCookieConsent` para gestión de estado
- **Componentes**: Banner, Modal de preferencias, Gestor principal
- **Utilidades**: Gestor de scripts dinámicos
- **API global**: `window.cookieConsent` para scripts externos

### Backend (Laravel)
- **Controlador**: `CookieConsentController` para API REST
- **Modelo**: Campos añadidos a `User` para persistencia
- **Rutas**: `/api/user/cookies` (GET, POST, DELETE)

## 📁 Archivos Creados/Modificados

### Frontend
```
src/
├── hooks/
│   └── useCookieConsent.ts          # Hook principal de gestión
├── components/
│   ├── CookieBanner.tsx             # Banner inicial
│   ├── CookiePreferences.tsx        # Modal de preferencias
│   └── CookieConsentManager.tsx     # Gestor principal
├── utils/
│   └── scriptManager.ts             # Gestión de scripts dinámicos
├── pages/
│   └── CookiePolicy.tsx             # Página de política
├── App.tsx                          # Integración del sistema
└── components/Footer.tsx            # Botón de preferencias

index.html                           # Scripts bloqueables de ejemplo
```

### Backend
```
finalproject/
├── app/Http/Controllers/
│   └── CookieConsentController.php  # API de consentimiento
├── app/Models/
│   └── User.php                     # Campos de consentimiento
├── database/migrations/
│   └── add_cookie_consent_to_users_table.php
└── routes/
    └── api.php                      # Rutas de API
```

## 🍪 Tipos de Cookies

### 1. Cookies Esenciales (Requeridas)
- **Propósito**: Funcionamiento básico del sitio
- **Ejemplos**: `cookie_consent`, `session_id`, `csrf_token`
- **Duración**: Sesión / 1 año
- **Desactivables**: ❌ No

### 2. Cookies Analíticas
- **Propósito**: Análisis de tráfico y comportamiento
- **Ejemplos**: `_ga`, `_gid`, `_gat`, `_gtag`
- **Duración**: 2 años
- **Desactivables**: ✅ Sí

### 3. Cookies de Marketing
- **Propósito**: Publicidad personalizada y remarketing
- **Ejemplos**: `_fbp`, `_fbc`, `ads_id`
- **Duración**: 1-2 años
- **Desactivables**: ✅ Sí

### 4. Cookies Funcionales
- **Propósito**: Preferencias y configuraciones del usuario
- **Ejemplos**: `user_preferences`, `language`, `theme`
- **Duración**: 1 año
- **Desactivables**: ✅ Sí

## 🔧 API del Sistema

### Hook `useCookieConsent`

```typescript
interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const {
  consent,           // Estado actual del consentimiento
  hasConsent,        // Si existe consentimiento guardado
  setConsent,        // Función para establecer consentimiento
  acceptAll,         // Aceptar todas las cookies
  rejectAll,         // Rechazar cookies no esenciales
  showBanner,        // Mostrar banner inicial
  showPreferences    // Mostrar modal de preferencias
} = useCookieConsent();
```

### API Global `window.cookieConsent`

```javascript
// Obtener consentimiento actual
const consent = window.cookieConsent.getConsent();

// Establecer nuevo consentimiento
window.cookieConsent.setConsent({
  essential: true,
  analytics: false,
  marketing: true,
  functional: true
});

// Suscribirse a cambios
window.cookieConsent.onConsentChange((consent) => {
  console.log('Consentimiento actualizado:', consent);
});
```

### Gestor de Scripts

```typescript
// Registrar script para carga condicional
scriptManager.registerScript({
  src: 'https://www.googletagmanager.com/gtag/js?id=GA_ID',
  type: 'analytics',
  id: 'google-analytics',
  async: true,
  onLoad: () => console.log('Analytics cargado')
});

// Verificar si script está cargado
const isLoaded = scriptManager.isScriptLoaded('google-analytics');
```

## 🌐 API Backend

### Endpoints

#### `GET /api/user/cookies`
Obtener preferencias de cookies del usuario autenticado.

**Respuesta:**
```json
{
  "consent": {
    "essential": true,
    "analytics": false,
    "marketing": true,
    "functional": true
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### `POST /api/user/cookies`
Guardar preferencias de cookies del usuario.

**Payload:**
```json
{
  "consent": {
    "essential": true,
    "analytics": false,
    "marketing": true,
    "functional": true
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Respuesta:**
```json
{
  "message": "Preferencias de cookies guardadas exitosamente",
  "consent": { ... },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

#### `DELETE /api/user/cookies`
Eliminar preferencias de cookies del usuario.

**Respuesta:**
```json
{
  "message": "Preferencias de cookies eliminadas exitosamente"
}
```

## 🚀 Instalación y Configuración

### 1. Frontend

```bash
# Instalar dependencias (ya instaladas)
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

### 2. Backend

```bash
# Navegar al directorio del backend
cd finalproject

# Ejecutar migración
php artisan migrate

# (Opcional) Limpiar caché
php artisan config:clear
php artisan route:clear
```

## 🧪 Testing y Verificación

### 1. Banner Inicial
```bash
# Abrir en modo incógnito
# Verificar que aparece el banner de cookies
# Probar botones: "Aceptar todas", "Rechazar", "Preferencias"
```

### 2. Modal de Preferencias
```bash
# Hacer clic en "Preferencias"
# Verificar que se abre el modal
# Probar toggles de cada categoría
# Verificar que "Esenciales" no se puede desactivar
# Probar "Guardar preferencias"
```

### 3. Persistencia
```bash
# Aceptar cookies
# Recargar la página
# Verificar que el banner no aparece
# Verificar en DevTools > Application > Cookies
# Buscar cookie: cookie_consent
```

### 4. Scripts Dinámicos
```bash
# Abrir DevTools > Network
# Aceptar solo cookies analíticas
# Verificar que se cargan scripts de analytics
# Rechazar cookies analíticas
# Verificar que no se cargan scripts de analytics
```

### 5. API Backend
```bash
# Autenticarse en la aplicación
# Abrir DevTools > Network
# Cambiar preferencias de cookies
# Verificar llamada POST a /api/user/cookies
# Verificar respuesta exitosa
```

## 📱 Ejemplos de Uso

### Scripts Bloqueables en HTML

```html
<!-- Google Analytics - Solo si se aceptan cookies analíticas -->
<script type="text/plain" data-cookie="analytics" 
        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>

<!-- Facebook Pixel - Solo si se aceptan cookies de marketing -->
<script type="text/plain" data-cookie="marketing" 
        src="https://connect.facebook.net/en_US/fbevents.js"></script>

<!-- Script funcional - Solo si se aceptan cookies funcionales -->
<script type="text/plain" data-cookie="functional">
  console.log('Script funcional cargado');
</script>
```

### Carga Programática de Scripts

```typescript
import { loadGoogleAnalytics, loadFacebookPixel } from './utils/scriptManager';

// Cargar Google Analytics
loadGoogleAnalytics('GA_MEASUREMENT_ID');

// Cargar Facebook Pixel
loadFacebookPixel('PIXEL_ID');
```

### Verificación de Consentimiento

```typescript
// En cualquier componente
const { consent } = useCookieConsent();

if (consent?.analytics) {
  // Ejecutar código de analytics
  gtag('event', 'page_view');
}

if (consent?.marketing) {
  // Ejecutar código de marketing
  fbq('track', 'PageView');
}
```

## 🔒 Cumplimiento GDPR

### ✅ Características Implementadas

1. **Consentimiento Explícito**: Banner claro con opciones específicas
2. **Granularidad**: Control por categorías de cookies
3. **Transparencia**: Política de cookies detallada
4. **Accesibilidad**: Fácil cambio de preferencias
5. **Persistencia**: Consentimiento guardado por 365 días
6. **Sincronización**: Backend para usuarios autenticados
7. **Bloqueo**: Scripts no se cargan sin consentimiento

### 📋 Checklist de Cumplimiento

- [x] Banner de consentimiento visible en primera visita
- [x] Opciones claras: Aceptar, Rechazar, Preferencias
- [x] Categorización de cookies por propósito
- [x] Cookies esenciales no desactivables
- [x] Política de cookies accesible
- [x] Botón para cambiar preferencias
- [x] Consentimiento persistente
- [x] Bloqueo de scripts sin consentimiento
- [x] Sincronización con backend
- [x] Logs de auditoría

## 🐛 Troubleshooting

### Problema: Banner no aparece
**Solución**: Verificar que no existe cookie `cookie_consent` en el navegador

### Problema: Scripts no se cargan
**Solución**: Verificar que el consentimiento incluye la categoría correcta

### Problema: API backend falla
**Solución**: Verificar autenticación y que la migración se ejecutó

### Problema: Modal no se abre
**Solución**: Verificar que el evento `openCookiePreferences` se dispara

## 📊 Monitoreo

### Métricas Recomendadas

1. **Tasa de aceptación**: % de usuarios que aceptan cookies
2. **Preferencias granulares**: Distribución por categorías
3. **Cambios de preferencias**: Frecuencia de modificaciones
4. **Errores de API**: Fallos en sincronización con backend

### Logs de Auditoría

El sistema registra automáticamente:
- Cambios de consentimiento
- Errores de sincronización
- Intentos de acceso no autorizado

## 🔄 Mantenimiento

### Actualizaciones Regulares

1. **Revisar política de cookies** cada 6 meses
2. **Actualizar listado de cookies** cuando se añadan nuevos servicios
3. **Verificar cumplimiento** con nuevas regulaciones
4. **Monitorear logs** de errores y uso

### Backup y Recuperación

- **Cookies**: Se almacenan en el navegador del usuario
- **Backend**: Se sincroniza con la base de datos
- **Configuración**: Se puede restaurar desde el código fuente

## 📞 Soporte

Para problemas o preguntas sobre el sistema de cookies:

1. **Frontend**: Revisar logs de consola del navegador
2. **Backend**: Revisar logs de Laravel
3. **API**: Verificar respuestas en DevTools > Network
4. **Documentación**: Consultar este archivo

---

**Versión**: 1.0.0  
**Última actualización**: Enero 2024  
**Compatibilidad**: React 18+, Laravel 10+, Navegadores modernos
