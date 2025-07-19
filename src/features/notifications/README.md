# Notifications Feature

Sistema de notificaciones en tiempo real para la plataforma Aethra con WebSocket, persistencia y personalización completa.

## 📁 Estructura del Feature

```
features/notifications/
├── components/              # Componentes React
│   ├── NotificationBell.tsx # Campana de notificaciones
│   ├── NotificationPanel.tsx # Panel de notificaciones
│   ├── NotificationToast.tsx # Notificaciones emergentes
│   └── NotificationManager.tsx # Gestor global
├── hooks/                   # Hooks personalizados
│   └── useNotifications.ts  # Hook principal
├── services/                # Servicios
│   └── notificationService.ts # Servicio WebSocket
├── types/                   # Tipos TypeScript
│   └── notification.types.ts
├── constants/               # Constantes
│   └── notification-constants.ts
├── index.ts                 # Exports principales
└── README.md                # Esta documentación
```

## 🚀 Características Principales

### ⚡ Tiempo Real
- **WebSocket** para notificaciones instantáneas
- **Reconexión automática** con backoff exponencial
- **Sincronización** entre múltiples pestañas

### 🎨 UI/UX Avanzada
- **Notificaciones emergentes** con animaciones suaves
- **Panel desplegable** con filtros y búsqueda
- **Badges dinámicos** según prioridad y tipo
- **Sonidos personalizados** por tipo de notificación

### ⚙️ Personalización Completa
- **Preferencias por usuario** (sonido, desktop, email)
- **Filtros por tipo** y prioridad
- **Configuración de duración** y auto-hide
- **Modo silencioso** y notificaciones urgentes

### 💾 Persistencia
- **localStorage** para preferencias
- **Historial de notificaciones** persistente
- **Estado sincronizado** entre sesiones

## 🔧 Uso

### Importación básica
```typescript
import { 
  useNotifications, 
  NotificationBell, 
  NotificationManager 
} from '../features/notifications';
```

### Hook principal
```typescript
const {
  notifications,        // Lista de notificaciones
  unreadCount,         // Contador no leídas
  preferences,         // Preferencias del usuario
  addNotification,     // Agregar notificación
  markAsRead,          // Marcar como leída
  markAllAsRead,       // Marcar todas como leídas
  deleteNotification,  // Eliminar notificación
  clearAll,           // Limpiar todas
  updatePreferences,   // Actualizar preferencias
  getFilteredNotifications // Obtener filtradas
} = useNotifications();
```

### Componentes principales
```typescript
// Campana de notificaciones
<NotificationBell />

// Gestor global (en layout)
<NotificationManager />

// Panel personalizado
<NotificationPanel onClose={() => {}} />

// Toast individual
<NotificationToast 
  notification={notification}
  onClose={() => {}}
  onAction={() => {}}
/>
```

## 📋 Tipos de Notificaciones

### Tipos disponibles
- `info` - Información general
- `success` - Operaciones exitosas
- `warning` - Advertencias
- `error` - Errores
- `achievement` - Logros desbloqueados
- `message` - Mensajes de otros usuarios
- `system` - Notificaciones del sistema

### Prioridades
- `low` - Baja prioridad
- `medium` - Prioridad media
- `high` - Alta prioridad
- `urgent` - Urgente (siempre visible)

## 🎨 Configuración Visual

### Colores por tipo
```typescript
const NOTIFICATION_TYPES = {
  info: { color: 'text-blue-400', icon: 'fas fa-info-circle' },
  success: { color: 'text-green-400', icon: 'fas fa-check-circle' },
  warning: { color: 'text-yellow-400', icon: 'fas fa-exclamation-triangle' },
  error: { color: 'text-red-400', icon: 'fas fa-times-circle' },
  achievement: { color: 'text-purple-400', icon: 'fas fa-trophy' },
  message: { color: 'text-indigo-400', icon: 'fas fa-comment' },
  system: { color: 'text-gray-400', icon: 'fas fa-cog' }
};
```

### Animaciones
- **Slide-in** desde la derecha
- **Fade-out** con transición suave
- **Bounce** para notificaciones urgentes
- **Pulse** para indicadores de estado

## 🔌 WebSocket Service

### Configuración
```typescript
// URLs por entorno
const wsUrl = process.env.NODE_ENV === 'production' 
  ? 'wss://api.aethra.com/notifications'
  : 'ws://localhost:3001/notifications';
```

### Reconexión automática
- **5 intentos** máximo
- **Backoff exponencial** (1s, 2s, 4s, 8s, 16s)
- **Estado persistente** durante reconexión

