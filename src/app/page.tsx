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
    <div className="min-h-screen theme-bg-surface pt-20" style={{ background: 'var(--gradient-background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="w-full lg:w-5/6">
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
                <span className="theme-badge px-4 py-2 text-sm rounded-full icon-glow-subtle" style={{ background: 'var(--gradient-primary)' }}>
                  ✨ Plataforma líder en gaming competitivo
                </span>
              </div>
            </HeroSection>
          </div>
        </div>
        
        {/* Botón de prueba para notificaciones (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="flex justify-center mt-8">
            <div className="w-full md:w-2/3 lg:w-1/2 text-center">
              <div className="theme-card p-6 card-hover">
                <h5 className="theme-text-primary mb-4 font-bold flex items-center justify-center">
                  <i className="fas fa-code icon-primary mr-2"></i>
                  Herramientas de Desarrollo
                </h5>
                <button
                  onClick={simulateNotification}
                  disabled={isSimulating}
                  className="theme-button px-6 py-3 rounded-lg font-semibold transition-all mb-4"
                >
                  {isSimulating ? (
                    <>
                      <i className="fas fa-spinner icon-animate-spin mr-2"></i>
                      Simulando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-bell icon-theme mr-2"></i>
                      Simular Notificación
                    </>
                  )}
                </button>
                <p className="text-sm theme-text-secondary">
                  <i className="fas fa-info-circle icon-info mr-1"></i>
                  Prueba el sistema de notificaciones en tiempo real
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
