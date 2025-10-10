import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Settings as SettingsIcon,
  Save,
  Trash2,
  Download,
  Upload,
  Palette,
  Bell,
  Shield,
  Database
} from 'lucide-react';
import useCardStore from '../store/cardStore';
import toast from 'react-hot-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, cards, deleteCard } = useCardStore();
  
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState('general');

  const handleSaveSettings = () => {
    updateSettings(localSettings);
    toast.success('Configuración guardada correctamente');
  };

  const handleExportData = () => {
    const data = {
      cards,
      settings: localSettings,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `digital-cards-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Datos exportados correctamente');
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        // Aquí implementarías la lógica para importar los datos
        toast.success('Datos importados correctamente');
      } catch (error) {
        toast.error('Error al importar los datos');
      }
    };
    reader.readAsText(file);
  };

  const handleClearAllData = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.')) {
      cards.forEach(card => deleteCard(card.id));
      toast.success('Todos los datos han sido eliminados');
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: SettingsIcon },
    { id: 'appearance', name: 'Apariencia', icon: Palette },
    { id: 'notifications', name: 'Notificaciones', icon: Bell },
    { id: 'data', name: 'Datos', icon: Database },
    { id: 'privacy', name: 'Privacidad', icon: Shield },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-chocolate-200 hover:text-texto hover:bg-carbon-600 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-texto">Configuración</h1>
            <p className="text-chocolate-200">
              Personaliza la aplicación según tus preferencias
            </p>
          </div>
        </div>
        
        <button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-fucsia-500 to-fucsia-600 hover:from-fucsia-600 hover:to-fucsia-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Save size={18} />
          <span>Guardar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="luxury-card rounded-lg shadow-sm border border-borde">
            <div className="p-4">
              <h2 className="text-lg font-medium text-texto mb-4">Categorías</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-chocolate-200 hover:text-texto hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="luxury-card rounded-lg shadow-sm border border-borde">
            <div className="p-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-texto">Configuración General</h2>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localSettings.autoSave}
                        onChange={(e) => setLocalSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                        className="rounded border-borde text-fucsia-500 focus:ring-fucsia-500"
                      />
                      <span className="ml-2 text-sm text-chocolate-200">Guardado automático</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Guarda automáticamente los cambios en tus tarjetas
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-chocolate-200 mb-2">
                      Plantilla por defecto
                    </label>
                    <select
                      value={localSettings.defaultTemplate}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, defaultTemplate: e.target.value }))}
                      className="w-full px-3 py-2 border border-borde rounded-lg focus:ring-2 focus:ring-fucsia-500 focus:border-transparent text-black"
                    >
                      <option value="modern">Moderno</option>
                      <option value="classic">Clásico</option>
                      <option value="creative">Creativo</option>
                      <option value="minimal">Minimalista</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-texto">Apariencia</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-chocolate-200 mb-2">
                      Estilo del código QR
                    </label>
                    <select
                      value={localSettings.qrCodeStyle}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, qrCodeStyle: e.target.value }))}
                      className="w-full px-3 py-2 border border-borde rounded-lg focus:ring-2 focus:ring-fucsia-500 focus:border-transparent text-black"
                    >
                      <option value="default">Por defecto</option>
                      <option value="rounded">Redondeado</option>
                      <option value="dots">Puntos</option>
                      <option value="squares">Cuadrados</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-chocolate-200 mb-2">
                      Plantilla de firma de email
                    </label>
                    <select
                      value={localSettings.emailSignatureTemplate}
                      onChange={(e) => setLocalSettings(prev => ({ ...prev, emailSignatureTemplate: e.target.value }))}
                      className="w-full px-3 py-2 border border-borde rounded-lg focus:ring-2 focus:ring-fucsia-500 focus:border-transparent text-black"
                    >
                      <option value="standard">Estándar</option>
                      <option value="minimal">Minimalista</option>
                      <option value="corporate">Corporativo</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-texto">Notificaciones</h2>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localSettings.notifications?.enabled ?? true}
                        onChange={(e) => setLocalSettings(prev => ({ 
                          ...prev, 
                          notifications: { 
                            ...prev.notifications, 
                            enabled: e.target.checked 
                          } 
                        }))}
                        className="rounded border-borde text-fucsia-500 focus:ring-fucsia-500"
                      />
                      <span className="ml-2 text-sm text-chocolate-200">Habilitar notificaciones</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localSettings.notifications?.saveReminder ?? true}
                        onChange={(e) => setLocalSettings(prev => ({ 
                          ...prev, 
                          notifications: { 
                            ...prev.notifications, 
                            saveReminder: e.target.checked 
                          } 
                        }))}
                        className="rounded border-borde text-fucsia-500 focus:ring-fucsia-500"
                      />
                      <span className="ml-2 text-sm text-chocolate-200">Recordatorio de guardado</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Data Settings */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-texto">Gestión de Datos</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border border-borde rounded-lg">
                      <h3 className="font-medium text-texto mb-2">Exportar Datos</h3>
                      <p className="text-sm text-chocolate-200 mb-3">
                        Descarga una copia de seguridad de todas tus tarjetas y configuraciones
                      </p>
                      <button
                        onClick={handleExportData}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                      >
                        <Download size={16} />
                        <span>Exportar</span>
                      </button>
                    </div>

                    <div className="p-4 border border-borde rounded-lg">
                      <h3 className="font-medium text-texto mb-2">Importar Datos</h3>
                      <p className="text-sm text-chocolate-200 mb-3">
                        Restaura tus datos desde un archivo de respaldo
                      </p>
                      <label className="bg-gradient-to-r from-fucsia-500 to-fucsia-600 hover:from-fucsia-600 hover:to-fucsia-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors cursor-pointer">
                        <Upload size={16} />
                        <span>Importar</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportData}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h3 className="font-medium text-red-900 mb-2">Zona de Peligro</h3>
                    <p className="text-sm text-red-700 mb-3">
                      Esta acción eliminará permanentemente todos tus datos
                    </p>
                    <button
                      onClick={handleClearAllData}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span>Eliminar Todos los Datos</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-texto">Privacidad</h2>
                  
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localSettings.privacy?.analytics ?? false}
                        onChange={(e) => setLocalSettings(prev => ({ 
                          ...prev, 
                          privacy: { 
                            ...prev.privacy, 
                            analytics: e.target.checked 
                          } 
                        }))}
                        className="rounded border-borde text-fucsia-500 focus:ring-fucsia-500"
                      />
                      <span className="ml-2 text-sm text-chocolate-200">Permitir análisis de uso</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Nos ayuda a mejorar la aplicación (datos anónimos)
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={localSettings.privacy?.shareUsage ?? false}
                        onChange={(e) => setLocalSettings(prev => ({ 
                          ...prev, 
                          privacy: { 
                            ...prev.privacy, 
                            shareUsage: e.target.checked 
                          } 
                        }))}
                        className="rounded border-borde text-fucsia-500 focus:ring-fucsia-500"
                      />
                      <span className="ml-2 text-sm text-chocolate-200">Compartir datos de uso</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Comparte estadísticas anónimas para mejorar el servicio
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Tu Privacidad es Importante</h3>
                    <p className="text-sm text-blue-800">
                      Todos los datos se almacenan localmente en tu dispositivo. 
                      Nunca compartimos información personal sin tu consentimiento explícito.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 