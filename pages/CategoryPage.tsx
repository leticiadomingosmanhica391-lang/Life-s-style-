
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Product } from '../types';
import { CATEGORIES_LIST } from '../constants';

const CategoryPage: React.FC = () => {
  const { catId } = useParams<{ catId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const categoryLabel = CATEGORIES_LIST.find(c => c.id === catId)?.label || 'Produtos';

  useEffect(() => {
    const all = storageService.getProducts();
    if (catId === 'promocoes') {
      // In a real app, products would have a 'sale' flag. Mocking with some items.
      setProducts(all.slice(0, 3));
    } else {
      setProducts(all.filter(p => p.category === catId));
    }
  }, [catId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 capitalize">{categoryLabel}</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl">
          <i className="fa-solid fa-box-open text-6xl text-gray-200 mb-4"></i>
          <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
          <Link to="/" className="mt-4 inline-block text-indigo-600 font-bold hover:underline">Voltar para Home</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <Link key={product.id} to={`/produto/${product.id}`} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4 shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
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
      )}
    </div>
  );
};

export default CategoryPage;
