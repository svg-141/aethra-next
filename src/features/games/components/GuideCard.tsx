import React from 'react';
import { GuideCardProps } from '../types/games.types';

export default function GuideCard({ guide, onView, onDownload, onRate }: GuideCardProps) {
  const handleView = () => {
    onView?.(guide.id);
  };

  const handleDownload = () => {
    onDownload?.(guide.id);
  };

  const handleRate = (rating: number) => {
    onRate?.(guide.id, rating);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star text-xs`}
        style={{ color: i < Math.floor(rating) ? 'var(--color-warning)' : 'var(--color-text-secondary)' }}
      />
    ));
  };

  return (
    <div className={`guide-card flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 group h-full animate-theme-hover`} style={{ background: 'var(--gradient-surface)', borderColor: 'var(--color-border)' }}>
      <div className="relative h-48 overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--color-surface)' }}>
        <img src={guide.image} alt={`Guía ${guide.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {guide.isFeatured && (
            <span className="px-2 py-1 text-xs font-medium rounded-full border" style={{ backgroundColor: 'var(--color-warning)', opacity: '0.2', color: 'var(--color-warning)', borderColor: 'var(--color-warning)' }}>
              ⭐ Destacado
            </span>
          )}
          {guide.isNew && (
            <span className="px-2 py-1 text-xs font-medium rounded-full border" style={{ backgroundColor: 'var(--color-success)', opacity: '0.2', color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>
              🆕 Nuevo
            </span>
          )}
          <span className={`px-2 py-1 text-xs font-medium rounded-full border`} style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
            {guide.type}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <img src={guide.icon} alt={guide.name} className="w-10 h-10 rounded-lg border-2" style={{ borderColor: 'var(--color-border)' }} />
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{guide.name}</h3>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
            <i className="fas fa-sync-alt"></i>
            Actualizado: {guide.updated}
          </span>
          <span className="text-xs theme-text-secondary flex items-center gap-1">
            <i className="fas fa-clock"></i>
            {guide.estimatedTime}
          </span>
        </div>
        
        <h4 className="text-lg font-bold theme-text-primary mb-3">{guide.meta}</h4>
        <p className="text-sm theme-text-secondary mb-4 line-clamp-3">{guide.description}</p>
        
        {/* Author and difficulty */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs theme-text-secondary">
            por <span style={{ color: 'var(--color-primary)' }}>{guide.author}</span>
          </span>
          <span className={`text-xs px-2 py-1 rounded-full`} style={{
            backgroundColor: guide.difficulty === 'beginner' ? 'var(--color-success)' :
                           guide.difficulty === 'intermediate' ? 'var(--color-warning)' : 'var(--color-error)',
            opacity: '0.2',
            color: guide.difficulty === 'beginner' ? 'var(--color-success)' :
                   guide.difficulty === 'intermediate' ? 'var(--color-warning)' : 'var(--color-error)'
          }}>
            {guide.difficulty === 'beginner' ? 'Principiante' :
             guide.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
          </span>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs theme-text-secondary">
          <span className="flex items-center gap-1">
            <i className="fas fa-eye"></i>
            {guide.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-download"></i>
            {guide.downloads.toLocaleString()}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {guide.tags.map((tag, i) => (
            <span key={i} className={`px-2 py-1 text-xs rounded-full`} style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2', color: 'var(--color-primary)' }}>
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2">
            <button
              onClick={handleView}
              className="text-sm font-medium flex items-center gap-2 transition-colors animate-theme-hover theme-text-primary hover:theme-text-primary"
            >
              Ver guía completa
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
            <button
              onClick={handleDownload}
              className="text-sm font-medium flex items-center gap-2 transition-colors animate-theme-hover"
              style={{ color: 'var(--color-info)' }}
            >
              <i className="fas fa-download text-xs"></i>
              Descargar
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-warning)' }}>
              {renderStars(guide.rating)}
              <span className="ml-1">{guide.rating}</span>
            </div>
            <button
              onClick={() => handleRate(guide.rating)}
              className="text-xs transition-colors animate-theme-hover"
              style={{ color: 'var(--color-text-secondary)' }}
              title="Calificar"
            >
              <i className="fas fa-star"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 