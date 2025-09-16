export interface Guide {
  id: string;
  image: string;
  icon: string;
  name: string;
  type: GuideType;
  typeColor: string;
  description: string;
  tags: string[];
  rating: number;
  link: string;
  updated: string;
  meta: string;
  author: string;
  authorId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
  interactions?: GuideInteractions;
}

export interface GuideInteractions {
  userLiked: boolean;
  userDownloaded: boolean;
  userRated?: number;
}

export type GuideType = 
  | 'strategy'
  | 'tutorial'
  | 'meta-analysis'
  | 'build-guide'
  | 'patch-notes'
  | 'tips-tricks';

export interface Game {
  id: string;
  image: string;
  name: string;
  type: GameType;
  description: string;
  badge?: string;
  badgeColor?: string;
  genre: string[];
  platform: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  rating: number;
  playerCount: number;
  isPopular?: boolean;
  isNew?: boolean;
}

export type GameType = 
  | 'moba'
  | 'fps'
  | 'battle-royale'
  | 'rpg'
  | 'strategy'
  | 'sports'
  | 'card-game'
  | 'fighting';

export interface GuideCardProps {
  guide: Guide;
  onView?: (guideId: string) => void;
  onDownload?: (guideId: string) => void;
  onRate?: (guideId: string, rating: number) => void;
}

export interface GameCardProps {
  game: Game;
  onClick?: (gameId: string) => void;
  onFavorite?: (gameId: string) => void;
  onShare?: (gameId: string) => void;
  details?: React.ReactNode;
}

export interface SidebarGuideProps {
  sections: Array<{ 
    id: string; 
    label: string; 
    icon?: string;
    isActive?: boolean;
  }>;
  updates?: { 
    last: string; 
    next?: string;
    version?: string;
  };
  downloadLabel?: string;
  onDownload?: () => void;
  onSectionClick?: (sectionId: string) => void;
}

export interface GuideFilter {
  type?: GuideType;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  search?: string;
  author?: string;
  sortBy?: 'newest' | 'popular' | 'rating' | 'downloads';
  tags?: string[];
}

export interface GameFilter {
  type?: GameType;
  genre?: string;
  platform?: string;
  search?: string;
  sortBy?: 'name' | 'rating' | 'release-date' | 'popularity';
  isNew?: boolean;
  isPopular?: boolean;
}

export interface GamesStats {
  totalGuides: number;
  totalGames: number;
  totalDownloads: number;
  activeUsers: number;
  topGames: Array<{
    game: Game;
    guideCount: number;
  }>;
  topGuides: Array<{
    guide: Guide;
    views: number;
  }>;
}

export interface GamesPreferences {
  defaultGameType: GameType;
  defaultGuideType: GuideType;
  autoDownload: boolean;
  showRatings: boolean;
  notifications: boolean;
} 