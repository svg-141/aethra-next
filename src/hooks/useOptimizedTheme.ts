/**
 * Hook optimizado para manejo de temas con mejor performance
 */
"use client";

import { useCallback, useEffect, useMemo } from 'react';
import { useThemeContext } from '../context/ThemeContext';
import { applyThemeVariables, generateThemeStyles } from '../utils/theme-utils';
import { Theme } from './useTheme';

// Custom hook para optimizar el uso de temas
export const useOptimizedTheme = () => {
  const { 
    currentTheme, 
    userPreferences, 
    availableThemes, 
    setTheme, 
    updatePreferences,
    resetToDefault,
    isLoading 
  } = useThemeContext();

  // Memoizar los estilos generados para evitar recálculos
  const themeStyles = useMemo(() => 
    generateThemeStyles(currentTheme), 
    [currentTheme]
  );

  // Aplicar variables CSS cuando cambie el tema
  useEffect(() => {
    if (!isLoading) {
      applyThemeVariables(currentTheme);
    }
  }, [currentTheme, isLoading]);

  // Función optimizada para cambio de tema con debouncing
  const optimizedSetTheme = useCallback((themeId: string) => {
    // Verificar si el tema ya está activo para evitar re-renders innecesarios
    if (currentTheme.id === themeId) return;
    
    // Aplicar el tema
    setTheme(themeId);
  }, [currentTheme.id, setTheme]);

  // Función para obtener el tema por ID de forma optimizada
  const getThemeById = useCallback((themeId: string): Theme | undefined => {
    return availableThemes.find(theme => theme.id === themeId);
  }, [availableThemes]);

  // Función para verificar si un tema está disponible
  const isThemeAvailable = useCallback((themeId: string): boolean => {
    return availableThemes.some(theme => theme.id === themeId);
  }, [availableThemes]);

  // Hook para obtener el siguiente tema en la lista
  const getNextTheme = useCallback((): Theme => {
    const currentIndex = availableThemes.findIndex(theme => theme.id === currentTheme.id);
    const nextIndex = (currentIndex + 1) % availableThemes.length;
    return availableThemes[nextIndex];
  }, [availableThemes, currentTheme.id]);

  // Hook para obtener el tema anterior en la lista
  const getPreviousTheme = useCallback((): Theme => {
    const currentIndex = availableThemes.findIndex(theme => theme.id === currentTheme.id);
    const previousIndex = currentIndex === 0 ? availableThemes.length - 1 : currentIndex - 1;
    return availableThemes[previousIndex];
  }, [availableThemes, currentTheme.id]);

  // Función para cambiar al siguiente tema
  const switchToNextTheme = useCallback(() => {
    const nextTheme = getNextTheme();
    optimizedSetTheme(nextTheme.id);
  }, [getNextTheme, optimizedSetTheme]);

  // Función para cambiar al tema anterior
  const switchToPreviousTheme = useCallback(() => {
    const previousTheme = getPreviousTheme();
    optimizedSetTheme(previousTheme.id);
  }, [getPreviousTheme, optimizedSetTheme]);

  // Función para obtener clases CSS optimizadas
  const getThemeClasses = useCallback((...classes: string[]) => {
    return classes
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }, []);

  // Retornar API optimizada
  return useMemo(() => ({
    // Estado del tema
    currentTheme,
    userPreferences,
    availableThemes,
    isLoading,
    
    // Estilos pre-computados
    styles: themeStyles,
    
    // Funciones optimizadas
    setTheme: optimizedSetTheme,
    updatePreferences,
    resetToDefault,
    
    // Funciones de utilidad
    getThemeById,
    isThemeAvailable,
    getNextTheme,
    getPreviousTheme,
    switchToNextTheme,
    switchToPreviousTheme,
    getThemeClasses,
    
    // Estado de conveniencia
    isDarkMode: currentTheme.colors.background.includes('0') || currentTheme.colors.background.includes('#0'),
    isHighContrast: userPreferences.highContrast,
    isAnimationsEnabled: userPreferences.animations,
    isCompactMode: userPreferences.compactMode,
  }), [
    currentTheme,
    userPreferences,
    availableThemes,
    isLoading,
    themeStyles,
    optimizedSetTheme,
    updatePreferences,
    resetToDefault,
    getThemeById,
    isThemeAvailable,
    getNextTheme,
    getPreviousTheme,
    switchToNextTheme,
    switchToPreviousTheme,
    getThemeClasses
  ]);
};

export default useOptimizedTheme;