### Mensajes soportados
```typescript
// Enviar notificación
ws.send(JSON.stringify(notification));

// Marcar como leída
ws.send(JSON.stringify({ type: 'mark-read', id }));

// Marcar todas como leídas
ws.send(JSON.stringify({ type: 'mark-all-read' }));

// Eliminar notificación
ws.send(JSON.stringify({ type: 'delete', id }));

// Limpiar todas
ws.send(JSON.stringify({ type: 'clear-all' }));
```

## 🎵 Sistema de Sonidos

### Sonidos disponibles
```typescript
const NOTIFICATION_SOUNDS = {
  default: '/sounds/notification.mp3',
  achievement: '/sounds/achievement.mp3',
  urgent: '/sounds/urgent.mp3'
};
```

### Configuración
- **Volumen ajustable** (0.5 por defecto)
- **Deshabilitable** por usuario
- **Sonidos específicos** por tipo de notificación

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Panel a pantalla completa
- **Tablet**: Panel lateral
- **Desktop**: Panel desplegable

### Accesibilidad
- **Navegación por teclado** (Escape para cerrar)
- **Screen readers** compatibles
- **ARIA labels** apropiados
- **Contraste** optimizado

## 🧪 Testing

### Simulación en desarrollo
```typescript
// Simular notificación aleatoria
notificationService.simulateNotification();

// Simular tipo específico
notificationService.simulateNotification('achievement');
```

### Estados de prueba
- Notificaciones vacías
- Múltiples notificaciones
- Notificaciones urgentes
- WebSocket desconectado
- Preferencias deshabilitadas

## 🔒 Seguridad

### Validación
- **Sanitización** de contenido
- **Límites** de tamaño de mensaje
- **Rate limiting** para spam
- **Autenticación** de WebSocket

### Privacidad
- **Datos locales** en localStorage
- **Sin tracking** de comportamiento
- **Opciones de borrado** completo

## 🚀 Performance

### Optimizaciones
- **Lazy loading** de componentes
- **Memoización** de filtros
- **Debouncing** de actualizaciones
- **Virtual scrolling** para listas grandes

### Límites
- **50 notificaciones** máximo en memoria
- **99+** badge para contadores grandes
- **5 segundos** auto-hide por defecto

## 📈 Métricas

### Eventos trackeables
- Notificaciones enviadas
- Notificaciones leídas
- Tiempo de respuesta
- Preferencias actualizadas
- Errores de WebSocket

## 🔄 Migración

### Desde sistema anterior
```typescript
// Migrar notificaciones existentes
const oldNotifications = JSON.parse(localStorage.getItem('old-notifications') || '[]');
oldNotifications.forEach(notification => {
  addNotification({
    type: notification.type,
    priority: 'medium',
    title: notification.title,
    message: notification.message
  });
});
```

## 🐛 Troubleshooting

### Problemas comunes
1. **WebSocket no conecta**: Verificar URL y firewall
2. **Sonidos no funcionan**: Verificar permisos del navegador
3. **Notificaciones duplicadas**: Verificar suscripciones múltiples
4. **Performance lenta**: Verificar límites de notificaciones

### Debug
```typescript
// Habilitar logs detallados
localStorage.setItem('debug-notifications', 'true');

// Ver estado actual
console.log(notificationService.getState());
```

## 📚 API Reference

### NotificationService
```typescript
class NotificationService {
  subscribe(callback): () => void
  send(notification): void
  markAsRead(id): Promise<void>
  markAllAsRead(): Promise<void>
  delete(id): Promise<void>
  clearAll(): Promise<void>
  getPreferences(): Promise<NotificationPreferences>
  updatePreferences(preferences): Promise<void>
  simulateNotification(type?): void
}
```

### useNotifications Hook
```typescript
interface UseNotificationsReturn {
  notifications: Notification[]
  unreadCount: number
  preferences: NotificationPreferences
  filters: NotificationFilters
  addNotification: (notification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
  updatePreferences: (preferences) => void
  updateFilters: (filters) => void
  getFilteredNotifications: () => Notification[]
}
```

## 🎯 Roadmap

### Próximas características
- [ ] **Push notifications** para navegador
- [ ] **Notificaciones por email**
- [ ] **Filtros avanzados** por fecha
- [ ] **Templates** de notificaciones
- [ ] **Integración** con Discord/Slack
- [ ] **Analytics** de engagement
- [ ] **A/B testing** de contenido
- [ ] **Machine learning** para relevancia 