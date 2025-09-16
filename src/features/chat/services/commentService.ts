import { Comment } from '../types/chat.types';
import { authService } from '../../../services/authService';

export interface CreateCommentData {
  content: string;
  sectionId: string;
  author: string;
  avatar?: string;
  parentId?: number;
  userId: string;
}

export interface UpdateCommentData {
  content: string;
}

export interface CommentFilter {
  sectionId?: string;
  author?: string;
  limit?: number;
  offset?: number;
}

// Simulación de base de datos en memoria
let commentsDatabase: Comment[] = [];
let nextCommentId = 1;

export class CommentService {
  // Crear comentario
  static async createComment(data: CreateCommentData, currentUserId?: string): Promise<Comment> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }
    
    // Verificar que el usuario puede crear comentarios
    if (data.userId !== currentUserId) {
      throw new Error('No tienes permisos para crear comentarios como otro usuario');
    }

    const comment: Comment = {
      id: nextCommentId++,
      author: data.author,
      avatar: data.avatar || 'https://randomuser.me/api/portraits/men/42.jpg',
      content: data.content,
      time: 'Ahora',
      likes: 0,
      section: data.sectionId,
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId: data.parentId,
      replies: [],
      userId: data.userId,
    };

    commentsDatabase.push(comment);
    
    // Simular delay de red
    await this.delay(300);
    
    return comment;
  }

  // Obtener comentarios
  static async getComments(filter: CommentFilter = {}): Promise<Comment[]> {
    await this.delay(200);

    let filtered = commentsDatabase;

    if (filter.sectionId) {
      filtered = filtered.filter(comment => comment.section === filter.sectionId);
    }

    if (filter.author) {
      filtered = filtered.filter(comment => 
        comment.author.toLowerCase().includes(filter.author!.toLowerCase())
      );
    }

    // Ordenar por fecha de creación (más recientes primero)
    filtered.sort((a, b) => {
      const dateA = a.createdAt || new Date(0);
      const dateB = b.createdAt || new Date(0);
      return dateB.getTime() - dateA.getTime();
    });

    // Aplicar paginación
    if (filter.offset !== undefined || filter.limit !== undefined) {
      const start = filter.offset || 0;
      const end = filter.limit ? start + filter.limit : undefined;
      filtered = filtered.slice(start, end);
    }

    return filtered;
  }

  // Obtener comentario por ID
  static async getCommentById(id: number): Promise<Comment | null> {
    await this.delay(100);
    return commentsDatabase.find(comment => comment.id === id) || null;
  }

  // Actualizar comentario
  static async updateComment(id: number, data: UpdateCommentData, currentUserId?: string): Promise<Comment | null> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }

    await this.delay(300);

    const commentIndex = commentsDatabase.findIndex(comment => comment.id === id);
    
    if (commentIndex === -1) {
      return null;
    }
    
    const comment = commentsDatabase[commentIndex];
    
    // Verificar permisos: solo el autor o administrador puede editar
    if (comment.userId !== currentUserId) {
      throw new Error('No tienes permisos para editar este comentario');
    }

    commentsDatabase[commentIndex] = {
      ...commentsDatabase[commentIndex],
      content: data.content,
      updatedAt: new Date(),
      isEdited: true,
    };

    return commentsDatabase[commentIndex];
  }

  // Eliminar comentario
  static async deleteComment(id: number, currentUserId?: string): Promise<boolean> {
    // Verificar autenticación
    if (!currentUserId) {
      throw new Error('Usuario no autenticado');
    }

    await this.delay(200);

    const commentIndex = commentsDatabase.findIndex(comment => comment.id === id);
    
    if (commentIndex === -1) {
      return false;
    }
    
    const comment = commentsDatabase[commentIndex];
    
    // Verificar permisos: solo el autor o administrador puede eliminar
    if (comment.userId !== currentUserId) {
      throw new Error('No tienes permisos para eliminar este comentario');
    }

    // Eliminar el comentario y sus respuestas
    commentsDatabase = commentsDatabase.filter(comment => 
      comment.id !== id && comment.parentId !== id
    );

    return true;
  }

  // Dar like a comentario
  static async likeComment(id: number): Promise<Comment | null> {
    await this.delay(150);

    const commentIndex = commentsDatabase.findIndex(comment => comment.id === id);
    
    if (commentIndex === -1) {
      return null;
    }

    commentsDatabase[commentIndex].likes += 1;
    return commentsDatabase[commentIndex];
  }

  // Quitar like de comentario
  static async unlikeComment(id: number): Promise<Comment | null> {
    await this.delay(150);

    const commentIndex = commentsDatabase.findIndex(comment => comment.id === id);
    
    if (commentIndex === -1) {
      return null;
    }

    if (commentsDatabase[commentIndex].likes > 0) {
      commentsDatabase[commentIndex].likes -= 1;
    }
    
    return commentsDatabase[commentIndex];
  }

  // Responder a comentario
  static async replyToComment(parentId: number, data: CreateCommentData, currentUserId?: string): Promise<Comment | null> {
    const parentComment = await this.getCommentById(parentId);
    
    if (!parentComment) {
      return null;
    }

    const reply = await this.createComment({
      ...data,
      parentId,
    }, currentUserId);

    return reply;
  }

  // Obtener respuestas de un comentario
  static async getCommentReplies(parentId: number): Promise<Comment[]> {
    await this.delay(150);
    
    return commentsDatabase
      .filter(comment => comment.parentId === parentId)
      .sort((a, b) => {
        const dateA = a.createdAt || new Date(0);
        const dateB = b.createdAt || new Date(0);
        return dateA.getTime() - dateB.getTime(); // Respuestas más antiguas primero
      });
  }

  // Obtener estadísticas de comentarios
  static async getCommentStats(sectionId?: string): Promise<{
    total: number;
    todayCount: number;
    weekCount: number;
    topAuthors: { author: string; count: number }[];
  }> {
    await this.delay(100);

    let filtered = commentsDatabase;
    
    if (sectionId) {
      filtered = filtered.filter(comment => comment.section === sectionId);
    }

    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const todayCount = filtered.filter(comment => {
      const commentDate = comment.createdAt || new Date(0);
      return commentDate.toDateString() === today.toDateString();
    }).length;

    const weekCount = filtered.filter(comment => {
      const commentDate = comment.createdAt || new Date(0);
      return commentDate >= weekAgo;
    }).length;

    // Contar comentarios por autor
    const authorCounts = new Map<string, number>();
    filtered.forEach(comment => {
      const current = authorCounts.get(comment.author) || 0;
      authorCounts.set(comment.author, current + 1);
    });

    // Obtener top 5 autores
    const topAuthors = Array.from(authorCounts.entries())
      .map(([author, count]) => ({ author, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      total: filtered.length,
      todayCount,
      weekCount,
      topAuthors,
    };
  }

  // Buscar comentarios por contenido
  static async searchComments(
    query: string, 
    sectionId?: string, 
    limit: number = 20
  ): Promise<Comment[]> {
    await this.delay(250);

    let filtered = commentsDatabase;

    if (sectionId) {
      filtered = filtered.filter(comment => comment.section === sectionId);
    }

    // Búsqueda por contenido (case insensitive)
    const searchResults = filtered.filter(comment =>
      comment.content.toLowerCase().includes(query.toLowerCase()) ||
      comment.author.toLowerCase().includes(query.toLowerCase())
    );

    // Ordenar por relevancia (puede mejorarse con algoritmos más sofisticados)
    searchResults.sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a, query);
      const bScore = this.calculateRelevanceScore(b, query);
      return bScore - aScore;
    });

    return searchResults.slice(0, limit);
  }

  // Inicializar datos de ejemplo
  static initializeWithSampleData(): void {
    if (commentsDatabase.length > 0) return;

    const sampleComments: Comment[] = [
      {
        id: nextCommentId++,
        author: 'GamerPro123',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Aethra me ayudó mucho con las estrategias de Valorant. Las respuestas son muy precisas y útiles.',
        time: 'hace 1 día',
        likes: 5,
        section: 'chat-feedback',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        replies: [],
        userId: 'user-1',
      },
      {
        id: nextCommentId++,
        author: 'LoLPlayer',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'Excelente asistente para League of Legends. ¿Podrían agregar más información sobre el meta de la jungla?',
        time: 'hace 3 días',
        likes: 3,
        section: 'chat-feedback',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        replies: [],
        userId: 'user-2',
      },
      {
        id: nextCommentId++,
        author: 'CommunityMod',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        content: '¡Excelente comunidad! Los posts son muy útiles y la moderación está funcionando bien.',
        time: 'hace 2 días',
        likes: 12,
        section: 'community-feedback',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        replies: [],
        userId: 'mod-1',
      },
      {
        id: nextCommentId++,
        author: 'NewGamer',
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
        content: 'Como nuevo usuario, encuentro muy útil esta sección. ¿Podrían agregar más categorías de juegos?',
        time: 'hace 1 semana',
        likes: 8,
        section: 'community-feedback',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        replies: [],
        userId: 'user-3',
      },
    ];

    commentsDatabase = [...sampleComments];
  }

  // Utilidades privadas
  private static async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private static calculateRelevanceScore(comment: Comment, query: string): number {
    const queryLower = query.toLowerCase();
    const contentLower = comment.content.toLowerCase();
    const authorLower = comment.author.toLowerCase();

    let score = 0;

    // Coincidencia exacta en contenido
    if (contentLower.includes(queryLower)) {
      score += 10;
    }

    // Coincidencia en palabras individuales
    const queryWords = queryLower.split(' ');
    queryWords.forEach(word => {
      if (contentLower.includes(word)) score += 2;
      if (authorLower.includes(word)) score += 1;
    });

    // Bonus por likes (popularidad)
    score += comment.likes * 0.1;

    return score;
  }
}

// Inicializar datos de ejemplo al cargar el módulo
CommentService.initializeWithSampleData();