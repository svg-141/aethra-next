# Profile Feature

Este feature maneja toda la funcionalidad relacionada con perfiles de usuario, logros, conexiones y suscripciones en Aethra.

## Estructura

```
profile/
├── components/              # Componentes de UI
│   ├── UserCard.tsx        # Tarjeta de usuario principal
│   ├── AchievementCard.tsx # Tarjeta de logro individual
│   ├── ConnectionCard.tsx  # Tarjeta de conexión de plataforma
│   └── SubscriptionCard.tsx # Tarjeta de suscripción
├── types/                  # Definiciones de tipos TypeScript
│   └── profile.types.ts
├── constants/              # Constantes y datos estáticos
│   └── profile-constants.ts
├── index.ts               # API pública del feature
└── README.md              # Esta documentación
```

## Componentes

### UserCard
Muestra la información principal del usuario:
- Avatar con indicador de estado online/offline
- Nombre, username y nivel
- Información de verificación
- Bio y ubicación
- Enlaces sociales (Discord, Twitter, Twitch, YouTube)
- Estadísticas detalladas (partidas, win rate, horas, logros)
- Botones de acción (editar, ver perfil completo)

**Props:**
- `user: User` - Datos del usuario
- `stats: UserStats` - Estadísticas del usuario
- `onEdit?: (userId: string) => void` - Callback para editar
- `onViewProfile?: (userId: string) => void` - Callback para ver perfil
- `children?: React.ReactNode` - Contenido adicional

### AchievementCard
Muestra un logro individual con toda su información:
- Icono y título del logro
- Descripción y categoría
- Raridad (común, raro, épico, legendario)
- Estado (desbloqueado/pendiente)
- Progreso con barra visual
- Puntos otorgados
- Fecha de desbloqueo
- Botón para compartir

**Props:**
- `achievement: Achievement` - Datos del logro
- `onView?: (achievementId: string) => void` - Callback para ver
- `onShare?: (achievementId: string) => void` - Callback para compartir

### ConnectionCard
Muestra una conexión con plataforma externa:
- Icono y nombre de la plataforma
- Estado de conexión (conectado, desconectado, error, sincronizando)
- Fechas de conexión y última sincronización
- Datos específicos de la plataforma
- Botones de acción (reconectar, gestionar, desconectar)

**Props:**
- `connection: Connection` - Datos de la conexión
- `onDisconnect: (connectionId: string) => void` - Callback para desconectar
- `onReconnect?: (connectionId: string) => void` - Callback para reconectar
- `onManage?: (connectionId: string) => void` - Callback para gestionar

### SubscriptionCard
Muestra información de suscripción del usuario:
- Plan y estado de suscripción
- Fechas de inicio y próxima facturación
- Renovación automática
- Método de pago
- Lista de características incluidas
- Precio y ciclo de facturación
- Botones de acción (administrar, mejorar, cancelar)

**Props:**
- `subscription: Subscription` - Datos de la suscripción
- `onManage: (subscriptionId: string) => void` - Callback para administrar
- `onUpgrade?: (subscriptionId: string) => void` - Callback para mejorar
- `onCancel?: (subscriptionId: string) => void` - Callback para cancelar

## Tipos

### User
```typescript
interface User {
  id: string;
  avatar: string;
  name: string;
  username: string;
  email: string;
  level: number;
  rank: string;
  joinDate: Date;
  lastActive: Date;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks: {
    discord?: string;
    twitter?: string;
    twitch?: string;
    youtube?: string;
  };
  preferences: UserPreferences;
  isVerified: boolean;
  isOnline: boolean;
}
```

### UserStats
```typescript
interface UserStats {
  totalMatches: number;
  winRate: number;
  totalHours: number;
  achievements: number;
  rank: string;
  currentStreak: number;
  bestStreak: number;
  favoriteGame: string;
  totalWins: number;
  totalLosses: number;
}
```

