/**
 * Utilidades para el sistema de temas mejorado
 * Optimizado para NextJS con TypeScript
 */

import { Theme } from '../hooks/useTheme';

// Tipos de utilidades de tema
export type ThemeComponent = 
  | 'navbar' 
  | 'chat' 
  | 'notification' 
  | 'cuadro' 
  | 'animation' 
  | 'button' 
  | 'card';

export type ThemeColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'text' 
  | 'background' 
  | 'surface' 
  | 'border' 
  | 'hover';

// Clases CSS predefinidas para componentes temáticos
export const themeClasses = {
  // Navbar
  navbar: {
    container: 'theme-navbar backdrop-blur-lg border-b transition-all duration-300',
    brand: 'text-theme-primary font-extrabold glow-text',
    link: 'nav-link px-3 py-2 animate-theme-hover rounded',
    active: 'text-theme-primary bg-theme-surface-hover',
    inactive: 'text-theme-secondary hover:text-theme-primary'
  },
  
  // Chat
  chat: {
    container: 'chat-container rounded-2xl overflow-hidden',
    message: 'chat-message rounded transition-all',
    input: 'chat-input rounded-lg border transition-all'
  },
  
  // Cuadros/Cards  
  cuadro: {
    base: 'cuadro rounded transition-all',
    hover: 'cuadro-hover animate-theme-hover',
    gaming: 'card-gaming rounded-2xl animate-theme-glow'
  },
  
  // Botones
  button: {
    primary: 'btn btn-primary animate-theme-hover',
    gaming: 'btn btn-gaming animate-theme-glow',
    outline: 'btn btn-outline-primary animate-theme-hover'
  },
  
  // Notificaciones
  notification: {
    base: 'notification rounded animate-theme-glow',
    bell: 'notification-bell animate-theme-hover'
  },
  
  // Animaciones
  animation: {
    hover: 'animate-theme-hover',
    glow: 'animate-theme-glow',
    pulse: 'animate-theme'
  }
} as const;

// Función para obtener clases CSS basadas en el estado
export const getThemeClasses = (
  component: ThemeComponent,
  variant?: string,
  isActive?: boolean
): string => {
  const componentClasses = themeClasses[component];
  
  if (!componentClasses) {
    return 'text-theme-primary';
  }
  
  if (typeof componentClasses === 'string') {
    return componentClasses;
  }
  
  if (variant && variant in componentClasses) {
    return componentClasses[variant as keyof typeof componentClasses] as string;
  }
  
  // Para navbar links con estado activo/inactivo
  if (component === 'navbar' && typeof isActive === 'boolean') {
    const baseClass = componentClasses.link;
    const stateClass = isActive ? componentClasses.active : componentClasses.inactive;
    return `${baseClass} ${stateClass}`;
  }
  
  return componentClasses.base || 'text-theme-primary';
};

// Función para aplicar variables CSS de tema dinámicamente
export const applyThemeVariables = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  
  // Batch DOM updates for better performance
  requestAnimationFrame(() => {
    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Apply gradient variables
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });

    // Apply component-specific colors
    const componentColors = {
      navbar: theme.colors.surface,
      'navbar-text': theme.colors.text,
      'navbar-hover': theme.colors.primary,
      chat: theme.colors.surface,
      'chat-text': theme.colors.text,
      'chat-border': theme.colors.border,
      notification: theme.colors.primary,
      'notification-text': theme.colors.text,
      'notification-bg': theme.colors.surface,
      animation: theme.colors.primary,
      cuadro: theme.colors.surface,
      'cuadro-border': theme.colors.border,
      'cuadro-text': theme.colors.text
    };

    Object.entries(componentColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  });
};

// Función para generar estilos CSS dinámicos
export const generateThemeStyles = (theme: Theme): Record<string, React.CSSProperties> => {
  return {
    background: {
      background: `var(--gradient-background, ${theme.gradients.background})`
    },
    
    surface: {
      backgroundColor: `var(--color-surface, ${theme.colors.surface})`,
      color: `var(--color-text, ${theme.colors.text})`,
      borderColor: `var(--color-border, ${theme.colors.border})`
    },
    
    primary: {
      color: `var(--color-primary, ${theme.colors.primary})`
    },
    
    glow: {
      boxShadow: `0 0 20px var(--color-primary, ${theme.colors.primary})`
    },
    
    border: {
      borderColor: `var(--color-border, ${theme.colors.border})`
    }
  };
};

// Hook personalizado para obtener estilos de tema
export const useThemeStyles = (theme: Theme) => {
  return {
    styles: generateThemeStyles(theme),
    classes: themeClasses,
    getClasses: getThemeClasses
  };
};

// Constantes para componentes optimizados
export const THEME_CONSTANTS = {
  ANIMATION_DURATION: 'var(--animation-duration, 0.3s)',
  BORDER_RADIUS: 'var(--radius-md, 0.5rem)',
  SHADOW_GLOW: 'var(--shadow-glow)',
  TRANSITION_ALL: 'all var(--animation-duration) var(--animation-ease)'
} as const;

// Tipos para props de componentes temáticos
export interface ThemeProps {
  theme?: 'light' | 'dark' | 'auto';
  variant?: 'primary' | 'secondary' | 'accent';
  animated?: boolean;
  glow?: boolean;
}

// Función para optimizar clases CSS (eliminar duplicados y ordenar)
export const optimizeClasses = (...classes: (string | undefined | false)[]): string => {
  return classes
    .filter(Boolean)
    .join(' ')
    .split(' ')
    .filter((cls, index, arr) => cls && arr.indexOf(cls) === index)
    .join(' ');
};

export default {
  themeClasses,
  getThemeClasses,
  applyThemeVariables,
  generateThemeStyles,
  useThemeStyles,
  optimizeClasses,
  THEME_CONSTANTS
};