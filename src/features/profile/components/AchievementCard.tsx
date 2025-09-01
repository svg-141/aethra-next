import React from 'react';
import { AchievementCardProps } from '../types/profile.types';

export default function AchievementCard({ achievement, onView, onShare }: AchievementCardProps) {
  const handleView = () => {
    onView?.(achievement.id);
  };

  const handleShare = () => {
    onShare?.(achievement.id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-300';
      case 'rare': return 'text-blue-300';
      case 'epic': return 'text-purple-300';
      case 'legendary': return 'text-yellow-300';
      default: return 'text-gray-300';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500/30';
      case 'rare': return 'border-blue-500/30';
      case 'epic': return 'border-purple-500/30';
      case 'legendary': return 'border-yellow-500/30';
      default: return 'border-gray-500/30';
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 ${achievement.color} rounded-lg border ${getRarityBorder(achievement.rarity)} cuadro transition-all cursor-pointer animate-theme-hover`} onClick={handleView}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${achievement.color}`}>
        {achievement.icon}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-sm font-medium text-theme-primary">{achievement.title}</div>
          <span className={`text-xs ${getRarityColor(achievement.rarity)} font-medium`}>
            {achievement.rarity.toUpperCase()}
          </span>
          {achievement.isUnlocked && (
            <span className="text-xs text-green-400">
              <i className="fas fa-check-circle"></i>
            </span>
          )}
        </div>
        
        <div className="text-xs text-theme-secondary mb-1">{achievement.description}</div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-theme-secondary">
            {achievement.isUnlocked ? formatDate(achievement.date) : 'No desbloqueado'}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-yellow-400 font-medium">
              {achievement.points} pts
            </span>
            
            {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
              <div className="flex items-center gap-1">
                <div className="w-16 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                      background: 'var(--gradient-primary)'
                    }}
                  ></div>
                </div>
                <span className="text-xs text-theme-secondary">
                  {achievement.progress}/{achievement.maxProgress}
                </span>
              </div>
            )}
            
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare();
                }}
                className="text-xs text-theme-secondary hover:text-theme-primary transition-colors animate-theme-hover"
                title="Compartir logro"
              >
                <i className="fas fa-share"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 