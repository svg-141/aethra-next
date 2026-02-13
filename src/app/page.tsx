"use client";

import { HeroSection } from '../features/ui';
import FeaturesSection from '../features/ui/components/FeaturesSection';
import CTASection from '../features/ui/components/CTASection';
import { SAMPLE_HERO_DATA } from '../features/ui/constants/ui-constants';
import GameCard from '../features/games/components/GameCard';
import PostCard from '../features/community/components/PostCard';
import { Game } from '../features/games/types/games.types';
import { Post } from '../features/community/types/community.types';

// Mock Data
const FEATURED_GAMES: Game[] = [
  {
    id: 'valorant',
    name: 'Valorant',
    type: 'fps',
    description: 'A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities.',
    badge: 'Trending',
    badgeColor: 'bg-red-500',
    gradient: '239, 68, 68', // Red
    accentColor: 'red',
    genre: ['Tactical', 'Shooter'],
    platform: ['PC'],
    releaseDate: '2020-06-02',
    developer: 'Riot Games',
    publisher: 'Riot Games',
    rating: 4.5,
    playerCount: 1500000,
    isPopular: true,
    isNew: false
  },
  {
    id: 'starcraft2',
    name: 'StarCraft II',
    type: 'strategy',
    description: 'The ultimate real-time strategy game. Command three unique races in intergalactic warfare.',
    badge: 'Classic',
    badgeColor: 'bg-blue-500',
    gradient: '59, 130, 246', // Blue
    accentColor: 'blue',
    genre: ['RTS', 'Sci-Fi'],
    platform: ['PC'],
    releaseDate: '2010-07-27',
    developer: 'Blizzard',
    publisher: 'Blizzard',
    rating: 4.8,
    playerCount: 500000,
    isPopular: true,
    isNew: false
  }
];

const RECENT_POSTS: Post[] = [
  {
    id: '1',
    title: 'New Valorant Agent leaked?',
    content: 'Have you guys seen the latest datamine? Looks like a new controller is coming to the roster with smoke abilities.',
    author: {
      id: 'user1',
      name: 'ViperMain',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Viper',
      level: 42
    },
    category: 'news',
    tags: ['Leak', 'Agent'],
    likes: 124,
    comments: 45,
    views: 1200,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'Terran build order vs Protoss',
    content: 'Struggling with early stalker pressure. Any tips for a bio player? I usually go for a 1-1-1 opening but get overrun.',
    author: {
      id: 'user2',
      name: 'MarineKing',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marine',
      level: 15
    },
    category: 'strategy',
    tags: ['TvP', 'Build Order'],
    likes: 56,
    comments: 12,
    views: 450,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Best sensitivity for FPS?',
    content: 'I have been playing with high sens for years but everyone says low sens is better for consistency. Thoughts?',
    author: {
      id: 'user3',
      name: 'HeadshotKing',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sniper',
      level: 28
    },
    category: 'help',
    tags: ['Settings', 'Aim'],
    likes: 89,
    comments: 34,
    views: 800,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    updatedAt: new Date()
  }
];

export default function HomePage() {
  const handleHeroAction = () => {
    console.log('Hero action clicked - Navigate to games or start exploring');
  };

  return (
    <div className="min-h-screen theme-bg-surface pt-20" style={{ background: 'var(--gradient-background)' }}>
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-16">
          <div className="w-full xl:w-5/6">
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
                 <span className="theme-badge px-4 py-2 text-sm rounded-full icon-glow-subtle">
                  ✨ Plataforma líder en gaming competitivo
                </span>
              </div>
            </HeroSection>
          </div>
        </div>

        {/* Featured Games Section */}
        <section className="mb-20 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold theme-text-primary glow-text-subtle mb-2">Juegos Destacados</h2>
                    <p className="theme-text-secondary">Explora los títulos más populares de nuestra comunidad</p>
                </div>
                <button className="theme-button-secondary text-sm">Ver todos</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {FEATURED_GAMES.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
                 {/* Promo Card as 3rd item */}
                <div className="theme-card p-6 flex flex-col justify-center items-center text-center border-dashed border-2 theme-border-muted hover:theme-border-hover cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-theme-surface-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i className="fas fa-plus text-2xl theme-text-secondary group-hover:text-primary"></i>
                    </div>
                    <h3 className="text-xl font-bold theme-text-primary mb-2">Explorar más</h3>
                    <p className="theme-text-secondary text-sm">Descubre cientos de guías y estrategias para otros juegos</p>
                </div>
            </div>
        </section>

        {/* Community Pulse Section */}
        <section className="mb-20">
             <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold theme-text-primary glow-text-subtle mb-2">Comunidad Activa</h2>
                    <p className="theme-text-secondary">Últimas discusiones, estrategias y noticias</p>
                </div>
                 <button className="theme-button-secondary text-sm">Ir al foro</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                <div className="space-y-4 xl:col-span-2">
                    {RECENT_POSTS.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
                {/* Stats / Info Side */}
                <div className="theme-card p-8 h-fit sticky top-24">
                    <h3 className="text-xl font-bold theme-text-primary mb-6">Estadísticas de Aethra</h3>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="text-center p-4 rounded-xl bg-theme-surface-light">
                            <div className="text-3xl font-bold text-primary mb-1">15k+</div>
                            <div className="text-xs theme-text-secondary">Usuarios Activos</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-theme-surface-light">
                            <div className="text-3xl font-bold text-secondary mb-1">5k+</div>
                            <div className="text-xs theme-text-secondary">Guías Publicadas</div>
                        </div>
                         <div className="text-center p-4 rounded-xl bg-theme-surface-light">
                            <div className="text-3xl font-bold text-accent mb-1">24/7</div>
                            <div className="text-xs theme-text-secondary">Torneos</div>
                        </div>
                         <div className="text-center p-4 rounded-xl bg-theme-surface-light">
                            <div className="text-3xl font-bold text-success mb-1">99%</div>
                            <div className="text-xs theme-text-secondary">Satisfacción</div>
                        </div>
                    </div>
                    <button className="w-full theme-button py-3 text-center">
                        Únete a la comunidad
                    </button>
                </div>
            </div>
        </section>

      </div>
      <FeaturesSection />
      <CTASection />
    </div>
  );
}