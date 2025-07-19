import { Notification, NotificationPreferences, NotificationService } from '../types/notification.types';
import { NOTIFICATION_SOUNDS, NOTIFICATION_DEFAULTS } from '../constants/notification-constants';

class NotificationServiceImpl implements NotificationService {
  private subscribers: Set<(notification: Notification) => void> = new Set();
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  constructor() {
    // Solo inicializar WebSocket en producción
    if (!this.isDevelopment) {
      this.initializeWebSocket();
    }
    this.loadPreferences();
  }

  private initializeWebSocket() {
    try {
      // En producción, esto sería la URL real del WebSocket
      const wsUrl = process.env.NODE_ENV === 'production' 
        ? 'wss://api.aethra.com/notifications'
        : 'ws://localhost:3001/notifications';
      
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket conectado para notificaciones');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const notification: Notification = JSON.parse(event.data);
          this.handleIncomingNotification(notification);
        } catch (error) {
          console.error('Error parsing notification:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket desconectado');
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        // Solo loggear el error, no mostrar en consola del navegador
        if (process.env.NODE_ENV === 'production') {
          console.error('WebSocket error:', error);
        }
      };
    } catch (error) {
      // Solo loggear el error en producción
      if (process.env.NODE_ENV === 'production') {
        console.error('Error initializing WebSocket:', error);
      }
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        this.initializeWebSocket();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  private handleIncomingNotification(notification: Notification) {
    // Notificar a todos los suscriptores
    this.subscribers.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Error in notification callback:', error);
      }
    });

    // Reproducir sonido si está habilitado
    this.playNotificationSound(notification.type);
  }

  private playNotificationSound(type: string) {
    const preferences = this.getStoredPreferences();
    if (!preferences.sound) return;

    try {
      const audio = new Audio();
      audio.volume = NOTIFICATION_DEFAULTS.soundVolume;
      
      switch (type) {
        case 'achievement':
          audio.src = NOTIFICATION_SOUNDS.achievement;
          break;
        case 'urgent':
          audio.src = NOTIFICATION_SOUNDS.urgent;
          break;
        default:
          audio.src = NOTIFICATION_SOUNDS.default;
      }

      audio.play().catch(error => {
        // Solo loggear el error en producción
        if (process.env.NODE_ENV === 'production') {
          console.error('Error playing notification sound:', error);
        }
      });
    } catch (error) {
      // Solo loggear el error en producción
      if (process.env.NODE_ENV === 'production') {
        console.error('Error creating audio element:', error);
      }
    }
  }

  private getStoredPreferences(): NotificationPreferences {
    try {
      // Verificar si estamos en el navegador
      if (typeof window === 'undefined') {
        return {};
      }
      const stored = localStorage.getItem('aethra-notification-preferences');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading notification preferences:', error);
      return {};
    }
  }

  private loadPreferences() {
    // Cargar preferencias desde localStorage
    const preferences = this.getStoredPreferences();
    if (!preferences.enabled) {
      this.subscribers.clear();
    }
  }

  subscribe(callback: (notification: Notification) => void): () => void {
    this.subscribers.add(callback);
    
    // Retornar función para desuscribirse
    return () => {
      this.subscribers.delete(callback);
    };
  }

  send(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const fullNotification: Notification = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date(),
      read: false
    };

    // Enviar por WebSocket si está conectado y no estamos en desarrollo
    if (!this.isDevelopment && this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(fullNotification));
    }

    // También notificar localmente
    this.handleIncomingNotification(fullNotification);
  }

  async markAsRead(id: string): Promise<void> {
    try {
      // En producción, esto haría una llamada al API
      if (!this.isDevelopment && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'mark-read', id }));
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      if (!this.isDevelopment && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'mark-all-read' }));
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      if (!this.isDevelopment && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'delete', id }));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  async clearAll(): Promise<void> {
    try {
      if (!this.isDevelopment && this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'clear-all' }));
      }
    } catch (error) {
      console.error('Error clearing all notifications:', error);
    }
  }

  async getPreferences(): Promise<NotificationPreferences> {
    return this.getStoredPreferences();
  }

  async updatePreferences(preferences: Partial<NotificationPreferences>): Promise<void> {
    try {
      // Verificar si estamos en el navegador
      if (typeof window === 'undefined') {
        return;
      }
      const current = this.getStoredPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem('aethra-notification-preferences', JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating notification preferences:', error);
    }
  }

  private generateId(): string {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Método para simular notificaciones en desarrollo
  simulateNotification(type: string = 'info') {
    const notifications = [
      {
        type: 'achievement' as const,
        priority: 'high' as const,
        title: '¡Nuevo Logro Desbloqueado!',
        message: 'Has completado 10 partidas consecutivas. ¡Felicidades!',
        icon: '🏆'
      },
      {
        type: 'message' as const,
        priority: 'medium' as const,
        title: 'Nuevo Mensaje',
        message: 'Tienes un nuevo comentario en tu post sobre estrategias.',
        icon: '💬'
      },
      {
        type: 'success' as const,
        priority: 'low' as const,
        title: 'Guía Actualizada',
        message: 'La guía de Valorant ha sido actualizada con el nuevo meta.',
        icon: '📚'
      }
    ];

    const notification = notifications[Math.floor(Math.random() * notifications.length)];
    this.send(notification);
  }
}

export const notificationService = new NotificationServiceImpl(); 