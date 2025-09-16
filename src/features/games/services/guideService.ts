import { Guide, GuideType, GuideInteractions } from '../types/games.types';

// Guide data for Valorant
const valorantGuides: Guide[] = [
  {
    id: 'valorant-strategy-meta',
    image: '/assets/img/games/valorant/guides/strategy-meta.jpg',
    icon: '/assets/img/games/valorant.png',
    name: 'Valorant',
    type: 'strategy' as GuideType,
    typeColor: '#8B5CF6',
    description: 'Análisis completo del meta actual de Valorant, incluyendo composiciones de equipo, estrategias por mapa y tendencias de agentes más efectivos en el competitivo.',
    tags: ['Meta', 'Estrategia', 'Competitivo', 'Agentes', 'Mapas'],
    rating: 4.8,
    link: '/guides/valorant/strategy-meta',
    updated: '15/09/2025',
    meta: 'Guía Estratégica - Meta Actual',
    author: 'ProValorant',
    authorId: 'author_valorant_pro',
    difficulty: 'intermediate' as const,
    estimatedTime: '25 min',
    views: 15420,
    downloads: 2847,
    likes: 1834,
    comments: 127,
    isFeatured: true,
    isNew: true,
    isPremium: true
  },
  {
    id: 'valorant-tutorial-basics',
    image: '/assets/img/games/valorant/guides/tutorial-basics.jpg',
    icon: '/assets/img/games/valorant.png',
    name: 'Valorant',
    type: 'tutorial' as GuideType,
    typeColor: '#10B981',
    description: 'Tutorial completo para principiantes en Valorant. Aprende mecánicas básicas, controles, configuración óptima y primeros pasos en el juego competitivo.',
    tags: ['Tutorial', 'Principiantes', 'Mecánicas', 'Configuración'],
    rating: 4.9,
    link: '/guides/valorant/tutorial-basics',
    updated: '12/09/2025',
    meta: 'Tutorial para Principiantes',
    author: 'ValorantAcademy',
    authorId: 'author_valorant_academy',
    difficulty: 'beginner' as const,
    estimatedTime: '30 min',
    views: 8750,
    downloads: 1923,
    likes: 956,
    comments: 89,
    isFeatured: false,
    isNew: true,
    isPremium: false
  },
  {
    id: 'valorant-build-guide-eco',
    image: '/assets/img/games/valorant/guides/build-economy.jpg',
    icon: '/assets/img/games/valorant.png',
    name: 'Valorant',
    type: 'build-guide' as GuideType,
    typeColor: '#F59E0B',
    description: 'Guía completa del sistema económico de Valorant. Aprende cuándo comprar, cuándo hacer eco, y cómo optimizar la economía del equipo para maximizar las victorias.',
    tags: ['Economía', 'Compras', 'Estrategia', 'Equipo'],
    rating: 4.7,
    link: '/guides/valorant/build-economy',
    updated: '10/09/2025',
    meta: 'Guía de Economía y Compras',
    author: 'EcoMaster',
    authorId: 'author_eco_master',
    difficulty: 'intermediate' as const,
    estimatedTime: '20 min',
    views: 12340,
    downloads: 2156,
    likes: 1247,
    comments: 76,
    isFeatured: true,
    isNew: false,
    isPremium: true
  },
  {
    id: 'valorant-meta-analysis-agents',
    image: '/assets/img/games/valorant/guides/meta-agents.jpg',
    icon: '/assets/img/games/valorant.png',
    name: 'Valorant',
    type: 'meta-analysis' as GuideType,
    typeColor: '#EC4899',
    description: 'Análisis profundo de todos los agentes de Valorant en el meta actual. Tier list actualizada, sinergias, counters y cuándo elegir cada agente según el mapa y composición.',
    tags: ['Agentes', 'Tier List', 'Meta', 'Synergias', 'Counters'],
    rating: 4.6,
    link: '/guides/valorant/meta-agents',
    updated: '08/09/2025',
    meta: 'Análisis de Agentes - Tier List',
    author: 'AgentAnalyst',
    authorId: 'author_agent_analyst',
    difficulty: 'advanced' as const,
    estimatedTime: '35 min',
    views: 18930,
    downloads: 3421,
    likes: 2156,
    comments: 203,
    isFeatured: true,
    isNew: false,
    isPremium: true
  }
];

