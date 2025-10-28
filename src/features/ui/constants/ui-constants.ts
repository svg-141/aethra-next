import { FilterOption } from '../types/ui.types';

export const SAMPLE_HERO_DATA = {
  image: '/assets/banners/valorant-banner.jpg',
  title: 'Domina el Gaming Competitivo',
  subtitle: 'Aprende estrategias avanzadas, conecta con jugadores profesionales y mejora tu rendimiento en los mejores juegos competitivos.',
  badge: 'Nuevo',
  badgeColor: 'bg-green-500/20 text-green-300 border-green-500/30',
  actionLabel: 'Comenzar Ahora',
  actionIcon: 'fas fa-play',
  gradient: 'from-purple-900/40 via-pink-900/30 to-purple-900/40'
};

export const SAMPLE_FILTER_OPTIONS: FilterOption[] = [
  {
    label: 'Todos',
    value: 'all',
    icon: 'fas fa-th-large',
    count: 156
  },
  {
    label: 'FPS',
    value: 'fps',
    icon: 'fas fa-crosshairs',
    count: 45
  },
  {
    label: 'MOBA',
    value: 'moba',
    icon: 'fas fa-chess',
    count: 38
  },
  {
    label: 'Estrategia',
    value: 'strategy',
    icon: 'fas fa-chess-board',
    count: 29
  },
  {
    label: 'Deportes',
    value: 'sports',
    icon: 'fas fa-futbol',
    count: 22
  },
  {
    label: 'Otros',
    value: 'others',
    icon: 'fas fa-gamepad',
    count: 22
  }
];

export const GAME_FILTER_OPTIONS: FilterOption[] = [
  {
    label: 'Valorant',
    value: 'valorant',
    icon: 'fas fa-crosshairs',
    count: 15
  },
  {
    label: 'CS2',
    value: 'cs2',
    icon: 'fas fa-crosshairs',
    count: 12
  },
  {
    label: 'League of Legends',
    value: 'lol',
    icon: 'fas fa-chess',
    count: 18
  },
  {
    label: 'StarCraft 2',
    value: 'sc2',
    icon: 'fas fa-chess-board',
    count: 8
  }
];

export const DIFFICULTY_FILTER_OPTIONS: FilterOption[] = [
  {
    label: 'Principiante',
    value: 'beginner',
    icon: 'fas fa-seedling',
    count: 45
  },
  {
    label: 'Intermedio',
    value: 'intermediate',
    icon: 'fas fa-leaf',
    count: 67
  },
  {
    label: 'Avanzado',
    value: 'advanced',
    icon: 'fas fa-tree',
    count: 34
  }
];

export const SORT_OPTIONS: FilterOption[] = [
  {
    label: 'Más Recientes',
    value: 'newest',
    icon: 'fas fa-clock'
  },
  {
    label: 'Más Populares',
    value: 'popular',
    icon: 'fas fa-fire'
  },
  {
    label: 'Mejor Valorados',
    value: 'rating',
    icon: 'fas fa-star'
  },
  {
    label: 'Más Descargados',
    value: 'downloads',
    icon: 'fas fa-download'
  }
];

export const BUTTON_VARIANTS = {
  primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500',
  secondary: 'bg-purple-900/50 text-purple-300 hover:bg-purple-900/70',
  outline: 'border border-purple-500/50 text-purple-300 hover:bg-purple-500/20',
  ghost: 'text-purple-300 hover:bg-purple-900/30',
  danger: 'bg-red-600 text-white hover:bg-red-500'
};

export const BUTTON_SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

export const BADGE_VARIANTS = {
  default: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  success: 'bg-green-500/20 text-green-300 border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  error: 'bg-red-500/20 text-red-300 border-red-500/30',
  info: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
};

export const BADGE_SIZES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
};

export const CARD_VARIANTS = {
  default: 'bg-gradient-to-br from-[#1a0933] to-[#2a0845] border border-purple-900/60',
  elevated: 'bg-gradient-to-br from-[#1a0933] to-[#2a0845] border border-purple-900/60 shadow-lg',
  outlined: 'bg-transparent border border-purple-500/30'
};

export const CARD_PADDING = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8'
};

export const MODAL_SIZES = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
};

export const TOOLTIP_POSITIONS = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
};

export const LOADING_SPINNER_SIZES = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

export const LOADING_SPINNER_COLORS = {
  primary: 'text-purple-500',
  secondary: 'text-gray-500',
  white: 'text-white'
};

export const PROGRESS_BAR_VARIANTS = {
  default: 'bg-purple-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500'
};

export const PROGRESS_BAR_SIZES = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
};

export const TABS_VARIANTS = {
  default: 'border-b border-purple-900/50',
  pills: 'bg-purple-900/20 rounded-lg p-1',
  underline: 'border-b-2 border-purple-900/50'
};

export const AVATAR_SIZES = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

export const ALERT_VARIANTS = {
  success: {
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    text: 'text-green-300',
    icon: 'fas fa-check-circle'
  },
  warning: {
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30',
    text: 'text-yellow-300',
    icon: 'fas fa-exclamation-triangle'
  },
  error: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    text: 'text-red-300',
    icon: 'fas fa-times-circle'
  },
  info: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-300',
    icon: 'fas fa-info-circle'
  }
};

export const SKELETON_ANIMATIONS = {
  pulse: 'animate-pulse',
  wave: 'animate-pulse'
};

export const SKELETON_VARIANTS = {
  text: 'h-4 bg-gray-600 rounded',
  circular: 'bg-gray-600 rounded-full',
  rectangular: 'bg-gray-600 rounded'
};

export const DEFAULT_UI_CONFIG = {
  theme: 'dark',
  primaryColor: 'purple',
  borderRadius: 'lg',
  animationSpeed: 'normal',
  showAnimations: true
}; 