'use client';

import HeroSection from '../../../features/ui/components/HeroSection';
import CommentSection from '../../../features/chat/components/CommentSection';
import { useSimpleTutorial } from '../../../hooks/useSimpleTutorial';
import SimpleTutorial from '../../../components/SimpleTutorial';
import TutorialStartButton from '../../../components/TutorialStartButton';

export default function LeagueOfLegendsGuidePage() {
  const tutorialSteps = [
    {
      id: 'step-1',
      title: 'Meta Actual',
      description: 'Conoce los campeones, runas y estrategias dominantes en el meta actual de League of Legends.',
      sectionId: 'meta-actual'
    },
    {
      id: 'step-2',
      title: 'Tier List de Campeones',
      description: 'Descubre qué campeones están dominando cada role en el parche actual.',
      sectionId: 'tier-list'
    },
    {
      id: 'step-3',
      title: 'Guía por Roles',
      description: 'Estrategias específicas y tips para cada rol: Top, Jungle, Mid, ADC y Support.',
      sectionId: 'roles'
    },
    {
      id: 'step-4',
      title: 'Objetivos y Macro',
      description: 'Aprende cuándo tomar dragones, barones y torres para ganar partidas.',
      sectionId: 'macro'
    }
  ];

  const tutorial = useSimpleTutorial({
    steps: tutorialSteps
  });

  const initialComments = [
    {
      id: 1,
      author: 'LoLPro2023',
      avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
      content: 'La tier list está muy actualizada. Me ayudó a subir de rango.',
      time: 'hace 2 horas',
      likes: 12,
      section: 'meta-actual',
    },
    {
      id: 2,
      author: 'JungleDiff',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      content: 'Excelente guía de macro. Finalmente entiendo cuándo tomar baron.',
      time: 'hace 1 día',
      likes: 8,
      section: 'meta-actual',
    },
  ];

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen bg-gradient-to-b from-[#0f0720] to-[#1a0933]">
      {/* Hero Section */}
      <HeroSection
        image="/assets/banners/valorant-banner2.jpeg"
        title="League of Legends"
        subtitle="Guía completa para dominar la Grieta del Invocador. Parche 13.20 actualizado."
        badge="MOBA"
        badgeColor="bg-blue-500/20 text-blue-300 border-blue-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <img src="/assets/games/lol.png" alt="League of Legends" className="w-16 h-16 rounded-lg border-2 border-white/20" />
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
                  href="#tier-list"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Tier List
                </a>
              </li>
              <li>
                <a
                  href="#roles"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Guía por Roles
                </a>
              </li>
              <li>
                <a
                  href="#macro"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Objetivos y Macro
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-history text-purple-300"></i>
                Actualizaciones
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                <span className="text-purple-300">Última actualización:</span> Parche 13.20
              </p>
              <p className="text-sm text-gray-400">Próximo parche: 13.21 (01/11/2025)</p>
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
              <span className="px-3 py-1 text-sm bg-blue-900/30 text-blue-300 rounded-full">Parche 13.20</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-line text-green-400"></i>
                  Tendencias Principales
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-400 mt-1"></i>
                    <span>Campeones de movilidad dominando en jungla</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-400 mt-1"></i>
                    <span>Meta de teamfight con tanques y engage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-check text-green-400 mt-1"></i>
                    <span>Importancia de drakes y herald temprano</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-times text-red-400 mt-1"></i>
                    <span>Meta de split push menos efectivo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-balance-scale text-yellow-400"></i>
                  Cambios del Parche
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <i className="fas fa-arrow-up text-green-400 mt-1"></i>
                    <span><strong>K'Sante:</strong> Buff en tankiness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-arrow-down text-red-400 mt-1"></i>
                    <span><strong>Yone:</strong> Nerf en daño early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-arrow-up text-green-400 mt-1"></i>
                    <span><strong>Lulu:</strong> Mejora en shield</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <i className="fas fa-exclamation-triangle text-yellow-400 mt-1"></i>
                    <span>Cambios en items de jungla</span>
                  </li>
                </ul>
              </div>
            </div>

            <CommentSection
              sectionId="meta-actual"
              initialComments={initialComments}
              initialVotes={{ up: 48, down: 5 }}
              title="¿Te resultó útil esta sección?"
            />
          </section>

          {/* Tier List */}
          <section id="tier-list" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Tier List por Role</h2>
              <span className="px-3 py-1 text-sm bg-blue-900/30 text-blue-300 rounded-full">Parche 13.20</span>
            </div>

            {/* Tier S */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-xl p-6 border border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                  <i className="fas fa-crown"></i>
                  Tier S - Picks Obligatorios
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-[#1e0b36] rounded-lg p-3 border border-yellow-500/20 text-center">
                    <div className="text-sm text-white font-semibold mb-1">K'Sante</div>
                    <div className="text-xs text-red-300">Top</div>
                  </div>
                  <div className="bg-[#1e0b36] rounded-lg p-3 border border-yellow-500/20 text-center">
                    <div className="text-sm text-white font-semibold mb-1">Vi</div>
                    <div className="text-xs text-green-300">Jungle</div>
                  </div>
                  <div className="bg-[#1e0b36] rounded-lg p-3 border border-yellow-500/20 text-center">
                    <div className="text-sm text-white font-semibold mb-1">Ahri</div>
                    <div className="text-xs text-blue-300">Mid</div>
                  </div>
                  <div className="bg-[#1e0b36] rounded-lg p-3 border border-yellow-500/20 text-center">
                    <div className="text-sm text-white font-semibold mb-1">Jinx</div>
                    <div className="text-xs text-yellow-300">ADC</div>
                  </div>
                  <div className="bg-[#1e0b36] rounded-lg p-3 border border-yellow-500/20 text-center">
                    <div className="text-sm text-white font-semibold mb-1">Lulu</div>
                    <div className="text-xs text-cyan-300">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tier A */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                  <i className="fas fa-medal"></i>
                  Tier A - Muy Fuerte
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {['Sett', 'Lee Sin', 'Orianna', 'Kai\'Sa', 'Thresh', 'Garen'].map((champ, i) => (
                    <div key={i} className="bg-[#1e0b36] rounded-lg p-2 border border-green-500/20 text-center">
                      <div className="text-xs text-white font-medium">{champ}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Guía por Roles */}
          <section id="roles" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Guía por Roles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Top Lane */}
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-red-500/30">
                <h3 className="text-lg font-bold text-red-300 mb-3 flex items-center gap-2">
                  <i className="fas fa-shield"></i> Top Lane
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-check text-red-400"></i> Wave management crucial</li>
                  <li><i className="fas fa-check text-red-400"></i> TP plays para objetivos</li>
                  <li><i className="fas fa-check text-red-400"></i> Tanques en meta teamfight</li>
                </ul>
              </div>

              {/* Jungle */}
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-green-500/30">
                <h3 className="text-lg font-bold text-green-300 mb-3 flex items-center gap-2">
                  <i className="fas fa-tree"></i> Jungle
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-check text-green-400"></i> Control de drakes</li>
                  <li><i className="fas fa-check text-green-400"></i> Ganks coordinados</li>
                  <li><i className="fas fa-check text-green-400"></i> Vision y macro</li>
                </ul>
              </div>

              {/* Mid Lane */}
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                  <i className="fas fa-star"></i> Mid Lane
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-check text-blue-400"></i> Roaming efectivo</li>
                  <li><i className="fas fa-check text-blue-400"></i> Control de vision mid</li>
                  <li><i className="fas fa-check text-blue-400"></i> Wave clear rápido</li>
                </ul>
              </div>

              {/* ADC */}
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-yellow-500/30">
                <h3 className="text-lg font-bold text-yellow-300 mb-3 flex items-center gap-2">
                  <i className="fas fa-crosshairs"></i> ADC
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-check text-yellow-400"></i> Farm priority</li>
                  <li><i className="fas fa-check text-yellow-400"></i> Positioning en TF</li>
                  <li><i className="fas fa-check text-yellow-400"></i> Kiting efectivo</li>
                </ul>
              </div>

              {/* Support */}
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-lg font-bold text-cyan-300 mb-3 flex items-center gap-2">
                  <i className="fas fa-hands-helping"></i> Support
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-check text-cyan-400"></i> Control de vision</li>
                  <li><i className="fas fa-check text-cyan-400"></i> Roaming y presión</li>
                  <li><i className="fas fa-check text-cyan-400"></i> Peel para ADC</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Objetivos y Macro */}
          <section id="macro" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Objetivos y Macro</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-dragon text-red-400"></i>
                  Prioridad de Dragones
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-orange-300">Infernal</div>
                    <div className="text-xs text-gray-400">+AD/AP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-300">Ocean</div>
                    <div className="text-xs text-gray-400">Regen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-300">Mountain</div>
                    <div className="text-xs text-gray-400">Resistencias</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-cyan-300">Cloud</div>
                    <div className="text-xs text-gray-400">MS</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-crown text-purple-400"></i>
                  Timing de Baron
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><i className="fas fa-check text-purple-400"></i> <strong>20-25 min:</strong> Ventaja de 2+ jugadores</li>
                  <li><i className="fas fa-check text-purple-400"></i> <strong>25-30 min:</strong> Con wave control adecuado</li>
                  <li><i className="fas fa-check text-purple-400"></i> <strong>30+ min:</strong> Baron rush viable con ventaja</li>
                </ul>
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
