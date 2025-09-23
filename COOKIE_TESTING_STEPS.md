# 🧪 Pasos para Probar el Sistema de Cookies

## 🚀 Preparación

### 1. Iniciar el Servidor
```bash
# En la raíz del proyecto
npm run dev
# El servidor estará en: http://localhost:5174
```

### 2. Limpiar Estado del Navegador
- Abrir modo incógnito O
- Limpiar cookies del dominio localhost

## 📋 Pruebas Manuales

### ✅ Prueba 1: Banner Inicial
1. **Navegar a**: `http://localhost:5174`
2. **Verificar**: Banner aparece en la parte inferior
3. **Contenido esperado**:
   - Título: "🍪 Gestión de Cookies"
   - Texto explicativo sobre el uso de cookies
   - Enlace "Más información" → `/cookie-policy`
   - Botones: "Rechazar", "Preferencias", "Aceptar todas"

### ✅ Prueba 2: Botón "Aceptar Todas"
1. **Hacer clic**: "Aceptar todas"
2. **Verificar**: 
   - Banner desaparece
   - Cookie `cookie_consent` creada
   - Todas las categorías activadas

### ✅ Prueba 3: Botón "Rechazar"
1. **Recargar página** (modo incógnito)
2. **Hacer clic**: "Rechazar"
3. **Verificar**:
   - Banner desaparece
   - Solo cookies esenciales activadas

### ✅ Prueba 4: Modal de Preferencias
1. **Recargar página** (modo incógnito)
2. **Hacer clic**: "Preferencias"
3. **Verificar modal**:
   - Título: "Preferencias de Cookies"
   - 4 categorías listadas
   - "Esenciales" no desactivable
   - Otras categorías con toggle

### ✅ Prueba 5: Configuración Personalizada
1. **En el modal de preferencias**:
   - Activar: Esenciales + Funcionales
   - Desactivar: Analíticas + Marketing
2. **Hacer clic**: "Guardar Preferencias"
3. **Verificar**: Modal se cierra, configuración guardada

### ✅ Prueba 6: Persistencia
1. **Recargar la página**
2. **Verificar**: 
   - No aparece banner
   - Preferencias mantenidas
3. **Abrir preferencias desde footer**
4. **Verificar**: Configuración anterior mantenida

### ✅ Prueba 7: Política de Cookies
1. **Navegar a**: `http://localhost:5174/cookie-policy`
2. **Verificar contenido**:
   - Información detallada de cada categoría
   - Ejemplos de cookies
   - Duración y propósito
   - Botón para abrir preferencias

### ✅ Prueba 8: Acceso desde Footer
1. **En cualquier página**, scroll hasta el footer
2. **Verificar enlaces**:
   - "Política de Cookies" → `/cookie-policy`
   - "Preferencias de Cookies" → Abre modal

### ✅ Prueba 9: Responsividad
1. **Probar en diferentes tamaños**:
   - Desktop: Banner horizontal
   - Mobile: Banner adaptado
   - Modal responsive

### ✅ Prueba 10: API Backend (si hay usuario autenticado)
1. **Iniciar sesión** en la aplicación
2. **Cambiar preferencias** de cookies
3. **Verificar**: Sincronización con `/api/user/cookies`

## 🔍 Verificaciones Técnicas

### Cookies en DevTools
1. **Abrir DevTools** → Application → Cookies
2. **Verificar cookie**: `cookie_consent`
3. **Contenido esperado**: JSON con preferencias

### Console Logs
1. **Abrir DevTools** → Console
2. **Verificar logs**: Sin errores relacionados con cookies
3. **API global**: `window.cookieConsent` disponible

### Network Tab
1. **Cambiar preferencias** (usuario autenticado)
2. **Verificar**: Request POST a `/api/user/cookies`
3. **Response**: 200 OK con confirmación

## ✅ Checklist de Funcionalidades

- [ ] Banner aparece en primera visita
- [ ] Botón "Aceptar todas" funciona
- [ ] Botón "Rechazar" funciona  
- [ ] Modal de preferencias se abre
- [ ] Categorías se pueden activar/desactivar
- [ ] Cookies esenciales no desactivables
- [ ] Preferencias se guardan correctamente
- [ ] Persistencia tras recargar página
- [ ] Enlace a política de cookies funciona
- [ ] Página de política es accesible
- [ ] Botón en footer abre preferencias
- [ ] Diseño responsive
- [ ] Animaciones suaves
- [ ] Sin errores en consola
- [ ] API backend funciona (si aplicable)

## 🐛 Problemas Comunes

### Banner no aparece
- **Causa**: Cookie `cookie_consent` ya existe
- **Solución**: Limpiar cookies o usar modo incógnito

### Modal no se abre
- **Causa**: JavaScript error
- **Solución**: Verificar consola, recargar página

### Preferencias no se guardan
- **Causa**: Error en localStorage o cookie
- **Solución**: Verificar permisos del navegador

### API backend falla
- **Causa**: Usuario no autenticado o servidor caído
- **Solución**: Verificar autenticación y estado del servidor
