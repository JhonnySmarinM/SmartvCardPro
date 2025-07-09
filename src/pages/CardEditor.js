import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, 
  Eye, 
  Palette, 
  User, 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  MessageCircle,
  Upload,
  X,
  ChevronLeft
} from 'lucide-react';
import useCardStore from '../store/cardStore';
import toast from 'react-hot-toast';

const CardEditor = () => {
  const navigate = useNavigate();
  const { cardId } = useParams();
  const { 
    cards, 
    currentCard, 
    createCard, 
    updateCard, 
    setCurrentCard,
    templates 
  } = useCardStore();

  const [activeTab, setActiveTab] = useState('contact');
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    bio: '',
    photo: null,
    logo: null,
  });

  const [design, setDesign] = useState({
    template: 'modern',
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    fontFamily: 'Inter',
    borderRadius: '12px',
    shadow: 'medium',
    layout: 'vertical',
  });

  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (cardId) {
      const card = cards.find(c => c.id === cardId);
      if (card) {
        setCurrentCard(cardId);
        setContactData(card.contactData);
        setDesign(card.design);
      }
    } else if (currentCard) {
      setContactData(currentCard.contactData);
      setDesign(currentCard.design);
    }
  }, [cardId, currentCard, cards, setCurrentCard]);

  const handleSave = () => {
    if (!contactData.firstName || !contactData.lastName) {
      toast.error('Por favor completa al menos el nombre y apellido');
      return;
    }

    const cardData = {
      contactData,
      design,
    };

    if (currentCard) {
      updateCard(currentCard.id, cardData);
      toast.success('Tarjeta actualizada correctamente');
    } else {
      const newCard = createCard(cardData);
      toast.success('Tarjeta creada correctamente');
      navigate(`/preview/${newCard.id}`);
    }
  };

  const handleTemplateChange = (templateKey) => {
    const template = templates[templateKey];
    if (template) {
      setDesign(template.design);
      toast.success(`Plantilla "${template.name}" aplicada`);
    }
  };

  const handleImageUpload = (field, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setContactData(prev => ({
        ...prev,
        [field]: e.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (field) => {
    setContactData(prev => ({
      ...prev,
      [field]: null
    }));
  };

  const tabs = [
    { id: 'contact', name: 'Contacto', icon: User },
    { id: 'design', name: 'Diseño', icon: Palette },
    { id: 'preview', name: 'Vista Previa', icon: Eye },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {currentCard ? 'Editar Tarjeta' : 'Nueva Tarjeta'}
            </h1>
            <p className="text-gray-600">
              {currentCard ? 'Modifica los datos de tu tarjeta' : 'Crea tu tarjeta de visita digital'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Vista previa"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Save size={18} />
            <span>Guardar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Panel */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-6">
              {/* Contact Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          value={contactData.firstName}
                          onChange={(e) => setContactData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          value={contactData.lastName}
                          onChange={(e) => setContactData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tu apellido"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información de la Empresa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          value={contactData.company}
                          onChange={(e) => setContactData(prev => ({ ...prev, company: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nombre de la empresa"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cargo
                        </label>
                        <input
                          type="text"
                          value={contactData.jobTitle}
                          onChange={(e) => setContactData(prev => ({ ...prev, jobTitle: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tu cargo o título"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información de Contacto</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={contactData.email}
                          onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          value={contactData.phone}
                          onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sitio Web
                        </label>
                        <input
                          type="url"
                          value={contactData.website}
                          onChange={(e) => setContactData(prev => ({ ...prev, website: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://tuwebsite.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dirección
                        </label>
                        <input
                          type="text"
                          value={contactData.address}
                          onChange={(e) => setContactData(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tu dirección"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Redes Sociales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={contactData.linkedin}
                          onChange={(e) => setContactData(prev => ({ ...prev, linkedin: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://linkedin.com/in/tu-perfil"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Twitter
                        </label>
                        <input
                          type="url"
                          value={contactData.twitter}
                          onChange={(e) => setContactData(prev => ({ ...prev, twitter: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://twitter.com/tu-usuario"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instagram
                        </label>
                        <input
                          type="url"
                          value={contactData.instagram}
                          onChange={(e) => setContactData(prev => ({ ...prev, instagram: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://instagram.com/tu-usuario"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={contactData.whatsapp}
                          onChange={(e) => setContactData(prev => ({ ...prev, whatsapp: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biografía
                    </label>
                    <textarea
                      value={contactData.bio}
                      onChange={(e) => setContactData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Cuéntanos sobre ti..."
                    />
                  </div>

                  {/* Images */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Imágenes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Foto de Perfil
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          {contactData.photo ? (
                            <div className="relative">
                              <img
                                src={contactData.photo}
                                alt="Profile"
                                className="w-24 h-24 mx-auto rounded-full object-cover"
                              />
                              <button
                                onClick={() => removeImage('photo')}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div>
                              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files[0] && handleImageUpload('photo', e.target.files[0])}
                                className="hidden"
                                id="photo-upload"
                              />
                              <label
                                htmlFor="photo-upload"
                                className="text-blue-600 hover:text-blue-700 cursor-pointer"
                              >
                                Subir foto
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logo de Empresa
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          {contactData.logo ? (
                            <div className="relative">
                              <img
                                src={contactData.logo}
                                alt="Logo"
                                className="w-24 h-24 mx-auto object-contain"
                              />
                              <button
                                onClick={() => removeImage('logo')}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <div>
                              <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => e.target.files[0] && handleImageUpload('logo', e.target.files[0])}
                                className="hidden"
                                id="logo-upload"
                              />
                              <label
                                htmlFor="logo-upload"
                                className="text-blue-600 hover:text-blue-700 cursor-pointer"
                              >
                                Subir logo
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Design Tab */}
              {activeTab === 'design' && (
                <div className="space-y-6">
                  {/* Templates */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Plantillas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(templates).map(([key, template]) => (
                        <button
                          key={key}
                          onClick={() => handleTemplateChange(key)}
                          className={`p-4 border-2 rounded-lg transition-colors ${
                            design.template === key
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="w-12 h-8 mx-auto mb-2 rounded bg-gradient-to-r from-blue-500 to-purple-600"></div>
                            <p className="text-sm font-medium text-gray-900">{template.name}</p>
                            <p className="text-xs text-gray-600">{template.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Colores</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color Principal
                        </label>
                        <input
                          type="color"
                          value={design.primaryColor}
                          onChange={(e) => setDesign(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color Secundario
                        </label>
                        <input
                          type="color"
                          value={design.secondaryColor}
                          onChange={(e) => setDesign(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color de Fondo
                        </label>
                        <input
                          type="color"
                          value={design.backgroundColor}
                          onChange={(e) => setDesign(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Color de Texto
                        </label>
                        <input
                          type="color"
                          value={design.textColor}
                          onChange={(e) => setDesign(prev => ({ ...prev, textColor: e.target.value }))}
                          className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Typography */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tipografía</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuente
                      </label>
                      <select
                        value={design.fontFamily}
                        onChange={(e) => setDesign(prev => ({ ...prev, fontFamily: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Helvetica">Helvetica</option>
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Poppins">Poppins</option>
                        <option value="Roboto">Roboto</option>
                      </select>
                    </div>
                  </div>

                  {/* Layout */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Diseño</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bordes Redondeados
                        </label>
                        <select
                          value={design.borderRadius}
                          onChange={(e) => setDesign(prev => ({ ...prev, borderRadius: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="0px">Sin bordes</option>
                          <option value="4px">Pequeños</option>
                          <option value="8px">Medianos</option>
                          <option value="12px">Grandes</option>
                          <option value="20px">Muy grandes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sombra
                        </label>
                        <select
                          value={design.shadow}
                          onChange={(e) => setDesign(prev => ({ ...prev, shadow: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="none">Sin sombra</option>
                          <option value="light">Ligera</option>
                          <option value="medium">Media</option>
                          <option value="heavy">Fuerte</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Tab */}
              {activeTab === 'preview' && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Vista previa de tu tarjeta digital
                  </p>
                  <button
                    onClick={() => setPreviewMode(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Ver Vista Previa Completa
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Vista Previa</h3>
            <div 
              className="w-full max-w-sm mx-auto border rounded-lg p-6"
              style={{
                backgroundColor: design.backgroundColor,
                color: design.textColor,
                borderRadius: design.borderRadius,
                fontFamily: design.fontFamily,
                boxShadow: design.shadow === 'none' ? 'none' : 
                           design.shadow === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' :
                           design.shadow === 'medium' ? '0 4px 6px rgba(0,0,0,0.1)' :
                           '0 10px 25px rgba(0,0,0,0.15)',
              }}
            >
              {/* Header */}
              <div className="text-center mb-6">
                {contactData.photo && (
                  <img
                    src={contactData.photo}
                    alt="Profile"
                    className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
                  />
                )}
                <h2 className="text-xl font-bold" style={{ color: design.primaryColor }}>
                  {contactData.firstName} {contactData.lastName}
                </h2>
                {contactData.jobTitle && (
                  <p className="text-sm opacity-80">{contactData.jobTitle}</p>
                )}
                {contactData.company && (
                  <p className="text-sm opacity-80">{contactData.company}</p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {contactData.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail size={16} />
                    <span>{contactData.email}</span>
                  </div>
                )}
                {contactData.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone size={16} />
                    <span>{contactData.phone}</span>
                  </div>
                )}
                {contactData.website && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe size={16} />
                    <span>{contactData.website}</span>
                  </div>
                )}
                {contactData.address && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin size={16} />
                    <span>{contactData.address}</span>
                  </div>
                )}
              </div>

              {/* Social Media */}
              {(contactData.linkedin || contactData.twitter || contactData.instagram || contactData.facebook) && (
                <div className="flex justify-center space-x-4 mb-4">
                  {contactData.linkedin && <Linkedin size={20} />}
                  {contactData.twitter && <Twitter size={20} />}
                  {contactData.instagram && <Instagram size={20} />}
                  {contactData.facebook && <Facebook size={20} />}
                </div>
              )}

              {/* Bio */}
              {contactData.bio && (
                <div className="text-sm opacity-80 text-center border-t pt-4">
                  {contactData.bio}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEditor; 