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
    <div className="cuadro rounded-2xl p-6 sticky-sidebar">
      <h3 className="text-lg font-bold text-theme-primary mb-4 flex items-center gap-2">
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
        <div className="mt-8 pt-6 border-t border-theme">
          <h3 className="text-lg font-bold text-theme-primary mb-4 flex items-center gap-2">
            <i className="fas fa-history text-theme-primary"></i>
            Actualizaciones
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-theme-secondary">
              <span className="text-theme-primary">Última actualización:</span> {updates.last}
            </p>
            {updates.next && (
              <p className="text-sm text-gray-400">
                Próxima actualización estimada: {updates.next}
              </p>
            )}
            {updates.version && (
              <p className="text-sm text-gray-400">
                <span className="text-purple-300">Versión:</span> {updates.version}
              </p>
            )}
          </div>
        </div>
      )}
      
      {downloadLabel && (
        <div className="mt-8 pt-6 border-t border-theme">
          <h3 className="text-lg font-bold text-theme-primary mb-4 flex items-center gap-2">
            <i className="fas fa-download text-theme-primary"></i>
            Descargar Guía
          </h3>
          <button 
            onClick={handleDownload}
            className="w-full px-4 py-2 text-theme-primary rounded-lg transition-all flex items-center justify-center gap-2 animate-theme-hover animate-theme-glow" style={{ background: 'var(--gradient-primary)' }}
          >
            <i className="fas fa-file-pdf"></i>
            {downloadLabel}
          </button>
        </div>
      )}
    </div>
  );
} 