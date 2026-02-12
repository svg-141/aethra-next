import React from 'react';
import { HeroSectionProps } from '../types/ui.types';

export default function HeroSection({
  image,
  gradient,
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
    <div className={`relative rounded-4 overflow-hidden shadow-theme-lg animate-theme-hover ${className || ''}`} style={{ height: '450px' }}>
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          filter: 'blur(4px) brightness(0.7)',
          transform: 'scale(1.05)',
        }}
      />
      
      {/* Overlay Gradient */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: gradient
            ? `linear-gradient(135deg, ${gradient})`
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))',
        }}
      />

      {/* Decorative Pattern */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 2%, transparent 0%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 2%, transparent 0%)',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Glassmorphism panel */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(var(--color-surface-rgb), 0.6)',
          borderTop: '1px solid rgba(var(--color-border-rgb), 0.2)',
          borderBottomLeftRadius: '1rem',
          borderBottomRightRadius: '1rem',
        }}
      >
        <div className="p-4">
          {children}
          <h1 className="text-4xl md:text-5xl font-bold text-theme-primary mb-3 glow-text animate-fade-in-down">{title}</h1>
          {subtitle && <p className="text-lg text-theme-secondary mb-4" style={{ maxWidth: '600px' }}>{subtitle}</p>}
          
          {actionLabel && onAction && (
            <button
              onClick={handleAction}
              className="btn btn-gaming btn-lg inline-flex items-center gap-2 animate-fade-in-up"
            >
              {actionIcon && <i className={actionIcon}></i>}
              {actionLabel}
            </button>
          )}
        </div>
      </div>
      
      {badge && (
        <div className="absolute top-0 right-0 m-4">
          <span className={`badge badge-gaming text-sm ${badgeColor || ''} animate-fade-in`}>
            {badge}
          </span>
        </div>
      )}
    </div>
  );
}
 