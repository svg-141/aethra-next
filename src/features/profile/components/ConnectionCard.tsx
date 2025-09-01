import React from 'react';
import { ConnectionCardProps } from '../types/profile.types';

export default function ConnectionCard({ connection, onDisconnect, onReconnect, onManage }: ConnectionCardProps) {
  const handleDisconnect = () => {
    onDisconnect(connection.id);
  };

  const handleReconnect = () => {
    onReconnect?.(connection.id);
  };

  const handleManage = () => {
    onManage?.(connection.id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'disconnected': return 'text-gray-400';
      case 'error': return 'text-red-400';
      case 'syncing': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return 'fas fa-check-circle';
      case 'disconnected': return 'fas fa-times-circle';
      case 'error': return 'fas fa-exclamation-triangle';
      case 'syncing': return 'fas fa-sync-alt fa-spin';
      default: return 'fas fa-question-circle';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 cuadro rounded-lg mb-4 animate-theme-hover">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${connection.color} rounded-lg flex items-center justify-center text-white`}>
          <span className="text-lg">{connection.icon}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-sm font-medium text-theme-primary">{connection.name}</div>
            <span className={`text-xs ${getStatusColor(connection.status)}`}>
              <i className={`${getStatusIcon(connection.status)} mr-1`}></i>
              {connection.status === 'connected' && 'Conectado'}
              {connection.status === 'disconnected' && 'Desconectado'}
              {connection.status === 'error' && 'Error'}
              {connection.status === 'syncing' && 'Sincronizando'}
            </span>
          </div>
          
          <div className="text-xs text-theme-secondary">
            Conectado desde {formatDate(connection.connectedAt)}
          </div>
          
          {connection.lastSync && (
            <div className="text-xs text-theme-secondary">
              Última sincronización: {formatDate(connection.lastSync)}
            </div>
          )}
          
          {/* Connection data */}
          {connection.data && (
            <div className="mt-2 text-xs text-theme-secondary">
              {connection.data.username && (
                <span className="mr-3">@{connection.data.username}</span>
              )}
              {connection.data.games && (
                <span className="mr-3">{connection.data.games} juegos</span>
              )}
              {connection.data.level && (
                <span className="mr-3">Nivel {connection.data.level}</span>
              )}
              {connection.data.followers && (
                <span className="mr-3">{connection.data.followers} seguidores</span>
              )}
              {connection.data.serverCount && (
                <span className="mr-3">{connection.data.serverCount} servidores</span>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {connection.status === 'error' && onReconnect && (
          <button
            onClick={handleReconnect}
            className="p-2 text-yellow-400 hover:text-theme-primary transition-colors animate-theme-hover"
            title="Reconectar"
          >
            <i className="fas fa-redo"></i>
          </button>
        )}
        
        {onManage && (
          <button
            onClick={handleManage}
            className="p-2 text-theme-primary hover:text-theme-secondary transition-colors animate-theme-hover"
            title="Gestionar conexión"
          >
            <i className="fas fa-cog"></i>
          </button>
        )}
        
        <button
          onClick={handleDisconnect}
          className="p-2 text-red-400 hover:text-red-300 transition-colors animate-theme-hover"
          title="Desconectar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
} 