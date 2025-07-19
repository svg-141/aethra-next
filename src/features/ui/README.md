# UI Feature

Este feature contiene componentes de interfaz de usuario reutilizables y configurables para Aethra.

## Estructura

```
ui/
├── components/           # Componentes de UI
│   ├── HeroSection.tsx  # Sección hero con imagen de fondo
│   └── FilterBar.tsx    # Barra de filtros configurable
├── types/               # Definiciones de tipos TypeScript
│   └── ui.types.ts
├── constants/           # Constantes y datos estáticos
│   └── ui-constants.ts
├── index.ts            # API pública del feature
└── README.md           # Esta documentación
```

## Componentes

### HeroSection
Sección hero con imagen de fondo y contenido superpuesto:
- Imagen de fondo con overlay gradiente
- Título y subtítulo personalizables
- Badge opcional con color personalizable
- Botón de acción opcional con icono
- Contenido adicional personalizable
- Responsive y adaptable

**Props:**
- `image: string` - URL de la imagen de fondo
- `title: string` - Título principal
- `subtitle?: string` - Subtítulo opcional
- `badge?: string` - Texto del badge
- `badgeColor?: string` - Clases CSS para el color del badge
- `children?: React.ReactNode` - Contenido adicional
- `className?: string` - Clases CSS adicionales
- `onAction?: () => void` - Callback para el botón de acción
- `actionLabel?: string` - Texto del botón de acción
- `actionIcon?: string` - Icono del botón de acción

### FilterBar
Barra de filtros altamente configurable:
- Múltiples variantes (default, pills, tabs)
- Diferentes tamaños (sm, md, lg)
- Soporte para selección múltiple
- Contadores opcionales
- Estados deshabilitados
- Iconos personalizables
- Totalmente tipado

**Props:**
- `options: FilterOption[]` - Opciones de filtro
- `selected: string` - Opción seleccionada (modo simple)
- `onChange: (value: string) => void` - Callback para cambio
- `className?: string` - Clases CSS adicionales
- `variant?: 'default' | 'pills' | 'tabs'` - Variante visual
- `size?: 'sm' | 'md' | 'lg'` - Tamaño de los botones
- `showCounts?: boolean` - Mostrar contadores
- `multiSelect?: boolean` - Habilitar selección múltiple
- `selectedValues?: string[]` - Valores seleccionados (modo múltiple)
- `onMultiChange?: (values: string[]) => void` - Callback para cambio múltiple

## Tipos

### FilterOption
```typescript
interface FilterOption {
  label: string;
  value: string;
  icon?: string;
  count?: number;
  disabled?: boolean;
}
```

### HeroSectionProps
```typescript
interface HeroSectionProps {
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  children?: React.ReactNode;
  className?: string;
  onAction?: () => void;
  actionLabel?: string;
  actionIcon?: string;
}
```

### FilterBarProps
```typescript
interface FilterBarProps {
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
  className?: string;
  variant?: 'default' | 'pills' | 'tabs';
  size?: 'sm' | 'md' | 'lg';
  showCounts?: boolean;
  multiSelect?: boolean;
  selectedValues?: string[];
  onMultiChange?: (values: string[]) => void;
}
```

## Constantes

### SAMPLE_HERO_DATA
Datos de ejemplo para HeroSection con configuración completa.

### SAMPLE_FILTER_OPTIONS
Opciones de filtro de ejemplo para diferentes categorías.

### GAME_FILTER_OPTIONS
Opciones de filtro específicas para juegos soportados.

### DIFFICULTY_FILTER_OPTIONS
Opciones de filtro por nivel de dificultad.

### SORT_OPTIONS
Opciones de ordenamiento comunes.

### BUTTON_VARIANTS
Variantes de botones con estilos predefinidos.

### BADGE_VARIANTS
Variantes de badges con colores predefinidos.

### CARD_VARIANTS
Variantes de tarjetas con estilos predefinidos.

