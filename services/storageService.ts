
import { Product, User, Order, HomeContent, Category } from '../types';
import { INITIAL_PRODUCTS, INITIAL_HOME_CONTENT } from '../constants';

const KEYS = {
  PRODUCTS: 'luxe_products',
  USERS: 'luxe_users',
  ORDERS: 'luxe_orders',
  HOME: 'luxe_home',
  CURRENT_USER: 'luxe_current_user'
};

export const storageService = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(KEYS.PRODUCTS);
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  },
  saveProducts: (products: Product[]) => {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },
  
  getUsers: (): User[] => {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  saveUsers: (users: User[]) => {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },

  getOrders: (): Order[] => {
    const data = localStorage.getItem(KEYS.ORDERS);
    return data ? JSON.parse(data) : [];
  },
  saveOrders: (orders: Order[]) => {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },

  getHomeContent: (): HomeContent => {
    const data = localStorage.getItem(KEYS.HOME);
    return data ? JSON.parse(data) : INITIAL_HOME_CONTENT;
  },
  saveHomeContent: (content: HomeContent) => {
    localStorage.setItem(KEYS.HOME, JSON.stringify(content));
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },
  setCurrentUser: (user: User | null) => {
    if (user) localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    else localStorage.removeItem(KEYS.CURRENT_USER);
  }
};
