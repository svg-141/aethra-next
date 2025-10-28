'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useThemeContext } from '../../../../context/ThemeContext';
import GuideCard from '../../../../features/games/components/GuideCard';
import HeroSection from '../../../../features/ui/components/HeroSection';

// Mock data for LoL guides
import { Guide, GuideType } from '../../../../features/games/types/games.types';

// Mock data for LoL guides
const lolGuides: Guide[] = [
  {
    id: 'lol-1',
    name: 'Guía Completa de Jungle Pathing',
    description: 'Domina el early game con las mejores rutas de jungla',
    type: 'strategy' as GuideType,
    typeColor: 'blue',
    tags: ['lol', 'jungle', 'strategy'],
    link: '/guides/lol/jungle-pathing',
    author: 'Aethra',
    estimatedTime: '25 min',
    difficulty: 'intermediate',
    rating: 4.9,
    views: 18200,
    downloads: 3100,
    updated: '2025-10-18',
    meta: 'LoL Jungle',
    isFeatured: true,
    isNew: true
  },
  {
    id: 'lol-2',
    name: 'Tier List Parche 13.20',
    description: 'Los mejores campeones para cada role en el meta actual',
    type: 'meta-analysis' as GuideType,
    typeColor: 'purple',
    tags: ['lol', 'tier-list', 'meta'],
    link: '/guides/lol/tier-list-13-20',
    author: 'Aethra',
    estimatedTime: '10 min',
    difficulty: 'beginner',
    rating: 4.7,
    views: 22400,
    downloads: 4250,
    updated: '2025-10-15',
    meta: 'LoL Tier List',
    isFeatured: true,
    isNew: true
  },
  {
    id: 'lol-3',
    name: 'Wave Management Avanzado',
    description: 'Controla las oleadas para dominar tu lane',
    type: 'tutorial' as GuideType,
    typeColor: 'green',
    tags: ['lol', 'wave-management', 'laning'],
    link: '/guides/lol/wave-management',
    author: 'Aethra',
    estimatedTime: '30 min',
    difficulty: 'advanced',
    rating: 4.8,
    views: 15600,
    downloads: 2780,
    updated: '2025-10-12',
    meta: 'LoL Waves',
    isFeatured: false,
    isNew: false
  },
  {
    id: 'lol-4',
    name: 'Guía de Runas por Campeón',
    description: 'Las mejores combinaciones de runas para cada situación',
    type: 'build-guide' as GuideType,
    typeColor: 'yellow',
    tags: ['lol', 'runes', 'builds'],
    link: '/guides/lol/runes-guide',
    author: 'Aethra',
    estimatedTime: '15 min',
    difficulty: 'intermediate',
    rating: 4.6,
    views: 19800,
    downloads: 3450,
    updated: '2025-10-10',
    meta: 'LoL Runas',
    isFeatured: true,
    isNew: false
  },
  {
    id: 'lol-5',
    name: 'Macro Game y Objetivos',
    description: 'Cuándo tomar dragones, baron y torres para ganar',
    type: 'strategy' as GuideType,
    typeColor: 'blue',
    tags: ['lol', 'macro', 'objectives'],
    link: '/guides/lol/macro-game',
    author: 'Aethra',
    estimatedTime: '20 min',
    difficulty: 'advanced',
    rating: 4.9,
    views: 14200,
    downloads: 2340,
    updated: '2025-10-08',
    meta: 'LoL Macro',
    isFeatured: false,
    isNew: false
  }
];

export default function LoLGuidesPage() {
  useThemeContext();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredGuides = useMemo(() => {
    let guides = [...lolGuides];

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
        image="/assets/banners/valorant-banner2.jpeg"
        title="Guías de League of Legends"
        subtitle="Colección completa de guías para LoL. Campeones, estrategias, macro y más."
        badge="MOBA"
        badgeColor="bg-blue-500/20 text-blue-300 border-blue-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <Image
            src="/assets/games/lol.png"
            alt="League of Legends"
            width={64}
            height={64}
            className="w-16 h-16 rounded-lg border-2 border-white/20"
          />
          <div className="flex items-center gap-4 text-sm theme-text-secondary">
            <div className="flex items-center gap-2">
              <i className="fas fa-book"></i>
              <span>{lolGuides.length} Guías</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-star"></i>
              <span>{lolGuides.filter(g => g.isFeatured).length} Destacadas</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-plus"></i>
              <span>{lolGuides.filter(g => g.isNew).length} Nuevas</span>
            </div>
          </div>
        </div>
      </HeroSection>

      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="mb-8">
          <div className="theme-card p-6">
            <h2 className="text-xl font-bold theme-text-primary mb-4">Filtrar Guías de LoL</h2>
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
                  <option value="build-guide">🔨 Build Guide</option>
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
              Mostrando {filteredGuides.length} guía{filteredGuides.length !== 1 ? 's' : ''} de LoL
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
              {lolGuides.filter(guide => guide.isFeatured).map((guide) => (
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
                No hay guías de LoL que coincidan con los filtros seleccionados.
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
          <h3 className="text-lg font-bold theme-text-primary mb-4">Estadísticas de LoL</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{lolGuides.length}</div>
              <div className="text-sm theme-text-secondary">Total de Guías</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{lolGuides.filter(g => g.isFeatured).length}</div>
              <div className="text-sm theme-text-secondary">Destacadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">{lolGuides.filter(g => g.isNew).length}</div>
              <div className="text-sm theme-text-secondary">Nuevas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold theme-text-primary mb-1">
                {Math.round((lolGuides.reduce((sum, guide) => sum + guide.rating, 0) / lolGuides.length) * 10) / 10}
              </div>
              <div className="text-sm theme-text-secondary">Rating Promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
