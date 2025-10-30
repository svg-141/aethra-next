import { Post, PostCategory, PostFilter, Author } from '../types/community.types';
import { authService } from '../../../services/authService';

export interface CreatePostData {
  title: string;
  content: string;
  category: PostCategory;
  tags: string[];
  authorId: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  category?: PostCategory;
  tags?: string[];
}

export interface PostSearchParams {
  query?: string;
  category?: PostCategory;
  author?: string;
  tags?: string[];
  sortBy?: 'newest' | 'popular' | 'most-commented';
  limit?: number;
  offset?: number;
}

export interface ForumStats {
  totalPosts: number;
  totalAuthors: number;
  todayPosts: number;
  weekPosts: number;
  popularCategories: { category: PostCategory; count: number }[];
  topAuthors: { author: Author; postCount: number }[];
}

// Simulación de base de datos
let postsDatabase: Post[] = [];
let nextPostId = 1;

// Usuarios de ejemplo
const sampleUsers: { [key: string]: Author } = {
  'user1': {
    id: 'user1',
    name: 'GamerPro123',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    level: 15,
    reputation: 1250,
    joinDate: new Date('2023-01-15'),
    badges: ['Experto en Valorant', 'Miembro Veterano']
  },
  'currentUser': {
    id: 'currentUser',
    name: 'Usuario123',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    level: 5,
    reputation: 320,
    joinDate: new Date('2024-01-01'),
    badges: ['Nuevo Miembro']
  }
};

