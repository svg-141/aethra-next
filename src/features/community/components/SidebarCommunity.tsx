import React from 'react';
import { SidebarCommunityProps, PostCategory } from '../types/community.types';
import { POST_CATEGORIES, COMMUNITY_RULES, SAMPLE_COMMUNITY_STATS } from '../constants/community-constants';

export default function SidebarCommunity({ 
  activeCategory, 
  onCategoryChange, 
  onFilterChange, 
  filters, 
  categories 
}: SidebarCommunityProps) {
  const handleCategoryClick = (category: PostCategory | null) => {
    onCategoryChange(category);
    onFilterChange({ ...filters, category: category || undefined });
  };

  const handleSortChange = (sortBy: 'newest' | 'popular' | 'most-commented') => {
    onFilterChange({ ...filters, sortBy });
  };

  return (
    <div className="space-y-6">
      {/* Estadísticas de la comunidad */}
      <div className="module-card p-6">
        <h3 className="module-text-title text-lg mb-4 flex items-center">
          <i className="fas fa-chart-bar mr-2 icon-primary"></i>
          Estadísticas
        </h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="module-card module-card-interactive p-3">
            <div className="text-2xl font-bold module-text-highlight">{SAMPLE_COMMUNITY_STATS.totalPosts}</div>
            <div className="text-xs module-text-muted">Posts</div>
          </div>
          <div className="module-card module-card-interactive p-3">
            <div className="text-2xl font-bold module-text-highlight">{SAMPLE_COMMUNITY_STATS.activeUsers}</div>
            <div className="text-xs module-text-muted">Usuarios activos</div>
          </div>
        </div>
      </div>

      {/* Ordenar por */}
      <div className="module-card p-6">
        <h3 className="module-text-title text-lg mb-4 flex items-center">
          <i className="fas fa-sort-amount-down mr-2 icon-primary"></i>
          Ordenar por
        </h3>
        <div className="space-y-2">
          {[
            { value: 'newest', label: 'Más recientes', icon: '🕒' },
            { value: 'popular', label: 'Más populares', icon: '🔥' },
            { value: 'most-commented', label: 'Más comentados', icon: '💬' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value as 'newest' | 'popular' | 'most-commented')}
              className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-all font-semibold ${
                filters.sortBy === option.value
                  ? 'bg-purple-600 text-white'
                  : 'module-text-muted hover:bg-white/5 hover:text-purple-400'
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categorías */}
      <div className="module-card p-6">
        <h3 className="module-text-title text-lg mb-4 flex items-center">
          <i className="fas fa-tags mr-2 icon-primary"></i>
          Categorías
        </h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-all font-semibold ${
                !activeCategory
                  ? 'bg-purple-600 text-white'
                  : 'module-text-muted hover:bg-white/5 hover:text-purple-400'
              }`}
            >
              <span className="flex items-center">
                <span className="mr-2">📋</span>
                Todas las categorías
              </span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.key}>
              <button
                onClick={() => handleCategoryClick(cat.key)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-all font-semibold ${
                  activeCategory === cat.key
                    ? 'bg-purple-600 text-white'
                    : 'module-text-muted hover:bg-white/5 hover:text-purple-400'
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </span>
                <span className="module-badge">
                  {cat.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reglas de la comunidad */}
      <div className="module-card p-6">
        <h3 className="module-text-title text-lg mb-4 flex items-center">
          <i className="fas fa-gavel mr-2 icon-primary"></i>
          Reglas
        </h3>
        <ol className="text-sm module-text-muted space-y-2 list-decimal list-inside">
          {COMMUNITY_RULES.map((rule, i) => (
            <li key={i} className="leading-relaxed">{rule}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
 