import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'comment' | 'like' | 'reply';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
  metadata?: {
    userId?: string;
    postId?: string;
    commentId?: string;
    gameId?: string;
  };
}

interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Contar notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.read).length;

  // Agregar nueva notificación
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remover notificaciones de info/success después de 5 segundos
    if (['info', 'success'].includes(notification.type)) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    }
  };

  // Marcar como leída
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Remover notificación
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Limpiar todas las notificaciones
  const clearAll = () => {
    setNotifications([]);
  };

  // Persistir notificaciones en localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aethra-notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setNotifications(parsed.map((n: { timestamp: string | number | Date } & Record<string, unknown>) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      } catch (err) {
        console.error('Error loading notifications:', err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aethra-notifications', JSON.stringify(notifications));
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  };
}

// Funciones helper para crear notificaciones comunes
export const createNotificationHelpers = (addNotification: UseNotificationsReturn['addNotification']) => ({
  // Notificación de comentario nuevo
  newComment: (author: string, postTitle: string, postId: string) => {
    addNotification({
      type: 'comment',
      title: 'Nuevo comentario',
      message: `${author} comentó en "${postTitle}"`,
      action: {
        label: 'Ver comentario',
        url: `/comunity#post-${postId}`,
      },
      metadata: { postId },
    });
  },

  // Notificación de like
  newLike: (author: string, postTitle: string, postId: string) => {
    addNotification({
      type: 'like',
      title: 'Nuevo like',
      message: `${author} le dio like a "${postTitle}"`,
      action: {
        label: 'Ver post',
        url: `/comunity#post-${postId}`,
      },
      metadata: { postId },
    });
  },

  // Notificación de respuesta
  newReply: (author: string, commentContent: string, commentId: string) => {
    addNotification({
      type: 'reply',
      title: 'Nueva respuesta',
      message: `${author} respondió: "${commentContent.substring(0, 50)}..."`,
      action: {
        label: 'Ver respuesta',
        url: `/comunity#comment-${commentId}`,
      },
      metadata: { commentId },
    });
  },

  // Notificación de guía actualizada
  guideUpdated: (gameName: string, gameId: string) => {
    addNotification({
      type: 'info',
      title: 'Guía actualizada',
      message: `La guía de ${gameName} ha sido actualizada con el meta más reciente`,
      action: {
        label: 'Ver guía',
        url: `/guides/${gameId}`,
      },
      metadata: { gameId },
    });
  },

  // Notificación de logro desbloqueado
  achievementUnlocked: (achievementName: string, achievementId: string) => {
    addNotification({
      type: 'success',
      title: '¡Logro desbloqueado!',
      message: `Has desbloqueado: ${achievementName}`,
      action: {
        label: 'Ver logros',
        url: `/profile#achievements`,
      },
      metadata: { userId: 'current' },
    });
  },

  // Notificación de error
  error: (title: string, message: string) => {
    addNotification({
      type: 'error',
      title,
      message,
    });
  },

  // Notificación de éxito
  success: (title: string, message: string) => {
    addNotification({
      type: 'success',
      title,
      message,
    });
  },
}); 