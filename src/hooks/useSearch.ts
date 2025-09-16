"use client";

import { useState, useEffect, useMemo } from 'react';

export interface SearchResult {
  id: string;
  type: 'guide' | 'post' | 'user' | 'game' | 'achievement';
  title: string;
  description: string;
  url: string;
  image?: string;
  icon?: string;
  tags?: string[];
  author?: string;
  timestamp?: Date;
  relevance: number; // 0-1 score for sorting
}

export interface SearchFilters {
  types: string[];
  games: string[];
  timeRange: 'all' | 'day' | 'week' | 'month';
}

interface UseSearchReturn {
  query: string;
  results: SearchResult[];
  filters: SearchFilters;
  isLoading: boolean;
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  clearSearch: () => void;
  search: (query: string) => void;
}

// Mock data para búsqueda
const mockData: SearchResult[] = [
  // Guías
  {
    id: 'guide-valorant',
    type: 'guide',
    title: 'Guía Valorant - Meta Actual',
    description: 'Análisis completo del meta actual en Valorant. Agentes, estrategias y estadísticas.',
    url: '/guides/valorant',
    image: '/assets/img/banners/valorant-banner.jpg',
    icon: '/assets/img/games/valorant.png',
    tags: ['FPS', 'Meta', 'Agentes', 'Estrategias'],
    author: 'Aethra Team',
    timestamp: new Date('2024-01-15'),
    relevance: 0.95,
  },
  {
    id: 'guide-starcraft2',
    type: 'guide',
    title: 'Starcraft 2 - Meta y Estrategias',
    description: 'Guía completa de builds, micro y macro para dominar todas las razas.',
    url: '/guides/starcraft2',
    image: '/assets/img/banners/starcraft-2-banner.jpg',
    icon: '/assets/img/games/starcraft2.png',
    tags: ['RTS', 'Builds', 'Micro', 'Macro'],
    author: 'Aethra Team',
    timestamp: new Date('2024-01-10'),
    relevance: 0.92,
  },

  // Posts de comunidad
  {
    id: 'post-ascent-strategy',
    type: 'post',
    title: '¿Qué agente recomiendan para Ascent?',
    description: 'Estoy buscando mejorar mi winrate en Ascent, ¿qué agente creen que es más versátil para soloQ?',
    url: '/comunity#post-ascent',
    tags: ['Valorant', 'Ascent', 'Agentes', 'Estrategia'],
    author: 'JugadorPro456',
    timestamp: new Date('2024-01-14'),
    relevance: 0.85,
  },
  {
    id: 'post-protoss-builds',
    type: 'post',
    title: 'Mejores builds de Protoss en el meta',
    description: '¿Qué builds están funcionando mejor para Protoss en el meta actual?',
    url: '/comunity#post-protoss',
    tags: ['Starcraft 2', 'Protoss', 'Builds', 'Meta'],
    author: 'ProGamer',
    timestamp: new Date('2024-01-13'),
    relevance: 0.82,
  },

  // Usuarios
  {
    id: 'user-jugadorpro123',
    type: 'user',
    title: 'JugadorPro123',
    description: 'Jugador competitivo apasionado por mejorar y dominar el meta. Nivel Diamante en Valorant.',
    url: '/profile',
    image: 'https://randomuser.me/api/portraits/men/42.jpg',
    tags: ['Valorant', 'Competitivo', 'Diamante'],
    author: 'JugadorPro123',
    timestamp: new Date('2024-01-01'),
    relevance: 0.75,
  },
  {
    id: 'user-sc2pro',
    type: 'user',
    title: 'SC2Pro',
    description: 'Jugador profesional de Starcraft 2. Especializado en estrategias Terran.',
    url: '/profile',
    image: 'https://randomuser.me/api/portraits/men/35.jpg',
    tags: ['Starcraft 2', 'Profesional', 'Terran'],
    author: 'SC2Pro',
    timestamp: new Date('2024-01-05'),
    relevance: 0.72,
  },

  // Juegos
  {
    id: 'game-valorant',
    type: 'game',
    title: 'Valorant',
    description: 'FPS táctico 5v5 donde la precisión y la estrategia son clave para la victoria.',
    url: '/games#valorant',
    icon: '/assets/img/games/valorant.png',
    tags: ['FPS', 'Táctico', '5v5', 'Riot Games'],
    relevance: 0.90,
  },
  {
    id: 'game-starcraft2',
    type: 'game',
    title: 'Starcraft 2',
    description: 'RTS donde la estrategia, micro y macro determinan la victoria entre tres razas únicas.',
    url: '/games#starcraft2',
    icon: '/assets/img/games/starcraft2.png',
    tags: ['RTS', 'Estrategia', 'Blizzard', 'Razas'],
    relevance: 0.88,
  },

  // Logros
  {
    id: 'achievement-first-win',
    type: 'achievement',
    title: 'Primera Victoria',
    description: 'Logro desbloqueado al ganar tu primera partida en cualquier juego.',
    url: '/profile#achievements',
    icon: '🏆',
    tags: ['Logro', 'Victoria', 'Primera vez'],
    relevance: 0.70,
  },
  {
    id: 'achievement-serial-killer',
    type: 'achievement',
    title: 'Asesino Serial',
    description: 'Consigue 10 kills en una sola partida.',
    url: '/profile#achievements',
    icon: '💀',
    tags: ['Logro', 'Kills', 'Rendimiento'],
    relevance: 0.65,
  },
];

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    types: [],
    games: [],
    timeRange: 'all',
  });

  // Función de búsqueda principal
  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    // Simular delay de búsqueda
    await new Promise(resolve => setTimeout(resolve, 300));

    // Filtrar y buscar en mock data
    const filteredResults = mockData.filter(item => {
      // Aplicar filtros
      if (filters.types.length > 0 && !filters.types.includes(item.type)) {
        return false;
      }

      if (filters.games.length > 0) {
        const itemGames = item.tags?.filter(tag =>
          ['valorant', 'starcraft2', 'starcraft 2'].includes(tag.toLowerCase())
        ) || [];
        if (!filters.games.some(game => itemGames.includes(game))) {
          return false;
        }
      }

      // Aplicar filtro de tiempo
      if (filters.timeRange !== 'all') {
        const now = new Date();
        const itemDate = item.timestamp || new Date(0);
        const diffInDays = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (filters.timeRange) {
          case 'day':
            if (diffInDays > 1) return false;
            break;
          case 'week':
            if (diffInDays > 7) return false;
            break;
          case 'month':
            if (diffInDays > 30) return false;
            break;
        }
      }

      // Búsqueda por texto
      const searchTerms = searchQuery.toLowerCase().split(' ');
      const searchableText = [
        item.title.toLowerCase(),
        item.description.toLowerCase(),
        ...(item.tags || []).map(tag => tag.toLowerCase()),
        ...(item.author ? [item.author.toLowerCase()] : []),
      ].join(' ');

      return searchTerms.every(term => searchableText.includes(term));
    });

    // Ordenar por relevancia
    const sortedResults = filteredResults.sort((a, b) => {
      // Priorizar coincidencias exactas en el título
      const aTitleMatch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
      const bTitleMatch = b.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      
      // Luego por relevancia
      return b.relevance - a.relevance;
    });

    setResults(sortedResults.slice(0, 20)); // Limitar a 20 resultados
    setIsLoading(false);
  };

  // Actualizar filtros
  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Re-buscar si hay query activa
    if (query.trim()) {
      search(query);
    }
  };

  // Limpiar búsqueda
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setFilters({
      types: [],
      games: [],
      timeRange: 'all',
    });
  };

  // Búsqueda automática cuando cambia la query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        search(query);
      } else {
        setResults([]);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timeoutId);
  }, [query, filters]);

  return {
    query,
    results,
    filters,
    isLoading,
    setQuery,
    setFilters: updateFilters,
    clearSearch,
    search,
  };
} 