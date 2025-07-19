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
    updateFilters({ type: type === 'all' ? undefined : type as any });
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
          <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">
              {unreadCount} nueva{unreadCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 text-xs rounded-full transition-all ${
            activeFilter === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => handleFilterChange('unread')}
          className={`px-3 py-1 text-xs rounded-full transition-all ${
            activeFilter === 'unread'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
          }`}
        >
          No leídas
        </button>
        <button
          onClick={() => handleFilterChange('read')}
          className={`px-3 py-1 text-xs rounded-full transition-all ${
            activeFilter === 'read'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30'
          }`}
        >
          Leídas
        </button>
      </div>

      {/* Filtro por tipo */}
      <div className="mb-4">
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full bg-[#0f0720] text-white rounded-lg px-3 py-2 text-sm border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-600"
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
          className="flex-1 px-3 py-2 bg-purple-600/20 text-purple-300 rounded-lg text-sm hover:bg-purple-600/30 transition-all"
          disabled={unreadCount === 0}
        >
          <i className="fas fa-check-double mr-2"></i>
          Marcar todas como leídas
        </button>
        <button
          onClick={clearAll}
          className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg text-sm hover:bg-red-600/30 transition-all"
          disabled={notifications.length === 0}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>

      {/* Lista de notificaciones */}
      <div className="max-h-96 overflow-y-auto space-y-2">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fas fa-bell-slash text-3xl mb-2"></i>
            <p>No hay notificaciones</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                notification.read
                  ? 'bg-[#0f0720] border-gray-700/50 opacity-75'
                  : 'bg-purple-600/10 border-purple-600/30'
              } hover:border-purple-500/50`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-start gap-3">
                {/* Icono */}
                <div className={`text-lg ${NOTIFICATION_TYPES[notification.type].color}`}>
                  <i className={NOTIFICATION_TYPES[notification.type].icon}></i>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className={`text-sm font-medium truncate ${
                      notification.read ? 'text-gray-300' : 'text-white'
                    }`}>
                      {notification.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      {/* Prioridad */}
                      <span className={`px-2 py-1 text-xs rounded-full border ${
                        NOTIFICATION_PRIORITIES[notification.priority].bgColor
                      } ${NOTIFICATION_PRIORITIES[notification.priority].color}`}>
                        {NOTIFICATION_PRIORITIES[notification.priority].label}
                      </span>
                      
                      {/* Tiempo */}
                      <span className="text-xs text-gray-400">
                        {formatTime(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {notification.message}
                  </p>

                  {/* Acción */}
                  {notification.actionText && (
                    <button className="mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors">
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
                  className="text-gray-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-purple-900/50 text-center">
        <button
          onClick={() => window.open('/notifications', '_blank')}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Ver todas las notificaciones
        </button>
      </div>
    </div>
  );
} 