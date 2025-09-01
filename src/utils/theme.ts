/**
 * Theme utility functions for consistent theming across components
 */

// Get theme-aware classes for common UI elements
export const getThemeClasses = {
  // Button variants
  button: {
    primary: 'theme-button',
    secondary: 'theme-button-hover theme-text-secondary hover:theme-text-primary',
    outline: 'btn-gradient-outline',
    ghost: 'theme-text-secondary hover:theme-text-primary hover:theme-bg-hover',
  },
  
  // Card variants
  card: {
    default: 'theme-card',
    hover: 'theme-card card-hover',
    game: 'card-game',
    profile: 'card-profile',
    guide: 'card-guide',
  },
  
  // Text variants
  text: {
    primary: 'theme-text-primary',
    secondary: 'theme-text-secondary',
    muted: 'theme-text-muted',
    tertiary: 'theme-text-tertiary',
  },
  
  // Background variants
  background: {
    surface: 'theme-bg-surface',
    hover: 'theme-bg-hover',
  },
  
  // Border variants
  border: {
    default: 'theme-border',
    hover: 'theme-border-hover',
  },
  
  // Input variants
  input: {
    default: 'theme-input',
    select: 'select-theme',
    textarea: 'textarea-theme',
  },
  
  // Badge variants
  badge: {
    default: 'theme-badge',
    success: 'theme-badge bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'theme-badge bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    error: 'theme-badge bg-red-500/20 text-red-300 border-red-500/30',
    info: 'theme-badge bg-blue-500/20 text-blue-300 border-blue-500/30',
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
};

// Color utility functions
export const themeUtils = {
  // Convert hex color to rgba
  hexToRgba: (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
  
  // Get CSS custom property value
  getCSSVariable: (varName: string): string => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement).getPropertyValue(varName);
  },
  
  // Set CSS custom property value
  setCSSVariable: (varName: string, value: string): void => {
    if (typeof window === 'undefined') return;
    document.documentElement.style.setProperty(varName, value);
  },
  
  // Generate responsive classes
  responsive: (baseClass: string, breakpoints: Record<string, string> = {}): string => {
    let classes = baseClass;
    Object.entries(breakpoints).forEach(([breakpoint, className]) => {
      classes += ` ${breakpoint}:${className}`;
    });
    return classes;
  },
};

// Theme-aware component props generators
export const generateThemeProps = {
  // Generate button props based on variant
  button: (variant: keyof typeof getThemeClasses.button = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };
    
    return {
      className: `${getThemeClasses.button[variant]} ${sizeClasses[size]} rounded-lg font-semibold transition-all duration-300 cursor-pointer`,
    };
  },
  
  // Generate card props
  card: (variant: keyof typeof getThemeClasses.card = 'default', padding: 'sm' | 'md' | 'lg' = 'md') => {
    const paddingClasses = {
      sm: 'p-3',
      md: 'p-4 sm:p-6',
      lg: 'p-6 sm:p-8',
    };
    
    return {
      className: `${getThemeClasses.card[variant]} ${paddingClasses[padding]} rounded-xl`,
    };
  },
  
  // Generate input props
  input: (variant: keyof typeof getThemeClasses.input = 'default') => {
    return {
      className: `${getThemeClasses.input[variant]} w-full`,
    };
  },
};

// Animation utilities with theme support
export const themeAnimations = {
  // Fade in with theme colors
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  scaleIn: 'animate-scale-in',
  bounceIn: 'animate-bounce-in',
  
  // Hover animations
  hoverScale: 'hover:scale-105 transition-transform duration-300',
  hoverFloat: 'hover:-translate-y-1 transition-transform duration-300',
  hoverGlow: 'hover:glow-border transition-all duration-300',
};

// Accessibility utilities
export const a11yUtils = {
  // Generate aria-label for theme selector
  themeLabel: (themeName: string): string => `Cambiar tema a ${themeName}`,
  
  // Generate proper focus classes
  focusClasses: 'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900',
  
  // Screen reader only text
  srOnly: 'sr-only',
  
  // High contrast support
  highContrastSupport: (baseClasses: string): string => 
    `${baseClasses} high-contrast:border-2 high-contrast:border-black`,
};

// Layout utilities with theme support
export const layoutUtils = {
  // Container with theme-aware padding
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Section with theme background
  section: 'min-h-screen py-12 sm:py-20',
  
  // Grid layouts
  grid: {
    responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
    games: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    guides: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  },
  
  // Flex utilities
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    col: 'flex flex-col',
  },
};

// Export all utilities as a single object for easier importing
export default {
  classes: getThemeClasses,
  utils: themeUtils,
  props: generateThemeProps,
  animations: themeAnimations,
  a11y: a11yUtils,
  layout: layoutUtils,
};