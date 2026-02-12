"use client";

import { HeroSection } from '../features/ui';
import FeaturesSection from '../features/ui/components/FeaturesSection';
import CTASection from '../features/ui/components/CTASection';
import { SAMPLE_HERO_DATA } from '../features/ui/constants/ui-constants';

export default function HomePage() {
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
                                  <span className="theme-badge px-4 py-2 text-sm rounded-full icon-glow-subtle">                  ✨ Plataforma líder en gaming competitivo
                </span>
              </div>
            </HeroSection>
          </div>
        </div>
      </div>
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
