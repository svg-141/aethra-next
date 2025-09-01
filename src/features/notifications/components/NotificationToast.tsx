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
        return 'theme-border shadow-lg';
      case 'high':
        return 'theme-border shadow-md';
      case 'medium':
        return 'theme-border shadow-sm';
      case 'low':
        return 'theme-border';
      default:
        return 'theme-border';
    }
  };

  const getAnimationClass = () => {
    if (isExiting) return 'animate-slide-out-right';
    if (isVisible) return 'animate-slide-in-right';
    return 'translate-x-full opacity-0';
  };

  return (
    <div
      className={`fixed theme-card p-0 ${getPriorityStyles()} ${getAnimationClass()}`}
      style={{ 
        top: '20px', 
        right: '20px', 
        width: '350px',
        zIndex: 1080
      }}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-between p-3 theme-bg-surface theme-border-b">
        <div className="flex items-center gap-2">
          <div className={`text-lg ${NOTIFICATION_TYPES[notification.type].color}`}>
            <i className={`${NOTIFICATION_TYPES[notification.type].icon} icon-theme`}></i>
          </div>
          <strong className="theme-text-primary font-semibold">
            {notification.title}
          </strong>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`theme-badge px-2 py-1 text-xs rounded-full ${
            NOTIFICATION_PRIORITIES[notification.priority].bgColor
          } ${NOTIFICATION_PRIORITIES[notification.priority].color}`}>
            {NOTIFICATION_PRIORITIES[notification.priority].label}
          </span>
          
          <button
            type="button"
            className="icon-muted hover:icon-error transition-colors"
            onClick={handleClose}
            aria-label="Cerrar notificación"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div className="p-3 theme-bg-surface">
        <p className="theme-text-secondary mb-3 text-sm">
          {notification.message}
        </p>

        <div className="flex justify-between items-center">
          <div>
            {notification.actionText && (
              <button
                onClick={handleAction}
                className="theme-button px-3 py-1 text-sm rounded-lg"
              >
                {notification.actionText}
              </button>
            )}
          </div>
          
          <small className="theme-text-muted flex items-center">
            <i className="far fa-clock icon-muted mr-1"></i>
            Ahora
          </small>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 w-full h-1" style={{ background: 'var(--color-surface)' }}>
        <div 
          className="h-full transition-all"
          style={{
            width: isVisible ? '0%' : '100%',
            transitionDuration: `${NOTIFICATION_DEFAULTS.autoHide}ms`,
            background: 'var(--gradient-primary)',
            transition: 'width linear'
          }}
        />
      </div>
    </div>
  );
} 