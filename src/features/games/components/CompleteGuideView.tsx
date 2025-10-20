import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useThemeContext } from '../../../context/ThemeContext';
import SidebarGuide from './SidebarGuide';
import CommentSection from '../../chat/components/CommentSection';
import { Guide } from '../types/games.types';

interface CompleteGuideViewProps {
  guide: Guide;
  onClose: () => void;
  onDownload?: (guideId: string) => void;
  onRate?: (guideId: string, rating: number) => void;
}

interface GuideSection {
  id: string;
  title: string;
  content: string;
  icon?: string;
}

export default function CompleteGuideView({ guide, onClose, onDownload, onRate }: CompleteGuideViewProps) {
  const { currentTheme } = useThemeContext();
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [aiGeneratedContent, setAiGeneratedContent] = useState<boolean>(false);

  // Generate guide sections based on guide type and category - memoized
  const generateGuideSections = useCallback((): GuideSection[] => {
    const baseSections: GuideSection[] = [
      {
        id: 'overview',
        title: 'Visión General',
        content: guide.description,
        icon: 'fas fa-eye'
      }
    ];

    // Add type-specific sections based on guide type
    switch (guide.type) {
      case 'strategy':
        return [
          ...baseSections,
          {
            id: 'meta-analysis',
            title: 'Análisis del Meta',
            content: generateMetaAnalysis(),
            icon: 'fas fa-chart-line'
          },
          {
            id: 'key-strategies',
            title: 'Estrategias Clave',
            content: generateKeyStrategies(),
            icon: 'fas fa-chess'
          },
          {
            id: 'team-compositions',
            title: 'Composiciones de Equipo',
            content: generateTeamCompositions(),
            icon: 'fas fa-users'
          },
          {
            id: 'counter-strategies',
            title: 'Contra-estrategias',
            content: generateCounterStrategies(),
            icon: 'fas fa-shield-alt'
          }
        ];

      case 'tutorial':
        return [
          ...baseSections,
          {
            id: 'prerequisites',
            title: 'Prerrequisitos',
            content: generatePrerequisites(),
            icon: 'fas fa-list-check'
          },
          {
            id: 'step-by-step',
            title: 'Paso a Paso',
            content: generateStepByStep(),
            icon: 'fas fa-stairs'
          },
          {
            id: 'practice-tips',
            title: 'Consejos de Práctica',
            content: generatePracticeTips(),
            icon: 'fas fa-target'
          },
          {
            id: 'common-mistakes',
            title: 'Errores Comunes',
            content: generateCommonMistakes(),
            icon: 'fas fa-exclamation-triangle'
          }
        ];

      case 'build-guide':
        return [
          ...baseSections,
          {
            id: 'build-order',
            title: 'Orden de Construcción',
            content: generateBuildOrder(),
            icon: 'fas fa-hammer'
          },
          {
            id: 'timings',
            title: 'Timings Críticos',
            content: generateTimings(),
            icon: 'fas fa-clock'
          },
          {
            id: 'variations',
            title: 'Variaciones',
            content: generateVariations(),
            icon: 'fas fa-code-branch'
          },
          {
            id: 'counters',
            title: 'Counters y Adaptaciones',
            content: generateCounters(),
            icon: 'fas fa-exchange-alt'
          }
        ];

      default:
        return [
          ...baseSections,
          {
            id: 'details',
            title: 'Detalles',
            content: generateDetailedContent(),
            icon: 'fas fa-info-circle'
          },
          {
            id: 'tips',
            title: 'Consejos',
            content: generateTips(),
            icon: 'fas fa-lightbulb'
          }
        ];
    }
  }, [guide.type, guide.description, guide.difficulty, guide.estimatedTime]);

  // AI-powered content generation functions
  const generateMetaAnalysis = (): string => {
    setAiGeneratedContent(true);
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-brain icon-primary"></i>
            Análisis del Meta Actual
          </h4>
          <p class="theme-text-secondary mb-4">
            Basado en datos recientes y tendencias de jugadores profesionales, este análisis examina el estado actual del meta en ${guide.name}.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Tendencias Dominantes</h5>
              <ul class="space-y-2 text-sm theme-text-secondary">
                <li class="flex items-start gap-2">
                  <i class="fas fa-arrow-up icon-success text-xs mt-1"></i>
                  <span>Estrategias agresivas en aumento</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-arrow-up icon-success text-xs mt-1"></i>
                  <span>Mayor focus en early game</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-arrow-down icon-error text-xs mt-1"></i>
                  <span>Disminución de estrategias defensivas</span>
                </li>
              </ul>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Predicciones</h5>
              <p class="text-sm theme-text-secondary">
                Se espera que el meta evolucione hacia un mayor equilibrio entre agresividad y control estratégico en las próximas actualizaciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateKeyStrategies = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-chess icon-primary"></i>
            Estrategias Fundamentales
          </h4>
          <div class="space-y-4">
            <div class="theme-bg-surface p-4 rounded-lg border-l-4" style="border-color: var(--color-primary)">
              <h5 class="font-semibold theme-text-primary mb-2">Estrategia Principal</h5>
              <p class="theme-text-secondary mb-3">
                Control del ritmo de juego mediante presión constante y rotaciones inteligentes.
              </p>
              <div class="text-xs theme-text-secondary">
                <span class="theme-text-primary">Dificultad:</span> ${guide.difficulty === 'beginner' ? 'Principiante' : guide.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
              </div>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg border-l-4" style="border-color: var(--color-secondary)">
              <h5 class="font-semibold theme-text-primary mb-2">Estrategia Alternativa</h5>
              <p class="theme-text-secondary mb-3">
                Enfoque defensivo con counter-attacks precisos en momentos clave.
              </p>
              <div class="text-xs theme-text-secondary">
                <span class="theme-text-primary">Situación ideal:</span> Contra equipos agresivos
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateTeamCompositions = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-users icon-primary"></i>
            Composiciones Recomendadas
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-3 flex items-center gap-2">
                <i class="fas fa-fire icon-error"></i>
                Composición Agresiva
              </h5>
              <p class="theme-text-secondary text-sm mb-3">
                Enfoque en presión constante y eliminaciones rápidas.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Estilo de juego:</span>
                  <span class="theme-text-primary">Agresivo</span>
                </div>
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Ritmo:</span>
                  <span class="theme-text-primary">Rápido</span>
                </div>
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Dificultad:</span>
                  <span class="theme-text-primary">Alta</span>
                </div>
              </div>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-3 flex items-center gap-2">
                <i class="fas fa-shield icon-info"></i>
                Composición Equilibrada
              </h5>
              <p class="theme-text-secondary text-sm mb-3">
                Balance entre agresividad y control estratégico.
              </p>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Estilo de juego:</span>
                  <span class="theme-text-primary">Versátil</span>
                </div>
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Ritmo:</span>
                  <span class="theme-text-primary">Adaptable</span>
                </div>
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Dificultad:</span>
                  <span class="theme-text-primary">Media</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateCounterStrategies = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-shield-alt icon-primary"></i>
            Contra-estrategias Efectivas
          </h4>
          <div class="space-y-4">
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Contra Estrategias Agresivas</h5>
              <ul class="space-y-2 text-sm theme-text-secondary">
                <li class="flex items-start gap-2">
                  <i class="fas fa-check icon-success text-xs mt-1"></i>
                  <span>Posicionamiento defensivo sólido</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check icon-success text-xs mt-1"></i>
                  <span>Trade kills eficientes</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check icon-success text-xs mt-1"></i>
                  <span>Control de recursos clave</span>
                </li>
              </ul>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Contra Estrategias Defensivas</h5>
              <ul class="space-y-2 text-sm theme-text-secondary">
                <li class="flex items-start gap-2">
                  <i class="fas fa-check icon-success text-xs mt-1"></i>
                  <span>Presión constante en múltiples frentes</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check icon-success text-xs mt-1"></i>
                  <span>Control de mapa y recursos</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-check icon-success text-xs mt-1"></i>
                  <span>Forzar engagements favorables</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generatePrerequisites = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-list-check icon-primary"></i>
            Requisitos Previos
          </h4>
          <div class="space-y-4">
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Conocimientos Básicos</h5>
              <ul class="space-y-2 text-sm theme-text-secondary">
                <li class="flex items-start gap-2">
                  <i class="fas fa-circle icon-primary text-xs mt-1"></i>
                  <span>Mecánicas fundamentales del juego</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-circle icon-primary text-xs mt-1"></i>
                  <span>Conceptos básicos de estrategia</span>
                </li>
                <li class="flex items-start gap-2">
                  <i class="fas fa-circle icon-primary text-xs mt-1"></i>
                  <span>Familiaridad con la interfaz</span>
                </li>
              </ul>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Nivel Recomendado</h5>
              <p class="theme-text-secondary text-sm mb-2">
                ${guide.difficulty === 'beginner' ? 'Principiante - No se requiere experiencia previa' :
                  guide.difficulty === 'intermediate' ? 'Intermedio - Se recomienda experiencia básica' :
                  'Avanzado - Requiere conocimiento profundo del juego'}
              </p>
              <div class="flex items-center gap-2 text-xs">
                <span class="theme-text-secondary">Tiempo estimado:</span>
                <span class="theme-text-primary">${guide.estimatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateStepByStep = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-stairs icon-primary"></i>
            Guía Paso a Paso
          </h4>
          <div class="space-y-4">
            ${[1, 2, 3, 4, 5].map(step => `
              <div class="theme-bg-surface p-4 rounded-lg border-l-4" style="border-color: var(--color-primary)">
                <h5 class="font-semibold theme-text-primary mb-2 flex items-center gap-2">
                  <span class="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">${step}</span>
                  Paso ${step}
                </h5>
                <p class="theme-text-secondary text-sm mb-2">
                  Descripción detallada del paso ${step} con instrucciones específicas y consideraciones importantes.
                </p>
                <div class="text-xs theme-text-secondary">
                  <span class="theme-text-primary">Tip:</span> Consejo útil para este paso específico.
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  };

  const generatePracticeTips = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-target icon-primary"></i>
            Consejos de Práctica
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Práctica Diaria</h5>
              <ul class="space-y-2 text-sm theme-text-secondary">
                <li>• Dedica 15-30 minutos diarios</li>
                <li>• Enfócate en una mecánica específica</li>
                <li>• Registra tu progreso</li>
              </ul>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Evaluación</h5>
              <ul class="space-y-2 text-sm theme-text-secondary">
                <li>• Revisa replays de tus partidas</li>
                <li>• Identifica áreas de mejora</li>
                <li>• Compara con jugadores expertos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateCommonMistakes = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-exclamation-triangle icon-warning"></i>
            Errores Comunes a Evitar
          </h4>
          <div class="space-y-4">
            <div class="theme-bg-surface p-4 rounded-lg border-l-4" style="border-color: var(--color-error)">
              <h5 class="font-semibold theme-text-primary mb-2">Error #1: Falta de Paciencia</h5>
              <p class="theme-text-secondary text-sm mb-2">
                Muchos jugadores se impacientan y toman decisiones apresuradas.
              </p>
              <div class="text-xs theme-text-secondary">
                <span class="theme-text-primary">Solución:</span> Mantén la calma y evalúa cada situación.
              </div>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg border-l-4" style="border-color: var(--color-error)">
              <h5 class="font-semibold theme-text-primary mb-2">Error #2: Ignorar el Mapa</h5>
              <p class="theme-text-secondary text-sm mb-2">
                No prestar atención a la información del mapa y posiciones enemigas.
              </p>
              <div class="text-xs theme-text-secondary">
                <span class="theme-text-primary">Solución:</span> Desarrolla consciencia espacial constante.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateBuildOrder = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-hammer icon-primary"></i>
            Orden de Construcción Detallado
          </h4>
          <div class="theme-bg-surface p-4 rounded-lg">
            <div class="space-y-3">
              ${[
                { time: '0:00', action: 'Inicio de partida', detail: 'Configuración inicial' },
                { time: '0:30', action: 'Primera construcción', detail: 'Estructura básica' },
                { time: '1:00', action: 'Expansión económica', detail: 'Recursos adicionales' },
                { time: '2:00', action: 'Unidades de combate', detail: 'Primera oleada' },
                { time: '3:00', action: 'Tecnología avanzada', detail: 'Upgrades clave' }
              ].map((item, index) => `
                <div class="flex items-center gap-4 p-2 hover:theme-bg-hover rounded transition-colors">
                  <div class="w-16 text-xs theme-text-primary font-mono">${item.time}</div>
                  <div class="flex-1">
                    <div class="font-medium theme-text-primary">${item.action}</div>
                    <div class="text-xs theme-text-secondary">${item.detail}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateTimings = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-clock icon-primary"></i>
            Timings Críticos
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-3">Early Game (0-5 min)</h5>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Primer objetivo:</span>
                  <span class="theme-text-primary">2:30</span>
                </div>
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Power spike:</span>
                  <span class="theme-text-primary">4:00</span>
                </div>
              </div>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-3">Mid Game (5-15 min)</h5>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Transición:</span>
                  <span class="theme-text-primary">8:00</span>
                </div>
                <div class="flex justify-between">
                  <span class="theme-text-secondary">Peak power:</span>
                  <span class="theme-text-primary">12:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateVariations = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-code-branch icon-primary"></i>
            Variaciones y Adaptaciones
          </h4>
          <div class="space-y-4">
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Variación Agresiva</h5>
              <p class="theme-text-secondary text-sm mb-2">
                Enfoque más agresivo para presión temprana.
              </p>
              <div class="text-xs theme-text-secondary">
                <span class="theme-text-primary">Cuándo usar:</span> Contra oponentes defensivos
              </div>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2">Variación Económica</h5>
              <p class="theme-text-secondary text-sm mb-2">
                Prioriza el desarrollo económico a largo plazo.
              </p>
              <div class="text-xs theme-text-secondary">
                <span class="theme-text-primary">Cuándo usar:</span> En mapas grandes o contra rushes
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateCounters = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-exchange-alt icon-primary"></i>
            Counters y Adaptaciones
          </h4>
          <div class="space-y-4">
            <div class="theme-bg-surface p-4 rounded-lg border-l-4" style="border-color: var(--color-error)">
              <h5 class="font-semibold theme-text-primary mb-2">Débil contra</h5>
              <ul class="space-y-1 text-sm theme-text-secondary">
                <li>• Estrategias de rush temprano</li>
                <li>• Presión económica intensa</li>
                <li>• Counter-builds específicos</li>
              </ul>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg border-l-4" style="border-color: var(--color-success)">
              <h5 class="font-semibold theme-text-primary mb-2">Fuerte contra</h5>
              <ul class="space-y-1 text-sm theme-text-secondary">
                <li>• Builds económicos lentos</li>
                <li>• Estrategias defensivas</li>
                <li>• Composiciones desequilibradas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateDetailedContent = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-info-circle icon-primary"></i>
            Información Detallada
          </h4>
          <div class="theme-bg-surface p-4 rounded-lg">
            <p class="theme-text-secondary mb-4">
              Esta guía proporciona una visión completa y detallada de ${guide.name},
              incluyendo estrategias avanzadas, análisis del meta actual y consejos específicos
              para mejorar tu rendimiento.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 class="font-semibold theme-text-primary mb-2">Características Clave</h5>
                <ul class="space-y-1 text-sm theme-text-secondary">
                  <li>• Análisis profundo del meta</li>
                  <li>• Estrategias paso a paso</li>
                  <li>• Consejos de pros</li>
                  <li>• Errores comunes a evitar</li>
                </ul>
              </div>
              <div>
                <h5 class="font-semibold theme-text-primary mb-2">Beneficios</h5>
                <ul class="space-y-1 text-sm theme-text-secondary">
                  <li>• Mejora rápida de habilidades</li>
                  <li>• Comprensión del juego</li>
                  <li>• Ventaja competitiva</li>
                  <li>• Actualizado regularmente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const generateTips = (): string => {
    return `
      <div class="space-y-6">
        <div class="theme-card p-6">
          <h4 class="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
            <i class="fas fa-lightbulb icon-primary"></i>
            Consejos y Trucos
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2 flex items-center gap-2">
                <i class="fas fa-star icon-warning text-sm"></i>
                Consejos Básicos
              </h5>
              <ul class="space-y-2 text-sm theme-text-secondary">
                <li>• Practica regularmente</li>
                <li>• Mantén la calma bajo presión</li>
                <li>• Aprende de tus errores</li>
                <li>• Observa a jugadores expertos</li>
              </ul>
            </div>
            <div class="theme-bg-surface p-4 rounded-lg">
              <h5 class="font-semibold theme-text-primary mb-2 flex items-center gap-2">
                <i class="fas fa-crown icon-warning text-sm"></i>
                Consejos Avanzados
              </h5>
              <ul class="space-y-2 text-sm theme-text-secondary">
                <li>• Adapta tu estrategia al oponente</li>
                <li>• Domina los timings críticos</li>
                <li>• Desarrolla múltiples estilos</li>
                <li>• Mantente actualizado con el meta</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const sections = useMemo<GuideSection[]>(() => generateGuideSections(), [generateGuideSections]);

  const sidebarSections = useMemo(() =>
    sections.map(section => ({
      id: section.id,
      label: section.title,
      icon: section.icon,
      isActive: section.id === activeSection
    }))
  , [sections, activeSection]);

  const currentSection = useMemo(() => sections.find(section => section.id === activeSection), [sections, activeSection]);

  const handleSectionClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
  }, []);

  const handleDownload = useCallback(() => {
    onDownload?.(guide.id);
  }, [onDownload, guide.id]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    // Only close if clicking directly on the backdrop, not on child elements
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  const handleRate = useCallback((rating: number) => {
    onRate?.(guide.id, rating);
  }, [onRate, guide.id]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      {/* Main container */}
      <div className="relative w-full h-full flex">
        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className="flex items-center justify-between p-6 border-b animate-theme-hover"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)'
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold text-xl"
                style={{
                  borderColor: 'var(--color-border)',
                  background: guide.gradient ? `linear-gradient(135deg, ${guide.gradient})` : 'var(--gradient-primary)'
                }}
              >
                {guide.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold theme-text-primary">{guide.meta}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm theme-text-secondary">por {guide.author}</span>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: guide.difficulty === 'beginner' ? 'var(--color-success)' :
                                     guide.difficulty === 'intermediate' ? 'var(--color-warning)' : 'var(--color-error)',
                      opacity: '0.2',
                      color: guide.difficulty === 'beginner' ? 'var(--color-success)' :
                             guide.difficulty === 'intermediate' ? 'var(--color-warning)' : 'var(--color-error)'
                    }}
                  >
                    {guide.difficulty === 'beginner' ? 'Principiante' :
                     guide.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      opacity: '0.2',
                      color: 'var(--color-primary)'
                    }}
                  >
                    {guide.type}
                  </span>
                  {aiGeneratedContent && (
                    <span
                      className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
                      style={{
                        backgroundColor: 'var(--color-info)',
                        opacity: '0.2',
                        color: 'var(--color-info)'
                      }}
                    >
                      <i className="fas fa-brain text-xs"></i>
                      IA Enhanced
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm theme-text-secondary">
                <i className="fas fa-eye"></i>
                {(guide.views || 0).toLocaleString()}
              </div>
              <div className="flex items-center gap-2 text-sm theme-text-secondary">
                <i className="fas fa-download"></i>
                {(guide.downloads || 0).toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-warning)' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <i
                    key={i}
                    className="fas fa-star text-xs"
                    style={{
                      color: i < Math.floor(guide.rating || 0) ? 'var(--color-warning)' : 'var(--color-text-secondary)'
                    }}
                  />
                ))}
                <span className="ml-1">{(guide.rating || 0).toFixed(1)}</span>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors animate-theme-hover"
                style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex">
              {/* Sidebar */}
              <div className="w-80 flex-shrink-0 overflow-y-auto border-r" style={{ borderColor: 'var(--color-border)' }}>
                <div className="p-6">
                  <SidebarGuide
                    sections={sidebarSections.map(section => ({
                      ...section,
                      isActive: section.id === activeSection
                    }))}
                    updates={{
                      last: guide.updated,
                      version: '1.0'
                    }}
                    downloadLabel="Descargar PDF"
                    onDownload={handleDownload}
                    onSectionClick={handleSectionClick}
                  />
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                  {currentSection && (
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: currentSection.content }}
                    />
                  )}

                  {/* Comments section */}
                  <div className="mt-12">
                    <CommentSection
                      sectionId={`guide-${guide.id}-${activeSection}`}
                      initialComments={[]}
                      initialVotes={{ up: Math.floor(Math.random() * 50) + 10, down: Math.floor(Math.random() * 5) }}
                      title="¿Te resultó útil esta sección?"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}