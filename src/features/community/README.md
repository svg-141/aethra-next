# Community Feature

Este feature maneja toda la funcionalidad relacionada con la comunidad y foros de Aethra.

## Estructura

```
community/
├── components/           # Componentes de UI
│   ├── PostCard.tsx     # Tarjeta de post individual
│   ├── PostForm.tsx     # Formulario para crear/editar posts
│   └── SidebarCommunity.tsx # Barra lateral con filtros y estadísticas
├── types/               # Definiciones de tipos TypeScript
│   └── community.types.ts
├── constants/           # Constantes y datos estáticos
│   └── community-constants.ts
├── index.ts            # API pública del feature
└── README.md           # Esta documentación
```

## Componentes

### PostCard
Muestra un post individual con toda su información:
- Avatar y nombre del autor
- Título y contenido
- Tags y categoría
- Estadísticas (likes, comentarios, vistas)
- Botones de acción (like, comentar, compartir)
- Indicadores de estado (fijado, cerrado)

**Props:**
- `post: Post` - Datos del post
- `onLike?: (postId: string) => void` - Callback para like
- `onComment?: (postId: string) => void` - Callback para comentar
- `onShare?: (postId: string) => void` - Callback para compartir

### PostForm
Formulario para crear o editar posts:
- Campos para título y contenido
- Selector de categoría
- Sistema de tags con autocompletado
- Validación de campos requeridos
- Modo de edición

**Props:**
- `onSubmit: (post) => void` - Callback al enviar
- `onCancel?: () => void` - Callback al cancelar
- `initialData?: Partial<Post>` - Datos iniciales para edición
- `isEditing?: boolean` - Modo de edición

### SidebarCommunity
Barra lateral con funcionalidades de la comunidad:
- Estadísticas de la comunidad
- Filtros de ordenamiento
- Navegación por categorías
- Reglas de la comunidad

**Props:**
- `activeCategory?: PostCategory` - Categoría activa
- `onCategoryChange: (category) => void` - Callback cambio categoría
- `onFilterChange: (filter) => void` - Callback cambio filtros
- `filters: PostFilter` - Filtros actuales
- `categories: Category[]` - Lista de categorías

## Tipos

### Post
```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    level: number;
  };
  category: PostCategory;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  isPinned?: boolean;
  isLocked?: boolean;
}
```

### PostCategory
```typescript
type PostCategory = 
  | 'general'
  | 'strategy'
  | 'news'
  | 'help'
  | 'off-topic'
  | 'events';
```

### PostFilter
```typescript
interface PostFilter {
  category?: PostCategory;
  search?: string;
  sortBy?: 'newest' | 'popular' | 'most-commented';
  author?: string;
}
```

## Constantes

### POST_CATEGORIES
Array con información de todas las categorías disponibles:
- `key`: Identificador único
- `label`: Nombre mostrado
- `icon`: Emoji representativo
- `color`: Clases CSS para colores
- `description`: Descripción de la categoría

### POST_TAGS
Lista de tags populares para autocompletado.

### COMMUNITY_RULES
Reglas de la comunidad que se muestran en la barra lateral.

### SAMPLE_COMMUNITY_STATS
Estadísticas de ejemplo para mostrar en la barra lateral.

## Uso

```typescript
import { PostCard, PostForm, SidebarCommunity, Post, PostCategory } from '@/features/community';

// En tu componente
const [posts, setPosts] = useState<Post[]>([]);
const [filters, setFilters] = useState(DEFAULT_FILTERS);

const handleCreatePost = (postData) => {
  // Lógica para crear post
};

const handleLike = (postId: string) => {
  // Lógica para like
};

return (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <div className="lg:col-span-3">
      <PostForm onSubmit={handleCreatePost} />
      {posts.map(post => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLike={handleLike}
        />
      ))}
    </div>
    <div>
      <SidebarCommunity 
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
      />
    </div>
  </div>
);
```

## Características

- **Responsive**: Todos los componentes se adaptan a diferentes tamaños de pantalla
- **Accesible**: Incluye atributos ARIA y navegación por teclado
- **Tipado**: TypeScript completo para mejor desarrollo
- **Modular**: Fácil de importar y usar en cualquier parte de la aplicación
- **Personalizable**: Estilos y comportamiento configurables
- **Integrado**: Funciona con el sistema de notificaciones y tooltips

## Integración

Este feature se integra con:
- **Notifications Feature**: Para notificar sobre nuevos posts y comentarios
- **Tooltips Feature**: Para mostrar información contextual
- **Chat Feature**: Para comentarios en posts
- **Profile Feature**: Para información de usuarios 