// Guide data for StarCraft 2
const starcraft2Guides: Guide[] = [
  {
    id: 'sc2-strategy-terran',
    image: '/assets/img/games/starcraft2/guides/strategy-terran.jpg',
    icon: '/assets/img/games/starcraft2.png',
    name: 'StarCraft 2',
    type: 'strategy' as GuideType,
    typeColor: '#DC2626',
    description: 'Estrategias avanzadas para Terran en StarCraft 2. Bio, mech, sky terran y transiciones. Aprende build orders, timings y micro management para dominar en ladder.',
    tags: ['Terran', 'Bio', 'Mech', 'Build Orders', 'Micro'],
    rating: 4.8,
    link: '/guides/starcraft2/strategy-terran',
    updated: '14/09/2025',
    meta: 'Guía Estratégica - Terran',
    author: 'TerranMaster',
    authorId: 'author_terran_master',
    difficulty: 'advanced' as const,
    estimatedTime: '40 min',
    views: 9850,
    downloads: 1742,
    likes: 923,
    comments: 64,
    isFeatured: true,
    isNew: true,
    isPremium: true
  },
  {
    id: 'sc2-tutorial-protoss',
    image: '/assets/img/games/starcraft2/guides/tutorial-protoss.jpg',
    icon: '/assets/img/games/starcraft2.png',
    name: 'StarCraft 2',
    type: 'tutorial' as GuideType,
    typeColor: '#F59E0B',
    description: 'Tutorial completo para jugar Protoss desde cero. Aprende mecánicas básicas, primeros build orders, gestión de resources y transición al juego competitivo.',
    tags: ['Protoss', 'Tutorial', 'Principiantes', 'Build Orders'],
    rating: 4.7,
    link: '/guides/starcraft2/tutorial-protoss',
    updated: '11/09/2025',
    meta: 'Tutorial - Protoss para Principiantes',
    author: 'ProtossGuide',
    difficulty: 'beginner' as const,
    estimatedTime: '35 min',
    views: 6420,
    downloads: 1285,
    isFeatured: false,
    isNew: true
  },
  {
    id: 'sc2-build-guide-zerg',
    image: '/assets/img/games/starcraft2/guides/build-zerg.jpg',
    icon: '/assets/img/games/starcraft2.png',
    name: 'StarCraft 2',
    type: 'build-guide' as GuideType,
    typeColor: '#8B5CF6',
    description: 'Build orders optimizados para Zerg en todos los matchups. Desde 12 pool hasta macro builds, aprende cuándo y cómo ejecutar cada strategy según el oponente.',
    tags: ['Zerg', 'Build Orders', 'Macro', 'Matchups', 'Timings'],
    rating: 4.9,
    link: '/guides/starcraft2/build-zerg',
    updated: '13/09/2025',
    meta: 'Build Orders - Zerg Optimizado',
    author: 'ZergRush',
    difficulty: 'intermediate' as const,
    estimatedTime: '30 min',
    views: 11230,
    downloads: 2103,
    isFeatured: true,
    isNew: false
  },
  {
    id: 'sc2-meta-analysis-maps',
    image: '/assets/img/games/starcraft2/guides/meta-maps.jpg',
    icon: '/assets/img/games/starcraft2.png',
    name: 'StarCraft 2',
    type: 'meta-analysis' as GuideType,
    typeColor: '#10B981',
    description: 'Análisis detallado del meta actual en cada mapa del ladder. Estrategias específicas por mapa, posiciones clave, timing attacks y adaptaciones según la raza.',
    tags: ['Mapas', 'Meta', 'Estrategias', 'Posicionamiento', 'Ladder'],
    rating: 4.5,
    link: '/guides/starcraft2/meta-maps',
    updated: '09/09/2025',
    meta: 'Análisis del Meta - Mapas del Ladder',
    author: 'MapAnalyst',
    difficulty: 'advanced' as const,
    estimatedTime: '45 min',
    views: 7680,
    downloads: 1456,
    isFeatured: false,
    isNew: false
  }
];

// All guides combined
const allGuides: Guide[] = [...valorantGuides, ...starcraft2Guides];

