import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Loading component
const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center min-h-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </motion.div>
);

// Lazy load components
const LazyHome = lazy(() => import('../pages/Home'));
const LazyAirPods = lazy(() => import('../pages/AirPods'));
const LazyRentals = lazy(() => import('../pages/Rentals'));
const LazyServices = lazy(() => import('../pages/Services'));
const LazyWorkshop = lazy(() => import('../pages/Workshop'));
const LazyAbout = lazy(() => import('../pages/About'));
const LazyContact = lazy(() => import('../pages/Contact'));
const LazyCookiePolicy = lazy(() => import('../pages/CookiePolicy'));

// Lazy route wrapper
interface LazyRouteProps {
  component: React.ComponentType<any>;
  fallback?: React.ComponentType;
}

const LazyRoute: React.FC<LazyRouteProps> = ({ 
  component: Component, 
  fallback: Fallback = LoadingSpinner 
}) => {
  return (
    <Suspense fallback={<Fallback />}>
      <Component />
    </Suspense>
  );
};

// Export lazy components
export const LazyHomeRoute = () => <LazyRoute component={LazyHome} />;
export const LazyAirPodsRoute = () => <LazyRoute component={LazyAirPods} />;
export const LazyRentalsRoute = () => <LazyRoute component={LazyRentals} />;
export const LazyServicesRoute = () => <LazyRoute component={LazyServices} />;
export const LazyWorkshopRoute = () => <LazyRoute component={LazyWorkshop} />;
export const LazyAboutRoute = () => <LazyRoute component={LazyAbout} />;
export const LazyContactRoute = () => <LazyRoute component={LazyContact} />;
export const LazyCookiePolicyRoute = () => <LazyRoute component={LazyCookiePolicy} />;

export default LazyRoute;
