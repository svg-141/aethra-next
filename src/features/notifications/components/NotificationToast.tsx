"use client";

import { useState, useEffect } from 'react';
import { Notification } from '../types/notification.types';
import { NOTIFICATION_TYPES, NOTIFICATION_PRIORITIES, NOTIFICATION_DEFAULTS } from '../constants/notification-constants';

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
  onAction?: () => void;
}

export default function NotificationToast({ notification, onClose, onAction }: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animación de entrada
    const enterTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-hide después del tiempo configurado
    const hideTimer = setTimeout(() => {
      handleClose();
    }, NOTIFICATION_DEFAULTS.autoHide);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    handleClose();
  };

  const getPriorityStyles = () => {
    switch (notification.priority) {
      case 'urgent':
        return 'border-red-500/50 bg-red-500/10';
      case 'high':
        return 'border-orange-500/50 bg-orange-500/10';
      case 'medium':
        return 'border-blue-500/50 bg-blue-500/10';
      case 'low':
        return 'border-gray-500/50 bg-gray-500/10';
      default:
        return 'border-purple-500/50 bg-purple-500/10';
    }
  };

  const getAnimationClass = () => {
    if (isExiting) return 'animate-slide-out-right';
    if (isVisible) return 'animate-slide-in-right';
    return 'translate-x-full opacity-0';
  };

  return (
    <div
      className={`fixed top-4 right-4 w-80 bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-xl border shadow-2xl z-50 transition-all duration-300 ${getPriorityStyles()} ${getAnimationClass()}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`text-lg ${NOTIFICATION_TYPES[notification.type].color}`}>
              <i className={NOTIFICATION_TYPES[notification.type].icon}></i>
            </div>
            <h4 className="text-sm font-semibold text-white truncate">
              {notification.title}
            </h4>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Prioridad */}
            <span className={`px-2 py-1 text-xs rounded-full border ${
              NOTIFICATION_PRIORITIES[notification.priority].bgColor
            } ${NOTIFICATION_PRIORITIES[notification.priority].color}`}>
              {NOTIFICATION_PRIORITIES[notification.priority].label}
            </span>
            
            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Cerrar notificación"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>

        {/* Mensaje */}
        <p className="text-sm text-gray-300 mb-3 line-clamp-2">
          {notification.message}
        </p>

        {/* Acciones */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {notification.actionText && (
              <button
                onClick={handleAction}
                className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-lg font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                {notification.actionText}
              </button>
            )}
          </div>
          
          <span className="text-xs text-gray-400">
            Ahora
          </span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="h-1 bg-gray-700 rounded-b-xl overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-linear"
          style={{
            width: isVisible ? '0%' : '100%',
            transitionDuration: `${NOTIFICATION_DEFAULTS.autoHide}ms`
          }}
        />
      </div>
    </div>
  );
} 