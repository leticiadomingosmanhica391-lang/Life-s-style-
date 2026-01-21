
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Product, HomeContent } from '../types';
import { CATEGORIES_LIST } from '../constants';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContent>(storageService.getHomeContent());

  useEffect(() => {
    setProducts(storageService.getProducts().filter(p => p.isFeatured));
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src={homeContent.bannerImage} 
          alt="Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-center p-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {homeContent.bannerTitle}
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md">
              {homeContent.bannerSubtitle}
            </p>
            <Link 
              to="/categoria/promocoes"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg"
            >
              Ver Coleção
            </Link>
          </div>
        </div>
      </div>

      {/* Promo Bar */}
      <div className="bg-indigo-600 text-white py-3 text-center font-medium">
        {homeContent.promoText}
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Navegue por Categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES_LIST.slice(0, 4).map(cat => (
            <Link 
              key={cat.id} 
              to={`/categoria/${cat.id}`}
              className="relative group h-48 overflow-hidden rounded-xl shadow-md"
            >
              <img 
                src={`https://picsum.photos/seed/${cat.id}/400/300`} 
                alt={cat.label} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                <span className="text-white text-xl font-bold uppercase tracking-widest">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold">Destaques da Semana</h2>
          <Link to="/categoria/masculino" className="text-indigo-600 font-semibold hover:underline">Ver todos</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <Link key={product.id} to={`/produto/${product.id}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                  {product.category.toUpperCase()}
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-xl font-bold text-gray-900 mt-1">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