## Uso

### HeroSection
```typescript
import { HeroSection } from '@/features/ui';
import { SAMPLE_HERO_DATA } from '@/features/ui/constants/ui-constants';

const handleHeroAction = () => {
  console.log('Hero action clicked');
};

return (
  <HeroSection
    image={SAMPLE_HERO_DATA.image}
    title={SAMPLE_HERO_DATA.title}
    subtitle={SAMPLE_HERO_DATA.subtitle}
    badge={SAMPLE_HERO_DATA.badge}
    badgeColor={SAMPLE_HERO_DATA.badgeColor}
    actionLabel={SAMPLE_HERO_DATA.actionLabel}
    actionIcon={SAMPLE_HERO_DATA.actionIcon}
    onAction={handleHeroAction}
  >
    <div className="mb-4">
      <span className="text-purple-300 text-sm">✨ Característica destacada</span>
    </div>
  </HeroSection>
);
```

### FilterBar
```typescript
import { FilterBar } from '@/features/ui';
import { SAMPLE_FILTER_OPTIONS, GAME_FILTER_OPTIONS } from '@/features/ui/constants/ui-constants';

const [selectedFilter, setSelectedFilter] = useState('all');
const [selectedGames, setSelectedGames] = useState<string[]>([]);

const handleFilterChange = (value: string) => {
  setSelectedFilter(value);
};

const handleGameChange = (values: string[]) => {
  setSelectedGames(values);
};

return (
  <div className="space-y-6">
    {/* Filtro simple */}
    <FilterBar
      options={SAMPLE_FILTER_OPTIONS}
      selected={selectedFilter}
      onChange={handleFilterChange}
      showCounts={true}
    />
    
    {/* Filtro múltiple */}
    <FilterBar
      options={GAME_FILTER_OPTIONS}
      selected=""
      onChange={() => {}}
      multiSelect={true}
      selectedValues={selectedGames}
      onMultiChange={handleGameChange}
      variant="pills"
      size="sm"
    />
    
    {/* Filtro tipo tabs */}
    <FilterBar
      options={SAMPLE_FILTER_OPTIONS}
      selected={selectedFilter}
      onChange={handleFilterChange}
      variant="tabs"
      size="lg"
    />
  </div>
);
```

## Características

- **Reutilizable**: Componentes diseñados para ser usados en múltiples contextos
- **Configurable**: Múltiples variantes y opciones de personalización
- **Tipado**: TypeScript completo para mejor desarrollo
- **Responsive**: Se adaptan a diferentes tamaños de pantalla
- **Accesible**: Consideraciones de accesibilidad incluidas
- **Consistente**: Diseño coherente con el tema de Aethra
- **Modular**: Fácil de importar y usar en cualquier parte
- **Extensible**: Fácil de extender con nuevas funcionalidades

## Variantes de FilterBar

### Default
Filtros con estilo de botones redondeados y fondo semitransparente.

### Pills
Filtros con estilo de píldoras más compactas y modernas.

### Tabs
Filtros con estilo de pestañas con indicador de selección.

## Tamaños Disponibles

### Small (sm)
Para espacios reducidos o filtros secundarios.

### Medium (md)
Tamaño estándar para la mayoría de casos de uso.

### Large (lg)
Para filtros principales o mayor visibilidad.

## Integración

Este feature se integra con:
- **Games Feature**: Para filtros de juegos y guías
- **Community Feature**: Para filtros de posts y categorías
- **Profile Feature**: Para filtros de logros y estadísticas
- **Chat Feature**: Para filtros de mensajes y conversaciones
- **Notifications Feature**: Para filtros de notificaciones

## Futuras Expansiones

El feature UI está diseñado para expandirse fácilmente con:
- Componentes de formularios
- Modales y overlays
- Componentes de navegación
- Componentes de datos (tablas, listas)
- Componentes de feedback (alerts, toasts)
- Componentes de entrada (inputs, selects) 