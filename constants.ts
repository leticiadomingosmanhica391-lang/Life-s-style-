
import { Product, Category, HomeContent } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Camisa Casual Linho',
    price: 129.90,
    description: 'Camisa de linho leve e confortável, ideal para dias quentes e ocasiões casuais elegantes.',
    category: 'camisas',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&h=800',
    sizes: ['P', 'M', 'G', 'GG'],
    isFeatured: true
  },
  {
    id: '2',
    name: 'Vestido Floral Verão',
    price: 189.90,
    description: 'Vestido longo com estampa floral delicada, tecido fluido e caimento impecável.',
    category: 'vestidos',
    image: 'https://images.unsplash.com/photo-1572804013307-a9a111daadbb?auto=format&fit=crop&w=600&h=800',
    sizes: ['P', 'M', 'G'],
    isFeatured: true
  },
  {
    id: '3',
    name: 'Calça Jeans Premium',
    price: 159.90,
    description: 'Jeans com elastano de alta qualidade, corte moderno e lavagem clássica.',
    category: 'calcas',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&h=800',
    sizes: ['38', '40', '42', '44', '46'],
    isFeatured: false
  },
  {
    id: '4',
    name: 'Conjunto Infantil Aventura',
    price: 89.90,
    description: 'Roupa confortável para crianças explorarem o mundo com estilo e liberdade.',
    category: 'infantil',
    image: 'https://images.unsplash.com/photo-1519704943920-1844783b7511?auto=format&fit=crop&w=600&h=800',
    sizes: ['2', '4', '6', '8'],
    isFeatured: true
  },
  {
    id: '5',
    name: 'Jaqueta Bomber Masculina',
    price: 249.90,
    description: 'Jaqueta moderna com acabamento premium, perfeita para noites frescas.',
    category: 'masculino',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&h=800',
    sizes: ['M', 'G', 'GG'],
    isFeatured: true
  },
  {
    id: '6',
    name: 'Blusa de Seda Feminina',
    price: 149.90,
    description: 'Elegância e suavidade em uma blusa versátil para trabalho ou lazer.',
    category: 'feminino',
    image: 'https://images.unsplash.com/photo-1564202284209-11cc33f729f8?auto=format&fit=crop&w=600&h=800',
    sizes: ['P', 'M', 'G'],
    isFeatured: false
  },
  {
    id: '7',
    name: 'Tênis Sport Confort',
    price: 199.90,
    description: 'Tecnologia de amortecimento para o dia a dia.',
    category: 'promocoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&h=800',
    sizes: ['38', '39', '40', '41', '42'],
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
  storeName: 'LuxeStyle',
  bannerTitle: 'Coleção Primavera 2024',
  bannerSubtitle: 'Descubra as tendências que vão dominar a estação com a LuxeStyle.',
  bannerImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&h=400',
  promoText: 'Frete Grátis em compras acima de R$ 250,00 - Aproveite!',
  whatsappNumber: '5511999999999'
};

export const ADMIN_CREDENTIALS = {
  email: 'admin@luxestyle.com',
  password: 'admin'
};
