"use client";

import { useState } from 'react';
import { CommentSection } from '../../features/chat';
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
  };

  const handleDownloadGuide = (guideId: string) => {
    console.log('Descargar guía:', guideId);
  };

  const handleRateGuide = (guideId: string, rating: number) => {
    console.log('Calificar guía:', guideId, 'con', rating);
  };

  const handleGameClick = (gameId: string) => {
    setSelectedGame(selectedGame === gameId ? null : gameId);
  };

  const handleGameFavorite = (gameId: string) => {
    console.log('Agregar a favoritos:', gameId);
  };

  const handleGameShare = (gameId: string) => {
    console.log('Compartir juego:', gameId);
  };

  return (
    <div className="min-vh-100 pt-5 pb-5" style={{ background: 'var(--gradient-background)', paddingTop: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h1 className="display-4 fw-bold text-theme-primary mb-4 glow-text">
              <i className="fas fa-book me-3"></i>Guías Estratégicas
            </h1>
            <p className="lead text-theme-secondary">
              Aprende de los mejores jugadores con guías detalladas, análisis de meta y estrategias probadas
            </p>
          </div>
        </div>

        {/* Juegos soportados */}
        <div className="row mb-5">
          <div className="col-12 text-center mb-4">
            <h2 className="h3 fw-bold text-theme-primary">
              <i className="fas fa-gamepad me-2"></i>Juegos Soportados
            </h2>
          </div>
        </div>
        
        <div className="row g-4 mb-5">
          {SUPPORTED_GAMES.map(game => (
            <div key={game.id} className="col-12 col-md-6 col-lg-3">
              <GameCard 
                game={game}
                onClick={handleGameClick}
                onFavorite={handleGameFavorite}
                onShare={handleGameShare}
                details={
                  selectedGame === game.name && (
                    <div className="alert alert-primary mt-3 py-2">
                      <small className="text-theme-primary">
                        <i className="fas fa-check me-2"></i>
                        Seleccionado - Mostrando guías de {game.name}
                      </small>
                    </div>
                  )
                }
              />
            </div>
          ))}
        </div>

        {/* Filtros por tipo de guía */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <button
                onClick={() => setActiveFilter('all')}
                className={`btn ${
                  activeFilter === 'all'
                    ? 'btn-primary btn-gaming'
                    : 'btn-outline-secondary'
                }`}
              >
                <i className="fas fa-list me-2"></i>
                Todas las guías ({SAMPLE_GUIDES.length})
              </button>
              
              {GUIDE_TYPES.map(type => (
                <button
                  key={type.key}
                  onClick={() => setActiveFilter(type.key)}
                  className={`btn ${
                    activeFilter === type.key
                      ? 'btn-primary btn-gaming'
                      : 'btn-outline-secondary'
                  }`}
                >
                  {type.icon} {type.label} ({SAMPLE_GUIDES.filter(g => g.type === type.key).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de guías */}
        <div className="row g-4">
          {filteredGuides
            .filter(guide => activeFilter === 'all' || guide.type === activeFilter)
            .map(guide => (
              <div key={guide.id} className="col-12 col-md-6 col-lg-4">
                <GuideCard 
                  guide={guide}
                  onView={handleViewGuide}
                  onDownload={handleDownloadGuide}
                  onRate={handleRateGuide}
                />
              </div>
            ))}
            
          {/* Mensaje cuando no hay guías */}
          {filteredGuides.filter(guide => activeFilter === 'all' || guide.type === activeFilter).length === 0 && (
            <div className="col-12">
              <div className="text-center py-5">
                <div className="display-1 mb-4">📚</div>
                <h3 className="h4 fw-bold text-theme-primary mb-3">No se encontraron guías</h3>
                <p className="text-theme-secondary">
                  {selectedGame 
                    ? `No hay guías disponibles para ${selectedGame} con el filtro seleccionado.`
                    : 'No hay guías disponibles con el filtro seleccionado.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Sección de feedback para las guías */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card card-gaming">
              <div className="card-header bg-theme-surface-light">
                <h4 className="card-title mb-0 text-theme-primary">
                  <i className="fas fa-comments me-2"></i>
                  ¿Cómo te están ayudando las guías?
                </h4>
              </div>
              <div className="card-body">
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
                  title="Feedback de la comunidad"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}