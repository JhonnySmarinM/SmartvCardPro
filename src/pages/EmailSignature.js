import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Copy, 
  Download, 
  Mail, 
  ChevronLeft,
  Smartphone,
  PenTool,
  Image,
  Eye,
  Settings
} from 'lucide-react';
import useCardStore from '../store/cardStore';
import toast from 'react-hot-toast';
import SignatureCanvas from '../components/SignatureCanvas';

const EmailSignature = () => {
  const navigate = useNavigate();
  const { cards, currentCard, setCurrentCard } = useCardStore();
  
  const [selectedCard, setSelectedCard] = useState(null);
  const [signatureConfig, setSignatureConfig] = useState({
    template: 'standard',
    includePhoto: true,
    includeQR: true,
    includeSocial: true,
    includeSignature: false,
    fontSize: '14px',
    fontFamily: 'Arial',
    textColor: '#333333',
    accentColor: '#E91E63',
  });
  
  const [showSignatureCanvas, setShowSignatureCanvas] = useState(false);
  const [digitalSignature, setDigitalSignature] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (currentCard) {
      setSelectedCard(currentCard);
    }
  }, [currentCard]);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setCurrentCard(card.id);
  };

  const handleSignatureSave = (signatureData) => {
    setDigitalSignature(signatureData);
    setSignatureConfig(prev => ({ ...prev, includeSignature: true }));
    toast.success('Firma digital guardada');
  };

  const generateSignature = () => {
    if (!selectedCard) return '';

    const { contactData } = selectedCard;
    const { template, includePhoto, includeQR, includeSocial, includeSignature, fontSize, fontFamily, textColor, accentColor } = signatureConfig;

    let signature = '';

    switch (template) {
      case 'standard':
        signature = `
          <div style="font-family: ${fontFamily}; font-size: ${fontSize}; color: ${textColor}; line-height: 1.4;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
              ${includePhoto && contactData.photo ? `
                <img src="${contactData.photo}" alt="${contactData.firstName} ${contactData.lastName}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
              ` : ''}
              <div>
                <div style="font-weight: bold; font-size: 16px; color: ${accentColor};">
                  ${contactData.firstName} ${contactData.lastName}
                </div>
                ${contactData.jobTitle ? `<div style="font-style: italic;">${contactData.jobTitle}</div>` : ''}
                ${contactData.company ? `<div style="font-weight: bold;">${contactData.company}</div>` : ''}
              </div>
            </div>
            
            <div style="margin-bottom: 10px;">
              ${contactData.email ? `<div>📧 <a href="mailto:${contactData.email}" style="color: ${accentColor}; text-decoration: none;">${contactData.email}</a></div>` : ''}
              ${contactData.phone ? `<div>📞 <a href="tel:${contactData.phone}" style="color: ${accentColor}; text-decoration: none;">${contactData.phone}</a></div>` : ''}
              ${contactData.website ? `<div>🌐 <a href="${contactData.website}" style="color: ${accentColor}; text-decoration: none;">${contactData.website}</a></div>` : ''}
              ${contactData.address ? `<div>📍 ${contactData.address}</div>` : ''}
            </div>
            
            ${includeSocial && (contactData.linkedin || contactData.twitter || contactData.instagram) ? `
              <div style="margin-bottom: 10px;">
                ${contactData.linkedin ? `<a href="${contactData.linkedin}" style="color: ${accentColor}; text-decoration: none; margin-right: 10px;">LinkedIn</a>` : ''}
                ${contactData.twitter ? `<a href="${contactData.twitter}" style="color: ${accentColor}; text-decoration: none; margin-right: 10px;">Twitter</a>` : ''}
                ${contactData.instagram ? `<a href="${contactData.instagram}" style="color: ${accentColor}; text-decoration: none;">Instagram</a>` : ''}
              </div>
            ` : ''}
            
            ${includeQR ? `
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e5e5;">
                <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Mi tarjeta digital:</div>
                <a href="${window.location.origin}/preview/${selectedCard.id}" style="color: ${accentColor}; text-decoration: none;">
                  ${window.location.origin}/preview/${selectedCard.id}
                </a>
              </div>
            ` : ''}
            
            ${includeSignature && digitalSignature ? `
              <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e5e5;">
                <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Firma:</div>
                <img src="${digitalSignature}" alt="Firma digital" style="max-width: 200px; height: auto; border: 1px solid #e5e5e5; background: white; padding: 5px;">
              </div>
            ` : ''}
          </div>
        `;
        break;

      case 'minimal':
        signature = `
          <div style="font-family: ${fontFamily}; font-size: ${fontSize}; color: ${textColor}; line-height: 1.4;">
            <div style="margin-bottom: 8px;">
              <span style="font-weight: bold; color: ${accentColor};">
                ${contactData.firstName} ${contactData.lastName}
              </span>
              ${contactData.jobTitle ? ` | ${contactData.jobTitle}` : ''}
              ${contactData.company ? ` | ${contactData.company}` : ''}
            </div>
            
            <div style="margin-bottom: 8px;">
              ${contactData.email ? `<a href="mailto:${contactData.email}" style="color: ${accentColor}; text-decoration: none;">${contactData.email}</a>` : ''}
              ${contactData.phone ? ` | <a href="tel:${contactData.phone}" style="color: ${accentColor}; text-decoration: none;">${contactData.phone}</a>` : ''}
            </div>
            
            ${includeQR ? `
              <div style="font-size: 12px; color: #666;">
                📱 <a href="${window.location.origin}/preview/${selectedCard.id}" style="color: ${accentColor}; text-decoration: none;">Ver tarjeta digital</a>
              </div>
            ` : ''}
            
            ${includeSignature && digitalSignature ? `
              <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e5e5;">
                <img src="${digitalSignature}" alt="Firma digital" style="max-width: 150px; height: auto; border: 1px solid #e5e5e5; background: white; padding: 3px;">
              </div>
            ` : ''}
          </div>
        `;
        break;

      case 'corporate':
        signature = `
          <div style="font-family: ${fontFamily}; font-size: ${fontSize}; color: ${textColor}; line-height: 1.4; border-left: 3px solid ${accentColor}; padding-left: 15px;">
            <div style="margin-bottom: 10px;">
              <div style="font-weight: bold; font-size: 16px; color: ${accentColor};">
                ${contactData.firstName} ${contactData.lastName}
              </div>
              ${contactData.jobTitle ? `<div style="font-weight: bold;">${contactData.jobTitle}</div>` : ''}
              ${contactData.company ? `<div style="color: #666;">${contactData.company}</div>` : ''}
            </div>
            
            <div style="margin-bottom: 10px;">
              ${contactData.email ? `<div>📧 <a href="mailto:${contactData.email}" style="color: ${accentColor}; text-decoration: none;">${contactData.email}</a></div>` : ''}
              ${contactData.phone ? `<div>📞 <a href="tel:${contactData.phone}" style="color: ${accentColor}; text-decoration: none;">${contactData.phone}</a></div>` : ''}
              ${contactData.website ? `<div>🌐 <a href="${contactData.website}" style="color: ${accentColor}; text-decoration: none;">${contactData.website}</a></div>` : ''}
            </div>
            
            ${includeQR ? `
              <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #e5e5e5;">
                <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Tarjeta de visita digital:</div>
                <a href="${window.location.origin}/preview/${selectedCard.id}" style="color: ${accentColor}; text-decoration: none; font-weight: bold;">
                  ${window.location.origin}/preview/${selectedCard.id}
                </a>
              </div>
            ` : ''}
            
            ${includeSignature && digitalSignature ? `
              <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #e5e5e5;">
                <div style="font-size: 12px; color: #666; margin-bottom: 5px;">Firma:</div>
                <img src="${digitalSignature}" alt="Firma digital" style="max-width: 180px; height: auto; border: 1px solid #e5e5e5; background: white; padding: 5px;">
              </div>
            ` : ''}
          </div>
        `;
        break;

      default:
        signature = '';
    }

    return signature.trim();
  };

  const handleCopySignature = () => {
    const signature = generateSignature();
    navigator.clipboard.writeText(signature);
    toast.success('Firma copiada al portapapeles');
  };

  const handleDownloadSignature = () => {
    const signature = generateSignature();
    const blob = new Blob([signature], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `firma-${selectedCard?.contactData?.firstName || 'email'}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const templates = [
    { id: 'standard', name: 'Estándar', description: 'Diseño clásico con foto y enlaces' },
    { id: 'minimal', name: 'Minimalista', description: 'Diseño simple y elegante' },
    { id: 'corporate', name: 'Corporativo', description: 'Estilo profesional con borde' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-chocolate-200 hover:text-texto hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-texto">Firma de Email</h1>
            <p className="text-chocolate-200">
              Crea firmas profesionales para tus emails
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          {/* Card Selection */}
          <div className="luxury-card rounded-lg shadow-sm border border-borde p-6">
            <h2 className="text-lg font-medium text-texto mb-4">Seleccionar Tarjeta</h2>
            {cards.length === 0 ? (
              <div className="text-center py-8">
                <Smartphone className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-chocolate-200 mb-4">No tienes tarjetas creadas</p>
                <button
                  onClick={() => navigate('/editor')}
                  className="bg-gradient-to-r from-fucsia-500 to-fucsia-600 hover:from-fucsia-600 hover:to-fucsia-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Crear Primera Tarjeta
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardSelect(card)}
                    className={`w-full p-4 border-2 rounded-lg transition-colors text-left ${
                      selectedCard?.id === card.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-borde hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {card.contactData.firstName?.[0] || card.contactData.lastName?.[0] || '?'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-texto">
                          {card.contactData.firstName} {card.contactData.lastName}
                        </h3>
                        <p className="text-sm text-chocolate-200">
                          {card.contactData.jobTitle} {card.contactData.company && `en ${card.contactData.company}`}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Signature Configuration */}
          {selectedCard && (
            <div className="luxury-card rounded-lg shadow-sm border border-borde p-6">
              <h2 className="text-lg font-medium text-texto mb-4">Configuración de la Firma</h2>
              
              {/* Template Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Plantilla
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSignatureConfig(prev => ({ ...prev, template: template.id }))}
                      className={`p-4 border-2 rounded-lg transition-colors text-left ${
                        signatureConfig.template === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-borde hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-texto">{template.name}</div>
                      <div className="text-sm text-chocolate-200">{template.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-6">
                <h3 className="text-md font-medium text-texto">Opciones</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={signatureConfig.includePhoto}
                      onChange={(e) => setSignatureConfig(prev => ({ ...prev, includePhoto: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Incluir foto de perfil</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={signatureConfig.includeQR}
                      onChange={(e) => setSignatureConfig(prev => ({ ...prev, includeQR: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Incluir enlace a tarjeta digital</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={signatureConfig.includeSocial}
                      onChange={(e) => setSignatureConfig(prev => ({ ...prev, includeSocial: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Incluir redes sociales</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={signatureConfig.includeSignature}
                      onChange={(e) => setSignatureConfig(prev => ({ ...prev, includeSignature: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Incluir firma digital</span>
                  </label>
                </div>
              </div>

              {/* Typography */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamaño de fuente
                  </label>
                  <select
                    value={signatureConfig.fontSize}
                    onChange={(e) => setSignatureConfig(prev => ({ ...prev, fontSize: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="12px">Pequeño (12px)</option>
                    <option value="14px">Mediano (14px)</option>
                    <option value="16px">Grande (16px)</option>
                    <option value="18px">Muy grande (18px)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuente
                  </label>
                  <select
                    value={signatureConfig.fontFamily}
                    onChange={(e) => setSignatureConfig(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Verdana">Verdana</option>
                  </select>
                </div>
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color de texto
                  </label>
                  <input
                    type="color"
                    value={signatureConfig.textColor}
                    onChange={(e) => setSignatureConfig(prev => ({ ...prev, textColor: e.target.value }))}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color de acento
                  </label>
                  <input
                    type="color"
                    value={signatureConfig.accentColor}
                    onChange={(e) => setSignatureConfig(prev => ({ ...prev, accentColor: e.target.value }))}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Digital Signature Section */}
          {selectedCard && (
            <div className="luxury-card rounded-lg shadow-sm border border-borde p-6">
              <h2 className="text-lg font-medium text-texto mb-4">Firma Digital</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-md font-medium text-texto">Crear Firma</h3>
                    <p className="text-sm text-chocolate-200">Dibuja tu firma digital para incluirla en emails</p>
                  </div>
                  <button
                    onClick={() => setShowSignatureCanvas(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-fucsia-500 to-fucsia-600 hover:from-fucsia-600 hover:to-fucsia-700 text-white rounded-lg transition-colors"
                  >
                    <PenTool size={18} />
                    <span>Crear Firma</span>
                  </button>
                </div>
                
                {digitalSignature && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-texto">Firma Actual</h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setShowSignatureCanvas(true)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            setDigitalSignature(null);
                            setSignatureConfig(prev => ({ ...prev, includeSignature: false }));
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <img
                      src={digitalSignature}
                      alt="Firma digital"
                      className="max-w-xs h-auto border border-gray-300 luxury-card p-2 rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          {selectedCard && (
            <div className="luxury-card rounded-lg shadow-sm border border-borde p-6">
              <h2 className="text-lg font-medium text-texto mb-4">Acciones</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={handleCopySignature}
                  className="bg-gradient-to-r from-fucsia-500 to-fucsia-600 hover:from-fucsia-600 hover:to-fucsia-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Copy size={18} />
                  <span>Copiar Firma</span>
                </button>
                <button
                  onClick={handleDownloadSignature}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Download size={18} />
                  <span>Descargar HTML</span>
                </button>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Eye size={18} />
                  <span>{showPreview ? 'Ocultar' : 'Vista Previa'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <div className="luxury-card rounded-lg shadow-sm border border-borde p-6">
            <h2 className="text-lg font-medium text-texto mb-4">Vista Previa</h2>
            
            {selectedCard ? (
              <div>
                <div 
                  className="border rounded-lg p-4 bg-gray-50"
                  dangerouslySetInnerHTML={{ __html: generateSignature() }}
                />
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Instrucciones:</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Copia la firma usando el botón "Copiar Firma"</li>
                    <li>2. Ve a la configuración de tu cliente de email</li>
                    <li>3. Pega la firma en el campo correspondiente</li>
                    <li>4. Guarda los cambios</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-chocolate-200">
                  Selecciona una tarjeta para crear la firma de email
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Signature Canvas Modal */}
      <SignatureCanvas
        isOpen={showSignatureCanvas}
        onClose={() => setShowSignatureCanvas(false)}
        onSave={handleSignatureSave}
      />
    </div>
  );
};

export default EmailSignature; 