"use client";

import { useState } from 'react';
import { CommentSection } from '../../features/chat';
import { TooltipGuide } from '../../features/tooltips';
import { GuideCard, GameCard, Guide, Game } from '../../features/games';
import { SUPPORTED_GAMES, SAMPLE_GUIDES, GUIDE_TYPES, DEFAULT_GUIDE_FILTERS } from '../../features/games/constants/games-constants';

export default function GamesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Filtrar guías según el juego seleccionado
  const filteredGuides = selectedGame 
    ? SAMPLE_GUIDES.filter(guide => guide.name.toLowerCase() === selectedGame.toLowerCase())
    : SAMPLE_GUIDES;

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
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen bg-gradient-to-b from-[#0f0720] to-[#1a0933]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4" data-tooltip="guides-title">Guías Estratégicas</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Aprende de los mejores jugadores con guías detalladas, análisis de meta y estrategias probadas
          </p>
        </div>

        {/* Juegos soportados */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Juegos Soportados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPPORTED_GAMES.map(game => (
              <GameCard 
                key={game.id} 
                game={game}
                onClick={handleGameClick}
                onFavorite={handleGameFavorite}
                onShare={handleGameShare}
                details={
                  selectedGame === game.name && (
                    <div className="mt-4 p-3 bg-purple-900/30 rounded-lg">
                      <p className="text-xs text-purple-300">
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
        <div className="mb-8" data-tooltip="guides-filter">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
              }`}
            >
              Todas las guías ({SAMPLE_GUIDES.length})
            </button>
            {GUIDE_TYPES.map(type => (
              <button
                key={type.key}
                onClick={() => setActiveFilter(type.key)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeFilter === type.key
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
                }`}
              >
                {type.icon} {type.label} ({SAMPLE_GUIDES.filter(g => g.type === type.key).length})
              </button>
            ))}
          </div>
        </div>

        {/* Grid de guías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <h3 className="text-xl font-bold text-white mb-2">No se encontraron guías</h3>
            <p className="text-gray-400">
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
            className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60"
          />
        </div>
      </div>

      {/* Tooltips de las guías */}
      <TooltipGuide section="guides" />
    </section>
  );
} 