import React from 'react';
import { UserCardProps } from '../types/profile.types';

export default function UserCard({ user, stats, onEdit, onViewProfile, children }: UserCardProps) {
  const handleEdit = () => {
    onEdit?.(user.id);
  };

  const handleViewProfile = () => {
    onViewProfile?.(user.id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  return (
    <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-900/40 to-pink-900/30 rounded-full flex items-center justify-center border-2 border-purple-500/40 overflow-hidden mr-4">
              <img src={user.avatar} alt={`Avatar de ${user.name}`} className="w-full h-full object-cover" />
            </div>
            {/* Online status indicator */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-purple-900 ${
              user.isOnline ? 'bg-green-500' : 'bg-gray-500'
            }`}></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-white">{user.name}</h4>
              {user.isVerified && (
                <span className="text-blue-400" title="Usuario verificado">
                  <i className="fas fa-check-circle text-sm"></i>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-purple-300">@{user.username}</span>
              <span className="text-gray-500">•</span>
              <span className="text-purple-300">Nivel {user.level}</span>
              <span className="text-gray-500">•</span>
              <span className="text-purple-300">{user.rank}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Editar perfil"
            >
              <i className="fas fa-edit"></i>
            </button>
          )}
          {onViewProfile && (
            <button
              onClick={handleViewProfile}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Ver perfil completo"
            >
              <i className="fas fa-external-link-alt"></i>
            </button>
          )}
        </div>
      </div>

      {/* User info */}
      {user.bio && (
        <p className="text-sm text-gray-300 mb-4">{user.bio}</p>
      )}

      {/* Location and join date */}
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
        {user.location && (
          <span className="flex items-center gap-1">
            <i className="fas fa-map-marker-alt"></i>
            {user.location}
          </span>
        )}
        <span className="flex items-center gap-1">
          <i className="fas fa-calendar-alt"></i>
          Se unió {formatDate(user.joinDate)}
        </span>
        <span className="flex items-center gap-1">
          <i className="fas fa-clock"></i>
          Última actividad {formatTimeAgo(user.lastActive)}
        </span>
      </div>

      {/* Social links */}
      {Object.values(user.socialLinks).some(link => link) && (
        <div className="flex gap-2 mb-4">
          {user.socialLinks.discord && (
            <a href={`https://discord.com/users/${user.socialLinks.discord}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-colors">
              <i className="fab fa-discord"></i>
            </a>
          )}
          {user.socialLinks.twitter && (
            <a href={`https://twitter.com/${user.socialLinks.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
          )}
          {user.socialLinks.twitch && (
            <a href={`https://twitch.tv/${user.socialLinks.twitch}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <i className="fab fa-twitch"></i>
            </a>
          )}
          {user.socialLinks.youtube && (
            <a href={`https://youtube.com/@${user.socialLinks.youtube}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">
              <i className="fab fa-youtube"></i>
            </a>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="pt-4 border-t border-purple-900/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{stats.totalMatches.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Partidas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{stats.winRate}%</div>
            <div className="text-xs text-gray-400">Win Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{stats.totalHours.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Horas</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{stats.achievements}</div>
            <div className="text-xs text-gray-400">Logros</div>
          </div>
        </div>
        
        {/* Additional stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <div className="text-sm font-bold text-white">{stats.currentStreak}</div>
            <div className="text-xs text-gray-400">Racha actual</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-white">{stats.favoriteGame}</div>
            <div className="text-xs text-gray-400">Juego favorito</div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
} 