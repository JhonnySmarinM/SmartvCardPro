import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      {/* Auth Header - Solo visible si está autenticado */}
      {isAuthenticated() && (
        <div className="flex justify-end gap-4 mb-4">
          <button
            onClick={() => window.location.href = '/admin'}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Admin
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
          >
            Out
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Gestiona tus tarjetas de visita digitales
          </p>
        </div>
        <button
          onClick={() => checkAuthAndRedirect('/editor') && (window.location.href = '/editor')}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus size={20} />
          <span>Nueva Tarjeta</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Edit3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tarjetas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCards}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Esta Semana</p>
              <p className="text-2xl font-bold text-gray-900">{stats.recentCards}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <QrCode className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">QR Generados</p>
              <p className="text-2xl font-bold text-gray-900">{stats.qrGenerated}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Firmas Email</p>
              <p className="text-2xl font-bold text-gray-900">{stats.signaturesCreated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Mis Tarjetas</h2>
        </div>
        
        {cards.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Edit3 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes tarjetas aún
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primera tarjeta de visita digital para empezar
            </p>
            <button
              onClick={() => checkAuthAndRedirect('/editor') && (window.location.href = '/editor')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors"
            >
              <Plus size={20} />
              <span>Crear Primera Tarjeta</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {cards.map((card) => (
              <div key={card.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {card.contactData.firstName?.[0] || card.contactData.lastName?.[0] || '?'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {card.contactData.firstName} {card.contactData.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {card.contactData.jobTitle} {card.contactData.company && `en ${card.contactData.company}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        Creada el {new Date(card.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/preview/${card.id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Vista previa"
                    >
                      <Eye size={18} />
                    </Link>
                    
                    <button
                      onClick={() => handleCopyLink(card.id)}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Copiar enlace"
                    >
                      <Copy size={18} />
                    </button>
                    
                    <button
                      onClick={() => handleShare(card.id)}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
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
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit3 size={18} />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteCard(card.id, `${card.contactData.firstName} ${card.contactData.lastName}`)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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