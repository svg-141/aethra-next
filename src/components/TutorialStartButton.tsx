'use client';

import React from 'react';

interface TutorialStartButtonProps {
  onStart: () => void;
  isActive: boolean;
}

export default function TutorialStartButton({ onStart, isActive }: TutorialStartButtonProps) {
  if (isActive) {
    return null;
  }

  return (
    <div className="mt-8 pt-6 border-t border-theme">
      <h3 className="text-lg font-bold text-theme-primary mb-4 flex items-center gap-2">
        <i className="fas fa-graduation-cap text-theme-primary"></i>
        Tutorial Interactivo
      </h3>
      <button
        onClick={onStart}
        className="w-full px-4 py-3 text-theme-primary rounded-lg transition-all flex items-center justify-center gap-2 font-medium animate-theme-hover animate-theme-glow" style={{ background: 'var(--gradient-primary)' }}
      >
        <i className="fas fa-play"></i>
        Iniciar Tutorial Guiado
      </button>
      <p className="text-xs text-theme-secondary mt-2 text-center">
        Recorre paso a paso las secciones más importantes de la guía
      </p>
    </div>
  );
}