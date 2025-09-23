import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getCookie('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie('auth_token');
      deleteCookie('user_data');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      setCookie('auth_token', response.data.data.token, 30);
      setCookie('user_data', JSON.stringify(response.data.data.user), 30);
    }
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.success) {
      setCookie('auth_token', response.data.data.token, 30);
      setCookie('user_data', JSON.stringify(response.data.data.user), 30);
    }
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      deleteCookie('auth_token');
      deleteCookie('user_data');
    }
  },

  getUser: async () => {
    const response = await api.get('/auth/user');
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getAll: async (params?: any) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  update: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  create: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  trackOrder: async (trackingCode: string) => {
    const response = await api.get(`/orders/tracking/${trackingCode}`);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};

// Invoices API
export const invoicesAPI = {
  getAll: async () => {
    const response = await api.get('/invoices');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },

  download: async (id: string) => {
    const response = await api.get(`/invoices/${id}/download`, {
      responseType: 'blob',
    });
    return response;
  },
};

// Rentals API
export const rentalsAPI = {
  getApartments: async () => {
    const response = await api.get('/rentals/apartments');
    return response.data;
  },

  getApartment: async (id: string) => {
    const response = await api.get(`/rentals/apartments/${id}`);
    return response.data;
  },

  checkAvailability: async (id: string, checkIn: string, checkOut: string) => {
    const response = await api.get(`/rentals/apartments/${id}/availability`, {
      params: { check_in: checkIn, check_out: checkOut }
    });
    return response.data;
  },

  createBooking: async (bookingData: any) => {
    const response = await api.post('/rentals/bookings', bookingData);
    return response.data;
  },

  getBookings: async () => {
    const response = await api.get('/rentals/bookings');
    return response.data;
  },

  getBooking: async (id: string) => {
    const response = await api.get(`/rentals/bookings/${id}`);
    return response.data;
  },
};

// Workshop API
export const workshopAPI = {
  getServices: async () => {
    const response = await api.get('/workshop/services');
    return response.data;
  },

  createAppointment: async (appointmentData: any) => {
    const response = await api.post('/workshop/appointments', appointmentData);
    return response.data;
  },

  getAppointments: async () => {
    const response = await api.get('/workshop/appointments');
    return response.data;
  },

  getAppointment: async (id: string) => {
    const response = await api.get(`/workshop/appointments/${id}`);
    return response.data;
  },

  updateAppointmentStatus: async (id: string, statusData: any) => {
    const response = await api.put(`/workshop/appointments/${id}/status`, statusData);
    return response.data;
  },
};

export default api;