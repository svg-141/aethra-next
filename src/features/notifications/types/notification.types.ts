export type NotificationType = 
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'achievement'
  | 'message'
  | 'system';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  icon?: string;
  data?: Record<string, any>;
  expiresAt?: Date;
}

export interface NotificationPreferences {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  email: boolean;
  types: {
    [key in NotificationType]: boolean;
  };
  priorities: {
    [key in NotificationPriority]: boolean;
  };
}

export interface NotificationFilters {
  type?: NotificationType;
  priority?: NotificationPriority;
  read?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  filters: NotificationFilters;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  updateFilters: (filters: Partial<NotificationFilters>) => void;
  getFilteredNotifications: () => Notification[];
}

export interface NotificationService {
  subscribe: (callback: (notification: Notification) => void) => () => void;
  send: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  delete: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  getPreferences: () => Promise<NotificationPreferences>;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => Promise<void>;
} 