# Games Feature

Este feature maneja toda la funcionalidad relacionada con los juegos soportados y sus guías estratégicas en Aethra.

## Juegos Soportados

El proyecto se enfoca exclusivamente en 4 juegos competitivos:

1. **Valorant** - FPS táctico 5v5
2. **StarCraft 2** - RTS legendario
3. **CS2** - FPS competitivo por excelencia
4. **League of Legends** - MOBA masivo

## Estructura

```
games/
├── components/           # Componentes de UI
│   ├── GuideCard.tsx    # Tarjeta de guía individual
│   ├── GameCard.tsx     # Tarjeta de juego individual
│   └── SidebarGuide.tsx # Barra lateral para navegación
├── types/               # Definiciones de tipos TypeScript
│   └── games.types.ts
├── constants/           # Constantes y datos estáticos
│   └── games-constants.ts
├── index.ts            # API pública del feature
└── README.md           # Esta documentación
```

## Componentes

### GuideCard
Muestra una guía individual con toda su información:
- Imagen de portada y icono del juego
- Título y descripción de la guía
- Tipo de guía (estrategia, tutorial, meta-analysis, etc.)
- Autor y nivel de dificultad
- Estadísticas (vistas, descargas, rating)
- Tags y categorías
- Botones de acción (ver, descargar, calificar)
- Indicadores de estado (destacado, nuevo)

**Props:**
- `guide: Guide` - Datos de la guía
- `onView?: (guideId: string) => void` - Callback para ver guía
- `onDownload?: (guideId: string) => void` - Callback para descargar
- `onRate?: (guideId: string, rating: number) => void` - Callback para calificar

### GameCard
Muestra un juego individual con toda su información:
- Icono y nombre del juego
- Tipo y descripción
- Estadísticas (rating, jugadores, año de lanzamiento)
- Géneros y plataformas
- Badges de estado (nuevo, popular)
- Botones de acción (favorito, compartir)

**Props:**
- `game: Game` - Datos del juego
- `onClick?: (gameId: string) => void` - Callback al hacer clic
- `onFavorite?: (gameId: string) => void` - Callback para favorito
- `onShare?: (gameId: string) => void` - Callback para compartir
- `details?: React.ReactNode` - Contenido adicional

### SidebarGuide
Barra lateral para navegación en guías:
- Índice de secciones con navegación
- Información de actualizaciones
- Botón de descarga de guía
- Estado activo de secciones

**Props:**
- `sections: Section[]` - Lista de secciones
- `updates?: UpdateInfo` - Información de actualizaciones
- `downloadLabel?: string` - Etiqueta del botón de descarga
- `onDownload?: () => void` - Callback para descargar
- `onSectionClick?: (sectionId: string) => void` - Callback para navegar

## Tipos

### Guide
```typescript
interface Guide {
  id: string;
  image: string;
  icon: string;
  name: string;
  type: GuideType;
  typeColor: string;
  description: string;
  tags: string[];
  rating: number;
  link: string;
  updated: string;
  meta: string;
  author: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  views: number;
  downloads: number;
  isFeatured?: boolean;
  isNew?: boolean;
}
```

### Game
```typescript
interface Game {
  id: string;
  image: string;
  name: string;
  type: GameType;
  description: string;
  badge?: string;
  badgeColor?: string;
  genre: string[];
  platform: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  rating: number;
  playerCount: number;
  isPopular?: boolean;
  isNew?: boolean;
}
```

### GuideType
```typescript
type GuideType = 
  | 'strategy'
  | 'tutorial'
  | 'meta-analysis'
  | 'build-guide'
  | 'patch-notes'
  | 'tips-tricks';
```

### GameType
```typescript
type GameType = 
  | 'moba'
  | 'fps'
  | 'strategy';
```

## Constantes

### SUPPORTED_GAMES
Array con los 4 juegos soportados, cada uno con información completa:
- Datos básicos (nombre, descripción, tipo)
- Información técnica (desarrollador, publisher, fecha)
- Estadísticas (rating, jugadores)
- Metadatos (géneros, plataformas, badges)

### GUIDE_TYPES
Tipos de guías disponibles con iconos y colores:
- **Estrategia**: Guías de estrategia general y tácticas
- **Tutorial**: Tutoriales paso a paso para principiantes
- **Análisis Meta**: Análisis del meta actual y tendencias
- **Guía de Builds**: Guías de builds y configuraciones
- **Notas de Parche**: Resúmenes y análisis de parches
- **Tips y Trucos**: Consejos útiles y trucos avanzados

### SAMPLE_GUIDES
Guías de ejemplo para cada juego soportado.

### GAME_TAGS
Tags populares para categorizar guías.

### DIFFICULTY_LEVELS
Niveles de dificultad con colores.

## Uso

```typescript
import { GuideCard, GameCard, SidebarGuide, Guide, Game } from '@/features/games';
import { SUPPORTED_GAMES, SAMPLE_GUIDES } from '@/features/games/constants/games-constants';

// En tu componente
const handleViewGuide = (guideId: string) => {
  // Lógica para ver guía
};

const handleGameClick = (gameId: string) => {
  // Lógica para seleccionar juego
};

return (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className="lg:col-span-3">
      {/* Lista de guías */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMPLE_GUIDES.map(guide => (
          <GuideCard 
            key={guide.id} 
            guide={guide} 
            onView={handleViewGuide}
          />
        ))}
      </div>
      
      {/* Lista de juegos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {SUPPORTED_GAMES.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            onClick={handleGameClick}
          />
        ))}
      </div>
    </div>
    
    <div className="lg:col-span-1">
      <SidebarGuide 
        sections={sections}
        updates={updates}
        downloadLabel="Descargar PDF"
      />
    </div>
  </div>
);
```

## Características

- **Enfoque Específico**: Solo 4 juegos competitivos principales
- **Guías Detalladas**: Sistema completo de guías con tipos y dificultades
- **Responsive**: Todos los componentes se adaptan a diferentes tamaños
- **Interactivo**: Botones de acción y navegación funcionales
- **Tipado**: TypeScript completo para mejor desarrollo
- **Modular**: Fácil de importar y usar en cualquier parte
- **Personalizable**: Estilos y comportamiento configurables

## Integración

Este feature se integra con:
- **Community Feature**: Para comentarios y feedback en guías
- **Notifications Feature**: Para notificar sobre nuevas guías
- **Tooltips Feature**: Para mostrar información contextual
- **Chat Feature**: Para consultas específicas sobre juegos 