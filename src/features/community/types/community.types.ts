export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    level: number;
  };
  category: PostCategory;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  isPinned?: boolean;
  isLocked?: boolean;
}

export type PostCategory = 
  | 'general'
  | 'strategy'
  | 'news'
  | 'help'
  | 'off-topic'
  | 'events';

export interface PostFilter {
  category?: PostCategory;
  search?: string;
  sortBy?: 'newest' | 'popular' | 'most-commented';
  author?: string;
}

export interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export interface PostFormProps {
  onSubmit: (post: Omit<Post, 'id' | 'author' | 'likes' | 'comments' | 'views' | 'createdAt' | 'updatedAt'>) => void;
  onCancel?: () => void;
  initialData?: Partial<Post>;
  isEditing?: boolean;
}

export interface SidebarCommunityProps {
  activeCategory?: PostCategory;
  onCategoryChange: (category: PostCategory | null) => void;
  onFilterChange: (filter: PostFilter) => void;
  filters: PostFilter;
  categories: Array<{
    key: PostCategory;
    label: string;
    count: number;
    icon: string;
  }>;
}

export interface CommunityStats {
  totalPosts: number;
  totalComments: number;
  activeUsers: number;
  topCategories: Array<{
    category: PostCategory;
    count: number;
  }>;
}

export interface CommunityPreferences {
  autoSubscribe: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  defaultCategory: PostCategory;
} 