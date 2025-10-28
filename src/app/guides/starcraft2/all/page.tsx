'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useThemeContext } from '../../../../context/ThemeContext';
import { getStarcraft2Guides } from '../../../../features/games/services/guideService';
import GuideCard from '../../../../features/games/components/GuideCard';
import HeroSection from '../../../../features/ui/components/HeroSection';

export default function Starcraft2GuidesPage() {
  useThemeContext();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Get StarCraft 2 guides
  const starcraft2Guides = useMemo(() => getStarcraft2Guides(), []);

  // Filter and sort guides
  const filteredGuides = useMemo(() => {
    let guides = starcraft2Guides;

    // Filter by type
    if (selectedType !== 'all') {
      guides = guides.filter(guide => guide.type === selectedType);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      guides = guides.filter(guide => guide.difficulty === selectedDifficulty);
    }

    // Sort guides
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
  }, [starcraft2Guides, selectedType, selectedDifficulty, sortBy]);

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
      {/* Hero Section */}
      <HeroSection
        image="/assets/img/games/starcraft2/starcraft2-banner.jpg"
        title="Guías de StarCraft 2"
        subtitle="Domina el RTS más competitivo del mundo con guías estratégicas para todas las razas y niveles de habilidad."
        badge="RTS Legendario"
        badgeColor="bg-blue-500/20 text-blue-300 border-blue-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/assets/img/games/starcraft2.png"
            alt="StarCraft 2"
            width={64}
            height={64}
            className="w-16 h-16 rounded-lg border-2 border-white/20"
          />
          <div className="flex items-center gap-4 text-sm theme-text-secondary">
            <div className="flex items-center gap-2">
              <i className="fas fa-book"></i>
              <span>{starcraft2Guides.length} Guías</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-star"></i>
              <span>{starcraft2Guides.filter(g => g.isFeatured).length} Destacadas</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-plus"></i>
              <span>{starcraft2Guides.filter(g => g.isNew).length} Nuevas</span>
            </div>
          </div>
        </div>
      </HeroSection>

      <div className="max-w-7xl mx-auto">
        {/* Race Information */}
        <div className="mb-8">
          <div className="theme-card p-6">
            <h2 className="text-xl font-bold theme-text-primary mb-4">Razas de StarCraft 2</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="theme-bg-surface p-4 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: 'var(--color-error)', opacity: '0.2' }}>
                  <span className="text-2xl">🏭</span>
                </div>
                <h3 className="font-semibold theme-text-primary mb-1">Terran</h3>
                <p className="text-sm theme-text-secondary">Versatilidad y adaptabilidad</p>
              </div>
              <div className="theme-bg-surface p-4 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2' }}>
                  <span className="text-2xl">👾</span>
                </div>
                <h3 className="font-semibold theme-text-primary mb-1">Zerg</h3>
                <p className="text-sm theme-text-secondary">Swarm y economía</p>
              </div>
              <div className="theme-bg-surface p-4 rounded-lg text-center">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: 'var(--color-warning)', opacity: '0.2' }}>
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold theme-text-primary mb-1">Protoss</h3>
                <p className="text-sm theme-text-secondary">Tecnología avanzada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="theme-card p-6">
            <h2 className="text-xl font-bold theme-text-primary mb-4">Filtrar Guías de StarCraft 2</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type Filter */}
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
                  <option value="build-guide">🔨 Build Guide</option>
                  <option value="meta-analysis">📊 Análisis Meta</option>
                </select>
              </div>

              {/* Difficulty Filter */}
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

              {/* Sort */}
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

        {/* Results Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="theme-text-secondary">
              Mostrando {filteredGuides.length} guía{filteredGuides.length !== 1 ? 's' : ''} de StarCraft 2
            </div>
            <div className="flex gap-2">
              {selectedType !== 'all' && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full cursor-pointer animate-theme-hover"
                  style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2', color: 'var(--color-primary)' }}
                  onClick={() => setSelectedType('all')}
                >
                  {selectedType}
                  <i className="fas fa-times text-xs"></i>
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full cursor-pointer animate-theme-hover"
                  style={{ backgroundColor: 'var(--color-info)', opacity: '0.2', color: 'var(--color-info)' }}
                  onClick={() => setSelectedDifficulty('all')}
                >
                  {selectedDifficulty}
                  <i className="fas fa-times text-xs"></i>
                </span>
              )}
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
              {starcraft2Guides.filter(guide => guide.isFeatured).map((guide) => (
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
                No hay guías de StarCraft 2 que coincidan con los filtros seleccionados.
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

        {/* Game Statistics */}
        <div className="theme-card p-6">
          <h3 className="text-lg font-bold theme-text-primary mb-4">Estadísticas de StarCraft 2</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{starcraft2Guides.length}</div>
              <div className="text-sm theme-text-secondary">Total de Guías</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{starcraft2Guides.filter(g => g.isFeatured).length}</div>
              <div className="text-sm theme-text-secondary">Destacadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{starcraft2Guides.filter(g => g.isNew).length}</div>
              <div className="text-sm theme-text-secondary">Nuevas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">
                {Math.round((starcraft2Guides.reduce((sum, guide) => sum + guide.rating, 0) / starcraft2Guides.length) * 10) / 10}
              </div>
              <div className="text-sm theme-text-secondary">Rating Promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}