export class ForumService {
  // Crear nuevo post
  static async createPost(data: CreatePostData, currentUserId?: string): Promise<Post> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }
    
    // Verificar que el usuario puede crear posts
    if (data.authorId !== currentUserId) {
      throw new Error('No tienes permisos para crear posts como otro usuario');
    }
    await this.delay(400);

    const author = sampleUsers[data.authorId] || sampleUsers['currentUser'];
    
    const post: Post = {
      id: (nextPostId++).toString(),
      title: data.title,
      content: data.content,
      author,
      category: data.category,
      tags: data.tags,
      likes: 0,
      comments: 0,
      views: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      isLocked: false,
      isDeleted: false,
      likedBy: [],
      replies: []
    };

    postsDatabase.unshift(post); // Agregar al inicio
    return post;
  }

  // Obtener posts con filtros
  static async getPosts(params: PostSearchParams = {}): Promise<{
    posts: Post[];
    total: number;
    hasMore: boolean;
  }> {
    await this.delay(300);

    let filtered = postsDatabase.filter(post => !post.isDeleted);

    // Filtrar por categoría
    if (params.category) {
      filtered = filtered.filter(post => post.category === params.category);
    }

    // Filtrar por autor
    if (params.author) {
      filtered = filtered.filter(post => 
        post.author.name.toLowerCase().includes(params.author!.toLowerCase())
      );
    }

    // Filtrar por tags
    if (params.tags && params.tags.length > 0) {
      filtered = filtered.filter(post =>
        params.tags!.some(tag => 
          post.tags.some(postTag => 
            postTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    // Búsqueda por texto
    if (params.query) {
      const query = params.query.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Ordenar
    const sortBy = params.sortBy || 'newest';
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'most-commented':
          return b.comments - a.comments;
        case 'newest':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    // Paginación
    const offset = params.offset || 0;
    const limit = params.limit || 10;
    const paginatedPosts = filtered.slice(offset, offset + limit);
    const hasMore = filtered.length > offset + limit;

    return {
      posts: paginatedPosts,
      total: filtered.length,
      hasMore
    };
  }

  // Obtener post por ID
  static async getPostById(id: string): Promise<Post | null> {
    await this.delay(200);
    
    const post = postsDatabase.find(p => p.id === id && !p.isDeleted);
    if (post) {
      // Incrementar vistas
      post.views += 1;
      post.viewedBy = post.viewedBy || [];
      const currentUser = sampleUsers['currentUser'];
      if (!post.viewedBy.find(u => u.id === currentUser.id)) {
        post.viewedBy.push(currentUser);
      }
    }
    
    return post || null;
  }

  // Actualizar post
  static async updatePost(id: string, data: UpdatePostData, currentUserId?: string): Promise<Post | null> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }
    await this.delay(300);

    const postIndex = postsDatabase.findIndex(p => p.id === id && !p.isDeleted);
    
    if (postIndex === -1) {
      throw new Error('Post no encontrado');
    }

    const post = postsDatabase[postIndex];
    
    // Verificar permisos: solo el autor o administrador puede editar
    if (post.author.id !== currentUserId) {
      throw new Error('No tienes permisos para editar este post');
    }

    // Actualizar campos
    const updatedPost = {
      ...post,
      ...data,
      updatedAt: new Date(),
      isEdited: true
    };

    postsDatabase[postIndex] = updatedPost;
    return updatedPost;
  }

  // Eliminar post (soft delete)
  static async deletePost(id: string, currentUserId?: string): Promise<boolean> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }
    await this.delay(250);

    const postIndex = postsDatabase.findIndex(p => p.id === id && !p.isDeleted);
    
    if (postIndex === -1) {
      return false;
    }

    const post = postsDatabase[postIndex];
    
    // Verificar permisos: solo el autor o administrador puede eliminar
    if (post.author.id !== currentUserId) {
      throw new Error('No tienes permisos para eliminar este post');
    }

    postsDatabase[postIndex].isDeleted = true;
    postsDatabase[postIndex].deletedAt = new Date();
    
    return true;
  }

  // Dar like a post
  static async likePost(id: string, currentUserId?: string): Promise<Post | null> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }
    await this.delay(150);

    const post = postsDatabase.find(p => p.id === id && !p.isDeleted);
    
    if (!post) {
      return null;
    }

    post.likedBy = post.likedBy || [];
    const alreadyLiked = post.likedBy.includes(currentUserId);

    if (alreadyLiked) {
      // Quitar like
      post.likedBy = post.likedBy.filter(uid => uid !== currentUserId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      // Agregar like
      post.likedBy.push(currentUserId);
      post.likes += 1;
    }

    return post;
  }

  // Agregar comentario a post
  static async addCommentToPost(postId: string, comment: string, currentUserId?: string): Promise<Post | null> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }
    await this.delay(200);

    const post = postsDatabase.find(p => p.id === postId && !p.isDeleted);
    
    if (!post) {
      return null;
    }

    const author = sampleUsers[currentUserId] || sampleUsers['currentUser'];
    
    post.replies = post.replies || [];
    const newComment = {
      id: Date.now(),
      author: author.name,
      avatar: author.avatar,
      content: comment,
      time: 'Ahora',
      likes: 0,
      createdAt: new Date()
    };

    post.replies.unshift(newComment);
    post.comments += 1;
    post.updatedAt = new Date();

    return post;
  }

  // Marcar/desmarcar post como favorito
  static async toggleBookmark(postId: string, currentUserId?: string): Promise<boolean> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }
    await this.delay(100);

    const post = postsDatabase.find(p => p.id === postId && !p.isDeleted);
    
    if (!post) {
      return false;
    }

    post.bookmarkedBy = post.bookmarkedBy || [];
    const isBookmarked = post.bookmarkedBy.includes(currentUserId);

    if (isBookmarked) {
      post.bookmarkedBy = post.bookmarkedBy.filter(uid => uid !== currentUserId);
    } else {
      post.bookmarkedBy.push(currentUserId);
    }

    return !isBookmarked; // Retorna el nuevo estado
  }

  // Reportar post
  static async reportPost(postId: string, reason: string, currentUserId?: string): Promise<boolean> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }
    await this.delay(200);

    const post = postsDatabase.find(p => p.id === postId && !p.isDeleted);
    
    if (!post) {
      return false;
    }

    post.reports = post.reports || [];
    post.reports.push({
      id: Date.now().toString(),
      reason,
      reporterId: currentUserId,
      createdAt: new Date()
    });

    return true;
  }

  // Obtener estadísticas del foro
  static async getForumStats(): Promise<ForumStats> {
    await this.delay(100);

    const activePosts = postsDatabase.filter(p => !p.isDeleted);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayPosts = activePosts.filter(p => 
      p.createdAt >= today
    ).length;

    const weekPosts = activePosts.filter(p => 
      p.createdAt >= weekAgo
    ).length;

    // Contar categorías populares
    const categoryCounts = new Map<PostCategory, number>();
    activePosts.forEach(post => {
      const current = categoryCounts.get(post.category) || 0;
      categoryCounts.set(post.category, current + 1);
    });

    const popularCategories = Array.from(categoryCounts.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    // Contar autores activos
    const authorCounts = new Map<string, { author: Author; postCount: number }>();
    activePosts.forEach(post => {
      const existing = authorCounts.get(post.author.id);
      if (existing) {
        existing.postCount += 1;
      } else {
        authorCounts.set(post.author.id, { author: post.author, postCount: 1 });
      }
    });

    const topAuthors = Array.from(authorCounts.values())
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);

    const uniqueAuthors = new Set(activePosts.map(p => p.author.id));

    return {
      totalPosts: activePosts.length,
      totalAuthors: uniqueAuthors.size,
      todayPosts,
      weekPosts,
      popularCategories,
      topAuthors
    };
  }

  // Búsqueda avanzada
  static async searchPosts(
    query: string, 
    filters: Partial<PostSearchParams> = {}
  ): Promise<{
    posts: Post[];
    total: number;
    suggestions: string[];
  }> {
    await this.delay(400);

    const searchResults = await this.getPosts({
      ...filters,
      query,
      limit: filters.limit || 20
    });

    // Generar sugerencias basadas en tags y títulos existentes
    const allTags = new Set<string>();
    const titleWords = new Set<string>();
    
    postsDatabase.forEach(post => {
      if (!post.isDeleted) {
        post.tags.forEach(tag => allTags.add(tag.toLowerCase()));
        post.title.split(' ').forEach(word => {
          if (word.length > 3) {
            titleWords.add(word.toLowerCase());
          }
        });
      }
    });

    const suggestions = Array.from(new Set([...allTags, ...titleWords]))
      .filter(item => item.includes(query.toLowerCase()))
      .slice(0, 5);

    return {
      ...searchResults,
      suggestions
    };
  }

  // Inicializar con datos de ejemplo
  static initializeWithSampleData(): void {
    if (postsDatabase.length > 0) return;

    const samplePosts: Post[] = [
      {
        id: (nextPostId++).toString(),
        title: '¿Cuál es la mejor estrategia para el meta actual de Valorant?',
        content: 'He estado viendo que el meta ha cambiado bastante en los últimos parches. ¿Alguien tiene consejos sobre qué agentes y estrategias están funcionando mejor ahora? He estado jugando principalmente con Jett pero siento que no estoy teniendo el impacto que quisiera.',
        author: sampleUsers['user1'],
        category: 'strategy',
        tags: ['Valorant', 'Estrategia', 'Meta', 'Agentes'],
        likes: 15,
        comments: 8,
        views: 234,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isPinned: false,
        isLocked: false,
        isDeleted: false,
        likedBy: ['user2', 'user3'],
        replies: []
      }
    ];

    postsDatabase = samplePosts;
  }

  // Utilidades privadas
  private static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Inicializar datos de ejemplo
ForumService.initializeWithSampleData();