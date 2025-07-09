import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useCardStore = create(
  persist(
    (set, get) => ({
      // Estado de las tarjetas
      cards: [],
      currentCard: null,
      
      // Datos de contacto por defecto
      defaultContactData: {
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
      },

      // Configuración de diseño por defecto
      defaultDesign: {
        template: 'modern',
        primaryColor: '#3B82F6',
        secondaryColor: '#1F2937',
        backgroundColor: '#FFFFFF',
        textColor: '#1F2937',
        fontFamily: 'Inter',
        borderRadius: '12px',
        shadow: 'medium',
        layout: 'vertical',
      },

      // Acciones
      createCard: (cardData = {}) => {
        const newCard = {
          id: uuidv4(),
          contactData: { ...get().defaultContactData, ...cardData.contactData },
          design: { ...get().defaultDesign, ...cardData.design },
          qrCode: null,
          emailSignature: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...cardData,
        };
        
        set((state) => ({
          cards: [...state.cards, newCard],
          currentCard: newCard,
        }));
        
        return newCard;
      },

      updateCard: (cardId, updates) => {
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === cardId
              ? {
                  ...card,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : card
          ),
          currentCard: state.currentCard?.id === cardId
            ? { ...state.currentCard, ...updates, updatedAt: new Date().toISOString() }
            : state.currentCard,
        }));
      },

      deleteCard: (cardId) => {
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== cardId),
          currentCard: state.currentCard?.id === cardId ? null : state.currentCard,
        }));
      },

      setCurrentCard: (cardId) => {
        const card = get().cards.find((c) => c.id === cardId);
        set({ currentCard: card || null });
      },

      updateContactData: (cardId, contactData) => {
        get().updateCard(cardId, { contactData });
      },

      updateDesign: (cardId, design) => {
        get().updateCard(cardId, { design });
      },

      updateQRCode: (cardId, qrCode) => {
        get().updateCard(cardId, { qrCode });
      },

      updateEmailSignature: (cardId, emailSignature) => {
        get().updateCard(cardId, { emailSignature });
      },

      // Plantillas predefinidas
      templates: {
        modern: {
          name: 'Moderno',
          description: 'Diseño limpio y profesional',
          design: {
            template: 'modern',
            primaryColor: '#3B82F6',
            secondaryColor: '#1F2937',
            backgroundColor: '#FFFFFF',
            textColor: '#1F2937',
            fontFamily: 'Inter',
            borderRadius: '12px',
            shadow: 'medium',
            layout: 'vertical',
          },
        },
        classic: {
          name: 'Clásico',
          description: 'Estilo tradicional y elegante',
          design: {
            template: 'classic',
            primaryColor: '#1F2937',
            secondaryColor: '#6B7280',
            backgroundColor: '#F9FAFB',
            textColor: '#1F2937',
            fontFamily: 'Georgia',
            borderRadius: '4px',
            shadow: 'light',
            layout: 'horizontal',
          },
        },
        creative: {
          name: 'Creativo',
          description: 'Diseño moderno y llamativo',
          design: {
            template: 'creative',
            primaryColor: '#8B5CF6',
            secondaryColor: '#EC4899',
            backgroundColor: '#FFFFFF',
            textColor: '#1F2937',
            fontFamily: 'Poppins',
            borderRadius: '20px',
            shadow: 'heavy',
            layout: 'vertical',
          },
        },
        minimal: {
          name: 'Minimalista',
          description: 'Diseño simple y elegante',
          design: {
            template: 'minimal',
            primaryColor: '#000000',
            secondaryColor: '#6B7280',
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            fontFamily: 'Helvetica',
            borderRadius: '0px',
            shadow: 'none',
            layout: 'vertical',
          },
        },
      },

      // Configuración global
      settings: {
        autoSave: true,
        defaultTemplate: 'modern',
        qrCodeStyle: 'default',
        emailSignatureTemplate: 'standard',
      },

      updateSettings: (settings) => {
        set((state) => ({
          settings: { ...state.settings, ...settings },
        }));
      },
    }),
    {
      name: 'digital-cards-storage',
      partialize: (state) => ({
        cards: state.cards,
        settings: state.settings,
      }),
    }
  )
);

export default useCardStore; 