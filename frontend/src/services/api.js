import axios from 'axios';

// Base API URL - update this to your backend URL
const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retailer API endpoints
export const retailerAPI = {
  // GRT Jewellers
  getGRTRate: async (city) => {
    try {
      const response = await api.get(`/retailers/grt/${city}/store`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch GRT rates');
    }
  },

  // Bhima Jewellers
  getBhimaRate: async (state) => {
    try {
      const response = await api.get(`/retailers/bhima/${state}/store`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch Bhima rates');
    }
  },

  // Lalitha Jewellery
  getLalithaRate: async (city) => {
    try {
      const response = await api.get(`/retailers/lalitha/${city}/store`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch Lalitha rates');
    }
  },

  // Get all rates at once
  getAllRates: async () => {
    try {
      const [grt, bhima, lalitha] = await Promise.allSettled([
        retailerAPI.getGRTRate('chennai'),
        retailerAPI.getBhimaRate('kerala'),
        retailerAPI.getLalithaRate('chennai'),
      ]);

      return {
        grt: grt.status === 'fulfilled' ? grt.value : null,
        bhima: bhima.status === 'fulfilled' ? bhima.value : null,
        lalitha: lalitha.status === 'fulfilled' ? lalitha.value : null,
      };
    } catch (error) {
      throw new Error('Failed to fetch rates from retailers');
    }
  },
};

export default api;
