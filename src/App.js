import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AuthGuard from './components/AuthGuard';
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
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
