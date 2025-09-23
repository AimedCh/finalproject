# 📁 Sistema de Cookies - Lista de Archivos

## 🎯 Archivos Principales del Sistema

### 📱 **Frontend (React + TypeScript)**

#### **Hooks**
- `src/hooks/useCookieConsent.ts` - Hook principal para gestión de estado de cookies

#### **Componentes**
- `src/components/CookieBanner.tsx` - Banner inicial de consentimiento
- `src/components/CookiePreferences.tsx` - Modal de preferencias detalladas
- `src/components/CookieConsentManager.tsx` - Gestor principal que coordina todo

#### **Páginas**
- `src/pages/CookiePolicy.tsx` - Página de política de cookies detallada

#### **Utilidades**
- `src/utils/scriptManager.ts` - Gestión de scripts dinámicos basada en consentimiento
- `src/utils/cookies.ts` - Utilidades básicas para manejo de cookies

#### **Archivos Modificados**
- `src/App.tsx` - Integración del CookieConsentManager
- `src/components/Footer.tsx` - Botón de preferencias de cookies

### 🔧 **Backend (Laravel)**

#### **Controladores**
- `finalproject/app/Http/Controllers/CookieConsentController.php` - API REST para cookies

#### **Migraciones**
- `finalproject/database/migrations/2024_01_01_000000_add_cookie_consent_to_users_table.php`

#### **Rutas**
- `finalproject/routes/api.php` - Rutas `/api/user/cookies` (GET, POST)

### 📚 **Documentación**
- `COOKIE_CONSENT_DOCUMENTATION.md` - Documentación completa del sistema
- `COOKIE_TESTING_GUIDE.md` - Guía de testing existente
- `COOKIE_TESTING_STEPS.md` - Pasos detallados para pruebas manuales
- `COOKIE_SYSTEM_FILES.md` - Este archivo (lista de archivos)

## 🔍 **Detalles de Implementación**

### **Hook useCookieConsent.ts**
```typescript
// Funcionalidades principales:
- Gestión de estado de consentimiento
- Persistencia en cookies locales
- Sincronización con backend
- API global window.cookieConsent
- Eventos personalizados
```

### **CookieBanner.tsx**
```typescript
// Características:
- Banner fijo en parte inferior
- Animaciones con Framer Motion
- Botones: Aceptar, Rechazar, Preferencias
- Enlace a política de cookies
- Responsive design
```

### **CookiePreferences.tsx**
```typescript
// Funcionalidades:
- Modal con 4 categorías de cookies
- Toggles para activar/desactivar
- Cookies esenciales no desactivables
- Descripciones detalladas
- Guardado de preferencias
```

### **ScriptManager.ts**
```typescript
// Capacidades:
- Carga condicional de scripts
- Bloqueo hasta consentimiento
- Gestión de scripts de terceros
- API para registrar scripts
```

### **CookieConsentController.php**
```php
// Endpoints:
- GET /api/user/cookies - Obtener preferencias
- POST /api/user/cookies - Guardar preferencias
- Validación de datos
- Logs de auditoría
```

## 🎨 **Estilos y Animaciones**

### **Clases CSS Utilizadas**
```css
// Banner
- fixed bottom-0 left-0 right-0 z-50
- bg-white border-t border-gray-200 shadow-2xl

// Modal
- fixed inset-0 z-50 flex items-center justify-center
- bg-black bg-opacity-50

// Botones
- bg-blue-600 hover:bg-blue-700 text-white
- bg-gray-100 hover:bg-gray-200 text-gray-700
```

### **Animaciones Framer Motion**
```typescript
// Banner entrada
initial={{ y: 100, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.3, ease: 'easeOut' }}

// Modal
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.2 }}
```

## 🔐 **Seguridad y Privacidad**

### **Medidas Implementadas**
- ✅ Cookies SameSite=Lax
- ✅ Validación de datos en backend
- ✅ Sanitización de inputs
- ✅ Logs de auditoría
- ✅ Expiración de cookies (365 días)
- ✅ Encriptación JSON en cookies

### **Cumplimiento GDPR**
- ✅ Consentimiento explícito
- ✅ Granularidad por categorías
- ✅ Fácil revocación
- ✅ Información transparente
- ✅ Cookies esenciales diferenciadas

## 🌐 **API y Integraciones**

### **API Global JavaScript**
```javascript
// Disponible en window.cookieConsent
window.cookieConsent.getConsent()
window.cookieConsent.setConsent(consent)
window.cookieConsent.onConsentChange(callback)
```

### **Eventos Personalizados**
```javascript
// Para abrir preferencias
window.dispatchEvent(new CustomEvent('openCookiePreferences'))

// Para cambios de consentimiento
window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: consent }))
```

### **Integración con Scripts de Terceros**
```javascript
// Ejemplo de uso
scriptManager.registerScript({
  id: 'google-analytics',
  src: 'https://www.googletagmanager.com/gtag/js?id=GA_ID',
  type: 'analytics',
  async: true
});
```

## 📊 **Métricas y Monitoreo**

### **Logs Disponibles**
- Cambios de consentimiento
- Errores de carga de scripts
- Sincronización con backend
- Accesos a política de cookies

### **Datos Almacenados**
- Preferencias por categoría
- Timestamp de consentimiento
- ID de usuario (si autenticado)
- Historial de cambios

## 🔄 **Estados del Sistema**

### **Estados Posibles**
1. **Sin consentimiento** - Banner visible
2. **Consentimiento parcial** - Preferencias específicas
3. **Consentimiento total** - Todas las categorías
4. **Consentimiento mínimo** - Solo esenciales

### **Transiciones**
- Primera visita → Banner
- Aceptar todas → Consentimiento total
- Rechazar → Consentimiento mínimo
- Preferencias → Consentimiento parcial
- Cambio posterior → Modal preferencias
