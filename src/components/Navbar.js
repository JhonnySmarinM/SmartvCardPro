import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Edit3, 
  QrCode, 
  Mail, 
  Palette, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Sesión cerrada correctamente');
    window.location.href = '/auth';
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Editor', href: '/editor', icon: Edit3 },
    { name: 'QR Generator', href: 'https://crea-tu-qr.vercel.app/', icon: QrCode },
    { name: 'Email Signature', href: '/email-signature', icon: Mail },
    { name: 'Templates', href: '/templates', icon: Palette },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-chocolate-500 to-carbon-500 shadow-luxury border-b border-borde veladura-turquesa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-fucsia-500 to-turquesa-500 rounded-lg flex items-center justify-center shine-effect shadow-glow-fucsia">
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              <span className="text-xl font-bold text-texto">SmartvCard Pro</span>
            </Link>
          </div>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isProtected = item.href === '/editor' || item.href === '/email-signature';
              
              if (isProtected) {
                return (
                  <button
                    key={item.name}
                    onClick={() => checkAuthAndRedirect(item.href) && (window.location.href = item.href)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? 'bg-fucsia-500/20 text-fucsia-300 border-b-2 border-fucsia-500 shadow-glow-fucsia'
                        : 'text-texto hover:text-fucsia-300 hover:bg-carbon-600/50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </button>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-fucsia-500/20 text-fucsia-300 border-b-2 border-fucsia-500 shadow-glow-fucsia'
                      : 'text-texto hover:text-fucsia-300 hover:bg-carbon-600/50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Botón Logout */}
          <div className="hidden md:flex items-center">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-carbon-600 to-carbon-700 hover:from-carbon-700 hover:to-carbon-800 text-texto px-4 py-2 rounded-lg flex items-center space-x-2 transition-all shadow-luxury hover:shadow-luxury-lg"
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-carbon-600 border-t border-borde">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isProtected = item.href === '/editor' || item.href === '/email-signature';
              
              if (isProtected) {
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      checkAuthAndRedirect(item.href) && (window.location.href = item.href);
                    }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all w-full text-left ${
                      isActive(item.href)
                        ? 'bg-fucsia-500/20 text-fucsia-300 shadow-glow-fucsia'
                        : 'text-texto hover:text-fucsia-300 hover:bg-carbon-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </button>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-fucsia-500/20 text-fucsia-300 shadow-glow-fucsia'
                      : 'text-texto hover:text-fucsia-300 hover:bg-carbon-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="bg-gradient-to-r from-carbon-600 to-carbon-700 hover:from-carbon-700 hover:to-carbon-800 text-texto px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all w-full shadow-luxury"
              >
                <LogOut size={20} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
