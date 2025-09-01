"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    background: string;
  };
  preview: string; // URL de imagen de preview
}

export interface UserPreferences {
  theme: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  compactMode: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}

interface UseThemeReturn {
  currentTheme: Theme;
  userPreferences: UserPreferences;
  availableThemes: Theme[];
  setTheme: (themeId: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetToDefault: () => void;
}

// Temas disponibles
const themes: Theme[] = [
  {
    id: 'aethra-purple',
    name: 'Aethra Purple',
    description: 'Tema oficial de Aethra con gradientes púrpura y rosa',
    colors: {
      primary: '#8B5CF6',
      secondary: '#EC4899',
      accent: '#F59E0B',
      background: '#0F0720',
      surface: '#1A0933',
      text: '#FFFFFF',
      textSecondary: '#9CA3AF',
      border: '#374151',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    gradients: {
      primary: 'from-purple-600 to-pink-600',
      secondary: 'from-indigo-600 to-purple-600',
      background: 'from-[#0F0720] to-[#1A0933]',
    },
    preview: '/assets/themes/aethra-purple.png',
  },
  {
    id: 'cyber-blue',
    name: 'Cyber Blue',
    description: 'Tema futurista con tonos azules y cian',
    colors: {
      primary: '#3B82F6',
      secondary: '#06B6D4',
      accent: '#10B981',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F8FAFC',
      textSecondary: '#94A3B8',
      border: '#334155',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    gradients: {
      primary: 'from-blue-600 to-cyan-600',
      secondary: 'from-indigo-600 to-blue-600',
      background: 'from-[#0F172A] to-[#1E293B]',
    },
    preview: '/assets/themes/cyber-blue.png',
  },
  {
    id: 'neon-green',
    name: 'Neon Green',
    description: 'Tema vibrante con verde neón y negro',
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#F59E0B',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#9CA3AF',
      border: '#374151',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    gradients: {
      primary: 'from-green-500 to-emerald-600',
      secondary: 'from-green-600 to-teal-600',
      background: 'from-[#0A0A0A] to-[#1A1A1A]',
    },
    preview: '/assets/themes/neon-green.png',
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    description: 'Tema cálido con naranjas y rojos',
    colors: {
      primary: '#F97316',
      secondary: '#EF4444',
      accent: '#F59E0B',
      background: '#1C1917',
      surface: '#292524',
      text: '#FFFFFF',
      textSecondary: '#D6D3D1',
      border: '#57534E',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    gradients: {
      primary: 'from-orange-500 to-red-600',
      secondary: 'from-red-600 to-pink-600',
      background: 'from-[#1C1917] to-[#292524]',
    },
    preview: '/assets/themes/sunset-orange.png',
  },
  {
    id: 'dark-minimal',
    name: 'Dark Minimal',
    description: 'Tema minimalista en tonos grises',
    colors: {
      primary: '#6B7280',
      secondary: '#9CA3AF',
      accent: '#F59E0B',
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textSecondary: '#D1D5DB',
      border: '#374151',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    gradients: {
      primary: 'from-gray-600 to-gray-700',
      secondary: 'from-gray-700 to-gray-800',
      background: 'from-[#111827] to-[#1F2937]',
    },
    preview: '/assets/themes/dark-minimal.png',
  },
  {
    id: 'gaming-red',
    name: 'Gaming Red',
    description: 'Tema agresivo con rojos intensos para gaming competitivo',
    colors: {
      primary: '#DC2626',
      secondary: '#B91C1C',
      accent: '#F59E0B',
      background: '#0C0C0C',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#FCA5A5',
      border: '#7F1D1D',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    gradients: {
      primary: 'from-red-600 to-red-800',
      secondary: 'from-red-700 to-red-900',
      background: 'from-[#0C0C0C] to-[#1A1A1A]',
    },
    preview: '/assets/themes/gaming-red.png',
  },
  {
    id: 'esports-gold',
    name: 'Esports Gold',
    description: 'Tema premium con dorados y negros para campeones',
    colors: {
      primary: '#D97706',
      secondary: '#B45309',
      accent: '#10B981',
      background: '#0A0A0A',
      surface: '#1C1917',
      text: '#FFFFFF',
      textSecondary: '#FDE68A',
      border: '#78350F',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    gradients: {
      primary: 'from-amber-600 to-yellow-600',
      secondary: 'from-yellow-600 to-orange-600',
      background: 'from-[#0A0A0A] to-[#1C1917]',
    },
    preview: '/assets/themes/esports-gold.png',
  },
  {
    id: 'arctic-blue',
    name: 'Arctic Blue',
    description: 'Tema frío con azules glaciales y efectos cristalinos',
    colors: {
      primary: '#0EA5E9',
      secondary: '#0284C7',
      accent: '#10B981',
      background: '#0F1419',
      surface: '#1E293B',
      text: '#F0F9FF',
      textSecondary: '#BAE6FD',
      border: '#0369A1',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    gradients: {
      primary: 'from-sky-500 to-blue-600',
      secondary: 'from-blue-600 to-indigo-700',
      background: 'from-[#0F1419] to-[#1E293B]',
    },
    preview: '/assets/themes/arctic-blue.png',
  },
];

// Preferencias por defecto
const defaultPreferences: UserPreferences = {
  theme: 'aethra-purple',
  fontSize: 'medium',
  animations: true,
  compactMode: false,
  highContrast: false,
  reducedMotion: false,
};

export function useTheme(): UseThemeReturn {
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultPreferences);
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  // Cargar preferencias desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aethra-theme-preferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserPreferences(parsed);
        
        // Aplicar tema
        const theme = themes.find(t => t.id === parsed.theme) || themes[0];
        setCurrentTheme(theme);
      } catch (error) {
        console.error('Error loading theme preferences:', error);
      }
    }
  }, []);

  // Memoize font size mapping for performance
  const fontSizeMap = useMemo(() => ({
    small: '14px',
    medium: '16px',
    large: '18px',
  }), []);

  // Optimized theme application with batch DOM updates
  useEffect(() => {
    const root = document.documentElement;
    
    // Batch all DOM updates to minimize reflow/repaint
    requestAnimationFrame(() => {
      // Apply color CSS variables
      Object.entries(currentTheme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });

      // Apply gradients
      Object.entries(currentTheme.gradients).forEach(([key, value]) => {
        root.style.setProperty(`--gradient-${key}`, value);
      });

      // Apply animation duration based on preferences
      root.style.setProperty('--animation-duration', 
        userPreferences.reducedMotion ? '0.1s' : '0.3s'
      );

      // Apply font size
      root.style.setProperty('--font-size-base', fontSizeMap[userPreferences.fontSize]);

      // Batch class updates
      const classesToAdd = [];
      const classesToRemove = [];

      if (userPreferences.highContrast) {
        classesToAdd.push('high-contrast');
      } else {
        classesToRemove.push('high-contrast');
      }

      if (userPreferences.compactMode) {
        classesToAdd.push('compact-mode');
      } else {
        classesToRemove.push('compact-mode');
      }

      if (!userPreferences.animations) {
        classesToAdd.push('no-animations');
      } else {
        classesToRemove.push('no-animations');
      }

      // Apply all class changes at once
      root.classList.add(...classesToAdd);
      root.classList.remove(...classesToRemove);
    });
  }, [currentTheme, userPreferences, fontSizeMap]);

  // Optimized theme change with memoization
  const setTheme = useCallback((themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme && theme.id !== currentTheme.id) {
      setCurrentTheme(theme);
      updatePreferences({ theme: themeId });
    }
  }, [currentTheme.id]);

  // Optimized preferences update with debouncing
  const updatePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    setUserPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      
      // Debounce localStorage writes to avoid excessive I/O
      setTimeout(() => {
        localStorage.setItem('aethra-theme-preferences', JSON.stringify(updated));
      }, 100);
      
      return updated;
    });
  }, []);

  // Optimized reset with callback
  const resetToDefault = useCallback(() => {
    setUserPreferences(defaultPreferences);
    setCurrentTheme(themes[0]);
    localStorage.removeItem('aethra-theme-preferences');
  }, []);

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(() => ({
    currentTheme,
    userPreferences,
    availableThemes: themes,
    setTheme,
    updatePreferences,
    resetToDefault,
  }), [currentTheme, userPreferences, setTheme, updatePreferences, resetToDefault]);
}

// Funciones helper para aplicar estilos dinámicamente
export const applyThemeStyles = (theme: Theme) => {
  const root = document.documentElement;
  
  // Aplicar colores como CSS variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Aplicar gradientes
  Object.entries(theme.gradients).forEach(([key, value]) => {
    root.style.setProperty(`--gradient-${key}`, value);
  });
};

// Clases CSS para diferentes tamaños de fuente
export const fontSizeClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

// Clases CSS para modo compacto
export const compactModeClasses = {
  enabled: 'compact-mode',
  disabled: '',
}; 