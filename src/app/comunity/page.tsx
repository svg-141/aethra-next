"use client";

import { useState } from 'react';
import { CommentSection } from '../../features/chat';
import { PostCard, PostForm, SidebarCommunity, Post, PostCategory, PostFilter } from '../../features/community';
import { POST_CATEGORIES, DEFAULT_FILTERS, SAMPLE_COMMUNITY_STATS } from '../../features/community/constants/community-constants';

export default function CommunityPage() {
  const [filters, setFilters] = useState<PostFilter>(DEFAULT_FILTERS);
  const [activeCategory, setActiveCategory] = useState<PostCategory | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);

  // Datos de ejemplo usando los nuevos tipos
  const samplePosts: Post[] = [
    {
      id: '1',
      title: '¿Cuál es la mejor estrategia para el meta actual de Valorant?',
      content: 'He estado viendo que el meta ha cambiado bastante en los últimos parches. ¿Alguien tiene consejos sobre qué agentes y estrategias están funcionando mejor ahora?',
      author: {
        id: 'user1',
        name: 'GamerPro123',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        level: 15
      },
      category: 'strategy',
      tags: ['Valorant', 'Estrategia', 'Meta'],
      likes: 15,
      comments: 8,
      views: 234,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: false,
      isLocked: false
    },
    {
      id: '2',
      title: 'Problemas con el rendimiento en League of Legends',
      content: 'Últimamente he tenido muchos FPS drops durante las teamfights. ¿Alguien más ha experimentado esto? ¿Tienen alguna solución?',
      author: {
        id: 'user2',
        name: 'LoLPlayer',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        level: 8
      },
      category: 'help',
      tags: ['League of Legends', 'Rendimiento', 'FPS'],
      likes: 7,
      comments: 12,
      views: 156,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isPinned: false,
      isLocked: false
    },
    {
      id: '3',
      title: 'Guía para principiantes en Dota 2',
      content: 'Soy nuevo en Dota 2 y me cuesta entender el meta. ¿Alguien puede recomendarme héroes fáciles para empezar?',
      author: {
        id: 'user3',
        name: 'DotaNewbie',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        level: 3
      },
      category: 'help',
      tags: ['Dota 2', 'Principiantes', 'Héroes'],
      likes: 23,
      comments: 15,
      views: 445,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 día atrás
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isPinned: true,
      isLocked: false
    },
    {
      id: '4',
      title: 'Mejores configuraciones para CS2',
      content: '¿Cuáles son las mejores configuraciones de sensibilidad y resolución para CS2? Quiero optimizar mi rendimiento.',
      author: {
        id: 'user4',
        name: 'CS2Player',
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
        level: 12
      },
      category: 'strategy',
      tags: ['CS2', 'Configuración', 'Rendimiento'],
      likes: 18,
      comments: 9,
      views: 189,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isPinned: false,
      isLocked: false
    }
  ];

  // Filtrar posts según los filtros actuales
  const filteredPosts = samplePosts.filter(post => {
    if (filters.category && post.category !== filters.category) return false;
    if (filters.search && !post.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.author && !post.author.name.toLowerCase().includes(filters.author.toLowerCase())) return false;
    return true;
  });

  // Ordenar posts según el filtro de ordenamiento
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'most-commented':
        return b.comments - a.comments;
      case 'newest':
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const handleCreatePost = (postData: Omit<Post, 'id' | 'author' | 'likes' | 'comments' | 'views' | 'createdAt' | 'updatedAt'>) => {
    // Aquí se agregaría la lógica para crear el post
    console.log('Nuevo post:', postData);
    setShowPostForm(false);
  };

  const handleLike = (postId: string) => {
    console.log('Like en post:', postId);
    // Aquí se agregaría la lógica para dar like
  };

  const handleComment = (postId: string) => {
    console.log('Comentar en post:', postId);
    // Aquí se agregaría la lógica para comentar
  };

  const handleShare = (postId: string) => {
    console.log('Compartir post:', postId);
    // Aquí se agregaría la lógica para compartir
  };

  const handleFilterChange = (newFilters: PostFilter) => {
    setFilters(newFilters);
  };

  const handleCategoryChange = (category: PostCategory | null) => {
    setActiveCategory(category);
  };

  // Preparar categorías para el sidebar
  const categories = POST_CATEGORIES.map(cat => ({
    key: cat.key,
    label: cat.label,
    count: samplePosts.filter(post => post.category === cat.key).length,
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Botón crear post */}
            <div className="mb-8 text-center">
              <button
                onClick={() => setShowPostForm(!showPostForm)}
                className="theme-button px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <i className="fas fa-plus icon-theme mr-2"></i>
                Crear Post
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
            <div className="space-y-6">
              {sortedPosts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                />
              ))}
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
          <div className="lg:col-span-1">
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

    </section>
  );
} 