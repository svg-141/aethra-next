"use client";

import { useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Notification } from '../types/notification.types';
import { NOTIFICATION_TYPES, NOTIFICATION_PRIORITIES } from '../constants/notification-constants';

interface NotificationPanelProps {
  onClose: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAll,
    updateFilters,
    getFilteredNotifications 
  } = useNotifications();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleFilterChange = (filter: 'all' | 'unread' | 'read') => {
    setActiveFilter(filter);
    updateFilters({ read: filter === 'all' ? undefined : filter === 'unread' ? false : true });
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    updateFilters({ type: type === 'all' ? undefined : type as 'achievement' | 'friend' | 'chat' | 'system' | 'security' });
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      window.open(notification.actionUrl, '_blank');
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `hace ${minutes}m`;
    if (hours < 24) return `hace ${hours}h`;
    if (days < 7) return `hace ${days}d`;
    return new Date(timestamp).toLocaleDateString();
  };

  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold theme-text-primary">Notificaciones</h3>
          {unreadCount > 0 && (
            <span className="theme-badge px-2 py-1 text-xs rounded-full" style={{ 
              background: 'var(--color-error)', 
              color: 'var(--color-text)', 
              border: '1px solid var(--color-error)' 
            }}>
              {unreadCount} nueva{unreadCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="icon-theme hover:icon-error transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleFilterChange('all')}
          className={`theme-badge px-3 py-1 text-xs rounded-full transition-all ${
            activeFilter === 'all'
              ? 'theme-button'
              : 'hover:theme-bg-hover'
          }`}
          style={activeFilter === 'all' ? { background: 'var(--gradient-primary)' } : {}}
        >
          Todas
        </button>
        <button
          onClick={() => handleFilterChange('unread')}
          className={`theme-badge px-3 py-1 text-xs rounded-full transition-all ${
            activeFilter === 'unread'
              ? 'theme-button'
              : 'hover:theme-bg-hover'
          }`}
          style={activeFilter === 'unread' ? { background: 'var(--gradient-primary)' } : {}}
        >
          No leídas
        </button>
        <button
          onClick={() => handleFilterChange('read')}
          className={`theme-badge px-3 py-1 text-xs rounded-full transition-all ${
            activeFilter === 'read'
              ? 'theme-button'
              : 'hover:theme-bg-hover'
          }`}
          style={activeFilter === 'read' ? { background: 'var(--gradient-primary)' } : {}}
        >
          Leídas
        </button>
      </div>

      {/* Filtro por tipo */}
      <div className="mb-4">
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="select-theme w-full px-3 py-2 text-sm"
        >
          <option value="all">Todos los tipos</option>
          {Object.entries(NOTIFICATION_TYPES).map(([type, config]) => (
            <option key={type} value={type}>{config.label}</option>
          ))}
        </select>
      </div>

      {/* Acciones */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={markAllAsRead}
          className="theme-button flex-1 px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50"
          disabled={unreadCount === 0}
        >
          <i className="fas fa-check-double icon-theme mr-2"></i>
          Marcar todas como leídas
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-2 rounded-lg text-sm transition-all disabled:opacity-50" 
          style={{ 
            background: 'rgba(239, 68, 68, 0.2)', 
            color: 'var(--color-error)' 
          }}
          disabled={notifications.length === 0}
        >
          <i className="fas fa-trash icon-error"></i>
        </button>
      </div>

      {/* Lista de notificaciones */}
      <div className="max-h-96 overflow-y-auto space-y-2 scrollbar-theme">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 theme-text-secondary">
            <i className="fas fa-bell-slash text-3xl mb-2 icon-muted"></i>
            <p>No hay notificaciones</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`theme-card p-3 border transition-all cursor-pointer ${
                notification.read
                  ? 'opacity-75'
                  : 'theme-border-hover'
              } hover:card-hover group`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start gap-3">
                {/* Icono */}
                <div className={`text-lg ${NOTIFICATION_TYPES[notification.type].color}`}>
                  <i className={`${NOTIFICATION_TYPES[notification.type].icon} icon-theme`}></i>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className={`text-sm font-medium truncate ${
                      notification.read ? 'theme-text-muted' : 'theme-text-primary'
                    }`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {/* Prioridad */}
                      <span className={`theme-badge px-2 py-1 text-xs rounded-full ${
                        NOTIFICATION_PRIORITIES[notification.priority].bgColor
                      } ${NOTIFICATION_PRIORITIES[notification.priority].color}`}>
                        {NOTIFICATION_PRIORITIES[notification.priority].label}
                      </span>
                      
                      {/* Tiempo */}
                      <span className="text-xs theme-text-muted">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm theme-text-secondary line-clamp-2">
                    {notification.message}
                  </p>

                  {/* Acción */}
                  {notification.actionText && (
                    <button className="mt-2 text-xs icon-primary hover:icon-secondary transition-colors">
                      {notification.actionText} →
                    </button>
                  )}
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="icon-muted hover:icon-error transition-colors opacity-0 group-hover:opacity-100"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t theme-border text-center">
        <button
          onClick={() => window.open('/notifications', '_blank')}
          className="text-sm icon-primary hover:icon-secondary transition-colors"
        >
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  );
} 