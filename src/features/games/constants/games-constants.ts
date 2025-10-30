import { GuideType, GameType, Guide, Game, GamesStats } from '../types/games.types';

// Logos ASCII diseñados para parecerse a los logos oficiales
export const GAME_ASCII_LOGOS = {
  // VALORANT - Logo con forma de V angular característica
  valorant: {
    large: `\\        //  //\\  ||      //\\  ||\\    || ==========
 \\      //  //--\\ ||     //--\\ || \\   ||     ||
  \\    //  //    \\||    //    \\||  \\  ||     ||
   \\  //  //      \\||   //      \\||   \\ ||     ||
    \\//  //        \\\\=//        \\||    \\||     ||`,
    medium: `\\     //  /\  ||
 \\   //  /__\ ||
  \\ //  /    \||___ `,
    small: `\/AL`,
    icon: `\/`
  },

  // StarCraft II - Logo con estilo futurista SC II
  starcraft2: {
    large: ` _____  _______    /\\    ||\\    ||  _____  ||\\     /\\    ||====  ======
//      ||   ||   //\\   || \\   || //      || \\   //\\   ||      ||
\\___   ||   ||  //  \\  ||  \\  ||//       ||  \\ //  \\  ||===   ||
     \\ ||   || //====\\ ||   \\ ||\\       ||  ////====\\ ||      ||
_____// ||   ||//      \\||    \\|| \\_____||  \//      \\||      ||`,
    medium: ` ___  _____  //
/ __)/     //||
\__ \\    // ||
(___/ \__//  ||`,
    small: `SC II`,
    icon: `SC`
  }
};

// Iconos ASCII minimalistas (mantener compatibilidad)
export const GAME_ASCII_ICONS = {
  valorant: GAME_ASCII_LOGOS.valorant.large,
  starcraft2: GAME_ASCII_LOGOS.starcraft2.large,
};

export const SUPPORTED_GAMES: Game[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    type: 'fps',
    description: 'FPS táctico 5v5 donde la precisión y la estrategia se combinan para crear experiencias épicas.',
    badge: 'Táctico',
    badgeColor: 'text-green-300',
    gradient: 'from-green-900/30 via-emerald-900/20 to-green-900/30',
    accentColor: 'green',
    asciiIcon: GAME_ASCII_ICONS.valorant,
    genre: ['FPS', 'Táctico', 'Competitivo'],
    platform: ['PC'],
    releaseDate: '2020-06-02',
    developer: 'Riot Games',
    publisher: 'Riot Games',
    rating: 4.8,
    playerCount: 15000000,
    isPopular: true,
    isNew: false
  },
  {
    id: 'starcraft2',
    name: 'StarCraft 2',
    type: 'strategy',
    description: 'RTS legendario que define el género con tres razas únicas y mecánicas profundas.',
    badge: 'RTS',
    badgeColor: 'text-blue-300',
    gradient: 'from-blue-900/30 via-cyan-900/20 to-blue-900/30',
    accentColor: 'blue',
    asciiIcon: GAME_ASCII_ICONS.starcraft2,
    genre: ['RTS', 'Estrategia', 'Competitivo'],
    platform: ['PC'],
    releaseDate: '2010-07-27',
    developer: 'Blizzard Entertainment',
    publisher: 'Blizzard Entertainment',
    rating: 4.9,
    playerCount: 2000000,
    isPopular: true,
    isNew: false
  }
];

export const GUIDE_TYPES: Array<{
  key: GuideType;
  label: string;
  icon: string;
  color: string;
  description: string;
}> = [
  {
    key: 'strategy',
    label: 'Estrategia',
    icon: '🎯',
    color: 'green',
    description: 'Guías de estrategia general y tácticas'
  },
  {
    key: 'tutorial',
    label: 'Tutorial',
    icon: '📚',
    color: 'blue',
    description: 'Tutoriales paso a paso para principiantes'
  },
  {
    key: 'meta-analysis',
    label: 'Análisis Meta',
    icon: '📊',
    color: 'purple',
    description: 'Análisis del meta actual y tendencias'
  },
  {
    key: 'build-guide',
    label: 'Guía de Builds',
    icon: '⚔️',
    color: 'orange',
    description: 'Guías de builds y configuraciones'
  },
  {
    key: 'patch-notes',
    label: 'Notas de Parche',
    icon: '📝',
    color: 'red',
    description: 'Resúmenes y análisis de parches'
  },
  {
    key: 'tips-tricks',
    label: 'Tips y Trucos',
    icon: '💡',
    color: 'yellow',
    description: 'Consejos útiles y trucos avanzados'
  }
];

