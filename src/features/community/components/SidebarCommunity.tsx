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
      <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Estadísticas
        </h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-purple-900/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-300">{SAMPLE_COMMUNITY_STATS.totalPosts}</div>
            <div className="text-xs text-gray-400">Posts</div>
          </div>
          <div className="bg-purple-900/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-300">{SAMPLE_COMMUNITY_STATS.activeUsers}</div>
            <div className="text-xs text-gray-400">Usuarios activos</div>
          </div>
        </div>
      </div>

      {/* Ordenar por */}
      <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
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
              className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-all ${
                filters.sortBy === option.value
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-purple-900/30'
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categorías */}
      <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Categorías
        </h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all ${
                !activeCategory
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-purple-900/30'
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
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all ${
                  activeCategory === cat.key
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                <span className="flex items-center">
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </span>
                <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded-full">
                  {cat.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reglas de la comunidad */}
      <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Reglas
        </h3>
        <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
          {COMMUNITY_RULES.map((rule, i) => (
            <li key={i} className="leading-relaxed">{rule}</li>
          ))}
        </ol>
      </div>
    </div>
  );
} 