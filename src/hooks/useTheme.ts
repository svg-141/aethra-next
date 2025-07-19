"use client";

import { useState, useEffect } from 'react';

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

  // Aplicar tema al DOM
  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar colores CSS variables
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Aplicar gradientes
    Object.entries(currentTheme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });

    // Aplicar preferencias de accesibilidad
    if (userPreferences.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.1s');
    } else {
      root.style.setProperty('--animation-duration', '0.3s');
    }

    if (userPreferences.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Aplicar tamaño de fuente
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    root.style.setProperty('--font-size-base', fontSizeMap[userPreferences.fontSize]);

    // Aplicar modo compacto
    if (userPreferences.compactMode) {
      root.classList.add('compact-mode');
    } else {
      root.classList.remove('compact-mode');
    }

    // Aplicar animaciones
    if (!userPreferences.animations) {
      root.classList.add('no-animations');
    } else {
      root.classList.remove('no-animations');
    }

  }, [currentTheme, userPreferences]);

  // Cambiar tema
  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      updatePreferences({ theme: themeId });
    }
  };

  // Actualizar preferencias
  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    const updated = { ...userPreferences, ...newPreferences };
    setUserPreferences(updated);
    
    // Guardar en localStorage
    localStorage.setItem('aethra-theme-preferences', JSON.stringify(updated));
  };

  // Resetear a valores por defecto
  const resetToDefault = () => {
    setUserPreferences(defaultPreferences);
    setCurrentTheme(themes[0]);
    localStorage.removeItem('aethra-theme-preferences');
  };

  return {
    currentTheme,
    userPreferences,
    availableThemes: themes,
    setTheme,
    updatePreferences,
    resetToDefault,
  };
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