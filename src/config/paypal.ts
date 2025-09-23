export const PAYPAL_CONFIG = {
  clientId: 'sb', // Sandbox client ID for testing
  currency: 'EUR',
  intent: 'capture',
  environment: 'sandbox' as const
};

// For production, replace with:
// export const PAYPAL_CONFIG = {
//   clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID || '',
//   currency: 'EUR',
//   intent: 'capture',
//   environment: 'production' as const
// };
