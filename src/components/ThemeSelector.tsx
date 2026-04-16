"use client";

import { useState, useCallback, memo, useMemo } from 'react';
import { useThemeContext } from '../context/ThemeContext';
import { Theme } from '../context/ThemeContext';
import { useTooltips } from '../features/tooltips';

function ThemeSelector() {
  const { currentTheme, userPreferences, availableThemes, setTheme, updatePreferences, resetToDefault, isLoading } = useThemeContext();
  const { preferences: tooltipPreferences, updatePreferences: updateTooltipPreferences, resetTooltips } = useTooltips();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'themes' | 'accessibility' | 'display' | 'help'>('themes');

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 theme-bg-surface rounded-lg border theme-border">
        <i className="fas fa-spinner fa-spin theme-text-secondary"></i>
        <span className="hidden sm:inline theme-text-secondary">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => updatePreferences({ theme: userPreferences.theme === 'light' ? 'dark' : 'light' })}
        className="relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        style={{
          backgroundColor: userPreferences.theme === 'light' ? '#e0f2fe' : '#140014',
          border: `1px solid ${userPreferences.theme === 'light' ? '#00e5ff' : '#ff0055'}`,
          boxShadow: userPreferences.theme === 'light' ? '0 0 10px rgba(0, 229, 255, 0.3)' : '0 0 10px rgba(255, 0, 85, 0.3)'
        }}
        title="Alternar Modo Neón"
      >
        <span className="sr-only">Modo {userPreferences.theme === 'light' ? 'Oscuro' : 'Claro'}</span>
        <span
          className={`absolute left-1 top-1 flex items-center justify-center w-6 h-6 rounded-full transition-transform duration-300 ${
            userPreferences.theme === 'light' 
              ? 'transform translate-x-8 bg-white' 
              : 'transform translate-x-0 bg-[#ff0055]'
          }`}
        >
          {userPreferences.theme === 'light' ? (
            <i className="fas fa-sun text-yellow-500 text-xs"></i>
          ) : (
            <i className="fas fa-moon text-white text-xs"></i>
          )}
        </span>
      </button>
    </div>
  );
}
export default memo(ThemeSelector); 