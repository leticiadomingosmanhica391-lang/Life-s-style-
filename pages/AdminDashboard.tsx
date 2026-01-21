
import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { Product, Order, User, HomeContent, Category } from '../types';
import { CATEGORIES_LIST } from '../constants';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'users' | 'home' | 'settings'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [homeContent, setHomeContent] = useState<HomeContent>(storageService.getHomeContent());

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProducts(storageService.getProducts());
    setOrders(storageService.getOrders());
    setUsers(storageService.getUsers());
  }, []);

  const handleDeleteProduct = (id: string) => {
    if (confirm('Deseja excluir este produto?')) {
      const updated = products.filter(p => p.id !== id);
      storageService.saveProducts(updated);
      setProducts(updated);
    }
  };

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProduct: Product = {
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get('name') as string,
      price: parseFloat(formData.get('price') as string),
      description: formData.get('description') as string,
      category: formData.get('category') as Category,
      image: formData.get('image') as string || 'https://picsum.photos/seed/default/600/800',
      sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()),
      isFeatured: formData.get('featured') === 'on'
    };

    let newProducts;
    if (editingProduct) {
      newProducts = products.map(p => p.id === editingProduct.id ? updatedProduct : p);
    } else {
      newProducts = [...products, updatedProduct];
    }

    storageService.saveProducts(newProducts);
    setProducts(newProducts);
    setEditingProduct(null);
  };

  const handleUpdateHome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedHome: HomeContent = {
      ...homeContent,
      bannerTitle: formData.get('title') as string,
      bannerSubtitle: formData.get('subtitle') as string,
      bannerImage: formData.get('image') as string,
      promoText: formData.get('promo') as string,
    };
    storageService.saveHomeContent(updatedHome);
    setHomeContent(updatedHome);
    alert('Home atualizada com sucesso!');
  };

  const handleUpdateSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedHome: HomeContent = {
      ...homeContent,
      storeName: formData.get('storeName') as string,
      whatsappNumber: formData.get('whatsapp') as string,
    };
    storageService.saveHomeContent(updatedHome);
    setHomeContent(updatedHome);
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <i className="fa-solid fa-gauge-high text-indigo-600"></i> Painel de Controle
        </h1>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sistema Ativo</span>
        </div>
      </div>

      <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {(['products', 'orders', 'users', 'home', 'settings'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab === 'products' && <i className="fa-solid fa-shirt"></i>}
            {tab === 'orders' && <i className="fa-solid fa-clipboard-list"></i>}
            {tab === 'users' && <i className="fa-solid fa-users"></i>}
            {tab === 'home' && <i className="fa-solid fa-house"></i>}
            {tab === 'settings' && <i className="fa-solid fa-gear"></i>}
            {tab === 'products' ? 'Produtos' : tab === 'orders' ? 'Pedidos' : tab === 'users' ? 'Clientes' : tab === 'home' ? 'Home' : 'Configurações'}
          </button>
        ))}
      </div>

      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Gerenciar Produtos</h2>
            <button 
              onClick={() => setEditingProduct({ id: '', name: '', price: 0, description: '', category: 'camisas', image: '', sizes: [], isFeatured: false })}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors"
            >
              Adicionar Novo
            </button>
          </div>

          {editingProduct && (
            <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <h3 className="font-bold mb-4">{editingProduct.id ? 'Editar Produto' : 'Novo Produto'}</h3>
              <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" defaultValue={editingProduct.name} placeholder="Nome" className="p-3 border rounded-xl" required />
                <input name="price" type="number" step="0.01" defaultValue={editingProduct.price} placeholder="Preço" className="p-3 border rounded-xl" required />
                <select name="category" defaultValue={editingProduct.category} className="p-3 border rounded-xl">
                  {CATEGORIES_LIST.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <input name="image" defaultValue={editingProduct.image} placeholder="URL da Imagem" className="p-3 border rounded-xl" />
                <input name="sizes" defaultValue={editingProduct.sizes.join(', ')} placeholder="Tamanhos (separados por vírgula)" className="p-3 border rounded-xl" />
                <div className="flex items-center space-x-2 px-3">
                  <input name="featured" type="checkbox" defaultChecked={editingProduct.isFeatured} id="feat" className="w-5 h-5 accent-indigo-600" />
                  <label htmlFor="feat" className="text-sm font-medium">Destaque na Home</label>
                </div>
                <textarea name="description" defaultValue={editingProduct.description} placeholder="Descrição" className="p-3 border rounded-xl md:col-span-2" rows={3} required />
                <div className="md:col-span-2 flex space-x-2">
                  <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold">Salvar</button>
                  <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl font-bold">Cancelar</button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-bold text-gray-600">Produto</th>
                  <th className="p-4 font-bold text-gray-600">Categoria</th>
                  <th className="p-4 font-bold text-gray-600">Preço</th>
                  <th className="p-4 font-bold text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl shadow-sm" />
                      <span className="font-medium">{p.name}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase text-gray-500">
                        {p.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-indigo-600">R$ {p.price.toFixed(2)}</td>
                    <td className="p-4 space-x-3 text-sm font-bold">
                      <button onClick={() => setEditingProduct(p)} className="text-indigo-600 hover:text-indigo-800 transition-colors">Editar</button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:text-red-700 transition-colors">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Pedidos Realizados</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">Cliente</th>
                  <th className="p-4 font-bold">Produto</th>
                  <th className="p-4 font-bold">Tamanho</th>
                  <th className="p-4 font-bold">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="p-4 text-xs font-mono text-gray-400">{o.id}</td>
                    <td className="p-4 font-medium">{o.userName}</td>
                    <td className="p-4">{o.productName}</td>
                    <td className="p-4"><span className="font-bold">{o.size}</span></td>
                    <td className="p-4 text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Definições do Sistema</h2>
          <form onSubmit={handleUpdateSettings} className="space-y-6 max-w-xl">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <label className="block text-sm font-bold text-gray-700 mb-2">Nome da Loja</label>
              <div className="relative">
                <i className="fa-solid fa-store absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  name="storeName" 
                  defaultValue={homeContent.storeName} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none" 
                  required 
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl">
              <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp de Atendimento</label>
              <div className="relative">
                <i className="fa-brands fa-whatsapp absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input 
                  name="whatsapp" 
                  defaultValue={homeContent.whatsappNumber} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none" 
                  placeholder="Ex: 5511999999999"
                  required 
                />
              </div>
              <p className="mt-2 text-xs text-gray-400 font-medium">* Insira apenas números com DDI (55) e DDD.</p>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-indigo-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all active:scale-95">
                Salvar Configurações
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'home' && (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Configurar Conteúdo Home</h2>
          <form onSubmit={handleUpdateHome} className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título do Banner</label>
              <input name="title" defaultValue={homeContent.bannerTitle} className="w-full p-3 border rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo do Banner</label>
              <input name="subtitle" defaultValue={homeContent.bannerSubtitle} className="w-full p-3 border rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem de Fundo</label>
              <input name="image" defaultValue={homeContent.bannerImage} className="w-full p-3 border rounded-xl" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto Promocional (Barra)</label>
              <input name="promo" defaultValue={homeContent.promoText} className="w-full p-3 border rounded-xl" required />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
              Salvar Alterações
            </button>
          </form>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-6">Clientes Cadastrados</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-4 font-bold">Nome</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">WhatsApp</th>
                  <th className="p-4 font-bold">Endereço</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-gray-600">{u.email}</td>
                    <td className="p-4 font-mono text-sm">{u.phone}</td>
                    <td className="p-4 text-xs text-gray-500 italic">{u.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
