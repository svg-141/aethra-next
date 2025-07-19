# Tooltips Feature

Sistema de tooltips contextuales para guiar a los usuarios por la plataforma Aethra.

## 📁 Estructura del Feature

```
features/tooltips/
├── components/          # Componentes React
│   └── TooltipGuide.tsx # Componente principal de tooltips
├── hooks/              # Hooks personalizados
│   └── useTooltips.ts  # Hook para gestión de tooltips
├── types/              # Definiciones de tipos TypeScript
│   └── tooltip.types.ts
├── constants/          # Constantes y configuración
│   └── tooltip-steps.ts
├── index.ts            # Exports principales del feature
└── README.md           # Esta documentación
```

## 🚀 Uso

### Importación básica
```typescript
import { TooltipGuide, useTooltips } from '../features/tooltips';
```

### En un componente
```typescript
import { TooltipGuide } from '../features/tooltips';

function MyPage() {
  return (
    <div>
      {/* Contenido de la página */}
      
      {/* Tooltips para esta sección */}
      <TooltipGuide section="navbar" />
    </div>
  );
}
```

### En un elemento específico
```typescript
import { TooltipWrapper } from '../features/tooltips';

function MyComponent() {
  return (
    <TooltipWrapper tooltipId="my-tooltip">
      <button>Mi botón</button>
    </TooltipWrapper>
  );
}
```

## ⚙️ Configuración

### Preferencias por defecto
```typescript
const defaultPreferences = {
  showTooltips: true,      // Mostrar tooltips
  animatedTooltips: true,  // Animaciones
  spotlightMode: true,     // Efecto spotlight
};
```

### Secciones disponibles
- `navbar` - Barra de navegación
- `chat` - Página de chat IA
- `community` - Página de comunidad
- `guides` - Página de guías
- `profile` - Página de perfil

## 🎨 Características

### Efecto Spotlight
- Overlay atenuado que resalta elementos
- Borde brillante con animación pulsante
- Z-index optimizado para superposición

### Animaciones
- Fade-in suave para tooltips
- Transiciones fluidas entre tooltips
- Respeto a `prefers-reduced-motion`

### Posicionamiento
- 4 direcciones: top, bottom, left, right
- Ajuste automático para evitar salir de pantalla
- Flechas direccionales que apuntan al elemento

## 💾 Persistencia

El estado se guarda automáticamente en localStorage:
- `aethra-tooltips-seen` - Tooltips vistos
- `aethra-tooltips-preferences` - Preferencias del usuario

## 🔧 API

### Hook `useTooltips`
```typescript
const {
  tooltipsSeen,           // Set de tooltips vistos
  preferences,            // Preferencias actuales
  markTooltipAsSeen,      // Marcar tooltip como visto
  shouldShowTooltip,      // Verificar si mostrar tooltip
  updatePreferences,      // Actualizar preferencias
  resetTooltips,          // Resetear tooltips
} = useTooltips();
```

### Componente `TooltipGuide`
```typescript
<TooltipGuide 
  section="navbar"  // Sección para mostrar tooltips
/>
```

### Componente `TooltipWrapper`
```typescript
<TooltipWrapper 
  tooltipId="my-tooltip"  // ID del tooltip
  className="optional"    // Clases CSS opcionales
>
  {children}
</TooltipWrapper>
```

## 🎯 Tooltips Disponibles

### Navbar
- `navbar-search` - Búsqueda global
- `navbar-notifications` - Notificaciones
- `navbar-themes` - Personalización

### Chat
- `chat-game-selector` - Selector de juego
- `chat-examples` - Ejemplos de consultas
- `chat-input` - Campo de entrada

### Comunidad
- `community-post-form` - Crear post
- `community-filters` - Filtros de posts

### Guías
- `guides-filter` - Filtro de guías
- `guides-card` - Tarjeta de guía

### Perfil
- `profile-stats` - Estadísticas
- `profile-achievements` - Logros

## ♿ Accesibilidad

- Respeto a `prefers-reduced-motion`
- Controles de teclado (preparado)
- Compatible con alto contraste
- Screen readers friendly 