// Service interface
export interface GuideService {
  getAllGuides(): Guide[];
  getGuidesByGame(gameName: string): Guide[];
  getGuidesByType(type: GuideType): Guide[];
  getGuidesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Guide[];
  getFeaturedGuides(): Guide[];
  getNewGuides(): Guide[];
  getGuideById(id: string): Guide | undefined;
  searchGuides(query: string): Guide[];
  getPopularGuides(limit?: number): Guide[];
  getGuidesByTags(tags: string[]): Guide[];
}

// Service implementation
export const guideService: GuideService = {
  getAllGuides(): Guide[] {
    return allGuides;
  },

  getGuidesByGame(gameName: string): Guide[] {
    const normalizedGameName = gameName.toLowerCase();
    return allGuides.filter(guide =>
      guide.name.toLowerCase().includes(normalizedGameName) ||
      guide.id.toLowerCase().includes(normalizedGameName)
    );
  },

  getGuidesByType(type: GuideType): Guide[] {
    return allGuides.filter(guide => guide.type === type);
  },

  getGuidesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Guide[] {
    return allGuides.filter(guide => guide.difficulty === difficulty);
  },

  getFeaturedGuides(): Guide[] {
    return allGuides.filter(guide => guide.isFeatured);
  },

  getNewGuides(): Guide[] {
    return allGuides.filter(guide => guide.isNew);
  },

  getGuideById(id: string): Guide | undefined {
    return allGuides.find(guide => guide.id === id);
  },

  searchGuides(query: string): Guide[] {
    const normalizedQuery = query.toLowerCase();
    return allGuides.filter(guide =>
      guide.name.toLowerCase().includes(normalizedQuery) ||
      guide.meta.toLowerCase().includes(normalizedQuery) ||
      guide.description.toLowerCase().includes(normalizedQuery) ||
      guide.author.toLowerCase().includes(normalizedQuery) ||
      guide.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
  },

  getPopularGuides(limit: number = 10): Guide[] {
    return allGuides
      .sort((a, b) => (b.views + b.downloads) - (a.views + a.downloads))
      .slice(0, limit);
  },

  getGuidesByTags(tags: string[]): Guide[] {
    return allGuides.filter(guide =>
      tags.some(tag =>
        guide.tags.some(guideTag =>
          guideTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }
};

// Helper functions for specific game guides
export const getValorantGuides = (): Guide[] => {
  return valorantGuides;
};

export const getStarcraft2Guides = (): Guide[] => {
  return starcraft2Guides;
};

// AI-powered guide generation (mock implementation)
export interface AIGuideGenerator {
  generateGuideContent(guide: Guide, sectionType: string): Promise<string>;
  generateMetaAnalysis(guide: Guide): Promise<string>;
  generateStrategySuggestions(guide: Guide): Promise<string[]>;
  generateCounterStrategies(guide: Guide): Promise<string[]>;
}

export const aiGuideGenerator: AIGuideGenerator = {
  async generateGuideContent(guide: Guide, sectionType: string): Promise<string> {
    // Mock AI content generation
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    const templates = {
      overview: `Esta guía de ${guide.name} proporciona información detallada sobre ${guide.meta.toLowerCase()}.
                 Desarrollada por ${guide.author}, está diseñada para jugadores de nivel ${guide.difficulty}.`,

      strategy: `Las estrategias principales para ${guide.name} incluyen análisis del meta actual,
                 composiciones efectivas y adaptaciones según el contexto del juego.`,

      tips: `Consejos profesionales para mejorar en ${guide.name}: enfócate en la práctica constante,
             analiza replays de jugadores profesionales y mantente actualizado con los cambios del meta.`,

      counters: `Para contrarrestar las estrategias más comunes, es importante entender los timings clave
                 y las debilidades de cada composición o build order.`
    };

    return templates[sectionType as keyof typeof templates] || templates.overview;
  },

  async generateMetaAnalysis(guide: Guide): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 750));

    return `Análisis del meta actual para ${guide.name}: Las tendencias muestran un enfoque hacia
            estrategias más agresivas, con emphasis en el early game y control de map.
            Los ${guide.tags.join(', ')} son elementos clave en el meta actual.`;
  },

  async generateStrategySuggestions(guide: Guide): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 400));

    const suggestions = [
      `Enfócate en ${guide.tags[0]} para maximizar tu impacto`,
      `Practica ${guide.tags[1]} regularmente para mejorar consistency`,
      `Estudia patrones de ${guide.tags[2]} de jugadores profesionales`,
      `Adapta tu estilo según el ${guide.difficulty} level del oponente`
    ];

    return suggestions.slice(0, 3);
  },

  async generateCounterStrategies(guide: Guide): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 600));

    const counters = [
      'Identifica timing windows vulnerables',
      'Prepara adaptaciones para counter-strategies',
      'Mantén flexibilidad en tu game plan',
      'Utiliza información del mini-map efectivamente'
    ];

    return counters;
  }
};

