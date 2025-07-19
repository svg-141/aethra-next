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
      return 'text-gray-400';
    }

    // Mostrar color según la prioridad más alta
    const urgentNotification = notifications.find(n => !n.read && n.priority === 'urgent');
    if (urgentNotification) {
      return 'text-red-400';
    }

    const highNotification = notifications.find(n => !n.read && n.priority === 'high');
    if (highNotification) {
      return 'text-orange-400';
    }

    return 'text-purple-400';
  };

  return (
    <div className="relative notification-bell-container">
      {/* Botón de notificaciones */}
      <button
        onClick={handleToggle}
        className={`relative p-2 rounded-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-purple-600/30 text-purple-300' 
            : 'text-gray-400 hover:text-white hover:bg-purple-600/20'
        } ${isAnimating ? 'animate-pulse' : ''}`}
        data-tooltip="notifications"
        aria-label={`${unreadCount} notificaciones no leídas`}
      >
        <i className={`${getNotificationIcon()} text-lg ${getNotificationColor()}`}></i>
        
        {/* Badge de notificaciones no leídas */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}

        {/* Indicador de estado */}
        <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full ${
          unreadCount > 0 ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
        }`}></div>
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-xl border border-purple-900/60 shadow-2xl z-50">
          <NotificationPanel onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
} 