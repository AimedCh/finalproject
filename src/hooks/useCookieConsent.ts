import { useState, useEffect, useCallback } from 'react';

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface CookieConsentHook {
  consent: CookieConsent | null;
  hasConsent: boolean;
  setConsent: (consent: CookieConsent) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  showPreferences: boolean;
  setShowPreferences: (show: boolean) => void;
}

const COOKIE_NAME = 'cookie_consent';
const COOKIE_EXPIRY_DAYS = 365;

// Función para obtener consentimiento desde cookie
const getConsentFromCookie = (): CookieConsent | null => {
  if (typeof document === 'undefined') return null;
  
  try {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${COOKIE_NAME}=`))
      ?.split('=')[1];
    
    if (cookieValue) {
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  } catch (error) {
    console.warn('Error parsing cookie consent:', error);
  }
  return null;
};

// Función para guardar consentimiento en cookie
const setConsentToCookie = (consent: CookieConsent): void => {
  if (typeof document === 'undefined') return;
  
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
  
  const cookieValue = encodeURIComponent(JSON.stringify(consent));
  document.cookie = `${COOKIE_NAME}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
};

// Función para sincronizar con backend si el usuario está autenticado
const syncWithBackend = async (consent: CookieConsent): Promise<void> => {
  if (typeof window === 'undefined') return;
  
  try {
    // Verificar si hay token de autenticación
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    
    if (token) {
      const response = await fetch('/api/user/cookies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          consent,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        console.warn('Failed to sync cookie consent with backend');
      }
    }
  } catch (error) {
    console.warn('Error syncing cookie consent with backend:', error);
  }
};

export const useCookieConsent = (): CookieConsentHook => {
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Cargar consentimiento al inicializar
  useEffect(() => {
    const savedConsent = getConsentFromCookie();
    if (savedConsent) {
      setConsentState(savedConsent);
      setHasConsent(true);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  // Función para establecer consentimiento
  const setConsent = useCallback((newConsent: CookieConsent) => {
    setConsentState(newConsent);
    setConsentToCookie(newConsent);
    setHasConsent(true);
    setShowBanner(false);
    setShowPreferences(false);
    
    // Sincronizar con backend
    syncWithBackend(newConsent);
    
    // Disparar eventos personalizados para scripts
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
        detail: newConsent 
      }));
    }
  }, []);

  // Aceptar todas las cookies
  const acceptAll = useCallback(() => {
    setConsent({
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  }, [setConsent]);

  // Rechazar todas las cookies (excepto esenciales)
  const rejectAll = useCallback(() => {
    setConsent({
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  }, [setConsent]);

  return {
    consent,
    hasConsent,
    setConsent,
    acceptAll,
    rejectAll,
    showBanner,
    setShowBanner,
    showPreferences,
    setShowPreferences,
  };
};

// API global para scripts externos
declare global {
  interface Window {
    cookieConsent: {
      getConsent: () => CookieConsent | null;
      setConsent: (consent: CookieConsent) => void;
      onConsentChange: (callback: (consent: CookieConsent) => void) => void;
    };
  }
}

// Inicializar API global
export const initializeCookieConsentAPI = (hook: CookieConsentHook) => {
  if (typeof window !== 'undefined') {
    window.cookieConsent = {
      getConsent: () => hook.consent,
      setConsent: (consent: CookieConsent) => hook.setConsent(consent),
      onConsentChange: (callback: (consent: CookieConsent) => void) => {
        window.addEventListener('cookieConsentChanged', (event: any) => {
          callback(event.detail);
        });
      },
    };
  }
};
