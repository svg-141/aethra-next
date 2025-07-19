import { User, UserStats, Achievement, Connection, Subscription, ProfileStats } from '../types/profile.types';

export const SAMPLE_USER: User = {
  id: 'user-1',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  name: 'Alex Johnson',
  username: 'GamerPro123',
  email: 'alex.johnson@email.com',
  level: 15,
  rank: 'Diamond',
  joinDate: new Date('2023-01-15'),
  lastActive: new Date(),
  bio: 'Apasionado por los juegos competitivos. Especializado en FPS y MOBA. Siempre buscando mejorar y ayudar a otros jugadores.',
  location: 'Madrid, España',
  website: 'https://gamerpro123.com',
  socialLinks: {
    discord: 'GamerPro123#4567',
    twitter: '@GamerPro123',
    twitch: 'gamerpro123',
    youtube: 'GamerPro123'
  },
  preferences: {
    theme: 'dark',
    language: 'es',
    notifications: {
      email: true,
      push: true,
      discord: true,
      achievements: true,
      matches: true,
      guides: true
    },
    privacy: {
      profileVisibility: 'public',
      showStats: true,
      showAchievements: true,
      showOnlineStatus: true
    },
    gaming: {
      favoriteGames: ['Valorant', 'CS2', 'League of Legends'],
      defaultGame: 'Valorant',
      autoSync: true
    }
  },
  isVerified: true,
  isOnline: true
};

export const SAMPLE_USER_STATS: UserStats = {
  totalMatches: 1247,
  winRate: 68.5,
  totalHours: 2340,
  achievements: 45,
  rank: 'Diamond',
  currentStreak: 8,
  bestStreak: 15,
  favoriteGame: 'Valorant',
  totalWins: 854,
  totalLosses: 393
};

export const SAMPLE_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    icon: '🏆',
    color: 'bg-yellow-500/20 text-yellow-300',
    title: 'Primera Victoria',
    description: 'Gana tu primera partida competitiva',
    date: new Date('2023-01-20'),
    category: 'gaming',
    rarity: 'common',
    isUnlocked: true,
    points: 10
  },
  {
    id: 'ach-2',
    icon: '🔥',
    color: 'bg-orange-500/20 text-orange-300',
    title: 'Racha de 10',
    description: 'Gana 10 partidas consecutivas',
    date: new Date('2023-03-15'),
    category: 'gaming',
    rarity: 'rare',
    isUnlocked: true,
    points: 50
  },
  {
    id: 'ach-3',
    icon: '💎',
    color: 'bg-purple-500/20 text-purple-300',
    title: 'Diamond Player',
    description: 'Alcanza el rango Diamond',
    date: new Date('2023-06-10'),
    category: 'gaming',
    rarity: 'epic',
    isUnlocked: true,
    points: 100
  },
  {
    id: 'ach-4',
    icon: '👥',
    color: 'bg-blue-500/20 text-blue-300',
    title: 'Mentor',
    description: 'Ayuda a 5 jugadores nuevos',
    date: new Date('2023-08-22'),
    category: 'community',
    rarity: 'rare',
    isUnlocked: true,
    points: 75
  },
  {
    id: 'ach-5',
    icon: '📚',
    color: 'bg-green-500/20 text-green-300',
    title: 'Estudiante Dedicado',
    description: 'Lee 50 guías estratégicas',
    date: new Date('2023-09-05'),
    category: 'learning',
    rarity: 'common',
    progress: 35,
    maxProgress: 50,
    isUnlocked: false,
    points: 25
  },
  {
    id: 'ach-6',
    icon: '⭐',
    color: 'bg-pink-500/20 text-pink-300',
    title: 'Leyenda',
    description: 'Alcanza el nivel 20',
    date: new Date(),
    category: 'special',
    rarity: 'legendary',
    progress: 15,
    maxProgress: 20,
    isUnlocked: false,
    points: 200
  }
];

export const SAMPLE_CONNECTIONS: Connection[] = [
  {
    id: 'conn-1',
    name: 'Steam',
    type: 'steam',
    status: 'connected',
    icon: '🎮',
    color: 'bg-blue-600',
    connectedAt: new Date('2023-01-15'),
    lastSync: new Date(),
    isActive: true,
    data: {
      username: 'GamerPro123',
      games: 45,
      level: 25
    }
  },
  {
    id: 'conn-2',
    name: 'Discord',
    type: 'discord',
    status: 'connected',
    icon: '💬',
    color: 'bg-indigo-600',
    connectedAt: new Date('2023-02-10'),
    lastSync: new Date(),
    isActive: true,
    data: {
      username: 'GamerPro123#4567',
      serverCount: 12
    }
  },
  {
    id: 'conn-3',
    name: 'Twitch',
    type: 'twitch',
    status: 'connected',
    icon: '📺',
    color: 'bg-purple-600',
    connectedAt: new Date('2023-03-05'),
    lastSync: new Date('2023-12-15'),
    isActive: false,
    data: {
      username: 'gamerpro123',
      followers: 1250
    }
  },
  {
    id: 'conn-4',
    name: 'Riot Games',
    type: 'riot',
    status: 'error',
    icon: '⚔️',
    color: 'bg-red-600',
    connectedAt: new Date('2023-04-20'),
    lastSync: new Date('2023-12-10'),
    isActive: false,
    data: {
      username: 'GamerPro123',
      region: 'EUW'
    }
  }
];