### Achievement
```typescript
interface Achievement {
  id: string;
  icon: string;
  color: string;
  title: string;
  description: string;
  date: Date;
  category: AchievementCategory;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  maxProgress?: number;
  isUnlocked: boolean;
  points: number;
}
```

### Connection
```typescript
interface Connection {
  id: string;
  name: string;
  type: ConnectionType;
  status: ConnectionStatus;
  icon: string;
  color: string;
  connectedAt: Date;
  lastSync: Date;
  isActive: boolean;
  data?: any;
}
```

### Subscription
```typescript
interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  features: string[];
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
  paymentMethod?: string;
}
```

## Constantes

### SAMPLE_USER
Usuario de ejemplo con datos completos para desarrollo.

### SAMPLE_USER_STATS
Estadísticas de ejemplo del usuario.

### SAMPLE_ACHIEVEMENTS
Array de logros de ejemplo con diferentes categorías y rarezas.

### SAMPLE_CONNECTIONS
Conexiones de ejemplo con diferentes plataformas y estados.

### SAMPLE_SUBSCRIPTION
Suscripción de ejemplo con plan Pro.

### SUBSCRIPTION_PLANS
Planes de suscripción disponibles con características y precios.

### ACHIEVEMENT_CATEGORIES
Categorías de logros disponibles.

### CONNECTION_TYPES
Tipos de conexión soportados.

### RANK_LEVELS
Niveles de rango disponibles.

## Uso

```typescript
import { UserCard, AchievementCard, ConnectionCard, SubscriptionCard, User, UserStats } from '@/features/profile';
import { SAMPLE_USER, SAMPLE_USER_STATS, SAMPLE_ACHIEVEMENTS, SAMPLE_CONNECTIONS, SAMPLE_SUBSCRIPTION } from '@/features/profile/constants/profile-constants';

// En tu componente
const handleEditUser = (userId: string) => {
  // Lógica para editar usuario
};

const handleViewAchievement = (achievementId: string) => {
  // Lógica para ver logro
};

const handleDisconnect = (connectionId: string) => {
  // Lógica para desconectar
};

const handleManageSubscription = (subscriptionId: string) => {
  // Lógica para administrar suscripción
};

return (
  <div className="space-y-6">
    {/* Tarjeta de usuario */}
    <UserCard 
      user={SAMPLE_USER}
      stats={SAMPLE_USER_STATS}
      onEdit={handleEditUser}
    />
    
    {/* Logros */}
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-white">Logros</h3>
      {SAMPLE_ACHIEVEMENTS.map(achievement => (
        <AchievementCard 
          key={achievement.id}
          achievement={achievement}
          onView={handleViewAchievement}
        />
      ))}
    </div>
    
    {/* Conexiones */}
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-white">Conexiones</h3>
      {SAMPLE_CONNECTIONS.map(connection => (
        <ConnectionCard 
          key={connection.id}
          connection={connection}
          onDisconnect={handleDisconnect}
        />
      ))}
    </div>
    
    {/* Suscripción */}
    <SubscriptionCard 
      subscription={SAMPLE_SUBSCRIPTION}
      onManage={handleManageSubscription}
    />
  </div>
);
```

## Características

- **Perfil Completo**: Información detallada del usuario con estadísticas
- **Sistema de Logros**: Logros con categorías, rarezas y progreso
- **Conexiones**: Integración con plataformas externas
- **Suscripciones**: Gestión de planes y pagos
- **Responsive**: Todos los componentes se adaptan a diferentes tamaños
- **Interactivo**: Botones de acción y navegación funcionales
- **Tipado**: TypeScript completo para mejor desarrollo
- **Modular**: Fácil de importar y usar en cualquier parte
- **Personalizable**: Estilos y comportamiento configurables

## Integración

Este feature se integra con:
- **Community Feature**: Para mostrar perfiles en posts y comentarios
- **Notifications Feature**: Para notificar sobre logros y cambios
- **Tooltips Feature**: Para mostrar información contextual
- **Games Feature**: Para estadísticas específicas de juegos
- **Chat Feature**: Para información de usuarios en chat 