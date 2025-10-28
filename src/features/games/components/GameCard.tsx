import React from 'react';
import { Game, GameCardProps } from '../types/games.types';
import GameLogo, { GameKey } from '../../../components/GameLogo';

export default function GameCard({ game, onClick, onFavorite, onShare, details }: GameCardProps) {
  const handleClick = () => {
    onClick?.(game.id);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(game.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(game.id);
  };

  const formatPlayerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div
      className="cuadro h-100 cursor-pointer animate-theme-hover rounded-3 p-4"
      onClick={handleClick}
    >
      <div className="text-center position-relative">
        {/* Badges */}
        <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
          {game.isNew && (
            <span className="px-2 py-1 text-green-300 text-xs rounded-full" style={{ background: 'rgba(34, 197, 94, 0.2)' }}>
              🆕 Nuevo
            </span>
          )}
          {game.isPopular && (
            <span className="px-2 py-1 text-yellow-300 text-xs rounded-full" style={{ background: 'rgba(251, 191, 36, 0.2)' }}>
              🔥 Popular
            </span>
          )}
        </div>

        <div className="d-flex justify-content-center mb-4">
          <div className="rounded-circle d-flex align-items-center justify-content-center border border-theme shadow-theme-glow position-relative"
               style={{
                 width: '80px',
                 height: '80px',
                 background: game.gradient
                   ? `linear-gradient(135deg, ${game.gradient})`
                   : 'var(--gradient-primary)'
               }}>
            <GameLogo
              game={game.id as GameKey}
              size="icon"
              accentColor={game.accentColor}
              className="text-2xl"
            />
          </div>
        </div>
        
        <h3 className="h4 text-theme-primary fw-bold mb-3 glow-text">{game.name}</h3>
        
        <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
          <span className="px-2 py-1 text-theme-primary text-xs rounded-full" style={{ background: 'var(--color-surface-light)' }}>
            {game.type.toUpperCase()}
          </span>
          {game.badge && (
            <span className={`px-2 py-1 text-theme-primary text-xs rounded-full ${game.badgeColor || ''}`} style={{ background: 'var(--color-surface-hover)' }}>
              {game.badge}
            </span>
          )}
        </div>
        
        <p className="text-theme-secondary small mb-4">{game.description}</p>
        
        {/* Game details */}
        <div className="mb-4">
          <div className="d-flex justify-content-center gap-3 mb-2 text-theme-secondary small">
            <span className="d-flex align-items-center gap-1">
              <i className="fas fa-star text-warning"></i>
              {game.rating}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="fas fa-users"></i>
              {formatPlayerCount(game.playerCount)}
            </span>
          </div>
          
          <div className="d-flex justify-content-center gap-3 text-theme-secondary small">
            <span className="d-flex align-items-center gap-1">
              <i className="fas fa-calendar"></i>
              {new Date(game.releaseDate).getFullYear()}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="fas fa-gamepad"></i>
              {game.platform.join(', ')}
            </span>
          </div>
        </div>
        
        {/* Genres */}
        <div className="d-flex flex-wrap gap-1 justify-content-center mb-4">
          {game.genre.slice(0, 3).map((genre, index) => (
            <span key={index} className="px-2 py-1 text-theme-secondary text-xs rounded-full" style={{ background: 'var(--color-surface)' }}>
              {genre}
            </span>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="d-flex justify-content-center gap-2 mt-auto">
          <button
            onClick={handleFavorite}
            className="px-2 py-1 text-red-400 border border-red-400 rounded hover:bg-red-400 hover:text-white transition-all animate-theme-hover text-sm"
            title="Agregar a favoritos"
          >
            <i className="fas fa-heart"></i>
          </button>
          <button
            onClick={handleShare}
            className="px-2 py-1 text-theme-primary border rounded transition-all animate-theme-hover text-sm" style={{ borderColor: 'var(--color-primary)' }}
            title="Compartir"
          >
            <i className="fas fa-share"></i>
          </button>
        </div>
        
        {details && (
          <div className="mt-3">
            {details}
          </div>
        )}
      </div>
    </div>
  );
} 