
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Product, HomeContent } from '../types';
import { CATEGORIES_LIST } from '../constants';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContent>(storageService.getHomeContent());

  useEffect(() => {
    // Pegar produtos marcados como destaque
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-down">
              {homeContent.bannerTitle}
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md">
              {homeContent.bannerSubtitle}
            </p>
            <Link 
              to="/categoria/promocoes"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Coleção
            </Link>
          </div>
        </div>
      </div>

      {/* Promo Bar */}
      <div className="bg-indigo-600 text-white py-3 text-center font-medium shadow-inner">
        <span className="inline-block animate-pulse">✨ {homeContent.promoText} ✨</span>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Categorias em Alta</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES_LIST.slice(0, 4).map(cat => (
            <Link 
              key={cat.id} 
              to={`/categoria/${cat.id}`}
              className="relative group h-56 overflow-hidden rounded-2xl shadow-lg transition-all"
            >
              <img 
                src={`https://images.unsplash.com/photo-${cat.id === 'masculino' ? '1488161628813-244a205d77e6' : cat.id === 'feminino' ? '1483985988355-763728e1935b' : cat.id === 'infantil' ? '1503919919711-4714dff1811c' : '1523381210434-271e8be1f52b'}?auto=format&fit=crop&w=400&h=400`} 
                alt={cat.label} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl font-bold uppercase tracking-widest">{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Destaques da Semana</h2>
            <p className="text-gray-500 mt-2">As peças mais desejadas da nossa loja.</p>
          </div>
          <Link to="/categoria/promocoes" className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-2">
            Ver tudo <i className="fa-solid fa-arrow-right text-sm"></i>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map(product => (
            <Link key={product.id} to={`/produto/${product.id}`} className="group flex flex-col h-full">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gray-100 mb-5 shadow-md group-hover:shadow-xl transition-all">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-indigo-600 shadow-sm uppercase tracking-tighter">
                  {product.category}
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2 mb-4">
                  {product.description.substring(0, 60)}...
                </p>
                <div className="mt-auto flex justify-between items-center">
                  <p className="text-2xl font-black text-gray-900">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </p>
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
