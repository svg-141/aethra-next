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
      case 'common': return { color: 'var(--color-text-secondary)' };
      case 'rare': return { color: 'var(--color-info)' };
      case 'epic': return { color: 'var(--color-primary)' };
      case 'legendary': return { color: 'var(--color-accent)' };
      default: return { color: 'var(--color-text-secondary)' };
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return { borderColor: 'var(--color-text-secondary)', opacity: '0.3' };
      case 'rare': return { borderColor: 'var(--color-info)', opacity: '0.3' };
      case 'epic': return { borderColor: 'var(--color-primary)', opacity: '0.3' };
      case 'legendary': return { borderColor: 'var(--color-accent)', opacity: '0.3' };
      default: return { borderColor: 'var(--color-text-secondary)', opacity: '0.3' };
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer animate-theme-hover`} onClick={handleView} style={{ backgroundColor: 'var(--color-surface)', ...getRarityBorder(achievement.rarity) }}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg`} style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2' }}>
        {achievement.icon}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="text-sm font-medium text-theme-primary">{achievement.title}</div>
          <span className={`text-xs font-medium`} style={getRarityColor(achievement.rarity)}>
            {achievement.rarity.toUpperCase()}
          </span>
          {achievement.isUnlocked && (
            <span className="text-xs" style={{ color: 'var(--color-success)' }}>
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
            <span className="text-xs font-medium" style={{ color: 'var(--color-accent)' }}>
              {achievement.points} pts
            </span>
            
            {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
              <div className="flex items-center gap-1">
                <div className="w-16 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
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