export const SAMPLE_SUBSCRIPTION: Subscription = {
  id: 'sub-1',
  plan: 'pro',
  status: 'active',
  features: [
    'Guías premium exclusivas',
    'Análisis de partidas avanzado',
    'Coaching personalizado',
    'Sin anuncios',
    'Soporte prioritario',
    'Contenido temprano'
  ],
  price: 9.99,
  currency: 'EUR',
  billingCycle: 'monthly',
  startDate: new Date('2023-06-01'),
  endDate: new Date('2024-06-01'),
  autoRenew: true,
  paymentMethod: 'Visa ****1234'
};

export const SUBSCRIPTION_PLANS = [
  {
    plan: 'free',
    name: 'Gratis',
    price: 0,
    features: [
      'Acceso básico a guías',
      'Comunidad limitada',
      'Anuncios incluidos'
    ],
    color: 'bg-gray-600'
  },
  {
    plan: 'basic',
    name: 'Básico',
    price: 4.99,
    features: [
      'Todas las guías',
      'Comunidad completa',
      'Sin anuncios',
      'Soporte por email'
    ],
    color: 'bg-blue-600'
  },
  {
    plan: 'pro',
    name: 'Pro',
    price: 9.99,
    features: [
      'Guías premium exclusivas',
      'Análisis de partidas avanzado',
      'Coaching personalizado',
      'Sin anuncios',
      'Soporte prioritario',
      'Contenido temprano'
    ],
    color: 'bg-purple-600'
  },
  {
    plan: 'premium',
    name: 'Premium',
    price: 19.99,
    features: [
      'Todo lo de Pro',
      'Coaching 1-on-1',
      'Guías personalizadas',
      'Acceso a torneos exclusivos',
      'Merchandising exclusivo',
      'Soporte VIP 24/7'
    ],
    color: 'bg-pink-600'
  }
];

export const SAMPLE_PROFILE_STATS: ProfileStats = {
  totalUsers: 15420,
  activeUsers: 8920,
  premiumUsers: 2340,
  totalAchievements: 156,
  averageLevel: 12.5,
  topAchievements: SAMPLE_ACHIEVEMENTS.slice(0, 3),
  recentActivity: [
    {
      type: 'achievement',
      data: SAMPLE_ACHIEVEMENTS[0],
      timestamp: new Date()
    },
    {
      type: 'match',
      data: { game: 'Valorant', result: 'win', score: '13-7' },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      type: 'connection',
      data: { platform: 'Discord', action: 'connected' },
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
    }
  ]
};

export const ACHIEVEMENT_CATEGORIES = [
  { key: 'gaming', label: 'Gaming', icon: '🎮', color: 'bg-blue-500/20 text-blue-300' },
  { key: 'social', label: 'Social', icon: '👥', color: 'bg-green-500/20 text-green-300' },
  { key: 'learning', label: 'Aprendizaje', icon: '📚', color: 'bg-purple-500/20 text-purple-300' },
  { key: 'community', label: 'Comunidad', icon: '🌟', color: 'bg-orange-500/20 text-orange-300' },
  { key: 'special', label: 'Especial', icon: '⭐', color: 'bg-pink-500/20 text-pink-300' }
];

export const CONNECTION_TYPES = [
  { key: 'steam', label: 'Steam', icon: '🎮', color: 'bg-blue-600' },
  { key: 'discord', label: 'Discord', icon: '💬', color: 'bg-indigo-600' },
  { key: 'twitch', label: 'Twitch', icon: '📺', color: 'bg-purple-600' },
  { key: 'youtube', label: 'YouTube', icon: '📹', color: 'bg-red-600' },
  { key: 'twitter', label: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
  { key: 'riot', label: 'Riot Games', icon: '⚔️', color: 'bg-red-600' },
  { key: 'battle-net', label: 'Battle.net', icon: '🛡️', color: 'bg-blue-800' }
];

export const RANK_LEVELS = [
  'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'
];

export const DEFAULT_PROFILE_FILTERS = {
  search: '',
  level: undefined,
  rank: undefined,
  game: undefined,
  status: 'all',
  sortBy: 'name'
}; 