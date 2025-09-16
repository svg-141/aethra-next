"use client";

import { useState, useMemo } from 'react';
import { CommentSection } from '../../features/chat';
import { GuideCard, GameCard, Guide, Game } from '../../features/games';
import { guideService, getValorantGuides, getStarcraft2Guides } from '../../features/games/services/guideService';
import { SUPPORTED_GAMES, GUIDE_TYPES, DEFAULT_GUIDE_FILTERS } from '../../features/games/constants/games-constants';

export default function GamesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Get all guides from the service
  const allGuides = useMemo(() => guideService.getAllGuides(), []);

  // Filtrar guías según el juego seleccionado y filtros activos
  const filteredGuides = useMemo(() => {
    let guides = allGuides;

    // Filter by selected game
    if (selectedGame) {
      guides = guideService.getGuidesByGame(selectedGame);
    }

    // Filter by guide type
    if (activeFilter !== 'all') {
      guides = guides.filter(guide => guide.type === activeFilter);
    }

    return guides;
  }, [allGuides, selectedGame, activeFilter]);

  const handleViewGuide = (guideId: string) => {
    console.log('Ver guía:', guideId);
    // Aquí se agregaría la lógica para ver la guía
  };

  const handleDownloadGuide = (guideId: string) => {
    console.log('Descargar guía:', guideId);
    // Aquí se agregaría la lógica para descargar la guía
  };

  const handleRateGuide = (guideId: string, rating: number) => {
    console.log('Calificar guía:', guideId, 'con', rating);
    // Aquí se agregaría la lógica para calificar la guía
  };

  const handleGameClick = (gameId: string) => {
    setSelectedGame(selectedGame === gameId ? null : gameId);
  };

  const handleGameFavorite = (gameId: string) => {
    console.log('Agregar a favoritos:', gameId);
    // Aquí se agregaría la lógica para agregar a favoritos
  };

  const handleGameShare = (gameId: string) => {
    console.log('Compartir juego:', gameId);
    // Aquí se agregaría la lógica para compartir
  };

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen" style={{ background: 'var(--gradient-background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold theme-text-primary mb-4 glow-text">Guías Estratégicas</h1>
          <p className="text-base sm:text-lg theme-text-secondary max-w-2xl mx-auto">
            Aprende de los mejores jugadores con guías detalladas, análisis de meta y estrategias probadas
          </p>
        </div>

        {/* Juegos soportados */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold theme-text-primary mb-6 text-center">Juegos Soportados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SUPPORTED_GAMES.map(game => (
              <GameCard 
                key={game.id} 
                game={game}
                onClick={handleGameClick}
                onFavorite={handleGameFavorite}
                onShare={handleGameShare}
                details={
                  selectedGame === game.name && (
                    <div className="mt-4 p-3 rounded-lg theme-border theme-card">
                      <p className="text-xs theme-text-primary">
                        <i className="fas fa-check icon-success mr-2"></i>
                        Seleccionado - Mostrando guías de {game.name}
                      </p>
                    </div>
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Filtros por tipo de guía */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveFilter('all')}
              className={`theme-button px-4 py-2 rounded-lg transition-all ${
                activeFilter === 'all'
                  ? 'theme-text-primary'
                  : 'theme-text-secondary hover:theme-text-primary'
              }`}
              style={activeFilter === 'all' ? { background: 'var(--gradient-primary)' } : {}}
            >
              Todas las guías ({allGuides.length})
            </button>
            {GUIDE_TYPES.map(type => (
              <button
                key={type.key}
                onClick={() => setActiveFilter(type.key)}
                className={`theme-button px-4 py-2 rounded-lg transition-all ${
                  activeFilter === type.key
                    ? 'theme-text-primary'
                    : 'theme-text-secondary hover:theme-text-primary'
                }`}
                style={activeFilter === type.key ? { background: 'var(--gradient-primary)' } : {}}
              >
                <span className="icon-theme">{type.icon}</span> {type.label} ({allGuides.filter(g => g.type === type.key).length})
              </button>
            ))}
          </div>
        </div>

        {/* Grid de guías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGuides
            .filter(guide => activeFilter === 'all' || guide.type === activeFilter)
            .map(guide => (
              <GuideCard 
                key={guide.id} 
                guide={guide}
                onView={handleViewGuide}
                onDownload={handleDownloadGuide}
                onRate={handleRateGuide}
              />
            ))}
        </div>

        {/* Mensaje cuando no hay guías */}
        {filteredGuides.filter(guide => activeFilter === 'all' || guide.type === activeFilter).length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold theme-text-primary mb-2">No se encontraron guías</h3>
            <p className="theme-text-secondary">
              {selectedGame 
                ? `No hay guías disponibles para ${selectedGame} con el filtro seleccionado.`
                : 'No hay guías disponibles con el filtro seleccionado.'
              }
            </p>
          </div>
        )}

        {/* Sección de feedback para las guías */}
        <div className="mt-12">
          <CommentSection
            sectionId="guides-feedback"
            initialComments={[
              {
                id: 1,
                author: 'GuideReader',
                avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
                content: 'Las guías son excelentes y muy detalladas. Me han ayudado mucho a mejorar mi juego.',
                time: 'hace 3 días',
                likes: 15,
                section: 'guides-feedback',
              },
              {
                id: 2,
                author: 'StrategyLover',
                avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
                content: '¿Podrían agregar más guías para juegos móviles? Sería muy útil.',
                time: 'hace 1 semana',
                likes: 8,
                section: 'guides-feedback',
              },
            ]}
            initialVotes={{ up: 234, down: 5 }}
            title="¿Cómo te están ayudando las guías?"
            className="theme-card p-6 card-guide"
          />
        </div>
      </div>

    </section>
  );
} 