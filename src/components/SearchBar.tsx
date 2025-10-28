"use client";

import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { useSearch, SearchResult } from '../hooks/useSearch';

function SearchBar() {
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

  // Memoize type icons for performance usando clases de temas
  const getTypeIcon = useMemo(() => ({
    guide: <i className="fas fa-book icon-info"></i>,
    post: <i className="fas fa-comment icon-success"></i>,
    user: <i className="fas fa-user icon-primary"></i>,
    game: <i className="fas fa-gamepad icon-warning"></i>,
    achievement: <i className="fas fa-trophy icon-accent"></i>,
    default: <i className="fas fa-search icon-muted"></i>,
  }), []);

  // Memoize background colors for performance
  const typeBgColors = useMemo(() => ({
    guide: 'bg-blue-500/20 border-blue-500/30',
    post: 'bg-green-500/20 border-green-500/30',
    user: 'bg-purple-500/20 border-purple-500/30',
    game: 'bg-orange-500/20 border-orange-500/30',
    achievement: 'bg-yellow-500/20 border-yellow-500/30',
    default: 'bg-gray-500/20 border-gray-500/30',
  }), []);

  // // Formatear tiempo relativo - moved to component level for better performance
  // const formatTimeAgo = (date: Date) => { // Removed unused function
  //   const now = new Date();
  //   const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  //   if (diffInMinutes < 1) return 'Ahora';
  //   if (diffInMinutes < 60) return `hace ${diffInMinutes}m`;

  //   const diffInHours = Math.floor(diffInMinutes / 60);
  //   if (diffInHours < 24) return `hace ${diffInHours}h`;

  //   const diffInDays = Math.floor(diffInHours / 24);
  //   return `hace ${diffInDays}d`;
  // };

  // Optimized result click handler
  const handleResultClick = useCallback((result: SearchResult) => {
    window.location.href = result.url;
    setIsOpen(false);
    clearSearch();
  }, [clearSearch]);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, [setQuery]);

  return (
    <div className="relative flex-1 max-w-md" ref={searchRef}>
      {/* Barra de búsqueda */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar guías, posts, usuarios..."
          defaultValue={query}
          onChange={handleInputChange}
          className="w-full input-theme rounded-lg pl-10 pr-12 py-2 sm:py-3"
        />
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 icon-theme"></i>
        
        {/* Botón de filtros */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded transition-colors ${
            showFilters ? 'theme-bg-hover' : 'hover:theme-bg-hover'
          }`}
        >
          <i className={`fas fa-filter text-sm ${showFilters ? 'icon-primary' : 'icon-theme'}`}></i>
        </button>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
            <i className="fas fa-spinner icon-animate-spin icon-primary"></i>
          </div>
        )}
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 theme-card p-4 z-50 animate-fade-in">
          <h4 className="text-sm font-semibold theme-text-primary mb-3">Filtros</h4>
          
          {/* Tipos de contenido */}
          <div className="mb-4">
            <label className="text-xs theme-text-secondary mb-2 block">Tipo de contenido</label>
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
                  className={`theme-badge px-2 py-1 text-xs rounded transition-all ${
                    filters.types.includes(type)
                      ? 'theme-button'
                      : 'hover:theme-bg-hover'
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
            <label className="text-xs theme-text-secondary mb-2 block">Juegos</label>
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
                  className={`theme-badge px-2 py-1 text-xs rounded transition-all ${
                    filters.games.includes(game)
                      ? 'theme-button'
                      : 'hover:theme-bg-hover'
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>

          {/* Rango de tiempo */}
          <div>
            <label className="text-xs theme-text-secondary mb-2 block">Rango de tiempo</label>
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters({ timeRange: e.target.value as 'all' | 'day' | 'week' | 'month' })}
              className="w-full select-theme px-3 py-1 text-sm"
            >
              <option value="all">Todo el tiempo</option>
              <option value="day">Último día</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
            </select>
          </div>
        </div>
      )}

      {/* Resultados de búsqueda - Optimizado */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 theme-card shadow-2xl z-50 max-h-96 overflow-hidden animate-fade-in">
          {results.length === 0 && query.trim() && !isLoading ? (
            <div className="p-6 text-center">
              <i className="fas fa-search text-3xl icon-muted mb-2"></i>
              <p className="theme-text-secondary">No se encontraron resultados</p>
              <p className="text-xs theme-text-muted mt-1">Intenta con otros términos</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto scrollbar-theme">
              {results.map((result) => (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  bgColor={typeBgColors[result.type] || typeBgColors.default}
                  icon={getTypeIcon[result.type] || getTypeIcon.default}
                  onClick={handleResultClick}
                />
              ))}
            </div>
          )}

          {/* Footer con estadísticas */}
          {results.length > 0 && (
            <div className="p-3 border-t theme-border text-center">
              <p className="text-xs theme-text-secondary">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Optimized SearchResultItem component
interface SearchResultItemProps {
  result: SearchResult;
  bgColor: string;
  icon: React.ReactNode;
  onClick: (result: SearchResult) => void;
}

const SearchResultItem = memo(function SearchResultItem({ 
  result, 
  bgColor, 
  icon, 
  onClick 
}: SearchResultItemProps) {
  const handleClick = useCallback(() => {
    onClick(result);
  }, [result, onClick]);
  
  // Formatear tiempo relativo - moved to component level for better performance
  const timeAgo = useMemo(() => {
    if (!result.timestamp) return null;
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - result.timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `hace ${diffInMinutes}m`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `hace ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `hace ${diffInDays}d`;
  }, [result.timestamp]);
  
  const typeLabel = useMemo(() => {
    const labels = {
      guide: 'Guía',
      post: 'Post', 
      user: 'Usuario',
      game: 'Juego',
      achievement: 'Logro'
    };
    return labels[result.type] || result.type;
  }, [result.type]);
  
  return (
    <div
      className={`p-3 border-b theme-border cursor-pointer hover:theme-bg-hover transition-all transform hover:scale-[1.02] ${bgColor}`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {result.icon ? (
            <div className="w-8 h-8 flex items-center justify-center text-lg">
              {result.icon}
            </div>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-semibold theme-text-primary truncate pr-2">
              {result.title}
            </h4>
            {timeAgo && (
              <span className="text-xs theme-text-secondary flex-shrink-0">
                {timeAgo}
              </span>
            )}
          </div>
          <p className="text-xs theme-text-secondary mb-2 line-clamp-2">
            {result.description}
          </p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              {result.author && (
                <span className="icon-primary truncate">{result.author}</span>
              )}
              {result.tags && result.tags.length > 0 && (
                <span className="theme-text-muted truncate">
                  {result.tags.slice(0, 2).join(', ')}
                  {result.tags.length > 2 && '...'}
                </span>
              )}
            </div>
            <span className="theme-text-muted capitalize flex-shrink-0">
              {typeLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default memo(SearchBar); 