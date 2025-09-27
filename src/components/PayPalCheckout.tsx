import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { PAYPAL_CONFIG } from '../config/paypal';

interface PayPalCheckoutProps {
  amount: number;
  cartItems: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  onSuccess: () => void;
  onError: (error: any) => void;
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ amount, cartItems, onSuccess, onError }) => {
  const paypalOptions = {
    clientId: PAYPAL_CONFIG.clientId,
    currency: PAYPAL_CONFIG.currency,
    intent: PAYPAL_CONFIG.intent
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="w-full">
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [{
                amount: {
                  value: amount.toFixed(2),
                  currency_code: 'EUR'
                }
              }]
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const details = await actions.order?.capture();
              
              // Enviar datos de compra al backend Laravel
              const csrfResponse = await fetch('/backend/csrf-token');
              const csrfData = await csrfResponse.json();
              
              // Crear órdenes para cada item del carrito
              for (const item of cartItems) {
                const orderResponse = await fetch('/backend/airpods/purchase', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfData.csrf_token
                  },
                  body: JSON.stringify({
                    airpods_id: item.id,
                    cantidad: item.quantity,
                    metodo_pago: 'paypal'
                  })
                });
                
                if (!orderResponse.ok) {
                  throw new Error('Error al procesar la compra');
                }
              }
              
              onSuccess();
            } catch (error) {
              console.error('Error en el procesamiento:', error);
              onError(error);
            }
          }}
          onError={onError}
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal'
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
