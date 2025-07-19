import { GuideType, GameType, Guide, Game, GamesStats } from '../types/games.types';

export const SUPPORTED_GAMES: Game[] = [
  {
    id: 'valorant',
    image: '/images/games/valorant-icon.png',
    name: 'Valorant',
    type: 'fps',
    description: 'FPS táctico 5v5 donde la precisión y la estrategia se combinan para crear experiencias épicas.',
    badge: 'Táctico',
    badgeColor: 'text-green-300',
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
    image: '/images/games/starcraft2-icon.png',
    name: 'StarCraft 2',
    type: 'strategy',
    description: 'RTS legendario que define el género con tres razas únicas y mecánicas profundas.',
    badge: 'RTS',
    badgeColor: 'text-blue-300',
    genre: ['RTS', 'Estrategia', 'Competitivo'],
    platform: ['PC'],
    releaseDate: '2010-07-27',
    developer: 'Blizzard Entertainment',
    publisher: 'Blizzard Entertainment',
    rating: 4.9,
    playerCount: 2000000,
    isPopular: true,
    isNew: false
  },
  {
    id: 'cs2',
    image: '/images/games/cs2-icon.png',
    name: 'Counter-Strike 2',
    type: 'fps',
    description: 'El FPS competitivo por excelencia con mecánicas refinadas y gameplay intenso.',
    badge: 'Competitivo',
    badgeColor: 'text-orange-300',
    genre: ['FPS', 'Táctico', 'Competitivo'],
    platform: ['PC'],
    releaseDate: '2023-09-27',
    developer: 'Valve',
    publisher: 'Valve',
    rating: 4.7,
    playerCount: 25000000,
    isPopular: true,
    isNew: true
  },
  {
    id: 'league-of-legends',
    image: '/images/games/lol-icon.png',
    name: 'League of Legends',
    type: 'moba',
    description: 'MOBA masivo con más de 150 campeones y un meta en constante evolución.',
    badge: 'MOBA',
    badgeColor: 'text-purple-300',
    genre: ['MOBA', 'Estrategia', 'Competitivo'],
    platform: ['PC'],
    releaseDate: '2009-10-27',
    developer: 'Riot Games',
    publisher: 'Riot Games',
    rating: 4.6,
    playerCount: 35000000,
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
    key: 'moba',
    label: 'MOBA',
    icon: '⚔️',
    color: 'purple',
    description: 'Multiplayer Online Battle Arena'
  },
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
    image: '/images/guides/valorant-strategy.jpg',
    icon: '/images/games/valorant-icon.png',
    name: 'Valorant',
    type: 'strategy',
    typeColor: 'green',
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
    image: '/images/guides/starcraft2-tutorial.jpg',
    icon: '/images/games/starcraft2-icon.png',
    name: 'StarCraft 2',
    type: 'tutorial',
    typeColor: 'blue',
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
  },
  {
    id: 'cs2-meta-1',
    image: '/images/guides/cs2-meta.jpg',
    icon: '/images/games/cs2-icon.png',
    name: 'CS2',
    type: 'meta-analysis',
    typeColor: 'purple',
    description: 'Análisis profundo del meta actual de CS2, incluyendo las mejores armas, mapas y estrategias del momento.',
    tags: ['Meta', 'Análisis', 'Armas'],
    rating: 4.7,
    link: '/guides/cs2-meta',
    updated: 'hace 3 días',
    meta: 'Análisis del Meta Actual',
    author: 'CS2Pro',
    difficulty: 'advanced',
    estimatedTime: '20 min',
    views: 15600,
    downloads: 2890,
    isFeatured: true,
    isNew: false
  },
  {
    id: 'lol-build-1',
    image: '/images/guides/lol-build.jpg',
    icon: '/images/games/lol-icon.png',
    name: 'League of Legends',
    type: 'build-guide',
    typeColor: 'orange',
    description: 'Guía completa de builds para los campeones más populares del meta actual de League of Legends.',
    tags: ['Builds', 'Campeones', 'Meta'],
    rating: 4.6,
    link: '/guides/lol-build',
    updated: 'hace 5 días',
    meta: 'Guía de Builds Meta',
    author: 'LoLExpert',
    difficulty: 'intermediate',
    estimatedTime: '30 min',
    views: 18900,
    downloads: 3450,
    isFeatured: false,
    isNew: false
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
  totalGames: 4,
  totalDownloads: 45600,
  activeUsers: 2340,
  topGames: [
    {
      game: SUPPORTED_GAMES[0], // Valorant
      guideCount: 45
    },
    {
      game: SUPPORTED_GAMES[2], // CS2
      guideCount: 38
    },
    {
      game: SUPPORTED_GAMES[3], // LoL
      guideCount: 42
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
    },
    {
      guide: SAMPLE_GUIDES[2],
      views: 15600
    },
    {
      guide: SAMPLE_GUIDES[3],
      views: 18900
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