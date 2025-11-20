import { PRODUCTS } from '../constants';
import { Order } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProducts: async () => {
    await delay(500);
    return [...PRODUCTS];
  },

  getProductById: async (id: string) => {
    await delay(300);
    return PRODUCTS.find(p => p.id === id) || null;
  },

  createOrder: async (orderData: Omit<Order, 'id' | 'status' | 'date'>) => {
    await delay(1500); // Simulate processing
    const newOrder: Order = {
      ...orderData,
      id: `KC-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'confirmed',
      date: new Date().toISOString()
    };
    return newOrder;
  }
};