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
        className={`fas fa-star text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-500'}`}
      />
    ));
  };

  return (
    <div className={`guide-card flex flex-col bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl overflow-hidden border border-purple-900/60 hover:border-${guide.typeColor}-500/40 transition-all duration-300 hover:shadow-[0_0_30px_#${guide.typeColor}0030] group h-full`}>
      <div className="relative h-48 bg-[#1e0b36] overflow-hidden flex-shrink-0">
        <img src={guide.image} alt={`Guía ${guide.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {guide.isFeatured && (
            <span className="px-2 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
              ⭐ Destacado
            </span>
          )}
          {guide.isNew && (
            <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
              🆕 Nuevo
            </span>
          )}
          <span className={`px-2 py-1 text-xs font-medium bg-${guide.typeColor}-500/20 text-${guide.typeColor}-300 rounded-full border border-${guide.typeColor}-500/30`}>
            {guide.type}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <img src={guide.icon} alt={guide.name} className="w-10 h-10 rounded-lg border-2 border-white/20" />
          <h3 className="text-xl font-bold text-white">{guide.name}</h3>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-purple-300 flex items-center gap-1">
            <i className="fas fa-sync-alt"></i>
            Actualizado: {guide.updated}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <i className="fas fa-clock"></i>
            {guide.estimatedTime}
          </span>
        </div>
        
        <h4 className="text-lg font-bold text-white mb-3">{guide.meta}</h4>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{guide.description}</p>
        
        {/* Author and difficulty */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-400">
            por <span className="text-purple-300">{guide.author}</span>
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            guide.difficulty === 'beginner' ? 'bg-green-500/20 text-green-300' :
            guide.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-red-500/20 text-red-300'
          }`}>
            {guide.difficulty === 'beginner' ? 'Principiante' :
             guide.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
          </span>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
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
            <span key={i} className={`px-2 py-1 text-xs bg-${guide.typeColor}-900/20 text-${guide.typeColor}-300 rounded-full`}>
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2">
            <button
              onClick={handleView}
              className="text-purple-300 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
            >
              Ver guía completa
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
            <button
              onClick={handleDownload}
              className="text-blue-300 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <i className="fas fa-download text-xs"></i>
              Descargar
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-yellow-400">
              {renderStars(guide.rating)}
              <span className="ml-1">{guide.rating}</span>
            </div>
            <button
              onClick={() => handleRate(guide.rating)}
              className="text-xs text-gray-400 hover:text-yellow-400 transition-colors"
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