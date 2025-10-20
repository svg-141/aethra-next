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
    <div className={`position-relative rounded-4 overflow-hidden shadow-theme-lg animate-theme-hover ${className || ''}`} style={{ height: '400px' }}>
      {/* Fondo con gradiente */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: gradient
            ? `linear-gradient(135deg, ${gradient})`
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))',
        }}
      />

      {/* Patrón decorativo */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 2%, transparent 0%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 2%, transparent 0%)',
          backgroundSize: '100px 100px'
        }}
      />

      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'var(--gradient-hero)' }}></div>
      
      <div className="position-absolute bottom-0 start-0 w-100 p-4 p-md-5">
        {children}
        <h1 className="display-4 fw-bold text-theme-primary mb-3 glow-text">{title}</h1>
        {subtitle && <p className="lead text-theme-secondary mb-4" style={{ maxWidth: '600px' }}>{subtitle}</p>}
        
        {actionLabel && onAction && (
          <button
            onClick={handleAction}
            className="btn btn-gaming btn-lg d-inline-flex align-items-center gap-2"
          >
            {actionIcon && <i className={actionIcon}></i>}
            {actionLabel}
          </button>
        )}
      </div>
      
      {badge && (
        <div className="position-absolute top-0 end-0 m-4">
          <span className={`badge badge-gaming fs-6 ${badgeColor || ''}`}>
            {badge}
          </span>
        </div>
      )}
    </div>
  );
} 