// Guide categorization helpers
export const getGuideCategories = () => {
  return {
    byType: {
      strategy: guideService.getGuidesByType('strategy'),
      tutorial: guideService.getGuidesByType('tutorial'),
      'build-guide': guideService.getGuidesByType('build-guide'),
      'meta-analysis': guideService.getGuidesByType('meta-analysis'),
      'patch-notes': guideService.getGuidesByType('patch-notes'),
      'tips-tricks': guideService.getGuidesByType('tips-tricks')
    },
    byDifficulty: {
      beginner: guideService.getGuidesByDifficulty('beginner'),
      intermediate: guideService.getGuidesByDifficulty('intermediate'),
      advanced: guideService.getGuidesByDifficulty('advanced')
    },
    byGame: {
      valorant: getValorantGuides(),
      starcraft2: getStarcraft2Guides()
    },
    featured: guideService.getFeaturedGuides(),
    new: guideService.getNewGuides(),
    popular: guideService.getPopularGuides()
  };
};

// Interactive Guide Service - handles likes, downloads, comments
class InteractiveGuideService {
  private userInteractions: Map<string, Map<string, GuideInteractions>> = new Map(); // userId -> guideId -> interactions

  // Get user interactions for a guide
  getUserInteractions(userId: string, guideId: string): GuideInteractions {
    const userMap = this.userInteractions.get(userId);
    if (!userMap) return { userLiked: false, userDownloaded: false };

    return userMap.get(guideId) || { userLiked: false, userDownloaded: false };
  }

  // Toggle like for a guide
  async toggleLike(userId: string, guideId: string): Promise<boolean> {
    if (!userId) return false;

    // Get or create user interaction map
    if (!this.userInteractions.has(userId)) {
      this.userInteractions.set(userId, new Map());
    }

    const userMap = this.userInteractions.get(userId)!;
    const currentInteractions = userMap.get(guideId) || { userLiked: false, userDownloaded: false };

    // Toggle like status
    const newLiked = !currentInteractions.userLiked;
    userMap.set(guideId, { ...currentInteractions, userLiked: newLiked });

    // Update guide likes count
    const guide = allGuides.find(g => g.id === guideId);
    if (guide) {
      guide.likes += newLiked ? 1 : -1;
      guide.likes = Math.max(0, guide.likes); // Prevent negative likes
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return newLiked;
  }

  // Download a guide
  async downloadGuide(userId: string, guideId: string): Promise<boolean> {
    if (!userId) return false;

    const guide = allGuides.find(g => g.id === guideId);
    if (!guide) return false;

    // Check if already downloaded
    const interactions = this.getUserInteractions(userId, guideId);
    if (interactions.userDownloaded) return true;

    // Get or create user interaction map
    if (!this.userInteractions.has(userId)) {
      this.userInteractions.set(userId, new Map());
    }

    const userMap = this.userInteractions.get(userId)!;
    const currentInteractions = userMap.get(guideId) || { userLiked: false, userDownloaded: false };

    // Mark as downloaded
    userMap.set(guideId, { ...currentInteractions, userDownloaded: true });

    // Update guide downloads count
    guide.downloads += 1;

    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 1000));

