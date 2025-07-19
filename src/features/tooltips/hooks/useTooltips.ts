"use client";

import { useState, useEffect } from 'react';
import { TooltipPreferences, UseTooltipsReturn } from '../types/tooltip.types';
import { tooltipSteps, defaultPreferences, getTooltipsBySection } from '../constants/tooltip-steps';

export function useTooltips(): UseTooltipsReturn {
  const [tooltipsSeen, setTooltipsSeen] = useState<Set<string>>(new Set());
  const [preferences, setPreferences] = useState<TooltipPreferences>(defaultPreferences);

  // Cargar estado desde localStorage
  useEffect(() => {
    const savedSeen = localStorage.getItem('aethra-tooltips-seen');
    const savedPreferences = localStorage.getItem('aethra-tooltips-preferences');

    if (savedSeen) {
      try {
        const seenArray = JSON.parse(savedSeen);
        setTooltipsSeen(new Set(seenArray));
      } catch (error) {
        console.error('Error loading tooltips seen:', error);
      }
    }

    if (savedPreferences) {
      try {
        const parsedPreferences = JSON.parse(savedPreferences);
        setPreferences({ ...defaultPreferences, ...parsedPreferences });
      } catch (error) {
        console.error('Error loading tooltip preferences:', error);
      }
    }
  }, []);

  // Guardar estado en localStorage
  useEffect(() => {
    localStorage.setItem('aethra-tooltips-seen', JSON.stringify(Array.from(tooltipsSeen)));
  }, [tooltipsSeen]);

  useEffect(() => {
    localStorage.setItem('aethra-tooltips-preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Marcar tooltip como visto
  const markTooltipAsSeen = (tooltipId: string) => {
    setTooltipsSeen(prev => new Set([...prev, tooltipId]));
  };

  // Verificar si un tooltip debe mostrarse
  const shouldShowTooltip = (tooltipId: string): boolean => {
    if (!preferences.showTooltips) return false;
    return !tooltipsSeen.has(tooltipId);
  };

  // Verificar si un tooltip está visible (para animaciones)
  const isTooltipVisible = (tooltipId: string): boolean => {
    return shouldShowTooltip(tooltipId);
  };

  // Actualizar preferencias
  const updatePreferences = (newPreferences: Partial<TooltipPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  // Resetear tooltips (para volver a mostrarlos)
  const resetTooltips = () => {
    setTooltipsSeen(new Set());
  };

  return {
    tooltipsSeen,
    preferences,
    markTooltipAsSeen,
    isTooltipVisible,
    updatePreferences,
    resetTooltips,
    shouldShowTooltip,
    getTooltipsBySection,
  };
}

// Re-exportar funciones helper
export { getTooltipsBySection } from '../constants/tooltip-steps'; 