import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { PAYPAL_CONFIG } from '../config/paypal';

interface PayPalCheckoutProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: any) => void;
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ amount, onSuccess, onError }) => {
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
          onApprove={(data, actions) => {
            return actions.order?.capture().then((details) => {
              onSuccess();
            });
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
