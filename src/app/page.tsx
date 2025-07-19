"use client";

import { useState } from 'react';
import { notificationService } from '../features/notifications';
import { HeroSection } from '../features/ui';
import { SAMPLE_HERO_DATA } from '../features/ui/constants/ui-constants';

export default function HomePage() {
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateNotification = () => {
    setIsSimulating(true);
    notificationService.simulateNotification();
    setTimeout(() => setIsSimulating(false), 1000);
  };

  const handleHeroAction = () => {
    console.log('Hero action clicked - Navigate to games or start exploring');
    // Aquí se agregaría la lógica para navegar a la sección de juegos
  };

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen bg-gradient-to-b from-[#0f0720] to-[#1a0933]">
      <div className="max-w-6xl mx-auto">
        <HeroSection
          image={SAMPLE_HERO_DATA.image}
          title={SAMPLE_HERO_DATA.title}
          subtitle={SAMPLE_HERO_DATA.subtitle}
          badge={SAMPLE_HERO_DATA.badge}
          badgeColor={SAMPLE_HERO_DATA.badgeColor}
          actionLabel={SAMPLE_HERO_DATA.actionLabel}
          actionIcon={SAMPLE_HERO_DATA.actionIcon}
          onAction={handleHeroAction}
        >
          <div className="mb-4">
            <span className="text-purple-300 text-sm">✨ Plataforma líder en gaming competitivo</span>
          </div>
        </HeroSection>
        
        {/* Botón de prueba para notificaciones (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 text-center">
            <button
              onClick={simulateNotification}
              disabled={isSimulating}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Simulando...
                </>
              ) : (
                <>
                  <i className="fas fa-bell mr-2"></i>
                  Simular Notificación
                </>
              )}
            </button>
            <p className="text-sm text-gray-400 mt-2">
              Prueba el sistema de notificaciones en tiempo real
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
