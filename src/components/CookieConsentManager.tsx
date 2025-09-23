import React, { useEffect } from 'react';
import { useCookieConsent, initializeCookieConsentAPI } from '../hooks/useCookieConsent';
import { initializeScriptManager } from '../utils/scriptManager';
import CookieBanner from './CookieBanner';
import CookiePreferences from './CookiePreferences';

const CookieConsentManager: React.FC = () => {
  const cookieConsent = useCookieConsent();

  useEffect(() => {
    // Inicializar API global
    initializeCookieConsentAPI(cookieConsent);
    
    // Inicializar gestor de scripts
    initializeScriptManager();
    
    // Escuchar eventos para abrir preferencias
    const handleOpenPreferences = () => {
      cookieConsent.setShowPreferences(true);
    };
    
    window.addEventListener('openCookiePreferences', handleOpenPreferences);
    
    return () => {
      window.removeEventListener('openCookiePreferences', handleOpenPreferences);
    };
  }, [cookieConsent]);

  return (
    <>
      <CookieBanner />
      <CookiePreferences />
    </>
  );
};

export default CookieConsentManager;
