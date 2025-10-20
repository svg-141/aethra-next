"use client";

import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react';
import { useSearch, SearchResult } from '../hooks/useSearch';
import { useDebounce } from '../utils/performance';

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
        setShowFilters(false);
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

  // Memoize type icons for performance
  const getTypeIcon = useMemo(() => ({
    guide: <i className="fas fa-book text-primary"></i>,
    post: <i className="fas fa-comment text-success"></i>,
    user: <i className="fas fa-user text-info"></i>,
    game: <i className="fas fa-gamepad text-warning"></i>,
    achievement: <i className="fas fa-trophy text-warning"></i>,
    default: <i className="fas fa-search text-secondary"></i>,
  }), []);

  // Memoize background colors for performance
  const typeBgColors = useMemo(() => ({
    guide: 'border-primary',
    post: 'border-success',
    user: 'border-info',
    game: 'border-warning',
    achievement: 'border-warning',
    default: 'border-secondary',
  }), []);

  // Optimized result click handler
  const handleResultClick = useCallback((result: SearchResult) => {
    window.location.href = result.url;
    setIsOpen(false);
    clearSearch();
  }, [clearSearch]);
  
  // Debounced search input handler
  const debouncedSetQuery = useDebounce(setQuery, 300);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetQuery(e.target.value);
  }, [debouncedSetQuery]);

  return (
    <div className="position-relative w-100" style={{maxWidth: '400px'}} ref={searchRef}>
      {/* Barra de búsqueda */}
      <div className="input-group">
        <span className="input-group-text bg-theme-surface border-theme">
          <i className="fas fa-search text-theme-secondary"></i>
        </span>
        <input
          type="text"
          placeholder="Buscar guías, posts, usuarios..."
          defaultValue={query}
          onChange={handleInputChange}
          className="form-control form-control-gaming"
        />
        
        {/* Botón de filtros */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn btn-outline-secondary btn-sm ${
            showFilters ? 'active' : ''
          }`}
          type="button"
        >
          <i className="fas fa-filter"></i>
        </button>

        {/* Loading indicator */}
        {isLoading && (
          <span className="input-group-text bg-theme-surface border-theme">
            <i className="fas fa-spinner fa-spin text-theme-primary"></i>
          </span>
        )}
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="card position-absolute w-100 mt-2 shadow-theme-lg" style={{ zIndex: 1050 }}>
          <div className="card-body">
            <h5 className="card-title text-theme-primary mb-3">
              <i className="fas fa-filter me-2"></i>Filtros
            </h5>

            {/* Tipos de contenido */}
            <div className="mb-4">
              <label className="form-label text-theme-secondary small">Tipo de contenido</label>
              <div className="d-flex flex-wrap gap-2">
                {['guide', 'post', 'user', 'game', 'achievement'].map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      const newTypes = filters.types.includes(type)
                        ? filters.types.filter(t => t !== type)
                        : [...filters.types, type];
                      setFilters({ types: newTypes });
                    }}
                    className={`btn btn-sm ${
                      filters.types.includes(type)
                        ? 'btn-primary'
                        : 'btn-outline-secondary'
                    }`}
                  >
                    {type === 'guide' && <><i className="fas fa-book me-1"></i>Guías</>}
                    {type === 'post' && <><i className="fas fa-comment me-1"></i>Posts</>}
                    {type === 'user' && <><i className="fas fa-user me-1"></i>Usuarios</>}
                    {type === 'game' && <><i className="fas fa-gamepad me-1"></i>Juegos</>}
                    {type === 'achievement' && <><i className="fas fa-trophy me-1"></i>Logros</>}
                  </button>
                ))}
              </div>
            </div>

            {/* Juegos */}
            <div className="mb-4">
              <label className="form-label text-theme-secondary small">Juegos</label>
              <div className="d-flex flex-wrap gap-2">
                {['Valorant', 'LoL', 'Dota 2', 'CS:GO', 'Fortnite'].map(game => (
                  <button
                    key={game}
                    onClick={() => {
                      const newGames = filters.games.includes(game)
                        ? filters.games.filter(g => g !== game)
                        : [...filters.games, game];
                      setFilters({ games: newGames });
                    }}
                    className={`btn btn-sm ${
                      filters.games.includes(game)
                        ? 'btn-primary'
                        : 'btn-outline-secondary'
                    }`}
                  >
                    {game}
                  </button>
                ))}
              </div>
            </div>

            {/* Rango de tiempo */}
            <div>
              <label className="form-label text-theme-secondary small">Rango de tiempo</label>
              <select
                value={filters.timeRange}
                onChange={(e) => setFilters({ timeRange: e.target.value as any })}
                className="form-select form-select-sm"
              >
                <option value="all">Todo el tiempo</option>
                <option value="day">Último día</option>
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Resultados de búsqueda - Optimizado */}
      {isOpen && (
        <div className="card position-absolute w-100 mt-2 shadow-theme-xl animate-fade-in" style={{ zIndex: 1050, maxHeight: '400px' }}>
          {results.length === 0 && query.trim() && !isLoading ? (
            <div className="card-body text-center py-5">
              <i className="fas fa-search display-4 text-theme-tertiary mb-3"></i>
              <p className="text-theme-secondary mb-2">No se encontraron resultados</p>
              <p className="text-theme-tertiary small">Intenta con otros términos</p>
            </div>
          ) : (
            <div className="overflow-auto scrollbar-theme" style={{ maxHeight: '320px' }}>
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
            <div className="card-footer text-center bg-theme-surface">
              <small className="text-theme-tertiary">
                <i className="fas fa-info-circle me-1"></i>
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Optimized SearchResultItem component with Bootstrap
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
      className={`card-body border-start-0 border-end-0 border-top-0 ${bgColor} cursor-pointer animate-theme-hover`}
      onClick={handleClick}
      style={{ borderWidth: '0 0 1px 4px' }}
    >
      <div className="d-flex align-items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {result.icon ? (
            <div className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontSize: '1.5rem' }}>
              {result.icon}
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontSize: '1.5rem' }}>
              {icon}
            </div>
          )}
        </div>
        <div className="flex-grow-1 min-w-0">
          <div className="d-flex align-items-center justify-content-between mb-1">
            <h6 className="mb-0 text-theme-primary text-truncate pe-2">
              {result.title}
            </h6>
            {timeAgo && (
              <small className="text-theme-tertiary flex-shrink-0">
                {timeAgo}
              </small>
            )}
          </div>
          <p className="small text-theme-secondary mb-2 text-truncate" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {result.description}
          </p>
          <div className="d-flex align-items-center justify-content-between small">
            <div className="d-flex align-items-center gap-2 min-w-0">
              {result.author && (
                <span className="text-info text-truncate">{result.author}</span>
              )}
              {result.tags && result.tags.length > 0 && (
                <span className="text-theme-tertiary text-truncate">
                  {result.tags.slice(0, 2).join(', ')}
                  {result.tags.length > 2 && '...'}
                </span>
              )}
            </div>
            <span className="badge bg-secondary flex-shrink-0">
              {typeLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default memo(SearchBar);