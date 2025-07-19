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
    <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60 sticky-sidebar">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <i className="fas fa-list-ul text-purple-300"></i>
        Índice
      </h3>
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => handleSectionClick(section.id)}
              className={`w-full text-left index-link transition-all flex items-center gap-2 px-3 py-2 rounded-lg ${
                section.isActive 
                  ? 'text-white bg-purple-600/30' 
                  : 'text-gray-400 hover:text-white hover:bg-purple-900/30'
              }`}
            >
              {section.icon && <i className={section.icon + ' text-xs'}></i>}
              {section.label}
            </button>
          </li>
        ))}
      </ul>
      
      {updates && (
        <div className="mt-8 pt-6 border-t border-purple-900/50">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-history text-purple-300"></i>
            Actualizaciones
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              <span className="text-purple-300">Última actualización:</span> {updates.last}
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
        <div className="mt-8 pt-6 border-t border-purple-900/50">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-download text-purple-300"></i>
            Descargar Guía
          </h3>
          <button 
            onClick={handleDownload}
            className="w-full px-4 py-2 bg-purple-600/50 hover:bg-purple-600 text-white rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-file-pdf"></i>
            {downloadLabel}
          </button>
        </div>
      )}
    </div>
  );
} 