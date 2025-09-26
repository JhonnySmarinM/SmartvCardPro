import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Debes iniciar sesión para acceder a esta función');
        navigate('/auth');
        return;
      }

      try {
        // Verificar si el token es válido (no expirado)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        // Extender el tiempo de sesión: si el token expira en menos de 24 horas, considerarlo válido
        const timeUntilExpiry = payload.exp - currentTime;
        const twentyFourHours = 24 * 60 * 60; // 24 horas en segundos
        
        if (payload.exp && timeUntilExpiry < -twentyFourHours) {
          // Token expirado hace más de 24 horas
          localStorage.removeItem('token');
          toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente');
          navigate('/auth');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        // Token inválido
        localStorage.removeItem('token');
        toast.error('Token inválido. Por favor, inicia sesión nuevamente');
        navigate('/auth');
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // El useEffect ya redirigirá
  }

  return children;
};

export default AuthGuard;
