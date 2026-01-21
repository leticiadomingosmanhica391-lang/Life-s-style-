
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';
import { ADMIN_CREDENTIALS } from '../constants';
import { User } from '../types';

const Auth: React.FC<{ mode: 'login' | 'register' }> = ({ mode }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      // Admin Check
      if (formData.email === ADMIN_CREDENTIALS.email && formData.password === ADMIN_CREDENTIALS.password) {
        const admin: User = {
          id: 'admin-id',
          name: 'Administrador',
          email: ADMIN_CREDENTIALS.email,
          phone: '',
          address: '',
          isAdmin: true
        };
        storageService.setCurrentUser(admin);
        navigate('/admin');
        window.location.reload();
        return;
      }

      // Customer Check
      const users = storageService.getUsers();
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        storageService.setCurrentUser(user);
        navigate('/');
        window.location.reload();
      } else {
        alert('Credenciais inválidas.');
      }
    } else {
      // Registration
      const users = storageService.getUsers();
      if (users.some(u => u.email === formData.email)) {
        alert('E-mail já cadastrado.');
        return;
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        isAdmin: false
      };

      storageService.saveUsers([...users, newUser]);
      storageService.setCurrentUser(newUser);
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'login' ? (
              <>Não tem uma conta? <button onClick={() => navigate('/registro')} className="text-indigo-600 font-medium hover:underline">Cadastre-se</button></>
            ) : (
              <>Já tem uma conta? <button onClick={() => navigate('/login')} className="text-indigo-600 font-medium hover:underline">Faça login</button></>
            )}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {mode === 'register' && (
              <input
                type="text"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Nome completo"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            )}
            <input
              type="email"
              required
              className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Endereço de e-mail"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="password"
              required
              className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Senha"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
            {mode === 'register' && (
              <>
                <input
                  type="tel"
                  required
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="WhatsApp (ex: 11999999999)"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
                <textarea
                  required
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Endereço para entrega"
                  rows={3}
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </>
            )}
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