export const GAME_TYPES: Array<{
  key: GameType;
  label: string;
  icon: string;
  color: string;
  description: string;
}> = [
  {
    key: 'fps',
    label: 'FPS',
    icon: '🎯',
    color: 'red',
    description: 'First Person Shooter'
  },
  {
    key: 'strategy',
    label: 'Estrategia',
    icon: '🏰',
    color: 'blue',
    description: 'Juegos de estrategia'
  }
];

export const SAMPLE_GUIDES: Guide[] = [
  {
    id: 'valorant-strategy-1',
    name: 'Valorant',
    type: 'strategy',
    typeColor: 'green',
    gradient: 'from-green-900/40 via-emerald-800/30 to-green-900/40',
    description: 'Guía completa de estrategias para el meta actual de Valorant, incluyendo posicionamiento, rotaciones y coordinación de equipo.',
    tags: ['Estrategia', 'Meta', 'Posicionamiento'],
    rating: 4.8,
    link: '/guides/valorant-strategy',
    updated: 'hace 2 días',
    meta: 'Guía de Estrategia Avanzada',
    author: 'ProGamer123',
    difficulty: 'intermediate',
    estimatedTime: '15 min',
    views: 12450,
    downloads: 2340,
    isFeatured: true,
    isNew: false
  },
  {
    id: 'starcraft2-tutorial-1',
    name: 'StarCraft 2',
    type: 'tutorial',
    typeColor: 'blue',
    gradient: 'from-blue-900/40 via-cyan-800/30 to-blue-900/40',
    description: 'Tutorial completo para principiantes de StarCraft 2, desde los conceptos básicos hasta las primeras estrategias.',
    tags: ['Tutorial', 'Principiantes', 'Básicos'],
    rating: 4.9,
    link: '/guides/starcraft2-tutorial',
    updated: 'hace 1 semana',
    meta: 'Tutorial para Principiantes',
    author: 'SC2Master',
    difficulty: 'beginner',
    estimatedTime: '25 min',
    views: 8900,
    downloads: 1560,
    isFeatured: false,
    isNew: true
  }
];

export const DEFAULT_GUIDE_FILTERS = {
  type: undefined,
  difficulty: undefined,
  search: '',
  author: undefined,
  sortBy: 'newest' as const,
  tags: []
};

export const DEFAULT_GAME_FILTERS = {
  type: undefined,
  genre: undefined,
  platform: undefined,
  search: '',
  sortBy: 'name' as const,
  isNew: undefined,
  isPopular: undefined
};

export const SAMPLE_GAMES_STATS: GamesStats = {
  totalGuides: 156,
  totalGames: 2,
  totalDownloads: 45600,
  activeUsers: 2340,
  topGames: [
    {
      game: SUPPORTED_GAMES[0], // Valorant
      guideCount: 45
    },
    {
      game: SUPPORTED_GAMES[1], // SC2
      guideCount: 31
    }
  ],
  topGuides: [
    {
      guide: SAMPLE_GUIDES[0],
      views: 12450
    }
  ]
};

export const GAME_TAGS = [
  'Estrategia',
  'Meta',
  'Principiantes',
  'Avanzado',
  'Posicionamiento',
  'Rotaciones',
  'Builds',
  'Campeones',
  'Armas',
  'Mapas',
  'Tácticas',
  'Coordinación',
  'Timing',
  'Economía',
  'Micro',
  'Macro'
];

export const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Principiante', color: 'green' },
  { value: 'intermediate', label: 'Intermedio', color: 'yellow' },
  { value: 'advanced', label: 'Avanzado', color: 'red' }
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'popular', label: 'Más populares' },
  { value: 'rating', label: 'Mejor valorados' },
  { value: 'downloads', label: 'Más descargados' }
];