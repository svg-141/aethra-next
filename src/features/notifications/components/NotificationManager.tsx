"use client";

import { useState, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Notification } from '../types/notification.types';
import NotificationToast from './NotificationToast';

export function NotificationManager() {
  const { notifications, preferences } = useNotifications();
  const [activeToasts, setActiveToasts] = useState<Notification[]>([]);

  useEffect(() => {
    // Solo mostrar notificaciones si están habilitadas
    if (!preferences.enabled) return;

    // Obtener las notificaciones más recientes que no están en activeToasts
    const newNotifications = notifications.filter(
      notification => 
        !notification.read && 
        !activeToasts.find(toast => toast.id === notification.id) &&
        Date.now() - new Date(notification.timestamp).getTime() < 10000 // Solo notificaciones de los últimos 10 segundos
    );

    if (newNotifications.length > 0) {
      setActiveToasts(prev => [...prev, ...newNotifications]);
    }
  }, [notifications, preferences.enabled, activeToasts]);

  const removeToast = (id: string) => {
    setActiveToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleToastAction = (notification: Notification) => {
    if (notification.actionUrl) {
      window.open(notification.actionUrl, '_blank');
    }
  };

  if (!preferences.enabled) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {activeToasts.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            transform: `translateY(${index * 20}px)`,
            zIndex: 1000 - index
          }}
        >
          <NotificationToast
            notification={notification}
            onClose={() => removeToast(notification.id)}
            onAction={() => handleToastAction(notification)}
          />
        </div>
      ))}
    </div>
  );
} 