import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AuthGuard from './components/AuthGuard';
import IntroAnimation from './components/IntroAnimation';
import Dashboard from './pages/Dashboard';
import CardEditor from './pages/CardEditor';
import QRGenerator from './pages/QRGenerator';
import EmailSignature from './pages/EmailSignature';
import CardPreview from './pages/CardPreview';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import Admin from './pages/Admin';
import Auth from './pages/Auth';
import './index.css';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/admin' || location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-gradient-luxury">
      {!hideNavbar && <Navbar />}
      <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/editor" element={
              <AuthGuard>
                <CardEditor />
              </AuthGuard>
            } />
            <Route path="/qr-generator" element={<QRGenerator />} />
            <Route path="/email-signature" element={
              <AuthGuard>
                <EmailSignature />
              </AuthGuard>
            } />
            <Route path="/preview/:cardId" element={<CardPreview />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #5C4033 0%, #36454F 100%)',
              color: '#F5F1EF',
              boxShadow: '0 10px 40px rgba(92, 64, 51, 0.3)',
              border: '1px solid rgba(233, 30, 99, 0.2)',
            },
          }}
        />
      </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Verificar si el usuario ya vio el intro
    const hasSeenIntro = localStorage.getItem('smartvcard_intro_seen');
    
    console.log('🎬 Estado del intro:', hasSeenIntro ? 'YA VISTO' : 'PRIMERA VEZ');
    
    // MODO DESARROLLO: Activado temporalmente para pruebas
    return true; // ⚠️ CAMBIAR A: return !hasSeenIntro; para producción
    
    // return !hasSeenIntro; // Mostrar intro solo si NO lo ha visto
  });

  const handleIntroComplete = () => {
    console.log('✅ Intro completado - guardando en localStorage');
    // Marcar que el intro ya fue visto
    localStorage.setItem('smartvcard_intro_seen', 'true');
    setShowIntro(false);
  };

  console.log('🎯 Renderizando App - showIntro:', showIntro);

  // Mostrar intro primero (solo la primera vez)
  if (showIntro) {
    console.log('🎥 Mostrando IntroAnimation...');
    return <IntroAnimation onComplete={handleIntroComplete} enableSkip={true} />;
  }

  // Después del intro, mostrar la aplicación
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
