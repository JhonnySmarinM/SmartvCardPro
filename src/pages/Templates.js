import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Eye, 
  Check, 
  Palette,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';
import useCardStore from '../store/cardStore';
import toast from 'react-hot-toast';

const Templates = () => {
  const navigate = useNavigate();
  const { templates, createCard } = useCardStore();
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleTemplateSelect = (templateKey) => {
    setSelectedTemplate(templateKey);
  };

  const handleUseTemplate = (templateKey) => {
    const template = templates[templateKey];
    if (template) {
      const newCard = createCard({
        design: template.design,
        contactData: {
          firstName: 'Tu',
          lastName: 'Nombre',
          company: 'Tu Empresa',
          jobTitle: 'Tu Cargo',
          email: 'tu@email.com',
          phone: '+1 234 567 890',
        }
      });
      toast.success(`Plantilla "${template.name}" aplicada`);
      navigate('/editor');
    }
  };

  const templateCategories = [
    {
      name: 'Profesionales',
      icon: Star,
      templates: ['modern', 'classic', 'corporate', 'elegant']
    },
    {
      name: 'Creativos',
      icon: Sparkles,
      templates: ['creative', 'minimal', 'vibrant', 'pastel']
    },
    {
      name: 'Temas Especiales',
      icon: Zap,
      templates: ['dark', 'tech', 'neon', 'monochrome']
    },
    {
      name: 'Estilos Únicos',
      icon: Palette,
      templates: ['gradient', 'nature', 'luxury', 'ocean']
    }
  ];

  const getTemplatePreview = (templateKey) => {
    const template = templates[templateKey];
    if (!template) return null;

    const { design } = template;
    
    // Manejar gradientes y fondos especiales
    const backgroundStyle = design.backgroundColor.includes('gradient') 
      ? { background: design.backgroundColor }
      : { backgroundColor: design.backgroundColor };
    
    return (
      <div 
        className="w-full h-48 rounded-lg p-4 flex flex-col justify-center items-center relative overflow-hidden"
        style={{
          ...backgroundStyle,
          color: design.textColor,
          borderRadius: design.borderRadius,
          fontFamily: design.fontFamily,
          boxShadow: design.shadow === 'none' ? 'none' : 
                     design.shadow === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' :
                     design.shadow === 'medium' ? '0 4px 6px rgba(0,0,0,0.1)' :
                     '0 10px 25px rgba(0,0,0,0.15)',
        }}
      >
        {/* Efectos especiales para templates únicos */}
        {templateKey === 'neon' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse"></div>
        )}
        {templateKey === 'tech' && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
        )}
        {templateKey === 'luxury' && (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-amber-500/20"></div>
        )}
        
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mb-3 relative z-10"
          style={{
            background: templateKey === 'gradient' 
              ? 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)'
              : templateKey === 'neon'
              ? 'linear-gradient(135deg, #00FF88 0%, #FF0080 100%)'
              : `linear-gradient(135deg, ${design.primaryColor} 0%, ${design.secondaryColor} 100%)`
          }}
        >
          <span className="text-white font-bold text-lg">DC</span>
        </div>
        <h3 
          className="text-lg font-bold mb-1 relative z-10"
          style={{ 
            color: templateKey === 'neon' ? '#00FF88' : design.primaryColor,
            textShadow: templateKey === 'neon' ? '0 0 10px #00FF88' : 'none'
          }}
        >
          Tu Nombre
        </h3>
        <p className="text-sm opacity-80 relative z-10">Tu Cargo</p>
        <p className="text-sm opacity-80 relative z-10">Tu Empresa</p>
      </div>
    );
  };

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
            <h1 className="text-3xl font-bold text-gray-900">Plantillas</h1>
            <p className="text-gray-600">
              Explora y personaliza las plantillas disponibles
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Vista previa"
        >
          <Eye size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Templates List */}
        <div className="lg:col-span-2">
          {templateCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.name} className="mb-8">
                <div className="flex items-center space-x-2 mb-6">
                  <Icon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.templates.map((templateKey) => {
                    const template = templates[templateKey];
                    if (!template) return null;

                    return (
                      <div
                        key={templateKey}
                        className={`bg-white rounded-lg shadow-sm border-2 transition-all cursor-pointer ${
                          selectedTemplate === templateKey
                            ? 'border-blue-500 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleTemplateSelect(templateKey)}
                      >
                        {/* Template Preview */}
                        <div className="p-4">
                          {getTemplatePreview(templateKey)}
                        </div>
                        
                        {/* Template Info */}
                        <div className="p-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {template.name}
                            </h3>
                            {selectedTemplate === templateKey && (
                              <Check className="w-5 h-5 text-blue-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            {template.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: template.design.primaryColor }}
                              ></div>
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: template.design.secondaryColor }}
                              ></div>
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: template.design.backgroundColor }}
                              ></div>
                            </div>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUseTemplate(templateKey);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                              Usar Plantilla
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-8 lg:h-fit">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Vista Previa</h2>
            
            {selectedTemplate ? (
              <div>
                <div className="mb-4">
                  {getTemplatePreview(selectedTemplate)}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      {templates[selectedTemplate]?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {templates[selectedTemplate]?.description}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Características</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Diseño {templates[selectedTemplate]?.design.layout === 'vertical' ? 'vertical' : 'horizontal'}</li>
                      <li>• Bordes {templates[selectedTemplate]?.design.borderRadius === '0px' ? 'sin redondear' : 'redondeados'}</li>
                      <li>• Sombra {templates[selectedTemplate]?.design.shadow === 'none' ? 'sin sombra' : templates[selectedTemplate]?.design.shadow}</li>
                      <li>• Fuente {templates[selectedTemplate]?.design.fontFamily}</li>
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => handleUseTemplate(selectedTemplate)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Zap size={18} />
                    <span>Usar Esta Plantilla</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Palette className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  Selecciona una plantilla para ver la vista previa
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates; 