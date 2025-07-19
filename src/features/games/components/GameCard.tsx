import React from 'react';
import { GameCardProps } from '../types/games.types';

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
      className="game-card group cursor-pointer relative bg-gradient-to-br from-[#1e0b36] to-[#2a0845] rounded-2xl p-8 text-center border border-purple-900/50 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_30px_#6d28d9] hover:-translate-y-2" 
      onClick={handleClick}
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
      </div>
      
      <div className="relative z-10">
        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {game.isNew && (
            <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
              🆕 Nuevo
            </span>
          )}
          {game.isPopular && (
            <span className="px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">
              🔥 Popular
            </span>
          )}
        </div>

        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-900/40 to-pink-900/30 rounded-full flex items-center justify-center border border-purple-500/30 group-hover:border-pink-400/50 group-hover:shadow-[0_0_25px_#ec4899] transition-all">
          <img src={game.image} alt={game.name} className="w-14 h-14 object-contain group-hover:scale-110 transition-transform" />
        </div>
        
        <h3 className="text-white font-bold text-2xl mb-1">{game.name}</h3>
        
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-900/50 text-purple-200 rounded-full">
            {game.type.toUpperCase()}
          </span>
          {game.badge && (
            <span className={`inline-block px-3 py-1 text-xs font-medium bg-purple-900/30 rounded-full ${game.badgeColor || 'text-purple-300'}`}>
              {game.badge}
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-300 mt-3 leading-relaxed mb-4">{game.description}</p>
        
        {/* Game details */}
        <div className="space-y-2 mb-4 text-xs text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <span className="flex items-center gap-1">
              <i className="fas fa-star text-yellow-400"></i>
              {game.rating}
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-users"></i>
              {formatPlayerCount(game.playerCount)} jugadores
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-2">
            <span className="flex items-center gap-1">
              <i className="fas fa-calendar"></i>
              {new Date(game.releaseDate).getFullYear()}
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-gamepad"></i>
              {game.platform.join(', ')}
            </span>
          </div>
        </div>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-1 justify-center mb-4">
          {game.genre.slice(0, 3).map((genre, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-purple-900/30 text-purple-200 rounded-full">
              {genre}
            </span>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleFavorite}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="Agregar a favoritos"
          >
            <i className="fas fa-heart"></i>
          </button>
          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
            title="Compartir"
          >
            <i className="fas fa-share"></i>
          </button>
        </div>
        
        {details}
      </div>
    </div>
  );
} 