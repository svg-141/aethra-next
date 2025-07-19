"use client";

import { useState, useRef, useEffect } from 'react';
import { useSearch, SearchResult } from '../hooks/useSearch';

export default function SearchBar() {
  const { query, results, filters, isLoading, setQuery, setFilters, clearSearch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Abrir dropdown cuando hay resultados
  useEffect(() => {
    if (results.length > 0 || query.trim()) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [results, query]);

  // Obtener icono según tipo
  const getTypeIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'guide':
        return <i className="fas fa-book text-blue-400"></i>;
      case 'post':
        return <i className="fas fa-comment text-green-400"></i>;
      case 'user':
        return <i className="fas fa-user text-purple-400"></i>;
      case 'game':
        return <i className="fas fa-gamepad text-orange-400"></i>;
      case 'achievement':
        return <i className="fas fa-trophy text-yellow-400"></i>;
      default:
        return <i className="fas fa-search text-gray-400"></i>;
    }
  };

  // Obtener color de fondo según tipo
  const getTypeBgColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'guide':
        return 'bg-blue-500/20 border-blue-500/30';
      case 'post':
        return 'bg-green-500/20 border-green-500/30';
      case 'user':
        return 'bg-purple-500/20 border-purple-500/30';
      case 'game':
        return 'bg-orange-500/20 border-orange-500/30';
      case 'achievement':
        return 'bg-yellow-500/20 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  // Formatear tiempo relativo
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `hace ${diffInMinutes}m`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `hace ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `hace ${diffInDays}d`;
  };

  // Manejar click en resultado
  const handleResultClick = (result: SearchResult) => {
    window.location.href = result.url;
    setIsOpen(false);
    clearSearch();
  };

  return (
    <div className="relative flex-1 max-w-md" ref={searchRef}>
      {/* Barra de búsqueda */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar guías, posts, usuarios..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#1e0b36] text-white rounded-lg pl-10 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 border border-purple-900/50"
        />
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        
        {/* Botón de filtros */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors ${
            showFilters ? 'text-purple-400 bg-purple-500/20' : 'text-gray-400 hover:text-purple-300'
          }`}
        >
          <i className="fas fa-filter text-sm"></i>
        </button>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <i className="fas fa-spinner fa-spin text-purple-400"></i>
          </div>
        )}
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-xl border border-purple-900/60 p-4 z-50">
          <h4 className="text-sm font-semibold text-white mb-3">Filtros</h4>
          
          {/* Tipos de contenido */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 mb-2 block">Tipo de contenido</label>
            <div className="flex flex-wrap gap-2">
              {['guide', 'post', 'user', 'game', 'achievement'].map(type => (
                <button
                  key={type}
                  onClick={() => {
                    const newTypes = filters.types.includes(type)
                      ? filters.types.filter(t => t !== type)
                      : [...filters.types, type];
                    setFilters({ types: newTypes });
                  }}
                  className={`px-2 py-1 text-xs rounded transition-all ${
                    filters.types.includes(type)
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-900/30 text-gray-300 hover:bg-purple-900/50'
                  }`}
                >
                  {type === 'guide' && 'Guías'}
                  {type === 'post' && 'Posts'}
                  {type === 'user' && 'Usuarios'}
                  {type === 'game' && 'Juegos'}
                  {type === 'achievement' && 'Logros'}
                </button>
              ))}
            </div>
          </div>

          {/* Juegos */}
          <div className="mb-4">
            <label className="text-xs text-gray-400 mb-2 block">Juegos</label>
            <div className="flex flex-wrap gap-2">
              {['Valorant', 'LoL', 'Dota 2', 'CS:GO', 'Fortnite'].map(game => (
                <button
                  key={game}
                  onClick={() => {
                    const newGames = filters.games.includes(game)
                      ? filters.games.filter(g => g !== game)
                      : [...filters.games, game];
                    setFilters({ games: newGames });
                  }}
                  className={`px-2 py-1 text-xs rounded transition-all ${
                    filters.games.includes(game)
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-900/30 text-gray-300 hover:bg-purple-900/50'
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>

          {/* Rango de tiempo */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Rango de tiempo</label>
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters({ timeRange: e.target.value as any })}
              className="w-full bg-[#1e0b36] text-white rounded px-3 py-1 text-sm border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="all">Todo el tiempo</option>
              <option value="day">Último día</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
            </select>
          </div>
        </div>
      )}

      {/* Resultados de búsqueda */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-xl border border-purple-900/60 shadow-2xl z-50 max-h-96 overflow-hidden">
          {results.length === 0 && query.trim() && !isLoading ? (
            <div className="p-6 text-center">
              <i className="fas fa-search text-3xl text-gray-500 mb-2"></i>
              <p className="text-gray-400">No se encontraron resultados</p>
              <p className="text-xs text-gray-500 mt-1">Intenta con otros términos</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`p-3 border-b border-purple-900/30 cursor-pointer hover:bg-purple-900/20 transition-all ${getTypeBgColor(result.type)}`}
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {result.image ? (
                        <img src={result.image} alt={result.title} className="w-8 h-8 rounded" />
                      ) : result.icon ? (
                        <div className="w-8 h-8 flex items-center justify-center text-lg">
                          {result.icon}
                        </div>
                      ) : (
                        getTypeIcon(result.type)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {result.title}
                        </h4>
                        {result.timestamp && (
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                            {formatTimeAgo(result.timestamp)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                        {result.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {result.author && (
                            <span className="text-xs text-purple-300">{result.author}</span>
                          )}
                          {result.tags && result.tags.length > 0 && (
                            <span className="text-xs text-gray-400">
                              {result.tags.slice(0, 2).join(', ')}
                              {result.tags.length > 2 && '...'}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 capitalize">
                          {result.type === 'guide' && 'Guía'}
                          {result.type === 'post' && 'Post'}
                          {result.type === 'user' && 'Usuario'}
                          {result.type === 'game' && 'Juego'}
                          {result.type === 'achievement' && 'Logro'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer con estadísticas */}
          {results.length > 0 && (
            <div className="p-3 border-t border-purple-900/50 text-center">
              <p className="text-xs text-gray-400">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 