
import React from 'react';
import { storageService } from '../services/storageService';

const WhatsAppButton: React.FC = () => {
  const homeContent = storageService.getHomeContent();
  
  const handleClick = () => {
    const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre os produtos da ${homeContent.storeName}.`);
    window.open(`https://wa.me/${homeContent.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 flex items-center justify-center"
      aria-label="WhatsApp"
    >
      <i className="fa-brands fa-whatsapp text-3xl"></i>
    </button>
  );
};

export default WhatsAppButton;
