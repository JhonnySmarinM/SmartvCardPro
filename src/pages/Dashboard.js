import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Edit3, 
  QrCode, 
  Mail, 
  Eye, 
  Trash2, 
  Copy,
  Share2,
  Calendar,
  TrendingUp
} from 'lucide-react';
import useCardStore from '../store/cardStore';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { cards, deleteCard, setCurrentCard } = useCardStore();
  const location = useLocation();

  const checkAuthAndRedirect = (path) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Debes iniciar sesión para acceder a esta función');
      window.location.href = '/auth';
      return false;
    }
    return true;
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // Extender el tiempo de sesión: si el token expira en menos de 24 horas, considerarlo válido
      const timeUntilExpiry = payload.exp - currentTime;
      const twentyFourHours = 24 * 60 * 60; // 24 horas en segundos
      
      return payload.exp && timeUntilExpiry > -twentyFourHours;
    } catch (error) {
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Sesión cerrada correctamente');
    window.location.href = '/';
  };

  const handleDeleteCard = (cardId, cardName) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la tarjeta "${cardName}"?`)) {
      deleteCard(cardId);
      toast.success('Tarjeta eliminada correctamente');
    }
  };

  const handleCopyLink = (cardId) => {
    const link = `${window.location.origin}/preview/${cardId}`;
    navigator.clipboard.writeText(link);
    toast.success('Enlace copiado al portapapeles');
  };

  const handleShare = async (cardId) => {
    const link = `${window.location.origin}/preview/${cardId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mi Tarjeta Digital',
          text: 'Mira mi tarjeta de visita digital',
          url: link,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleCopyLink(cardId);
    }
  };

  const stats = {
    totalCards: cards.length,
    recentCards: cards.filter(card => {
      const cardDate = new Date(card.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return cardDate > weekAgo;
    }).length,
    qrGenerated: cards.filter(card => card.qrCode).length,
    signaturesCreated: cards.filter(card => card.emailSignature).length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-texto">Dashboard</h1>
          <p className="mt-2 text-chocolate-200">
            Gestiona tus tarjetas de visita digitales
          </p>
        </div>
        <button
          onClick={() => checkAuthAndRedirect('/editor') && (window.location.href = '/editor')}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-fucsia-500 to-fucsia-600 hover:from-fucsia-600 hover:to-fucsia-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-all shadow-glow-fucsia shine-effect"
        >
          <Plus size={20} />
          <span>Nueva Tarjeta</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="luxury-card p-6 rounded-lg veladura-fucsia">
          <div className="flex items-center">
            <div className="p-2 bg-fucsia-500/20 rounded-lg shadow-glow-fucsia">
              <Edit3 className="w-6 h-6 text-fucsia-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-chocolate-200">Total Tarjetas</p>
              <p className="text-2xl font-bold text-texto">{stats.totalCards}</p>
            </div>
          </div>
        </div>

        <div className="luxury-card p-6 rounded-lg veladura-turquesa">
          <div className="flex items-center">
            <div className="p-2 bg-turquesa-500/20 rounded-lg shadow-glow-turquesa">
              <Calendar className="w-6 h-6 text-turquesa-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-chocolate-200">Esta Semana</p>
              <p className="text-2xl font-bold text-texto">{stats.recentCards}</p>
            </div>
          </div>
        </div>

        <div className="luxury-card p-6 rounded-lg veladura-fucsia">
          <div className="flex items-center">
            <div className="p-2 bg-fucsia-500/20 rounded-lg shadow-glow-fucsia">
              <QrCode className="w-6 h-6 text-fucsia-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-chocolate-200">QR Generados</p>
              <p className="text-2xl font-bold text-texto">{stats.qrGenerated}</p>
            </div>
          </div>
        </div>

        <div className="luxury-card p-6 rounded-lg veladura-turquesa">
          <div className="flex items-center">
            <div className="p-2 bg-turquesa-500/20 rounded-lg shadow-glow-turquesa">
              <Mail className="w-6 h-6 text-turquesa-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-chocolate-200">Firmas Email</p>
              <p className="text-2xl font-bold text-texto">{stats.signaturesCreated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="luxury-card rounded-lg shine-effect">
        <div className="px-6 py-4 border-b border-borde bg-gradient-to-r from-chocolate-600 to-carbon-600">
          <h2 className="text-lg font-semibold text-texto">Mis Tarjetas</h2>
        </div>
        
        {cards.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-carbon-600/50 rounded-full flex items-center justify-center mb-4 shadow-luxury">
              <Edit3 className="w-12 h-12 text-chocolate-300" />
            </div>
            <h3 className="text-lg font-medium text-texto mb-2">
              No tienes tarjetas aún
            </h3>
            <p className="text-chocolate-200 mb-6">
              Crea tu primera tarjeta de visita digital para empezar
            </p>
            <button
              onClick={() => checkAuthAndRedirect('/editor') && (window.location.href = '/editor')}
              className="bg-gradient-to-r from-fucsia-500 to-fucsia-600 hover:from-fucsia-600 hover:to-fucsia-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-all shadow-glow-fucsia shine-effect"
            >
              <Plus size={20} />
              <span>Crear Primera Tarjeta</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-borde">
            {cards.map((card) => (
              <div key={card.id} className="p-6 hover:bg-carbon-600/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-fucsia-500 to-turquesa-500 rounded-lg flex items-center justify-center shine-effect shadow-glow-fucsia">
                      <span className="text-white font-bold text-sm">
                        {card.contactData.firstName?.[0] || card.contactData.lastName?.[0] || '?'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-texto">
                        {card.contactData.firstName} {card.contactData.lastName}
                      </h3>
                      <p className="text-sm text-chocolate-200">
                        {card.contactData.jobTitle} {card.contactData.company && `en ${card.contactData.company}`}
                      </p>
                      <p className="text-xs text-carbon-300">
                        Creada el {new Date(card.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/preview/${card.id}`}
                      className="p-2 text-texto hover:text-turquesa-300 hover:bg-turquesa-500/20 rounded-lg transition-all hover:shadow-glow-turquesa"
                      title="Vista previa"
                    >
                      <Eye size={18} />
                    </Link>
                    
                    <button
                      onClick={() => handleCopyLink(card.id)}
                      className="p-2 text-texto hover:text-fucsia-300 hover:bg-fucsia-500/20 rounded-lg transition-all hover:shadow-glow-fucsia"
                      title="Copiar enlace"
                    >
                      <Copy size={18} />
                    </button>
                    
                    <button
                      onClick={() => handleShare(card.id)}
                      className="p-2 text-texto hover:text-turquesa-300 hover:bg-turquesa-500/20 rounded-lg transition-all hover:shadow-glow-turquesa"
                      title="Compartir"
                    >
                      <Share2 size={18} />
                    </button>
                    
                    <button
                      onClick={() => {
                        if (checkAuthAndRedirect('/editor')) {
                          setCurrentCard(card.id);
                          window.location.href = '/editor';
                        }
                      }}
                      className="p-2 text-texto hover:text-fucsia-300 hover:bg-fucsia-500/20 rounded-lg transition-all hover:shadow-glow-fucsia"
                      title="Editar"
                    >
                      <Edit3 size={18} />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteCard(card.id, `${card.contactData.firstName} ${card.contactData.lastName}`)}
                      className="p-2 text-texto hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard; 