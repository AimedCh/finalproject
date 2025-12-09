import React from 'react';
import { motion } from 'framer-motion';

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  trackingCode: string;
  totalAmount: number;
  customerName: string;
  productName: string;
  quantity: number;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  isOpen,
  onClose,
  trackingCode,
  totalAmount,
  customerName,
  productName,
  quantity,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
    alert('¡Código de seguimiento copiado al portapapeles!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-8">
          {/* Success Icon */}
          <motion.div
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            ¡Orden Confirmada!
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Tu pedido ha sido procesado exitosamente
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
            <div>
              <p className="text-sm text-gray-600">Cliente</p>
              <p className="font-semibold text-gray-900">{customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Producto</p>
              <p className="font-semibold text-gray-900">{productName} x{quantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-gray-900">€{totalAmount.toFixed(2)}</p>
            </div>
          </div>

          {/* Tracking Code Section */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-600 font-medium mb-2">Código de Seguimiento</p>
            <div className="flex items-center justify-between bg-white rounded p-3 border border-blue-200">
              <code className="font-mono font-bold text-lg text-blue-600">{trackingCode}</code>
              <button
                onClick={copyToClipboard}
                className="ml-2 p-2 hover:bg-blue-100 rounded transition-colors"
                title="Copiar código"
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              💡 Guarda este código para rastrear tu pedido
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>📧 Próximos pasos:</strong> Recibirás un email de confirmación con los detalles de tu pedido. 
              Puedes rastrear tu orden usando el código de seguimiento en cualquier momento.
            </p>
          </div>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Entendido
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;

