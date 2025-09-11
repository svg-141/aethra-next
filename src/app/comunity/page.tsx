"use client";

import { useState, useEffect } from 'react';
import { CommentSection } from '../../features/chat';
import { PostCard, PostForm, SidebarCommunity, Post, PostCategory, PostFilter } from '../../features/community';
import { POST_CATEGORIES, DEFAULT_FILTERS, SAMPLE_COMMUNITY_STATS } from '../../features/community/constants/community-constants';
import { ForumService } from '../../features/community/services/forumService';
import { useNotifications } from '../../features/notifications';
import { useAuth } from '../../features/auth';

export default function CommunityPage() {
  const [filters, setFilters] = useState<PostFilter>(DEFAULT_FILTERS);
  const [activeCategory, setActiveCategory] = useState<PostCategory | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  
  // Hook de notificaciones
  const { addNotification } = useNotifications();
  
  // Hook de autenticación
  const { user, isAuthenticated } = useAuth();

  // Cargar posts al inicio y cuando cambien los filtros
  useEffect(() => {
    loadPosts();
  }, [filters, activeCategory]);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const result = await ForumService.getPosts({
        category: activeCategory || filters.category,
        query: filters.search,
        sortBy: filters.sortBy,
        author: filters.author,
        limit: 20
      });
      
      setPosts(result.posts);
      setTotal(result.total);
      setHasMore(result.hasMore);
      
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error al cargar posts',
        message: 'No se pudieron cargar los posts de la comunidad.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleCreatePost = async (postData: Omit<Post, 'id' | 'author' | 'likes' | 'comments' | 'views' | 'createdAt' | 'updatedAt'>) => {
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para crear posts.',
      });
      return;
    }
    
    try {
      await ForumService.createPost({
        title: postData.title,
        content: postData.content,
        category: postData.category,
        tags: postData.tags,
        authorId: user.id
      }, user.id);
      
      setShowPostForm(false);
      await loadPosts(); // Recargar posts
      
      addNotification({
        type: 'success',
        priority: 'medium',
        title: 'Post creado',
        message: 'Tu post ha sido publicado exitosamente.',
      });
      
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error al crear post',
        message: 'No se pudo crear tu post. Intenta de nuevo.',
      });
    }
  };

  const handleLike = async (postId: string) => {
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para dar like a los posts.',
      });
      return;
    }
    
    try {
      const updatedPost = await ForumService.likePost(postId, user.id);
      if (updatedPost) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? updatedPost : post
        ));
        
        addNotification({
          type: 'success',
          priority: 'low',
          title: 'Like actualizado',
          message: updatedPost.likedBy?.includes(user.id) ? 'Te gusta este post' : 'Ya no te gusta este post',
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'medium',
        title: 'Error',
        message: 'No se pudo procesar el like.',
      });
    }
  };

  const handleComment = async (postId: string) => {
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para comentar en los posts.',
      });
      return;
    }
    
    const comment = prompt('Escribe tu comentario:');
    if (!comment || comment.trim().length < 10) {
      addNotification({
        type: 'warning',
        priority: 'medium',
        title: 'Comentario muy corto',
        message: 'Los comentarios deben tener al menos 10 caracteres.',
      });
      return;
    }
    
    try {
      const updatedPost = await ForumService.addCommentToPost(postId, comment.trim(), user.id);
      if (updatedPost) {
        setPosts(prev => prev.map(post => 
          post.id === postId ? updatedPost : post
        ));
        
        addNotification({
          type: 'success',
          priority: 'medium',
          title: 'Comentario agregado',
          message: 'Tu comentario ha sido publicado.',
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error al comentar',
        message: 'No se pudo agregar tu comentario.',
      });
    }
  };

  const handleShare = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    try {
      await navigator.clipboard.writeText(`¡Mira este post interesante!\n\n${post.title}\n\nEncuéntralo en Aethra Community`);
      
      addNotification({
        type: 'success',
        priority: 'low',
        title: 'Post compartido',
        message: 'El enlace se ha copiado al portapapeles.',
      });
    } catch (error) {
      addNotification({
        type: 'info',
        priority: 'low',
        title: 'Compartir',
        message: `Comparte: ${post.title}`,
      });
    }
  };

  const handleFilterChange = (newFilters: PostFilter) => {
    setFilters(newFilters);
    // loadPosts se ejecutará automáticamente por el useEffect
  };

  const handleCategoryChange = (category: PostCategory | null) => {
    setActiveCategory(category);
    // loadPosts se ejecutará automáticamente por el useEffect
  };

  // Preparar categorías para el sidebar
  const categories = POST_CATEGORIES.map(cat => ({
    key: cat.key,
    label: cat.label,
    count: posts.filter(post => post.category === cat.key).length,
    icon: cat.icon
  }));

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen" style={{ background: 'var(--gradient-background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold theme-text-primary mb-4 glow-text">Comunidad Aethra</h1>
          <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
            Conecta con otros jugadores, comparte estrategias y resuelve dudas sobre tus juegos favoritos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Botón crear post */}
            <div className="mb-6 md:mb-8 text-center">
              <button
                onClick={() => setShowPostForm(!showPostForm)}
                className="theme-button px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all mobile-button w-full sm:w-auto"
              >
                <i className="fas fa-plus icon-theme mr-2"></i>
                <span className="hidden sm:inline">Crear Post</span>
                <span className="sm:hidden">Crear</span>
              </button>
            </div>

            {/* Formulario de post */}
            {showPostForm && (
              <PostForm 
                onSubmit={handleCreatePost}
                onCancel={() => setShowPostForm(false)}
              />
            )}

            {/* Lista de posts */}
            <div className="space-y-4 md:space-y-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <i className="fas fa-spinner icon-animate-spin mb-4 text-2xl" style={{ color: 'var(--color-primary)' }}></i>
                  <p className="theme-text-secondary">Cargando posts de la comunidad...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-comments mb-4 text-4xl" style={{ color: 'var(--color-primary)', opacity: '0.5' }}></i>
                  <h3 className="text-lg font-semibold theme-text-primary mb-2">No hay posts disponibles</h3>
                  <p className="theme-text-secondary mb-6">¡Sé el primero en crear un post en la comunidad!</p>
                  <button
                    onClick={() => setShowPostForm(true)}
                    className="theme-button px-6 py-3 rounded-lg font-semibold transition-all"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Crear primer post
                  </button>
                </div>
              ) : (
                <>
                  {posts.map(post => (
                    <PostCard 
                      key={post.id} 
                      post={post}
                      onLike={handleLike}
                      onComment={handleComment}
                      onShare={handleShare}
                    />
                  ))}
                  
                  {/* Indicador de más posts */}
                  {hasMore && (
                    <div className="text-center py-6">
                      <button
                        onClick={() => {
                          // Implementar carga de más posts
                          console.log('Cargar más posts...')
                        }}
                        className="px-6 py-3 rounded-lg font-semibold transition-all"
                        style={{ 
                          backgroundColor: 'var(--color-surface)', 
                          borderColor: 'var(--color-border)', 
                          color: 'var(--color-text)', 
                          border: '1px solid' 
                        }}
                      >
                        <i className="fas fa-chevron-down mr-2"></i>
                        Cargar más posts
                      </button>
                    </div>
                  )}
                </>
              )}
              
              {/* Estadísticas de la comunidad */}
              {!isLoading && posts.length > 0 && (
                <div className="mt-8 md:mt-12 p-4 md:p-6 rounded-xl theme-card">
                  <h3 className="text-base md:text-lg font-semibold theme-text-primary mb-3 md:mb-4">Estadísticas de la comunidad</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold theme-text-primary">{total}</div>
                      <div className="text-sm theme-text-secondary">Posts totales</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold theme-text-primary">{posts.reduce((sum, p) => sum + p.comments, 0)}</div>
                      <div className="text-sm theme-text-secondary">Comentarios</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold theme-text-primary">{posts.reduce((sum, p) => sum + p.likes, 0)}</div>
                      <div className="text-sm theme-text-secondary">Likes totales</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold theme-text-primary">{new Set(posts.map(p => p.author.id)).size}</div>
                      <div className="text-sm theme-text-secondary">Autores activos</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sección de feedback */}
            <div className="mt-12">
              <CommentSection
                sectionId="community-feedback"
                initialComments={[
                  {
                    id: 1,
                    author: 'CommunityMod',
                    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
                    content: '¡Excelente comunidad! Los posts son muy útiles y la moderación está funcionando bien.',
                    time: 'hace 2 días',
                    likes: 12,
                    section: 'community-feedback',
                  },
                  {
                    id: 2,
                    author: 'NewGamer',
                    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
                    content: 'Como nuevo usuario, encuentro muy útil esta sección. ¿Podrían agregar más categorías de juegos?',
                    time: 'hace 1 semana',
                    likes: 8,
                    section: 'community-feedback',
                  },
                ]}
                initialVotes={{ up: 156, down: 3 }}
                title="¿Cómo está funcionando la comunidad?"
                className="theme-card p-6 card-hover"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-20 lg:top-24">
              <SidebarCommunity
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                onFilterChange={handleFilterChange}
                filters={filters}
                categories={categories}
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
} 