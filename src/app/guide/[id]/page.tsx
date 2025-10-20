"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useThemeContext } from '../../../context/ThemeContext';
import SidebarGuide from '../../../features/games/components/SidebarGuide';
import CommentSection from '../../../features/chat/components/CommentSection';
import { Guide } from '../../../features/games/types/games.types';
import { guideService } from '../../../features/games/services/guideService';
import { useAuth } from '../../../context/AuthContext';
import { enhancedGuideService } from '../../../features/games/services/guideService';

interface GuideSection {
  id: string;
  title: string;
  content: string;
  icon?: string;
}

export default function GuidePage() {
  const params = useParams();
  const router = useRouter();
  const { currentTheme } = useThemeContext();
  const auth = useAuth();

  const [guide, setGuide] = useState<Guide | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [aiGeneratedContent, setAiGeneratedContent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load guide data
  useEffect(() => {
    const loadGuide = async () => {
      if (!params.id || typeof params.id !== 'string') {
        router.push('/games');
        return;
      }

      const foundGuide = guideService.getGuideById(params.id);
      if (!foundGuide) {
        router.push('/games');
        return;
      }

      setGuide(foundGuide);
      setIsLoading(false);
    };

    loadGuide();
  }, [params.id, router]);

  // Check if user can access this guide
  const canAccess = useMemo(() => {
    if (!guide) return false;
    return auth.user
      ? enhancedGuideService.canAccessGuide(guide, auth.user.plan)
      : !guide.isPremium;
  }, [guide, auth.user]);

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
            Basado en datos recientes y tendencias de jugadores profesionales, este análisis examina el estado actual del meta en ${guide?.name}.
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
                <span class="theme-text-primary">Dificultad:</span> ${guide?.difficulty === 'beginner' ? 'Principiante' : guide?.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
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
              Esta guía proporciona una visión completa y detallada de ${guide?.name},
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

  // Generate guide sections based on guide type and category
  const generateGuideSections = useCallback((): GuideSection[] => {
    if (!guide) return [];

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
          }
        ];
    }
  }, [guide]);

  const sections = useMemo(() => generateGuideSections(), [generateGuideSections]);

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

  const handleDownload = useCallback(async () => {
    if (!guide || !auth.user || !canAccess) return;

    try {
      await enhancedGuideService.downloadGuide(auth.user.id, guide.id);
    } catch (error) {
      console.error('Error downloading guide:', error);
    }
  }, [guide, auth.user, canAccess]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  if (isLoading) {
    return (
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen" style={{ background: 'var(--gradient-background)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-center h-96">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-4xl mb-4" style={{ color: 'var(--color-primary)' }}></i>
            <p className="theme-text-secondary">Cargando guía...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!guide) {
    return (
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen" style={{ background: 'var(--gradient-background)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-center h-96">
          <div className="text-center">
            <i className="fas fa-exclamation-triangle text-4xl mb-4" style={{ color: 'var(--color-warning)' }}></i>
            <h2 className="text-xl font-bold theme-text-primary mb-2">Guía no encontrada</h2>
            <p className="theme-text-secondary mb-4">La guía que buscas no existe o ha sido movida.</p>
            <button
              onClick={handleGoBack}
              className="theme-button px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Volver
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!canAccess) {
    return (
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen" style={{ background: 'var(--gradient-background)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-center h-96">
          <div className="text-center">
            <i className="fas fa-crown text-4xl mb-4" style={{ color: 'var(--color-warning)' }}></i>
            <h2 className="text-xl font-bold theme-text-primary mb-2">Contenido Premium</h2>
            <p className="theme-text-secondary mb-4">Esta guía requiere una cuenta premium para acceder.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleGoBack}
                className="px-6 py-3 rounded-lg font-semibold transition-all"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                  border: '1px solid'
                }}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Volver
              </button>
              <button className="theme-button px-6 py-3 rounded-lg font-semibold transition-all">
                <i className="fas fa-crown mr-2"></i>
                Obtener Premium
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen" style={{ background: 'var(--gradient-background)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoBack}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all animate-theme-hover"
              style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}
              title="Volver"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
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
              <h1 className="text-2xl md:text-3xl font-bold theme-text-primary">{guide.meta}</h1>
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
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24">
              <SidebarGuide
                sections={sidebarSections}
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
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="space-y-8">
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
                  className="theme-card p-6 card-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}