'use client';

import React, { useState, useMemo } from 'react';
import { useThemeContext } from '../../../../context/ThemeContext';
import GuideCard from '../../../../features/games/components/GuideCard';
import HeroSection from '../../../../features/ui/components/HeroSection';
import Image from 'next/image';

// Mock data for CS2 guides
const cs2Guides = [
  {
    id: 'cs2-1',
    title: 'Guía Completa de Economía CS2',
    description: 'Aprende a gestionar la economía del equipo para maximizar wins',
    type: 'strategy',
    difficulty: 'intermediate',
    rating: 4.8,
    views: 15420,
    downloads: 2340,
    updated: '2025-10-15',
    meta: 'CS2 Economía',
    isFeatured: true,
    isNew: true,
    game: 'cs2'
  },
  {
    id: 'cs2-2',
    title: 'Estrategias de Mirage',
    description: 'Domina uno de los mapas más jugados con estas estrategias',
    type: 'tutorial',
    difficulty: 'beginner',
    rating: 4.6,
    views: 12300,
    downloads: 1890,
    updated: '2025-10-10',
    meta: 'CS2 Mirage',
    isFeatured: true,
    isNew: false,
    game: 'cs2'
  },
  {
    id: 'cs2-3',
    title: 'Utilidades en Inferno',
    description: 'Todas las granadas esenciales para dominar Inferno',
    type: 'tutorial',
    difficulty: 'intermediate',
    rating: 4.9,
    views: 9870,
    downloads: 1560,
    updated: '2025-10-12',
    meta: 'CS2 Inferno',
    isFeatured: false,
    isNew: true,
    game: 'cs2'
  },
  {
    id: 'cs2-4',
    title: 'Análisis Meta Profesional',
    description: 'Tendencias del meta en los últimos torneos tier 1',
    type: 'meta-analysis',
    difficulty: 'advanced',
    rating: 4.7,
    views: 7650,
    downloads: 1234,
    updated: '2025-10-08',
    meta: 'CS2 Pro Meta',
    isFeatured: true,
    isNew: false,
    game: 'cs2'
  }
];