    return true;
  }

  // Rate a guide
  async rateGuide(userId: string, guideId: string, rating: number): Promise<boolean> {
    if (!userId || rating < 1 || rating > 5) return false;

    const guide = allGuides.find(g => g.id === guideId);
    if (!guide) return false;

    // Get or create user interaction map
    if (!this.userInteractions.has(userId)) {
      this.userInteractions.set(userId, new Map());
    }

    const userMap = this.userInteractions.get(userId)!;
    const currentInteractions = userMap.get(guideId) || { userLiked: false, userDownloaded: false };

    // Set rating
    userMap.set(guideId, { ...currentInteractions, userRated: rating });

    // Update guide rating (simplified average calculation)
    // In production, this would be more sophisticated
    const currentRating = guide.rating;
    const newRating = (currentRating + rating) / 2;
    guide.rating = Math.round(newRating * 10) / 10;

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return true;
  }

  // Get guides with user interactions
  getGuidesWithInteractions(userId: string): Guide[] {
    return allGuides.map(guide => ({
      ...guide,
      interactions: this.getUserInteractions(userId, guide.id)
    }));
  }

  // Get user's liked guides
  getUserLikedGuides(userId: string): Guide[] {
    if (!this.userInteractions.has(userId)) return [];

    const userMap = this.userInteractions.get(userId)!;
    const likedGuideIds = Array.from(userMap.entries())
      .filter(([_, interactions]) => interactions.userLiked)
      .map(([guideId, _]) => guideId);

    return allGuides.filter(guide => likedGuideIds.includes(guide.id));
  }

  // Get user's downloaded guides
  getUserDownloadedGuides(userId: string): Guide[] {
    if (!this.userInteractions.has(userId)) return [];

    const userMap = this.userInteractions.get(userId)!;
    const downloadedGuideIds = Array.from(userMap.entries())
      .filter(([_, interactions]) => interactions.userDownloaded)
      .map(([guideId, _]) => guideId);

    return allGuides.filter(guide => downloadedGuideIds.includes(guide.id));
  }

  // Check premium access for a guide
  canAccessGuide(guide: Guide, userPlan: 'free' | 'premium'): boolean {
    if (!guide.isPremium) return true; // Free guides are accessible to everyone
    return userPlan === 'premium'; // Premium guides only for premium users
  }

  // Get accessible guides for user plan
  getAccessibleGuides(userPlan: 'free' | 'premium' | null): Guide[] {
    if (!userPlan) {
      // Non-authenticated users can only see free guides
      return allGuides.filter(guide => !guide.isPremium);
    }

    if (userPlan === 'premium') {
      return allGuides; // Premium users can access all guides
    }

    // Free users can access free guides only
    return allGuides.filter(guide => !guide.isPremium);
  }
}

// Export interactive service
export const interactiveGuideService = new InteractiveGuideService();

// Enhanced guide service with access control
export const enhancedGuideService = {
  ...guideService,

  // Get guides filtered by access level
  getAccessibleGuides(userPlan: 'free' | 'premium' | null): Guide[] {
    return interactiveGuideService.getAccessibleGuides(userPlan);
  },

  // Get guides with user interactions
  getGuidesWithInteractions(userId: string, userPlan: 'free' | 'premium' | null): Guide[] {
    const accessibleGuides = this.getAccessibleGuides(userPlan);
    return accessibleGuides.map(guide => ({
      ...guide,
      interactions: interactiveGuideService.getUserInteractions(userId, guide.id)
    }));
  },

  // Interactive methods
  async toggleLike(userId: string, guideId: string): Promise<boolean> {
    return interactiveGuideService.toggleLike(userId, guideId);
  },

  async downloadGuide(userId: string, guideId: string): Promise<boolean> {
    return interactiveGuideService.downloadGuide(userId, guideId);
  },

  async rateGuide(userId: string, guideId: string, rating: number): Promise<boolean> {
    return interactiveGuideService.rateGuide(userId, guideId, rating);
  },

  // User-specific methods
  getUserLikedGuides(userId: string): Guide[] {
    return interactiveGuideService.getUserLikedGuides(userId);
  },

  getUserDownloadedGuides(userId: string): Guide[] {
    return interactiveGuideService.getUserDownloadedGuides(userId);
  },

  // Access control
  canAccessGuide(guide: Guide, userPlan: 'free' | 'premium'): boolean {
    return interactiveGuideService.canAccessGuide(guide, userPlan);
  }
};

// Export default service
export default enhancedGuideService;