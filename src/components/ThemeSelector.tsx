"use client";

import { useState, useCallback, memo } from 'react'; // Removed unused useMemo import
import { useThemeContext } from '../context/ThemeContext';
import { Theme } from '../context/ThemeContext';
import { useTooltips } from '../features/tooltips';

function ThemeSelector() {
  const { currentTheme, userPreferences, availableThemes, setTheme, updatePreferences, resetToDefault, isLoading } = useThemeContext();
  const { preferences: tooltipPreferences, updatePreferences: updateTooltipPreferences, resetTooltips } = useTooltips();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'themes' | 'accessibility' | 'display' | 'help'>('themes');

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 theme-bg-surface rounded-lg border theme-border">
        <i className="fas fa-spinner fa-spin theme-text-secondary"></i>
        <span className="hidden sm:inline theme-text-secondary">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Botón para abrir selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:scale-105 hover:shadow-lg font-medium"
        style={{
          backgroundColor: 'rgba(var(--color-primary-rgb, 139, 92, 246), 0.15)',
          color: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          borderWidth: '1.5px'
        }}
        data-tooltip="themes"
      >
        <i className="fas fa-palette text-lg"></i>
        <span className="hidden sm:inline">Personalizar</span>
      </button>

      {/* Panel de personalización */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 theme-card shadow-2xl z-50 max-h-[80vh] flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b theme-border">
            <h3 className="text-lg font-bold theme-text-primary">Personalización</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="theme-text-secondary hover:theme-text-primary transition-colors p-2 hover:theme-bg-hover rounded"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b theme-border">
            <button
              onClick={() => setActiveTab('themes')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'themes'
                  ? 'border-b-2 theme-text-primary'
                  : 'theme-text-secondary hover:theme-text-primary'
              }`}
              style={{
                borderBottomColor: activeTab === 'themes' ? currentTheme.colors.primary : 'transparent'
              }}
            >
              Temas
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'accessibility'
                  ? 'border-b-2 theme-text-primary'
                  : 'theme-text-secondary hover:theme-text-primary'
              }`}
              style={{
                borderBottomColor: activeTab === 'accessibility' ? currentTheme.colors.primary : 'transparent'
              }}
            >
              Accesibilidad
            </button>
            <button
              onClick={() => setActiveTab('display')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'display'
                  ? 'border-b-2 theme-text-primary'
                  : 'theme-text-secondary hover:theme-text-primary'
              }`}
              style={{
                borderBottomColor: activeTab === 'display' ? currentTheme.colors.primary : 'transparent'
              }}
            >
              Pantalla
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'help'
                  ? 'border-b-2 theme-text-primary'
                  : 'theme-text-secondary hover:theme-text-primary'
              }`}
              style={{
                borderBottomColor: activeTab === 'help' ? currentTheme.colors.primary : 'transparent'
              }}
            >
              Ayuda
            </button>
          </div>

          {/* Contenido de tabs */}
          <div className="p-4 overflow-y-auto flex-1 scrollbar-theme">
            {/* Tab: Temas */}
            {activeTab === 'themes' && (
              <div className="space-y-4">
                <div className="text-xs theme-text-secondary mb-3">
                  Selecciona el tema que mejor se adapte a tu estilo de juego
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <span className="text-sm theme-text-primary">Alto contraste</span>
                    <input
                      type="checkbox"
                      checked={userPreferences.highContrast}
                      onChange={(e) => updatePreferences({ highContrast: e.target.checked })}
                      className="input-theme w-4 h-4 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm theme-text-primary">Reducir movimiento</span>
                    <input
                      type="checkbox"
                      checked={userPreferences.reducedMotion}
                      onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
                      className="input-theme w-4 h-4 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm theme-text-primary">Animaciones</span>
                    <input
                      type="checkbox"
                      checked={userPreferences.animations}
                      onChange={(e) => updatePreferences({ animations: e.target.checked })}
                      className="input-theme w-4 h-4 rounded"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Tab: Pantalla */}
            {activeTab === 'display' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm theme-text-primary mb-2 block">Tamaño de fuente</label>
                  <select
                    value={userPreferences.fontSize}
                    onChange={(e) => updatePreferences({ fontSize: e.target.value as 'small' | 'medium' | 'large' })}
                    className="select-theme w-full px-3 py-2 text-sm"
                  >
                    <option value="small">Pequeño</option>
                    <option value="medium">Mediano</option>
                    <option value="large">Grande</option>
                  </select>
                </div>

                <label className="flex items-center justify-between">
                  <span className="text-sm theme-text-primary">Modo compacto</span>
                  <input
                    type="checkbox"
                    checked={userPreferences.compactMode}
                    onChange={(e) => updatePreferences({ compactMode: e.target.checked })}
                    className="input-theme w-4 h-4 rounded"
                  />
                </label>
              </div>
            )}

            {/* Tab: Ayuda */}
            {activeTab === 'help' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm theme-text-primary">Mostrar tooltips de ayuda</span>
                    <input
                      type="checkbox"
                      checked={tooltipPreferences.showTooltips}
                      onChange={(e) => updateTooltipPreferences({ showTooltips: e.target.checked })}
                      className="input-theme w-4 h-4 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm theme-text-primary">Tooltips animados</span>
                    <input
                      type="checkbox"
                      checked={tooltipPreferences.animatedTooltips}
                      onChange={(e) => updateTooltipPreferences({ animatedTooltips: e.target.checked })}
                      className="input-theme w-4 h-4 rounded"
                      disabled={!tooltipPreferences.showTooltips}
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm theme-text-primary">Modo spotlight</span>
                    <input
                      type="checkbox"
                      checked={tooltipPreferences.spotlightMode}
                      onChange={(e) => updateTooltipPreferences({ spotlightMode: e.target.checked })}
                      className="input-theme w-4 h-4 rounded"
                      disabled={!tooltipPreferences.showTooltips}
                    />
                  </label>
                </div>

                <div className="pt-3 border-t theme-border">
                  <button
                    onClick={resetTooltips}
                    className="theme-button w-full px-3 py-2 rounded-lg text-sm"
                  >
                    <i className="fas fa-redo icon-theme mr-2"></i>
                    Repetir tooltips de ayuda
                  </button>
                </div>

                <div className="text-xs theme-text-muted">
                  <p>Los tooltips te guían por las funcionalidades de la plataforma. Puedes activarlos o desactivarlos según prefieras.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t theme-border flex justify-between items-center">
            <button
              onClick={resetToDefault}
              className="text-sm theme-text-secondary hover:theme-text-primary transition-colors px-3 py-1 rounded hover:theme-bg-hover"
            >
              <i className="fas fa-undo mr-2"></i>
              Restablecer
            </button>
            <div className="text-xs theme-text-muted flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.colors.primary }}></div>
              {currentTheme.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Optimized ThemeCard component with memo
interface ThemeCardProps {
  theme: Theme;
  isActive: boolean;
  onSelect: () => void;
}

const ThemeCard = memo(function ThemeCard({ theme, isActive, onSelect }: ThemeCardProps) {
  const handleClick = useCallback(() => {
    if (!isActive) {
      onSelect();
    }
  }, [isActive, onSelect]);
  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-all transform hover:scale-105 theme-card animate-theme-hover ${
        isActive
          ? 'theme-border-hover animate-theme-glow'
          : 'theme-border hover:theme-border-hover'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        {/* Preview del tema */}
        <div className="w-12 h-8 rounded border theme-border overflow-hidden">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          />
        </div>
        
        <div className="flex-1">
          <h4 className="text-sm font-semibold theme-text-primary">{theme.name}</h4>
          <p className="text-xs theme-text-secondary">{theme.description}</p>
        </div>
        
        {isActive && (
          <i className="fas fa-check icon-primary"></i>
        )}
      </div>
    </div>
  );
});

// Export default with memo
export default memo(ThemeSelector); 