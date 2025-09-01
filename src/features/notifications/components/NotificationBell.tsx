"use client";

import { useState, useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationPanel } from './NotificationPanel';
import { NOTIFICATION_TYPES } from '../constants/notification-constants';

export default function NotificationBell() {
  const { unreadCount, notifications } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animación cuando hay nuevas notificaciones
  useEffect(() => {
    if (unreadCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  // Cerrar panel al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-bell-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Cerrar panel con Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const getNotificationIcon = () => {
    if (unreadCount === 0) {
      return 'fas fa-bell';
    }

    // Mostrar icono según el tipo de notificación más reciente
    const latestNotification = notifications.find(n => !n.read);
    if (latestNotification) {
      return NOTIFICATION_TYPES[latestNotification.type].icon;
    }

    return 'fas fa-bell';
  };

  const getNotificationColor = () => {
    if (unreadCount === 0) {
      return 'icon-muted';
    }

    // Mostrar color según la prioridad más alta
    const urgentNotification = notifications.find(n => !n.read && n.priority === 'urgent');
    if (urgentNotification) {
      return 'icon-error';
    }

    const highNotification = notifications.find(n => !n.read && n.priority === 'high');
    if (highNotification) {
      return 'icon-warning';
    }

    return 'icon-primary';
  };

  return (
    <div className="relative notification-bell-container">
      {/* Botón de notificaciones */}
      <button
        onClick={handleToggle}
        className={`theme-button relative p-2 rounded-lg transition-all duration-300 ${
          isOpen 
            ? 'theme-bg-hover' 
            : 'theme-bg-surface hover:theme-bg-hover'
        } ${isAnimating ? 'animate-pulse' : ''}`}
        data-tooltip="notifications"
        aria-label={`${unreadCount} notificaciones no leídas`}
      >
        <i className={`${getNotificationIcon()} text-lg ${getNotificationColor()} ${unreadCount > 0 ? 'icon-glow-subtle' : ''}`}></i>
        
        {/* Badge de notificaciones no leídas */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 theme-badge text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce" style={{
            background: 'var(--gradient-primary)',
            color: 'var(--color-text)'
          }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}

        {/* Indicador de estado */}
        <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full transition-colors ${
          unreadCount > 0 ? 'animate-pulse' : ''
        }`} style={{
          backgroundColor: unreadCount > 0 ? 'var(--color-success)' : 'var(--color-text-tertiary)'
        }}></div>
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 theme-card shadow-2xl z-50 animate-fade-in">
          <NotificationPanel onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
} 