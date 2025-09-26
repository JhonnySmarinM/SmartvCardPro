import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
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
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
