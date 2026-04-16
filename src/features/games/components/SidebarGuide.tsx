import React from 'react';
import { SidebarGuideProps } from '../types/games.types';

export default function SidebarGuide({ sections, updates, downloadLabel, onDownload, onSectionClick }: SidebarGuideProps) {
  const handleSectionClick = (sectionId: string) => {
    onSectionClick?.(sectionId);
  };

  const handleDownload = () => {
    onDownload?.();
  };

  return (
    <div className="module-card p-6 sticky-sidebar">
      <h3 className="module-text-title text-lg mb-4 flex items-center gap-2">
        <i className="fas fa-list-ul text-theme-primary"></i>
        Índice
      </h3>
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => handleSectionClick(section.id)}
              className={`w-full text-left index-link transition-all flex items-center gap-2 px-3 py-2 rounded-lg animate-theme-hover ${
                section.isActive 
                  ? 'text-theme-primary bg-theme-surface-hover' 
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-surface-hover'
              }`}
            >
              {section.icon && <i className={section.icon + ' text-xs'}></i>}
              {section.label}
            </button>
          </li>
        ))}
      </ul>
      
      {updates && (
        <div className="mt-8 pt-6 border-t theme-border">
          <h3 className="module-text-title text-lg mb-4 flex items-center gap-2">
            <i className="fas fa-history text-theme-primary"></i>
            Actualizaciones
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-theme-secondary">
              <span className="text-theme-primary">Última actualización:</span> {updates.last}
            </p>
            {updates.next && (
              <p className="text-sm theme-text-secondary">
                Próxima actualización estimada: {updates.next}
              </p>
            )}
            {updates.version && (
              <p className="text-sm theme-text-secondary">
                <span className="text-theme-accent">Versión:</span> {updates.version}
              </p>
            )}
          </div>
        </div>
      )}
      
      {downloadLabel && (
        <div className="mt-8 pt-6 border-t theme-border">
          <h3 className="module-text-title text-lg mb-4 flex items-center gap-2">
            <i className="fas fa-download text-theme-primary"></i>
            Descargar Guía
          </h3>
          <button 
            onClick={handleDownload}
            className="module-btn module-btn-primary w-full"
          >
            <i className="fas fa-file-pdf"></i>
            {downloadLabel}
          </button>
        </div>
      )}
    </div>
  );
} 