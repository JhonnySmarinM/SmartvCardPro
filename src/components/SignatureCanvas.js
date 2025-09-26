import React, { useRef, useEffect, useState } from 'react';
import { X, RotateCcw, Download, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const SignatureCanvas = ({ isOpen, onClose, onSave }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Configurar canvas
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#000000';
      
      setContext(ctx);
      
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    }
  }, [isOpen]);

  const getEventPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    if (e.touches && e.touches.length > 0) {
      // Touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    
    if (context) {
      const pos = getEventPos(e);
      context.beginPath();
      context.moveTo(pos.x, pos.y);
    }
  };

  const draw = (e) => {
    e.preventDefault();
    
    if (!isDrawing || !context) return;
    
    const pos = getEventPos(e);
    context.lineTo(pos.x, pos.y);
    context.stroke();
    setHasSignature(true);
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setHasSignature(false);
    }
  };

  const saveSignature = () => {
    if (!hasSignature) {
      toast.error('Por favor, dibuja tu firma primero');
      return;
    }

    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    
    // Crear imagen para descargar
    const link = document.createElement('a');
    link.download = 'mi-firma.png';
    link.href = dataURL;
    link.click();
    
    // Llamar callback si existe
    if (onSave) {
      onSave(dataURL);
    }
    
    toast.success('Firma guardada correctamente');
    onClose();
  };

  const downloadSignature = () => {
    if (!hasSignature) {
      toast.error('No hay firma para descargar');
      return;
    }

    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = 'mi-firma.png';
    link.href = dataURL;
    link.click();
    
    toast.success('Firma descargada');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Crear Firma Digital</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-50 border-b">
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-2">Instrucciones:</p>
            <ul className="space-y-1">
              <li>• Dibuja tu firma en el área de abajo</li>
              <li>• Usa el dedo en dispositivos móviles o el mouse en computadora</li>
              <li>• Puedes limpiar y volver a dibujar si es necesario</li>
              <li>• Guarda cuando estés satisfecho con el resultado</li>
            </ul>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="p-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <canvas
              ref={canvasRef}
              className="w-full h-64 bg-white rounded border cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{ touchAction: 'none' }}
            />
          </div>
          
          {/* Canvas Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={clearCanvas}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RotateCcw size={16} />
                <span>Limpiar</span>
              </button>
              
              <button
                onClick={downloadSignature}
                disabled={!hasSignature}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={16} />
                <span>Descargar</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveSignature}
                disabled={!hasSignature}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={16} />
                <span>Guardar Firma</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-2">Consejos para una mejor firma:</p>
            <ul className="space-y-1">
              <li>• Dibuja con trazos firmes y continuos</li>
              <li>• Mantén un tamaño adecuado para emails</li>
              <li>• Usa un color oscuro para mejor visibilidad</li>
              <li>• Prueba en diferentes dispositivos si es posible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureCanvas;
