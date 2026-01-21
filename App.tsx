
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import WhatsAppButton from './components/WhatsAppButton';
import { storageService } from './services/storageService';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-indigo-400 mb-6">LuxeStyle</h3>
          <p className="text-gray-400">Sua loja premium de moda com atendimento personalizado via WhatsApp.</p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Links Úteis</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Trocas e Devoluções</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Categorias</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Masculino</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Feminino</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Infantil</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Contato</h4>
          <p className="text-gray-400">contato@luxestyle.com</p>
          <p className="text-gray-400 mb-4">+55 11 99999-9999</p>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-indigo-400 transition-colors"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="text-2xl hover:text-indigo-400 transition-colors"><i className="fa-brands fa-facebook"></i></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        © 2024 LuxeStyle E-Commerce. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = storageService.getCurrentUser();
  return user?.isAdmin ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<ProductDetail />} />
            <Route path="/categoria/:catId" element={<CategoryPage />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/registro" element={<Auth mode="register" />} />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
};

export default App;
