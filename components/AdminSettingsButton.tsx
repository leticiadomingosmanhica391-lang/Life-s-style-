
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../services/storageService';

const AdminSettingsButton: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = storageService.getCurrentUser();

  if (!currentUser?.isAdmin) return null;

  return (
    <button
      onClick={() => navigate('/admin')}
      className="fixed bottom-6 left-6 z-50 bg-slate-800 text-white p-4 rounded-full shadow-2xl hover:bg-slate-900 transition-all transform hover:scale-110 flex items-center justify-center group"
      title="Painel de Administração"
    >
      <i className="fa-solid fa-gear text-2xl group-hover:rotate-90 transition-transform duration-500"></i>
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-medium text-sm">
        Painel Admin
      </span>
    </button>
  );
};

export default AdminSettingsButton;
