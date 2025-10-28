'use client';

import React, { useState, useMemo } from 'react';
import { getValorantGuides } from '../../../../features/games/services/guideService';
import GuideCard from '../../../../features/games/components/GuideCard';
import HeroSection from '../../../../features/ui/components/HeroSection';

export default function ValorantGuidesPage() {
  // const { currentTheme } = useThemeContext(); // Removed unused variable
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Get Valorant guides
  const valorantGuides = useMemo(() => getValorantGuides(), []);

  // Filter and sort guides
  const filteredGuides = useMemo(() => {
    let guides = valorantGuides;

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
  }, [valorantGuides, selectedType, selectedDifficulty, sortBy]);

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
        gradient="from-green-900/40 via-emerald-800/30 to-green-900/40"
        title="Guías de Valorant"
        subtitle="Colección completa de guías estratégicas para dominar Valorant. Desde principiante hasta nivel profesional."
        badge="FPS Táctico"
        badgeColor="bg-red-500/20 text-red-300 border-red-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <pre className="font-mono text-green-400 text-sm leading-tight" style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}>
{`\\\\     //  /\\  ||
 \\\\   //  /__\\ ||
  \\\\ //  /    \\||___`}
          </pre>
          <div className="flex items-center gap-4 text-sm theme-text-secondary">
            <div className="flex items-center gap-2">
              <i className="fas fa-book"></i>
              <span>{valorantGuides.length} Guías</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-star"></i>
              <span>{valorantGuides.filter(g => g.isFeatured).length} Destacadas</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-plus"></i>
              <span>{valorantGuides.filter(g => g.isNew).length} Nuevas</span>
            </div>
          </div>
        </div>
      </HeroSection>

      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="mb-8">
          <div className="theme-card p-6">
            <h2 className="text-xl font-bold theme-text-primary mb-4">Filtrar Guías de Valorant</h2>
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
              Mostrando {filteredGuides.length} guía{filteredGuides.length !== 1 ? 's' : ''} de Valorant
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
              {valorantGuides.filter(guide => guide.isFeatured).map((guide) => (
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
                No hay guías de Valorant que coincidan con los filtros seleccionados.
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
          <h3 className="text-lg font-bold theme-text-primary mb-4">Estadísticas de Valorant</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{valorantGuides.length}</div>
              <div className="text-sm theme-text-secondary">Total de Guías</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{valorantGuides.filter(g => g.isFeatured).length}</div>
              <div className="text-sm theme-text-secondary">Destacadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{valorantGuides.filter(g => g.isNew).length}</div>
              <div className="text-sm theme-text-secondary">Nuevas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">
                {Math.round((valorantGuides.reduce((sum, guide) => sum + guide.rating, 0) / valorantGuides.length) * 10) / 10}
              </div>
              <div className="text-sm theme-text-secondary">Rating Promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}