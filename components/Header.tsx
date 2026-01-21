
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES_LIST } from '../constants';
import { storageService } from '../services/storageService';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = storageService.getCurrentUser();
  const homeContent = storageService.getHomeContent();
  const navigate = useNavigate();

  const handleLogout = () => {
    storageService.setCurrentUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">{homeContent.storeName}</Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {CATEGORIES_LIST.slice(0, 4).map(cat => (
              <Link key={cat.id} to={`/categoria/${cat.id}`} className="text-gray-600 hover:text-indigo-600 font-medium">
                {cat.label}
              </Link>
            ))}
            <Link to="/categoria/promocoes" className="text-red-500 hover:text-red-600 font-bold">
              Promoções
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Olá, <strong>{currentUser.name.split(' ')[0]}</strong></span>
                {currentUser.isAdmin && (
                  <Link to="/admin" className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Painel</Link>
                )}
                <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600">Sair</button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Login</Link>
            )}
            <Link to="/carrinho" className="p-2 text-gray-400 hover:text-indigo-600">
              <i className="fa-solid fa-cart-shopping text-xl"></i>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400 hover:text-gray-500">
              {/* Fix: Removed extra trailing quote and ensured proper template literal closing for icon class */}
              <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {CATEGORIES_LIST.map(cat => (
              <Link
                key={cat.id}
                to={`/categoria/${cat.id}`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {cat.label}
              </Link>
            ))}
            {!currentUser ? (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar / Cadastrar
              </Link>
            ) : (
              <>
                <Link to="/perfil" className="block px-3 py-2 text-base font-medium text-gray-700">Meu Perfil</Link>
                {currentUser.isAdmin && (
                  <Link to="/admin" className="block px-4 py-2 text-base font-medium text-indigo-600" onClick={() => setIsMenuOpen(false)}>Painel Admin</Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600">Sair</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
