
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { Product, Order } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const currentUser = storageService.getCurrentUser();
  const homeContent = storageService.getHomeContent();

  useEffect(() => {
    const allProducts = storageService.getProducts();
    const found = allProducts.find(p => p.id === id);
    if (found) {
      setProduct(found);
      if (found.sizes.length > 0) setSelectedSize(found.sizes[0]);
    }
  }, [id]);

  const handleBuy = () => {
    if (!currentUser) {
      alert('Por favor, faça login para realizar o pedido.');
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      alert('Selecione um tamanho antes de comprar.');
      return;
    }

    // Record order in "database"
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      productId: product!.id,
      productName: product!.name,
      price: product!.price,
      size: selectedSize,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    const orders = storageService.getOrders();
    storageService.saveOrders([...orders, newOrder]);

    // Format WhatsApp message
    const message = encodeURIComponent(
      `Olá! Gostaria de comprar o seguinte item na ${homeContent.storeName}:\n\n` +
      `*Produto:* ${product?.name}\n` +
      `*Preço:* R$ ${product?.price.toFixed(2)}\n` +
      `*Tamanho:* ${selectedSize}\n` +
      `*Cliente:* ${currentUser.name}\n` +
      `*Endereço:* ${currentUser.address}`
    );

    window.open(`https://wa.me/${homeContent.whatsappNumber}?text=${message}`, '_blank');
  };

  if (!product) return <div className="text-center py-20">Produto não encontrado.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Product Image */}
        <div className="mb-8 lg:mb-0">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <nav className="mb-4">
            <span className="text-sm text-gray-500 uppercase tracking-widest">{product.category}</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-indigo-600 mb-8">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>

          <div className="border-t border-gray-100 pt-8 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Descrição</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tamanhos Disponíveis</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[50px] h-[50px] border-2 rounded-xl font-bold flex items-center justify-center transition-all ${
                    selectedSize === size 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <button
              onClick={handleBuy}
              className="w-full bg-green-500 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-green-600 shadow-xl transition-all active:scale-[0.98]"
            >
              <i className="fa-brands fa-whatsapp text-2xl"></i>
              Comprar via WhatsApp
            </button>
            <p className="text-center text-xs text-gray-400">
              * Você será redirecionado para o nosso canal de atendimento exclusivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
