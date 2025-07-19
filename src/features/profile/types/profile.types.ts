export interface User {
  id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  level: number;
  rank: string;
  joinDate: Date;
  lastActive: Date;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks: {
    discord?: string;
    twitter?: string;
    twitch?: string;
    youtube?: string;
  };
  preferences: UserPreferences;
  isVerified: boolean;
  isOnline: boolean;
}

export interface UserStats {
  totalMatches: number;
  winRate: number;
  totalHours: number;
  achievements: number;
  rank: string;
  currentStreak: number;
  bestStreak: number;
  favoriteGame: string;
  totalWins: number;
  totalLosses: number;
}

export interface Achievement {
  id: string;
  icon: string;
  color: string;
  title: string;
  description: string;
  date: Date;
  category: AchievementCategory;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  maxProgress?: number;
  isUnlocked: boolean;
  points: number;
}

export type AchievementCategory = 
  | 'gaming'
  | 'social'
  | 'learning'
  | 'community'
  | 'special';

export interface Connection {
  id: string;
  name: string;
  type: ConnectionType;
  status: ConnectionStatus;
  icon: string;
  color: string;
  connectedAt: Date;
  lastSync: Date;
  isActive: boolean;
  data?: any;
}

export type ConnectionType = 
  | 'steam'
  | 'discord'
  | 'twitch'
  | 'youtube'
  | 'twitter'
  | 'riot'
  | 'battle-net';

export type ConnectionStatus = 
  | 'connected'
  | 'disconnected'
  | 'error'
  | 'syncing';

export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  features: string[];
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod?: string;
}

export type SubscriptionPlan = 
  | 'free'
  | 'basic'
  | 'pro'
  | 'premium';

export type SubscriptionStatus = 
  | 'active'
  | 'cancelled'
  | 'expired'
  | 'pending'
  | 'trial';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    discord: boolean;
    achievements: boolean;
    matches: boolean;
    guides: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    showStats: boolean;
    showAchievements: boolean;
    showOnlineStatus: boolean;
  };
  gaming: {
    favoriteGames: string[];
    defaultGame: string;
    autoSync: boolean;
  };
}

export interface UserCardProps {
  user: User;
  stats: UserStats;
  onEdit?: (userId: string) => void;
  onViewProfile?: (userId: string) => void;
  children?: React.ReactNode;
}

export interface AchievementCardProps {
  achievement: Achievement;
  onView?: (achievementId: string) => void;
  onShare?: (achievementId: string) => void;
}

export interface ConnectionCardProps {
  connection: Connection;
  onDisconnect: (connectionId: string) => void;
  onReconnect?: (connectionId: string) => void;
  onManage?: (connectionId: string) => void;
}

export interface SubscriptionCardProps {
  subscription: Subscription;
  onManage: (subscriptionId: string) => void;
  onUpgrade?: (subscriptionId: string) => void;
  onCancel?: (subscriptionId: string) => void;
}

export interface ProfileStats {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  totalAchievements: number;
  averageLevel: number;
  topAchievements: Achievement[];
  recentActivity: Array<{
    type: 'achievement' | 'match' | 'connection' | 'subscription';
    data: any;
    timestamp: Date;
  }>;
}

export interface ProfileFilter {
  search?: string;
  level?: number;
  rank?: string;
  game?: string;
  status?: 'online' | 'offline' | 'all';
  sortBy?: 'name' | 'level' | 'rank' | 'lastActive' | 'joinDate';
} 