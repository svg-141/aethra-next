"use client";

import { useState } from 'react';
import { useTheme, Theme } from '../hooks/useTheme';
import { useTooltips } from '../features/tooltips';

export default function ThemeSelector() {
  const { currentTheme, userPreferences, availableThemes, setTheme, updatePreferences, resetToDefault } = useTheme();
  const { preferences: tooltipPreferences, updatePreferences: updateTooltipPreferences, resetTooltips } = useTooltips();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'themes' | 'accessibility' | 'display' | 'help'>('themes');

  return (
    <div className="relative">
      {/* Botón para abrir selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 rounded-lg border border-purple-600/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-all"
        data-tooltip="themes"
      >
        <i className="fas fa-palette"></i>
        <span className="hidden sm:inline">Personalizar</span>
      </button>

      {/* Panel de personalización */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-xl border border-purple-900/60 shadow-2xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-900/50">
            <h3 className="text-lg font-bold text-white">Personalización</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-purple-900/50">
            <button
              onClick={() => setActiveTab('themes')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'themes'
                  ? 'text-purple-300 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Temas
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'accessibility'
                  ? 'text-purple-300 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Accesibilidad
            </button>
            <button
              onClick={() => setActiveTab('display')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'display'
                  ? 'text-purple-300 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pantalla
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'help'
                  ? 'text-purple-300 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Ayuda
            </button>
          </div>

          {/* Contenido de tabs */}
          <div className="p-4 max-h-96 overflow-y-auto">
            {/* Tab: Temas */}
            {activeTab === 'themes' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {availableThemes.map((theme) => (
                    <ThemeCard
                      key={theme.id}
                      theme={theme}
                      isActive={currentTheme.id === theme.id}
                      onSelect={() => setTheme(theme.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Accesibilidad */}
            {activeTab === 'accessibility' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-white">Alto contraste</span>
                    <input
                      type="checkbox"
                      checked={userPreferences.highContrast}
                      onChange={(e) => updatePreferences({ highContrast: e.target.checked })}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-white">Reducir movimiento</span>
                    <input
                      type="checkbox"
                      checked={userPreferences.reducedMotion}
                      onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-white">Animaciones</span>
                    <input
                      type="checkbox"
                      checked={userPreferences.animations}
                      onChange={(e) => updatePreferences({ animations: e.target.checked })}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Tab: Pantalla */}
            {activeTab === 'display' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white mb-2 block">Tamaño de fuente</label>
                  <select
                    value={userPreferences.fontSize}
                    onChange={(e) => updatePreferences({ fontSize: e.target.value as any })}
                    className="w-full bg-[#1e0b36] text-white rounded px-3 py-2 text-sm border border-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="small">Pequeño</option>
                    <option value="medium">Mediano</option>
                    <option value="large">Grande</option>
                  </select>
                </div>

                <label className="flex items-center justify-between">
                  <span className="text-sm text-white">Modo compacto</span>
                  <input
                    type="checkbox"
                    checked={userPreferences.compactMode}
                    onChange={(e) => updatePreferences({ compactMode: e.target.checked })}
                    className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                  />
                </label>
              </div>
            )}

            {/* Tab: Ayuda */}
            {activeTab === 'help' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-white">Mostrar tooltips de ayuda</span>
                    <input
                      type="checkbox"
                      checked={tooltipPreferences.showTooltips}
                      onChange={(e) => updateTooltipPreferences({ showTooltips: e.target.checked })}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-white">Tooltips animados</span>
                    <input
                      type="checkbox"
                      checked={tooltipPreferences.animatedTooltips}
                      onChange={(e) => updateTooltipPreferences({ animatedTooltips: e.target.checked })}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                      disabled={!tooltipPreferences.showTooltips}
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-white">Modo spotlight</span>
                    <input
                      type="checkbox"
                      checked={tooltipPreferences.spotlightMode}
                      onChange={(e) => updateTooltipPreferences({ spotlightMode: e.target.checked })}
                      className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                      disabled={!tooltipPreferences.showTooltips}
                    />
                  </label>
                </div>

                <div className="pt-3 border-t border-purple-900/50">
                  <button
                    onClick={resetTooltips}
                    className="w-full px-3 py-2 bg-purple-600/20 text-purple-300 rounded-lg border border-purple-600/30 hover:bg-purple-600/30 transition-all text-sm"
                  >
                    <i className="fas fa-redo mr-2"></i>
                    Repetir tooltips de ayuda
                  </button>
                </div>

                <div className="text-xs text-gray-400">
                  <p>Los tooltips te guían por las funcionalidades de la plataforma. Puedes activarlos o desactivarlos según prefieras.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-purple-900/50 flex justify-between">
            <button
              onClick={resetToDefault}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Restablecer
            </button>
            <div className="text-xs text-gray-500">
              Tema: {currentTheme.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para mostrar una tarjeta de tema
interface ThemeCardProps {
  theme: Theme;
  isActive: boolean;
  onSelect: () => void;
}

function ThemeCard({ theme, isActive, onSelect }: ThemeCardProps) {
  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-all ${
        isActive
          ? 'border-purple-500 bg-purple-500/20'
          : 'border-purple-900/50 bg-[#1e0b36] hover:border-purple-500/50'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        {/* Preview del tema */}
        <div className="w-12 h-8 rounded border border-purple-900/50 overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          />
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{theme.name}</h4>
          <p className="text-xs text-gray-400">{theme.description}</p>
        </div>
        
        {isActive && (
          <i className="fas fa-check text-purple-400"></i>
        )}
      </div>
    </div>
  );
} 