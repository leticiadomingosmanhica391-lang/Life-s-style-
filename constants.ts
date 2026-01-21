
import { Product, Category, HomeContent } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Camisa Casual Linho',
    price: 129.90,
    description: 'Camisa de linho leve e confortável, ideal para dias quentes e ocasiões casuais elegantes.',
    category: 'camisas',
    image: 'https://picsum.photos/seed/shirt1/600/800',
    sizes: ['P', 'M', 'G', 'GG'],
    isFeatured: true
  },
  {
    id: '2',
    name: 'Vestido Floral Verão',
    price: 189.90,
    description: 'Vestido longo com estampa floral delicada, tecido fluido e caimento impecável.',
    category: 'vestidos',
    image: 'https://picsum.photos/seed/dress1/600/800',
    sizes: ['P', 'M', 'G'],
    isFeatured: true
  },
  {
    id: '3',
    name: 'Calça Jeans Premium',
    price: 159.90,
    description: 'Jeans com elastano de alta qualidade, corte moderno e lavagem clássica.',
    category: 'calcas',
    image: 'https://picsum.photos/seed/jeans1/600/800',
    sizes: ['38', '40', '42', '44', '46'],
    isFeatured: false
  },
  {
    id: '4',
    name: 'Conjunto Infantil Aventura',
    price: 89.90,
    description: 'Roupa confortável para crianças explorarem o mundo com estilo e liberdade.',
    category: 'infantil',
    image: 'https://picsum.photos/seed/kids1/600/800',
    sizes: ['2', '4', '6', '8'],
    isFeatured: true
  }
];

export const CATEGORIES_LIST: { id: Category; label: string }[] = [
  { id: 'masculino', label: 'Masculino' },
  { id: 'feminino', label: 'Feminino' },
  { id: 'infantil', label: 'Infantil' },
  { id: 'camisas', label: 'Camisas' },
  { id: 'calcas', label: 'Calças' },
  { id: 'vestidos', label: 'Vestidos' },
  { id: 'promocoes', label: 'Promoções' }
];

export const INITIAL_HOME_CONTENT: HomeContent = {
  bannerTitle: 'Coleção Primavera 2024',
  bannerSubtitle: 'Descubra as tendências que vão dominar a estação.',
  bannerImage: 'https://picsum.photos/seed/banner/1200/400',
  promoText: 'Frete Grátis em compras acima de R$ 250,00'
};

export const ADMIN_CREDENTIALS = {
  email: 'admin@luxestyle.com',
  password: 'admin'
};

export const WHATSAPP_NUMBER = '5511999999999';
