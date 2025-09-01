"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme, UserPreferences } from '../hooks/useTheme';

interface ThemeContextType {
  currentTheme: Theme;
  userPreferences: UserPreferences;
  availableThemes: Theme[];
  setTheme: (themeId: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  resetToDefault: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Enhanced themes with better performance
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

const defaultPreferences: UserPreferences = {
  theme: 'aethra-purple',
  fontSize: 'medium',
  animations: true,
  compactMode: false,
  highContrast: false,
  reducedMotion: false,
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from localStorage
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const saved = localStorage.getItem('aethra-theme-preferences');
        if (saved) {
          const parsed = JSON.parse(saved);
          setUserPreferences(parsed);
          
          const theme = themes.find(t => t.id === parsed.theme) || themes[0];
          setCurrentTheme(theme);
        }
      } catch (error) {
        console.error('Error loading theme preferences:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, []);

  // Apply theme to DOM with optimization
  useEffect(() => {
    if (isLoading) return;

    const applyTheme = () => {
      const root = document.documentElement;
      
      // Batch all DOM updates
      requestAnimationFrame(() => {
        // Apply color variables
        Object.entries(currentTheme.colors).forEach(([key, value]) => {
          root.style.setProperty(`--color-${key}`, value);
        });

        // Apply gradient variables
        Object.entries(currentTheme.gradients).forEach(([key, value]) => {
          root.style.setProperty(`--gradient-${key}`, value);
        });

        // Apply enhanced theme-specific colors
        root.style.setProperty('--color-navbar', currentTheme.colors.surface);
        root.style.setProperty('--color-navbar-text', currentTheme.colors.text);
        root.style.setProperty('--color-navbar-hover', currentTheme.colors.primary);
        root.style.setProperty('--color-chat', currentTheme.colors.surface);
        root.style.setProperty('--color-chat-text', currentTheme.colors.text);
        root.style.setProperty('--color-chat-border', currentTheme.colors.border);
        root.style.setProperty('--color-notification', currentTheme.colors.primary);
        root.style.setProperty('--color-notification-text', currentTheme.colors.text);
        root.style.setProperty('--color-notification-bg', currentTheme.colors.surface);
        root.style.setProperty('--color-animation', currentTheme.colors.primary);
        root.style.setProperty('--color-cuadro', currentTheme.colors.surface);
        root.style.setProperty('--color-cuadro-border', currentTheme.colors.border);
        root.style.setProperty('--color-cuadro-text', currentTheme.colors.text);

        // Apply user preferences
        const fontSizeMap = {
          small: '14px',
          medium: '16px',
          large: '18px',
        };

        root.style.setProperty('--font-size-base', fontSizeMap[userPreferences.fontSize]);
        root.style.setProperty('--animation-duration', 
          userPreferences.reducedMotion ? '0.1s' : '0.3s'
        );

        // Apply class-based preferences
        const classUpdates = {
          'high-contrast': userPreferences.highContrast,
          'compact-mode': userPreferences.compactMode,
          'no-animations': !userPreferences.animations,
        };

        Object.entries(classUpdates).forEach(([className, shouldAdd]) => {
          if (shouldAdd) {
            root.classList.add(className);
          } else {
            root.classList.remove(className);
          }
        });

        // Set theme meta for better performance
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
          metaTheme.setAttribute('content', currentTheme.colors.primary);
        } else {
          const meta = document.createElement('meta');
          meta.name = 'theme-color';
          meta.content = currentTheme.colors.primary;
          document.head.appendChild(meta);
        }
      });
    };

    applyTheme();
  }, [currentTheme, userPreferences, isLoading]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme && theme.id !== currentTheme.id) {
      setCurrentTheme(theme);
      updatePreferences({ theme: themeId });
    }
  };

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setUserPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      
      // Debounce localStorage writes
      setTimeout(() => {
        localStorage.setItem('aethra-theme-preferences', JSON.stringify(updated));
      }, 100);
      
      return updated;
    });
  };

  const resetToDefault = () => {
    setUserPreferences(defaultPreferences);
    setCurrentTheme(themes[0]);
    localStorage.removeItem('aethra-theme-preferences');
  };

  const value: ThemeContextType = {
    currentTheme,
    userPreferences,
    availableThemes: themes,
    setTheme,
    updatePreferences,
    resetToDefault,
    isLoading,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}