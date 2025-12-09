import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Order {
  id: string;
  trackingCode: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    category?: string;
  }>;
  totalAmount?: number;
  paymentMethod?: string;
  paymentStatus?: string;
  notes?: string;
}

interface OrderTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ isOpen, onClose, order }) => {
  const [trackingCode, setTrackingCode] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setError('');
    setSearchedOrder(null);
    setHasSearched(true);

    try {
      console.log('Buscando orden con código:', trackingCode);
      const url = `/backend/airpods/track/${trackingCode}`;
      console.log('URL de búsqueda:', url);

      const response = await fetch(url);

      console.log('Respuesta del servidor:', response.status, response.statusText);

      const data = await response.json();
      console.log('Datos recibidos:', data);

      if (!response.ok) {
        console.log('Respuesta no OK:', data.message);
        setError(data.message || 'Pedido no encontrado. Verifica el código de seguimiento.');
        setIsSearching(false);
        return;
      }

      if (data.success && data.data) {
        console.log('Orden encontrada:', data.data);
        setSearchedOrder(data.data);
      } else {
        console.log('No hay datos en la respuesta');
        setError('No se encontró información del pedido.');
      }
    } catch (err) {
      console.error('Error searching order:', err);
      setError('Error al buscar el pedido. Intenta de nuevo.');
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing': return 'Procesando';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregado';
      default: return 'Desconocido';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Seguimiento de pedido</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {!searchedOrder ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de seguimiento
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => {
                      setTrackingCode(e.target.value);
                      setError('');
                    }}
                    placeholder="Ej: AP-20251119-ABCD12"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={!trackingCode || isSearching}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSearching ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              {hasSearched && !isSearching && !error && !searchedOrder && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No se encontró ningún pedido con ese código</p>
                </div>
              )}
            </div>
          ) : searchedOrder ? (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Código de seguimiento</p>
                    <p className="font-mono font-semibold text-blue-600">{searchedOrder?.trackingCode || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(searchedOrder?.status || '')}`}>
                      {getStatusText(searchedOrder?.status || '')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha de pedido</p>
                    <p className="font-semibold">{searchedOrder?.orderDate ? new Date(searchedOrder.orderDate).toLocaleDateString('es-ES') : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Entrega estimada</p>
                    <p className="font-semibold">{searchedOrder?.estimatedDelivery ? new Date(searchedOrder.estimatedDelivery).toLocaleDateString('es-ES') : 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              {searchedOrder?.customerName && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Información del cliente</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nombre:</strong> {searchedOrder.customerName}</p>
                    {searchedOrder.customerEmail && <p><strong>Email:</strong> {searchedOrder.customerEmail}</p>}
                    {searchedOrder.customerPhone && <p><strong>Teléfono:</strong> {searchedOrder.customerPhone}</p>}
                    {searchedOrder.shippingAddress && <p><strong>Dirección:</strong> {searchedOrder.shippingAddress}</p>}
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Productos</h3>
                <div className="space-y-2">
                  {searchedOrder?.items && searchedOrder.items.length > 0 ? (
                    searchedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">€{Number(item.price).toFixed(2)}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No hay productos en esta orden</p>
                  )}
                </div>
              </div>

              {/* Tracking Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de envío</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Pedido confirmado</p>
                      <p className="text-sm text-gray-600">{searchedOrder?.orderDate ? new Date(searchedOrder.orderDate).toLocaleString('es-ES') : 'N/A'}</p>
                    </div>
                  </div>
                  {(searchedOrder?.status === 'processing' || searchedOrder?.status === 'shipped' || searchedOrder?.status === 'delivered') && (
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${searchedOrder.status === 'processing' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <p className="font-medium">Procesando</p>
                        <p className="text-sm text-gray-600">Tu pedido está siendo preparado</p>
                      </div>
                    </div>
                  )}
                  {(searchedOrder?.status === 'shipped' || searchedOrder?.status === 'delivered') && (
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${searchedOrder.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <p className="font-medium">Enviado</p>
                        <p className="text-sm text-gray-600">En camino a tu dirección</p>
                      </div>
                    </div>
                  )}
                  {searchedOrder?.status === 'delivered' && (
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Entregado</p>
                        <p className="text-sm text-gray-600">Pedido entregado con éxito</p>
                      </div>
                    </div>
                  )}
                  {searchedOrder?.status === 'cancelled' && (
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">Cancelado</p>
                        <p className="text-sm text-gray-600">Este pedido ha sido cancelado</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              {searchedOrder?.totalAmount && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Resumen del pedido</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>€{(Number(searchedOrder.totalAmount) - 3.50).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío:</span>
                      <span>€3.50</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>€{Number(searchedOrder.totalAmount).toFixed(2)}</span>
                    </div>
                    {searchedOrder.paymentMethod && (
                      <div className="text-gray-600 mt-2">
                        <p><strong>Método de pago:</strong> {searchedOrder.paymentMethod === 'contra_reembolso' ? 'Contra reembolso' : searchedOrder.paymentMethod}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Back Button */}
              <button
                onClick={() => {
                  setSearchedOrder(null);
                  setTrackingCode('');
                  setError('');
                  setHasSearched(false);
                }}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Buscar otro pedido
              </button>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderTracking;
