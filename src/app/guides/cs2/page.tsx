'use client';

import HeroSection from '../../../features/ui/components/HeroSection';
import CommentSection from '../../../features/chat/components/CommentSection';
import { useSimpleTutorial } from '../../../hooks/useSimpleTutorial';
import SimpleTutorial from '../../../components/SimpleTutorial';
import TutorialStartButton from '../../../components/TutorialStartButton';
import Image from 'next/image';

export default function CS2GuidePage() {
  const tutorialSteps = [
    {
      id: 'step-1',
      title: 'Meta Actual',
      description: 'Conoce las armas, mapas y estrategias más efectivas en el meta actual de Counter-Strike 2.',
      sectionId: 'meta-actual'
    },
    {
      id: 'step-2',
      title: 'Mapas Competitivos',
      description: 'Domina cada mapa con estrategias específicas para atacantes y defensores.',
      sectionId: 'mapas'
    },
    {
      id: 'step-3',
      title: 'Economía',
      description: 'Aprende a gestionar la economía del equipo para maximizar tus posibilidades de victoria.',
      sectionId: 'economia'
    },
    {
      id: 'step-4',
      title: 'Armas y Utilidades',
      description: 'Guía completa sobre las armas más efectivas y cómo usar granadas correctamente.',
      sectionId: 'armas'
    }
  ];

  const tutorial = useSimpleTutorial({
    steps: tutorialSteps
  });

  const initialComments = [
    {
      id: 1,
      author: 'CS2Pro',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      content: 'Excelentes consejos sobre economía. Me ayudó a mejorar mi winrate.',
      time: 'hace 3 horas',
      likes: 8,
      section: 'meta-actual',
    },
    {
      id: 2,
      author: 'TacticMaster',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      content: 'Las estrategias de Mirage están perfectas. Justo lo que necesitaba.',
      time: 'hace 1 día',
      likes: 5,
      section: 'meta-actual',
    },
  ];

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen bg-gradient-to-b from-[#0f0720] to-[#1a0933]">
      {/* Hero Section */}
      <HeroSection
        image="/assets/banners/starcraft-2-banner.jpg"
        title="Counter-Strike 2"
        subtitle="Guía estratégica completa para dominar CS2. Aprende economía, mapas y tácticas profesionales."
        badge="FPS Táctico"
        badgeColor="bg-orange-500/20 text-orange-300 border-orange-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16">
            <Image
              src="/assets/icons/cs2-logo.png"
              alt="CS2"
              fill
              sizes="64px"
              style={{ objectFit: 'contain' }}
              className="rounded-lg border-2 border-white/20"
            />
          </div>
        </div>
      </HeroSection>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60 sticky-sidebar">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-list-ul text-purple-300"></i>
              Índice
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#meta-actual"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Meta Actual
                </a>
              </li>
              <li>
                <a
                  href="#mapas"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Mapas Competitivos
                </a>
              </li>
              <li>
                <a
                  href="#economia"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Economía
                </a>
              </li>
              <li>
                <a
                  href="#armas"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Armas y Utilidades
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-history text-purple-300"></i>
                Actualizaciones
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                <span className="text-purple-300">Última actualización:</span> 15/10/2025
              </p>
              <p className="text-sm text-gray-400">Próxima actualización: 01/11/2025</p>
            </div>

            <div className="mt-8 pt-6 border-t border-theme">
              <h3 className="text-lg font-bold text-theme-primary mb-4 flex items-center gap-2">
                <i className="fas fa-download text-theme-primary"></i>
                Descargar Guía
              </h3>
              <button className="w-full px-4 py-2 text-theme-primary rounded-lg transition-all flex items-center justify-center gap-2 animate-theme-hover animate-theme-glow" style={{ background: 'var(--gradient-primary)' }}>
                <i className="fas fa-file-pdf"></i>
                PDF Completo
              </button>
            </div>

            <TutorialStartButton
              onStart={tutorial.startTutorial}
              isActive={tutorial.isActive}
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="lg:col-span-3 space-y-12">
          {/* Meta Actual */}
          <section id="meta-actual" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Meta Actual</h2>
              <span className="px-3 py-1 text-sm bg-orange-900/30 text-orange-300 rounded-full">CS2 2025</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-fire text-orange-400"></i>
                  Tendencias Principales
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-400 mt-1"></i>
                    <span>Meta agresivo dominando en Tier 1: T-side pushes rápidos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-400 mt-1"></i>
                    <span>AWP sigue siendo crucial en manos expertas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-400 mt-1"></i>
                    <span>Utilización de granadas más táctica que nunca</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-times text-red-400 mt-1"></i>
                    <span>Mapas como Vertigo menos jugados en competitivo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-line text-yellow-400"></i>
                  Cambios Recientes
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-arrow-up text-green-400 mt-1"></i>
                    <span><strong>M4A1-S:</strong> Buff en accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-arrow-down text-red-400 mt-1"></i>
                    <span><strong>AWP:</strong> Ligero nerf en movespeed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-arrow-up text-green-400 mt-1"></i>
                    <span><strong>Smokes:</strong> Mayor duración</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-exclamation-triangle text-yellow-400 mt-1"></i>
                    <span>Nuevos ajustes en Anubis</span>
                  </li>
                </ul>
              </div>
            </div>

            <CommentSection
              sectionId="meta-actual"
              initialComments={initialComments}
              initialVotes={{ up: 35, down: 2 }}
              title="¿Te resultó útil esta sección?"
            />
          </section>

          {/* Mapas Competitivos */}
          <section id="mapas" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Mapas Competitivos</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dust2 */}
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-xl font-bold text-white mb-3">Dust2</h3>
                <p className="text-sm text-gray-400 mb-4">El mapa más icónico de CS. Control mid crucial.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-star text-yellow-400"></i> <strong>T-Side:</strong> Control de mid y Long A</li>
                  <li><i className="fas fa-shield text-blue-400"></i> <strong>CT-Side:</strong> AWP en mid, rotaciones rápidas</li>
                </ul>
              </div>

              {/* Mirage */}
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-xl font-bold text-white mb-3">Mirage</h3>
                <p className="text-sm text-gray-400 mb-4">Mapa balanceado perfecto para estrategias variadas.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-star text-yellow-400"></i> <strong>T-Side:</strong> Smokes para A, executes B</li>
                  <li><i className="fas fa-shield text-blue-400"></i> <strong>CT-Side:</strong> Info gathering crucial</li>
                </ul>
              </div>

              {/* Inferno */}
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-xl font-bold text-white mb-3">Inferno</h3>
                <p className="text-sm text-gray-400 mb-4">Mapa de control de utilidades y ángulos cerrados.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-star text-yellow-400"></i> <strong>T-Side:</strong> Molotovs para clear angles</li>
                  <li><i className="fas fa-shield text-blue-400"></i> <strong>CT-Side:</strong> Crossfires efectivos</li>
                </ul>
              </div>

              {/* Anubis */}
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-xl font-bold text-white mb-3">Anubis</h3>
                <p className="text-sm text-gray-400 mb-4">Mapa nuevo con gran verticalidad.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-star text-yellow-400"></i> <strong>T-Side:</strong> Control de mid y canal</li>
                  <li><i className="fas fa-shield text-blue-400"></i> <strong>CT-Side:</strong> Juego de alturas</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Economía */}
          <section id="economia" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Economía en CS2</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-green-500/30">
                <h4 className="text-lg font-semibold text-green-300 mb-3">
                  <i className="fas fa-coins"></i> Pistol Round
                </h4>
                <p className="text-sm text-gray-300 mb-3">Crucial para momentum inicial</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Armor + Kit (CT) o Grenades (T)</li>
                  <li>• Upgraded pistols estratégico</li>
                  <li>• Team coordination es clave</li>
                </ul>
              </div>

              <div className="bg-[#1e0b36] rounded-xl p-6 border border-yellow-500/30">
                <h4 className="text-lg font-semibold text-yellow-300 mb-3">
                  <i className="fas fa-dollar-sign"></i> Force Buy
                </h4>
                <p className="text-sm text-gray-300 mb-3">Arriesgar para romper economía rival</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Armor + pistol/SMG</li>
                  <li>• Situaciones específicas</li>
                  <li>• Coordinación total del equipo</li>
                </ul>
              </div>

              <div className="bg-[#1e0b36] rounded-xl p-6 border border-orange-500/30">
                <h4 className="text-lg font-semibold text-orange-300 mb-3">
                  <i className="fas fa-trophy"></i> Full Buy
                </h4>
                <p className="text-sm text-gray-300 mb-3">Máximo potencial del equipo</p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Rifles + Armor + Full nades</li>
                  <li>• AWP para jugador dedicado</li>
                  <li>• $5000-5500 por jugador</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Armas y Utilidades */}
          <section id="armas" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Armas Meta</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-3">AK-47</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Daño cabeza:</span><span className="text-red-400 font-bold">143 (One-tap)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precio:</span><span className="text-yellow-400">$2700</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">El rifle favorito de T-side. One-tap a cualquier distancia con armor.</p>
                </div>
              </div>

              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-3">M4A4 / M4A1-S</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Daño cabeza:</span><span className="text-red-400 font-bold">92-94</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precio:</span><span className="text-yellow-400">$3100</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Rifles CT principales. M4A1-S más preciso, M4A4 más munición.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <SimpleTutorial
        isActive={tutorial.isActive}
        currentStep={tutorial.currentStep}
        currentStepIndex={tutorial.currentStepIndex}
        totalSteps={tutorial.totalSteps}
        isFirstStep={tutorial.isFirstStep}
        isLastStep={tutorial.isLastStep}
        onNext={tutorial.nextStep}
        onPrevious={tutorial.prevStep}
        onClose={tutorial.closeTutorial}
      />
    </section>
  );
}
