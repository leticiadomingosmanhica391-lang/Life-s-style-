
export type Category = 'masculino' | 'feminino' | 'infantil' | 'camisas' | 'calcas' | 'vestidos' | 'promocoes';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  sizes: string[];
  isFeatured: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isAdmin: boolean;
  password?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  productName: string;
  price: number;
  size: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface HomeContent {
  storeName: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerImage: string;
  promoText: string;
  whatsappNumber: string;
}
