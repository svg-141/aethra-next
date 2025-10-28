'use client';

import React, { useState, useMemo } from 'react';
import { useThemeContext } from '../../context/ThemeContext';
import { enhancedGuideService, getGuideCategories } from '../../features/games/services/guideService';
import { useAuth } from '../../context/AuthContext';
import { GuideType } from '../../features/games/types/games.types';
import GuideCard from '../../features/games/components/GuideCard';
import HeroSection from '../../features/ui/components/HeroSection';

export default function GuidesPage() {
  useThemeContext();
  const auth = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Get categorized guides with access control
  const categories = useMemo(() => getGuideCategories(), []);
  const allGuides = useMemo(() =>
    auth.user
      ? enhancedGuideService.getGuidesWithInteractions(auth.user.id, auth.user.plan)
      : enhancedGuideService.getAccessibleGuides(null)
  , [auth.user]);

  // Filter and sort guides
  const filteredGuides = useMemo(() => {
    let guides = allGuides;

    // Filter by category
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'featured') {
        guides = categories.featured;
      } else if (selectedCategory === 'new') {
        guides = categories.new;
      } else if (selectedCategory === 'popular') {
        guides = categories.popular;
      } else if (categories.byType[selectedCategory as GuideType]) {
        guides = categories.byType[selectedCategory as GuideType];
      }
    }

    // Filter by game
    if (selectedGame !== 'all') {
      guides = guides.filter(guide => {
        const gameKey = selectedGame.toLowerCase();
        return guide.name.toLowerCase().includes(gameKey) || guide.id.includes(gameKey);
      });
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      guides = guides.filter(guide => guide.difficulty === selectedDifficulty);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const searchResults = enhancedGuideService.searchGuides(searchQuery);
      guides = guides.filter(guide => searchResults.some(result => result.id === guide.id));
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
      default:
        break;
    }

    return guides;
  }, [allGuides, categories, selectedCategory, selectedGame, selectedDifficulty, searchQuery, sortBy]);

  const handleGuideView = (guideId: string) => {
    console.log('Viewing guide:', guideId);
  };

  const handleGuideDownload = (guideId: string) => {
    console.log('Downloading guide:', guideId);
  };

  const handleGuideRate = (guideId: string, rating: number) => {
    console.log('Rating guide:', guideId, 'with rating:', rating);
  };

  const categoryStats = useMemo(() => ({
    total: allGuides.length,
    featured: categories.featured.length,
    new: categories.new.length,
    valorant: categories.byGame.valorant.length,
    starcraft2: categories.byGame.starcraft2.length,
    strategy: categories.byType.strategy?.length || 0,
    tutorial: categories.byType.tutorial?.length || 0
  }), [allGuides, categories]);

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen" style={{ background: 'var(--gradient-background)' }}>
      {/* Hero Section */}
      <HeroSection
        image="/assets/img/banners/guides-banner.jpg"
        title="Guías Estratégicas"
        subtitle="Colección completa de guías profesionales para Valorant y StarCraft 2. Mejora tu gameplay con estrategias probadas y análisis del meta actual."
        badge="Biblioteca de Conocimiento"
        badgeColor="bg-purple-500/20 text-purple-300 border-purple-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm theme-text-secondary">
            <i className="fas fa-book"></i>
            <span>{categoryStats.total} Guías Disponibles</span>
          </div>
          <div className="flex items-center gap-2 text-sm theme-text-secondary">
            <i className="fas fa-star"></i>
            <span>{categoryStats.featured} Destacadas</span>
          </div>
          <div className="flex items-center gap-2 text-sm theme-text-secondary">
            <i className="fas fa-plus"></i>
            <span>{categoryStats.new} Nuevas</span>
          </div>
        </div>
      </HeroSection>

      <div className="max-w-7xl mx-auto">
        {/* Filters and Search */}
        <div className="mb-8">
          <div className="theme-card p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
              <h2 className="text-xl font-bold theme-text-primary">Explorar Guías</h2>

              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Buscar guías..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg border transition-colors animate-theme-hover"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)'
                  }}
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 theme-text-secondary"></i>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium theme-text-secondary mb-2">Categoría</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)'
                  }}
                >
                  <option value="all">Todas las categorías</option>
                  <option value="featured">⭐ Destacadas ({categoryStats.featured})</option>
                  <option value="new">🆕 Nuevas ({categoryStats.new})</option>
                  <option value="popular">🔥 Populares</option>
                  <option value="strategy">🎯 Estrategia ({categoryStats.strategy})</option>
                  <option value="tutorial">📚 Tutorial ({categoryStats.tutorial})</option>
                  <option value="build-guide">🔨 Build Guide</option>
                  <option value="meta-analysis">📊 Análisis Meta</option>
                </select>
              </div>

              {/* Game Filter */}
              <div>
                <label className="block text-sm font-medium theme-text-secondary mb-2">Juego</label>
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)'
                  }}
                >
                  <option value="all">Todos los juegos</option>
                  <option value="valorant">🎮 Valorant ({categoryStats.valorant})</option>
                  <option value="starcraft2">⚡ StarCraft 2 ({categoryStats.starcraft2})</option>
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
              Mostrando {filteredGuides.length} guía{filteredGuides.length !== 1 ? 's' : ''}
              {searchQuery && ` para "${searchQuery}"`}
            </div>

            {/* Quick Filter Tags */}
            <div className="flex gap-2">
              {selectedCategory !== 'all' && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full cursor-pointer animate-theme-hover"
                  style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2', color: 'var(--color-primary)' }}
                  onClick={() => setSelectedCategory('all')}
                >
                  {selectedCategory}
                  <i className="fas fa-times text-xs"></i>
                </span>
              )}
              {selectedGame !== 'all' && (
                <span
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full cursor-pointer animate-theme-hover"
                  style={{ backgroundColor: 'var(--color-secondary)', opacity: '0.2', color: 'var(--color-secondary)' }}
                  onClick={() => setSelectedGame('all')}
                >
                  {selectedGame}
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

        {/* Featured Guides Section */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold theme-text-primary">Guías Destacadas</h2>
              <span
                className="px-3 py-1 text-sm rounded-full"
                style={{ backgroundColor: 'var(--color-warning)', opacity: '0.2', color: 'var(--color-warning)' }}
              >
                ⭐ Editor&apos;s Choice
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.featured.slice(0, 4).map((guide) => (
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

        {/* New Guides Section */}
        {selectedCategory === 'all' && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold theme-text-primary">Guías Recientes</h2>
              <span
                className="px-3 py-1 text-sm rounded-full"
                style={{ backgroundColor: 'var(--color-success)', opacity: '0.2', color: 'var(--color-success)' }}
              >
                🆕 Recién Añadidas
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.new.map((guide) => (
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

        {/* All Guides / Filtered Results */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold theme-text-primary">
              {selectedCategory === 'all' && !searchQuery ? 'Todas las Guías' : 'Resultados'}
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
                {searchQuery
                  ? `No hay guías que coincidan con "${searchQuery}"`
                  : 'No hay guías que coincidan con los filtros seleccionados'
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedGame('all');
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

        {/* Guide Statistics */}
        <div className="theme-card p-6">
          <h3 className="text-lg font-bold theme-text-primary mb-4">Estadísticas de la Biblioteca</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{categoryStats.total}</div>
              <div className="text-sm theme-text-secondary">Total de Guías</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{categoryStats.valorant}</div>
              <div className="text-sm theme-text-secondary">Valorant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{categoryStats.starcraft2}</div>
              <div className="text-sm theme-text-secondary">StarCraft 2</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">
                {Math.round((allGuides.reduce((sum, guide) => sum + guide.rating, 0) / allGuides.length) * 10) / 10}
              </div>
              <div className="text-sm theme-text-secondary">Rating Promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}