/**
 * Utilidades para el sistema de temas mejorado
 * Optimizado para NextJS con TypeScript
 */

import { Theme } from '../context/ThemeContext';

// Tipos de utilidades de tema
export type ThemeComponent =
  | 'navbar'
  | 'chat'
  | 'notification'
  | 'cuadro'
  | 'animation'
  | 'button'
  | 'card'
  | 'badge'
  | 'input'
  | 'text'
  | 'card-game'
  | 'card-profile'
  | 'card-guide';

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
    inactive: 'text-theme-secondary hover:text-theme-primary',
  },

  // Chat
  chat: {
    container: 'chat-container rounded-2xl overflow-hidden',
    message: 'chat-message rounded transition-all',
    input: 'chat-input rounded-lg border transition-all',
  },

  // Cuadros/Cards
  cuadro: {
    base: 'cuadro rounded transition-all',
    hover: 'cuadro-hover animate-theme-hover',
    gaming: 'card-gaming rounded-2xl animate-theme-glow',
  },

  // Botones
  button: {
    primary: 'theme-button',
    secondary: 'theme-button-hover theme-text-secondary hover:theme-text-primary',
    outline: 'btn-gradient-outline',
    ghost: 'theme-text-secondary hover:theme-text-primary hover:theme-bg-hover',
    gaming: 'theme-button-gaming',
    neon: 'theme-button-neon',
  },

  // Notificaciones
  notification: {
    base: 'notification rounded animate-theme-glow',
    bell: 'notification-bell animate-theme-hover',
  },

  // Animaciones
  animation: {
    hover: 'animate-theme-hover',
    glow: 'animate-theme-glow',
    pulse: 'animate-theme',
  },

  // Glow effects
  glow: {
    text: 'glow-text',
    textSubtle: 'glow-text-subtle',
    border: 'glow-border',
    borderSubtle: 'glow-border-subtle',
    hover: 'glow-hover',
    gameCard: 'glow-game-card',
  },

  // Badge variants
  badge: {
    default: 'theme-badge',
    success: 'theme-badge bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'theme-badge bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    error: 'theme-badge bg-red-500/20 text-red-300 border-red-500/30',
    info: 'theme-badge bg-blue-500/20 text-blue-300 border-blue-500/30',
  },

  // Input variants
  input: {
    default: 'theme-input',
    select: 'select-theme',
    textarea: 'textarea-theme',
  },

  // Text variants
  text: {
    primary: 'theme-text-primary',
    secondary: 'theme-text-secondary',
    muted: 'theme-text-muted',
    tertiary: 'theme-text-tertiary',
  },

  // Card variants
  card: {
    default: 'theme-card',
    hover: 'theme-card card-hover',
    game: 'card-game',
    profile: 'card-profile',
    guide: 'card-guide',
  },
} as const;

// Convert hex color to rgba
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Theme-aware component props generators
export const generateThemeProps = {
  // Generate button props based on variant
  button: (variant: keyof typeof themeClasses.button = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };

    return {
      className: `${themeClasses.button[variant]} ${sizeClasses[size]} rounded-lg font-semibold transition-all duration-300 cursor-pointer`,
    };
  },

  // Generate card props
  card: (variant: keyof typeof themeClasses.card = 'default', padding: 'sm' | 'md' | 'lg' = 'md') => {
    const paddingClasses = {
      sm: 'p-3',
      md: 'p-4 sm:p-6',
      lg: 'p-6 sm:p-8',
    };

    return {
      className: `${themeClasses.card[variant]} ${paddingClasses[padding]} rounded-xl`,
    };
  },

  // Generate input props
  input: (variant: keyof typeof themeClasses.input = 'default') => {
    return {
      className: `${themeClasses.input[variant]} w-full`,
    };
  },
};

// Función para obtener clases CSS basadas en el estado
export const getThemeClasses = <C extends keyof typeof themeClasses>(
  component: C,
  variant?: keyof (typeof themeClasses)[C],
  isActive?: boolean
): string => {
  const componentClasses = themeClasses[component];
  
  if (!componentClasses) {
    return 'text-theme-primary';
  }
  
  if (typeof componentClasses === 'string') {
    return componentClasses;
  }
  
  if (variant && componentClasses && typeof componentClasses === 'object' && variant in componentClasses) {
    return componentClasses[variant as keyof (typeof componentClasses)] as string;
  }
  
  // Para navbar links con estado activo/inactivo
  if (component === 'navbar' && typeof isActive === 'boolean') {
    const navbarClasses = themeClasses.navbar;
    const baseClass = navbarClasses.link;
    const stateClass = isActive ? navbarClasses.active : navbarClasses.inactive;
    return `${baseClass} ${stateClass}`;
  }
  const baseClass: string = ('base' in componentClasses && typeof componentClasses.base === 'string') ? componentClasses.base : 'text-theme-primary';
  return baseClass;
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