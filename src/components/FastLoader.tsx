import React from 'react';
import { motion } from 'framer-motion';

interface FastLoaderProps {
  message?: string;
  subMessage?: string;
}

const FastLoader: React.FC<FastLoaderProps> = ({ 
  message = "Preparando tus vacaciones...",
  subMessage = "Cargando en menos de 2 segundos..."
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-100">
      <div className="text-center">
        {/* Optimized spinner - smaller and faster */}
        <motion.div
          className="relative w-16 h-16 mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-3 border-orange-200 rounded-full"></div>
          <div className="absolute inset-0 border-3 border-orange-500 border-t-transparent rounded-full"></div>
        </motion.div>
        
        {/* Main message */}
        <motion.p 
          className="text-orange-600 font-medium text-lg mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.p>
        
        {/* Sub message */}
        <motion.p 
          className="text-orange-500 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {subMessage}
        </motion.p>
        
        {/* Progress indicator */}
        <motion.div 
          className="mt-4 w-32 h-1 bg-orange-200 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FastLoader;
