"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  Notification, 
  NotificationPreferences, 
  NotificationFilters, 
  UseNotificationsReturn 
} from '../types/notification.types';
import { notificationService } from '../services/notificationService';
import { DEFAULT_NOTIFICATION_PREFERENCES, NOTIFICATION_DEFAULTS } from '../constants/notification-constants';

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_NOTIFICATION_PREFERENCES);
  const [filters, setFilters] = useState<NotificationFilters>({});

  // Cargar notificaciones y preferencias al inicializar
  useEffect(() => {
    loadPreferences();
    loadNotifications();
  }, []);

  // Suscribirse a nuevas notificaciones
  useEffect(() => {
    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications(prev => {
        const newNotifications = [notification, ...prev];
        
        // Limitar el número de notificaciones
        if (newNotifications.length > NOTIFICATION_DEFAULTS.maxNotifications) {
          return newNotifications.slice(0, NOTIFICATION_DEFAULTS.maxNotifications);
        }
        
        return newNotifications;
      });
    });

    return unsubscribe;
  }, []);

  // Cargar preferencias desde localStorage
  const loadPreferences = async () => {
    try {
      const storedPreferences = await notificationService.getPreferences();
      setPreferences(prev => ({ ...DEFAULT_NOTIFICATION_PREFERENCES, ...storedPreferences }));
    } catch (err) {
      console.error('Error loading notification preferences:', err);
    }
  };

  // Cargar notificaciones existentes (simulado)
  const loadNotifications = () => {
    try {
      const stored = localStorage.getItem('aethra-notifications');
      if (stored) {
        const parsedNotifications = JSON.parse(stored);
        setNotifications(parsedNotifications);
      }
    } catch (err) {
      console.error('Error loading notifications:', err);
    }
  };

  // Guardar notificaciones en localStorage
  const saveNotifications = useCallback((newNotifications: Notification[]) => {
    try {
      localStorage.setItem('aethra-notifications', JSON.stringify(newNotifications));
    } catch (err) {
      console.error('Error saving notifications:', err);
    }
  }, []);

  // Agregar nueva notificación
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    notificationService.send(notification);
  }, []);

  // Marcar como leída
  const markAsRead = useCallback(async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, read: true }
            : notification
        )
      );
      saveNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  }, [notifications, saveNotifications]);

  // Marcar todas como leídas
  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      saveNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  }, [notifications, saveNotifications]);

  // Eliminar notificación
  const deleteNotification = useCallback(async (id: string) => {
    try {
      await notificationService.delete(id);
      setNotifications(prev => prev.filter(notification => notification.id !== id));
      saveNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  }, [notifications, saveNotifications]);

  // Limpiar todas las notificaciones
  const clearAll = useCallback(async () => {
    try {
      await notificationService.clearAll();
      setNotifications([]);
      saveNotifications([]);
    } catch (err) {
      console.error('Error clearing all notifications:', err);
    }
  }, [saveNotifications]);

  // Actualizar preferencias
  const updatePreferences = useCallback(async (newPreferences: Partial<NotificationPreferences>) => {
    try {
      await notificationService.updatePreferences(newPreferences);
      setPreferences(prev => ({ ...prev, ...newPreferences }));
    } catch (err) {
      console.error('Error updating notification preferences:', err);
    }
  }, []);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters: Partial<NotificationFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Obtener notificaciones filtradas
  const getFilteredNotifications = useCallback(() => {
    return notifications.filter(notification => {
      // Filtro por tipo
      if (filters.type && notification.type !== filters.type) {
        return false;
      }

      // Filtro por prioridad
      if (filters.priority && notification.priority !== filters.priority) {
        return false;
      }

      // Filtro por estado de lectura
      if (filters.read !== undefined && notification.read !== filters.read) {
        return false;
      }

      // Filtro por rango de fechas
      if (filters.dateRange) {
        const notificationDate = new Date(notification.timestamp);
        if (notificationDate < filters.dateRange.start || notificationDate > filters.dateRange.end) {
          return false;
        }
      }

      return true;
    });
  }, [notifications, filters]);

  // Calcular notificaciones no leídas
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Guardar notificaciones cuando cambien
  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications, saveNotifications]);

  return {
    notifications,
    unreadCount,
    preferences,
    filters,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    updatePreferences,
    updateFilters,
    getFilteredNotifications,
  };
} 