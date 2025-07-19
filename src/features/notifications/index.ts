// Notifications Feature - Exports principales
export { useNotifications } from './hooks/useNotifications';
export { default as NotificationBell } from './components/NotificationBell';
export { NotificationPanel } from './components/NotificationPanel';
export { default as NotificationToast } from './components/NotificationToast';
export { NotificationManager } from './components/NotificationManager';

// Types
export type { 
  Notification, 
  NotificationType, 
  NotificationPriority,
  NotificationPreferences 
} from './types/notification.types';

// Services
export { notificationService } from './services/notificationService';

// Constants
export { NOTIFICATION_TYPES, NOTIFICATION_PRIORITIES } from './constants/notification-constants'; 