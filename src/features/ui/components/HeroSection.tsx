import React from 'react';
import { HeroSectionProps } from '../types/ui.types';

export default function HeroSection({ 
  image, 
  title, 
  subtitle, 
  badge, 
  badgeColor, 
  children, 
  className,
  onAction,
  actionLabel,
  actionIcon
}: HeroSectionProps) {
  const handleAction = () => {
    onAction?.();
  };

  return (
    <div className={`relative h-96 rounded-2xl overflow-hidden ${className || ''}`}>
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-8 w-full">
        {children}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
        {subtitle && <p className="text-lg text-purple-300 max-w-2xl mb-4">{subtitle}</p>}
        
        {actionLabel && onAction && (
          <button
            onClick={handleAction}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            {actionIcon && <i className={actionIcon}></i>}
            {actionLabel}
          </button>
        )}
      </div>
      
      {badge && (
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-sm font-medium ${badgeColor || 'bg-purple-500/20 text-purple-300 border-purple-500/30'} rounded-full border`}>
            {badge}
          </span>
        </div>
      )}
    </div>
  );
} 