export default function CS2GuidesPage() {
  const { currentTheme } = useThemeContext();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredGuides = useMemo(() => {
    let guides = [...cs2Guides];

    if (selectedType !== 'all') {
      guides = guides.filter(guide => guide.type === selectedType);
    }

    if (selectedDifficulty !== 'all') {
      guides = guides.filter(guide => guide.difficulty === selectedDifficulty);
    }

    switch (sortBy) {
      case 'newest':
        guides.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());
        break;
      case 'popular':
        guides.sort((a, b) => (b.views + b.downloads) - (a.views + a.downloads));
        break;
      case 'rating':
        guides.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        guides.sort((a, b) => a.meta.localeCompare(b.meta));
        break;
    }

    return guides;
  }, [selectedType, selectedDifficulty, sortBy]);

  const handleGuideView = (guideId: string) => {
    console.log('Viewing guide:', guideId);
  };

  const handleGuideDownload = (guideId: string) => {
    console.log('Downloading guide:', guideId);
  };

  const handleGuideRate = (guideId: string, rating: number) => {
    console.log('Rating guide:', guideId, 'with rating:', rating);
  };

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen" style={{ background: 'var(--gradient-background)' }}>
      <HeroSection
        image="/assets/banners/starcraft-2-banner.jpg"
        title="Guías de Counter-Strike 2"
        subtitle="Colección completa de guías para CS2. Desde economía hasta estrategias de mapas específicos."
        badge="FPS Táctico"
        badgeColor="bg-orange-500/20 text-orange-300 border-orange-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16">
            <Image
              src="/assets/icons/cs2-logo.png"
              alt="CS2"
              fill
              sizes="64px"
              style={{ objectFit: 'contain' }}
              className="rounded-lg border-2 border-white/20"
            />
          </div>
          <div className="flex items-center gap-4 text-sm theme-text-secondary">
            <div className="flex items-center gap-2">
              <i className="fas fa-book"></i>
              <span>{cs2Guides.length} Guías</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-star"></i>
              <span>{cs2Guides.filter(g => g.isFeatured).length} Destacadas</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-plus"></i>
              <span>{cs2Guides.filter(g => g.isNew).length} Nuevas</span>
            </div>
          </div>
        </div>
      </HeroSection>

      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="mb-8">
          <div className="theme-card p-6">
            <h2 className="text-xl font-bold theme-text-primary mb-4">Filtrar Guías de CS2</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium theme-text-secondary mb-2">Tipo de Guía</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)'
                  }}
                >
                  <option value="all">Todos los tipos</option>
                  <option value="strategy">🎯 Estrategia</option>
                  <option value="tutorial">📚 Tutorial</option>
                  <option value="meta-analysis">📊 Análisis Meta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium theme-text-secondary mb-2">Dificultad</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)'
                  }}
                >
                  <option value="all">Todas las dificultades</option>
                  <option value="beginner">🟢 Principiante</option>
                  <option value="intermediate">🟡 Intermedio</option>
                  <option value="advanced">🔴 Avanzado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium theme-text-secondary mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)'
                  }}
                >
                  <option value="newest">Más recientes</option>
                  <option value="popular">Más populares</option>
                  <option value="rating">Mejor valoradas</option>
                  <option value="name">Nombre A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="theme-text-secondary">
              Mostrando {filteredGuides.length} guía{filteredGuides.length !== 1 ? 's' : ''} de CS2
            </div>
          </div>
        </div>

        {/* Featured Guides */}
        {selectedType === 'all' && selectedDifficulty === 'all' && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold theme-text-primary">Guías Destacadas</h2>
              <span
                className="px-3 py-1 text-sm rounded-full"
                style={{ backgroundColor: 'var(--color-warning)', opacity: '0.2', color: 'var(--color-warning)' }}
              >
                ⭐ Recomendadas
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cs2Guides.filter(guide => guide.isFeatured).map((guide) => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  onView={handleGuideView}
                  onDownload={handleGuideDownload}
                  onRate={handleGuideRate}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Guides */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold theme-text-primary">
              {selectedType === 'all' && selectedDifficulty === 'all' ? 'Todas las Guías' : 'Resultados Filtrados'}
            </h2>
            <span className="theme-text-secondary">({filteredGuides.length})</span>
          </div>

          {filteredGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGuides.map((guide) => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  onView={handleGuideView}
                  onDownload={handleGuideDownload}
                  onRate={handleGuideRate}
                />
              ))}
            </div>
          ) : (
            <div className="theme-card p-12 text-center">
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface)' }}>
                <i className="fas fa-search text-2xl theme-text-secondary"></i>
              </div>
              <h3 className="text-lg font-semibold theme-text-primary mb-2">No se encontraron guías</h3>
              <p className="theme-text-secondary mb-4">
                No hay guías de CS2 que coincidan con los filtros seleccionados.
              </p>
              <button
                onClick={() => {
                  setSelectedType('all');
                  setSelectedDifficulty('all');
                }}
                className="px-4 py-2 rounded-lg transition-colors animate-theme-hover animate-theme-glow"
                style={{ background: 'var(--gradient-primary)', color: 'var(--color-text)' }}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="theme-card p-6">
          <h3 className="text-lg font-bold theme-text-primary mb-4">Estadísticas de CS2</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{cs2Guides.length}</div>
              <div className="text-sm theme-text-secondary">Total de Guías</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{cs2Guides.filter(g => g.isFeatured).length}</div>
              <div className="text-sm theme-text-secondary">Destacadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{cs2Guides.filter(g => g.isNew).length}</div>
              <div className="text-sm theme-text-secondary">Nuevas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">
                {Math.round((cs2Guides.reduce((sum, guide) => sum + guide.rating, 0) / cs2Guides.length) * 10) / 10}
              </div>
              <div className="text-sm theme-text-secondary">Rating Promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
