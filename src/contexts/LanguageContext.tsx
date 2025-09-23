import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie } from '../utils/cookies';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    home: 'Inicio',
    about: 'Sobre Mí',
    services: 'Servicios',
    contact: 'Contacto',
    airpods: 'AirPods Store',
    rentals: 'Alquileres',
    workshop: 'Taller',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    welcome: 'Bienvenido',
    developer: 'Desarrollador Full Stack',
    entrepreneur: 'Emprendedor Multidisciplinario',
  },
  en: {
    home: 'Home',
    about: 'About Me',
    services: 'Services',
    contact: 'Contact',
    airpods: 'AirPods Store',
    rentals: 'Rentals',
    workshop: 'Workshop',
    login: 'Login',
    logout: 'Logout',
    welcome: 'Welcome',
    developer: 'Full Stack Developer',
    entrepreneur: 'Multidisciplinary Entrepreneur',
  },
  fr: {
    home: 'Accueil',
    about: 'À Propos',
    services: 'Services',
    contact: 'Contact',
    airpods: 'Boutique AirPods',
    rentals: 'Locations',
    workshop: 'Atelier',
    login: 'Connexion',
    logout: 'Déconnexion',
    welcome: 'Bienvenue',
    developer: 'Développeur Full Stack',
    entrepreneur: 'Entrepreneur Multidisciplinaire',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const savedLanguage = getCookie('language') as Language;
    if (savedLanguage && ['es', 'en', 'fr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setCookie('language', lang, 365);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
