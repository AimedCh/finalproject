import type { CookieConsent } from '../hooks/useCookieConsent';

// Declaraciones globales para Google Analytics y Facebook Pixel
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
  }
}

interface ScriptConfig {
  src: string;
  type: 'analytics' | 'marketing' | 'functional';
  id?: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

class ScriptManager {
  private loadedScripts: Set<string> = new Set();
  private pendingScripts: Map<string, ScriptConfig> = new Map();

  constructor() {
    // Solo ejecutar en el navegador
    if (typeof window !== 'undefined') {
      // Escuchar cambios en el consentimiento
      window.addEventListener('cookieConsentChanged', (event: any) => {
        this.handleConsentChange(event.detail);
      });
    }
  }

  // Registrar un script para carga condicional
  registerScript(config: ScriptConfig): void {
    const scriptId = config.id || config.src;
    
    if (this.loadedScripts.has(scriptId)) {
      return; // Ya está cargado
    }

    this.pendingScripts.set(scriptId, config);
    
    // Intentar cargar si ya tenemos consentimiento
    const consent = this.getCurrentConsent();
    if (consent && this.shouldLoadScript(config.type, consent)) {
      this.loadScript(config);
    }
  }

  // Cargar un script dinámicamente
  private loadScript(config: ScriptConfig): void {
    if (typeof document === 'undefined') return;
    
    const scriptId = config.id || config.src;
    
    if (this.loadedScripts.has(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.src = config.src;
    script.async = config.async !== false;
    script.defer = config.defer || false;
    
    if (config.id) {
      script.id = config.id;
    }

    script.onload = () => {
      this.loadedScripts.add(scriptId);
      this.pendingScripts.delete(scriptId);
      config.onLoad?.();
    };

    script.onerror = () => {
      console.warn(`Failed to load script: ${config.src}`);
      config.onError?.();
    };

    document.head.appendChild(script);
  }

  // Verificar si un script debe cargarse según el consentimiento
  private shouldLoadScript(type: 'analytics' | 'marketing' | 'functional', consent: CookieConsent): boolean {
    switch (type) {
      case 'analytics':
        return consent.analytics;
      case 'marketing':
        return consent.marketing;
      case 'functional':
        return consent.functional;
      default:
        return false;
    }
  }

  // Obtener consentimiento actual
  private getCurrentConsent(): CookieConsent | null {
    if (typeof document === 'undefined') return null;
    
    try {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('cookie_consent='))
        ?.split('=')[1];
      
      if (cookieValue) {
        return JSON.parse(decodeURIComponent(cookieValue));
      }
    } catch (error) {
      console.warn('Error parsing cookie consent:', error);
    }
    return null;
  }

  // Manejar cambios en el consentimiento
  private handleConsentChange(consent: CookieConsent): void {
    // Cargar scripts pendientes que ahora tienen consentimiento
    for (const [scriptId, config] of this.pendingScripts) {
      if (this.shouldLoadScript(config.type, consent)) {
        this.loadScript(config);
      }
    }
  }

  // Cargar scripts bloqueados en el DOM
  loadBlockedScripts(): void {
    if (typeof document === 'undefined') return;
    
    const blockedScripts = document.querySelectorAll('script[type="text/plain"][data-cookie]');
    
    blockedScripts.forEach((scriptElement) => {
      const cookieType = scriptElement.getAttribute('data-cookie') as 'analytics' | 'marketing' | 'functional';
      const src = scriptElement.getAttribute('src');
      const id = scriptElement.getAttribute('id');
      const async = scriptElement.hasAttribute('async');
      const defer = scriptElement.hasAttribute('defer');
      
      if (src) {
        this.registerScript({
          src,
          type: cookieType,
          id: id || undefined,
          async,
          defer,
        });
      }
    });
  }

  // Verificar si un script está cargado
  isScriptLoaded(scriptId: string): boolean {
    return this.loadedScripts.has(scriptId);
  }

  // Obtener lista de scripts cargados
  getLoadedScripts(): string[] {
    return Array.from(this.loadedScripts);
  }
}

// Instancia global del gestor de scripts
export const scriptManager = new ScriptManager();

// Función para inicializar el gestor de scripts
export const initializeScriptManager = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  
  // Cargar scripts bloqueados al inicializar
  scriptManager.loadBlockedScripts();
  
  // También escuchar cambios en el DOM para scripts añadidos dinámicamente
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const blockedScripts = element.querySelectorAll?.('script[type="text/plain"][data-cookie]');
          blockedScripts?.forEach((script) => {
            const cookieType = script.getAttribute('data-cookie') as 'analytics' | 'marketing' | 'functional';
            const src = script.getAttribute('src');
            const id = script.getAttribute('id');
            const async = script.hasAttribute('async');
            const defer = script.hasAttribute('defer');
            
            if (src) {
              scriptManager.registerScript({
                src,
                type: cookieType,
                id: id || undefined,
                async,
                defer,
              });
            }
          });
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

// Función para cargar Google Analytics
export const loadGoogleAnalytics = (trackingId: string): void => {
  scriptManager.registerScript({
    src: `https://www.googletagmanager.com/gtag/js?id=${trackingId}`,
    type: 'analytics',
    id: 'google-analytics',
    async: true,
    onLoad: () => {
      // Inicializar gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag('js', new Date());
      gtag('config', trackingId, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure',
      });
    },
  });
};

// Función para cargar Facebook Pixel
export const loadFacebookPixel = (pixelId: string): void => {
  scriptManager.registerScript({
    src: 'https://connect.facebook.net/en_US/fbevents.js',
    type: 'marketing',
    id: 'facebook-pixel',
    async: true,
    onLoad: () => {
      // Inicializar Facebook Pixel
      (window as any).fbq = (window as any).fbq || function(...args: any[]) {
        ((window as any).fbq.q = (window as any).fbq.q || []).push(args);
      };
      (window as any).fbq('init', pixelId);
      (window as any).fbq('track', 'PageView');
    },
  });
};
