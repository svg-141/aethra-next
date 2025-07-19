import { PostCategory, PostFilter, CommunityStats } from '../types/community.types';

export const POST_CATEGORIES: Array<{
  key: PostCategory;
  label: string;
  icon: string;
  color: string;
  description: string;
}> = [
  {
    key: 'general',
    label: 'General',
    icon: '💬',
    color: 'bg-blue-100 text-blue-800',
    description: 'Discusiones generales sobre gaming'
  },
  {
    key: 'strategy',
    label: 'Estrategia',
    icon: '🎯',
    color: 'bg-green-100 text-green-800',
    description: 'Tips y estrategias de juegos'
  },
  {
    key: 'news',
    label: 'Noticias',
    icon: '📰',
    color: 'bg-purple-100 text-purple-800',
    description: 'Últimas noticias del gaming'
  },
  {
    key: 'help',
    label: 'Ayuda',
    icon: '❓',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Preguntas y ayuda técnica'
  },
  {
    key: 'off-topic',
    label: 'Off Topic',
    icon: '🎮',
    color: 'bg-gray-100 text-gray-800',
    description: 'Temas fuera del gaming'
  },
  {
    key: 'events',
    label: 'Eventos',
    icon: '🎉',
    color: 'bg-red-100 text-red-800',
    description: 'Eventos y torneos'
  }
];

export const DEFAULT_FILTERS: PostFilter = {
  category: undefined,
  search: '',
  sortBy: 'newest',
  author: undefined
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'popular', label: 'Más populares' },
  { value: 'most-commented', label: 'Más comentados' }
];

export const SAMPLE_COMMUNITY_STATS: CommunityStats = {
  totalPosts: 1247,
  totalComments: 8934,
  activeUsers: 342,
  topCategories: [
    { category: 'strategy', count: 456 },
    { category: 'general', count: 234 },
    { category: 'help', count: 189 },
    { category: 'news', count: 156 },
    { category: 'events', count: 89 },
    { category: 'off-topic', count: 123 }
  ]
};

export const COMMUNITY_RULES = [
  'Respeta a otros miembros de la comunidad',
  'No spam ni contenido inapropiado',
  'Usa las categorías correctas para tus posts',
  'Busca antes de crear un post duplicado',
  'Mantén las discusiones constructivas'
];

export const POST_TAGS = [
  'League of Legends',
  'Valorant',
  'CS2',
  'Dota 2',
  'Overwatch',
  'Fortnite',
  'Apex Legends',
  'Rocket League',
  'FIFA',
  'Call of Duty',
  'Minecraft',
  'GTA V',
  'Rust',
  'ARK',
  'Terraria'
]; 