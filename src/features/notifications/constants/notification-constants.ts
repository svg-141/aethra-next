import { NotificationType, NotificationPriority } from '../types/notification.types';

export const NOTIFICATION_TYPES: Record<NotificationType, { label: string; icon: string; color: string }> = {
  info: {
    label: 'Información',
    icon: 'fas fa-info-circle',
    color: 'text-blue-400'
  },
  success: {
    label: 'Éxito',
    icon: 'fas fa-check-circle',
    color: 'text-green-400'
  },
  warning: {
    label: 'Advertencia',
    icon: 'fas fa-exclamation-triangle',
    color: 'text-yellow-400'
  },
  error: {
    label: 'Error',
    icon: 'fas fa-times-circle',
    color: 'text-red-400'
  },
  achievement: {
    label: 'Logro',
    icon: 'fas fa-trophy',
    color: 'text-purple-400'
  },
  message: {
    label: 'Mensaje',
    icon: 'fas fa-comment',
    color: 'text-indigo-400'
  },
  system: {
    label: 'Sistema',
    icon: 'fas fa-cog',
    color: 'text-gray-400'
  }
};

export const NOTIFICATION_PRIORITIES: Record<NotificationPriority, { label: string; color: string; bgColor: string }> = {
  low: {
    label: 'Baja',
    color: 'text-gray-400',
    bgColor: 'bg-gray-600/20'
  },
  medium: {
    label: 'Media',
    color: 'text-blue-400',
    bgColor: 'bg-blue-600/20'
  },
  high: {
    label: 'Alta',
    color: 'text-orange-400',
    bgColor: 'bg-orange-600/20'
  },
  urgent: {
    label: 'Urgente',
    color: 'text-red-400',
    bgColor: 'bg-red-600/20'
  }
};

export const DEFAULT_NOTIFICATION_PREFERENCES = {
  enabled: true,
  sound: true,
  desktop: true,
  email: false,
  types: {
    info: true,
    success: true,
    warning: true,
    error: true,
    achievement: true,
    message: true,
    system: false
  },
  priorities: {
    low: true,
    medium: true,
    high: true,
    urgent: true
  }
};

export const NOTIFICATION_SOUNDS = {
  default: '/sounds/notification.mp3',
  achievement: '/sounds/achievement.mp3',
  urgent: '/sounds/urgent.mp3'
};

export const NOTIFICATION_DEFAULTS = {
  autoHide: 5000, // 5 segundos
  maxNotifications: 50,
  maxUnread: 99,
  soundVolume: 0.5
}; 