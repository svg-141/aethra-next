'use client';

import HeroSection from '../../../features/ui/components/HeroSection';
import { useSimpleTutorial } from '../../../hooks/useSimpleTutorial';
import SimpleTutorial from '../../../components/SimpleTutorial';
import TutorialStartButton from '../../../components/TutorialStartButton';

export default function Starcraft2GuidePage() {
  // Definir los pasos del tutorial para Starcraft 2
  const tutorialSteps = [
    {
      id: 'step-1',
      title: 'Meta actual y parches',
      description: 'Conoce las tendencias actuales del meta de Starcraft 2 y los cambios más recientes en los parches.',
      sectionId: 'meta-actual'
    },
    {
      id: 'step-2',
      title: 'Razas y fortalezas',
      description: 'Aprende las características únicas de cada raza y sus fortalezas en el meta actual.',
      sectionId: 'razas'
    },
    {
      id: 'step-3',
      title: 'Build Orders',
      description: 'Domina los órdenes de construcción más efectivos para cada raza y situación.',
      sectionId: 'build-orders'
    },
    {
      id: 'step-4',
      title: 'Unidades clave y counters',
      description: 'Identifica las unidades más importantes y aprende a contrarrestar las estrategias enemigas.',
      sectionId: 'unidades'
    },
    {
      id: 'step-5',
      title: 'Estrategias por mapa',
      description: 'Descubre las mejores estrategias específicas para cada mapa del ladder.',
      sectionId: 'mapas'
    },
    {
      id: 'step-6',
      title: 'Micro y Macro',
      description: 'Perfecciona tu microgestión de unidades y tu macrogestión de recursos.',
      sectionId: 'micro-macro'
    },
    {
      id: 'step-7',
      title: 'Recomendaciones',
      description: 'Obtén consejos finales y recomendaciones para mejorar tu gameplay.',
      sectionId: 'recomendaciones'
    }
  ];

  const tutorial = useSimpleTutorial({
    steps: tutorialSteps
  });
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen bg-gradient-to-b from-[#0f0720] to-[#1a0933]">
      {/* Hero Section */}
      <HeroSection
        image="/assets/img/banners/starcraft-2-banner.jpg"
        title="Starcraft 2"
        subtitle="Guía estratégica completa para dominar el campo de batalla. Expansión Legacy of the Void."
        badge="RTS"
        badgeColor="bg-blue-500/20 text-blue-300 border-blue-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <img src="/assets/img/games/starcraft2.png" alt="Starcraft 2" className="w-16 h-16 rounded-lg border-2 border-white/20" />
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
                  <i className="fas fa-chevron-right text-xs"></i>Meta actual y parches
                </a>
              </li>
              <li>
                <a 
                  href="#razas"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Razas y fortalezas
                </a>
              </li>
              <li>
                <a 
                  href="#build-orders"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Build Orders
                </a>
              </li>
              <li>
                <a 
                  href="#unidades"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Unidades clave y counters
                </a>
              </li>
              <li>
                <a 
                  href="#mapas"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Estrategias por mapa
                </a>
              </li>
              <li>
                <a 
                  href="#micro-macro"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Micro y Macro
                </a>
              </li>
              <li>
                <a 
                  href="#recomendaciones"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Recomendaciones
                </a>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-history text-purple-300"></i>
                Actualizaciones
              </h3>
              <p className="text-sm text-gray-400 mb-2"><span className="text-purple-300">Última actualización:</span> 05/06/2025</p>
              <p className="text-sm text-gray-400">Próxima actualización estimada: Soporte oficial descontinuado</p>
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

            {/* Tutorial Start Button */}
            <TutorialStartButton 
              onStart={tutorial.startTutorial}
              isActive={tutorial.isActive}
            />
          </div>
        </div>
        {/* Contenido principal - Meta Actual */}
        <div className="lg:col-span-3 space-y-12">
          <section id="meta-actual" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Meta actual y parches</h2>
              <span className="px-3 py-1 text-sm bg-blue-900/30 text-blue-300 rounded-full">Legacy of the Void</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-line text-green-400"></i>
                  Tendencias Principales
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><i className="fas fa-check text-green-400 mt-1"></i><span>Terran: Bio agresivo y drops frecuentes</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-check text-green-400 mt-1"></i><span>Zerg: Roach-Ravager y transiciones a Lurkers</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-check text-green-400 mt-1"></i><span>Protoss: Skytoss en juego tardío</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-times text-red-400 mt-1"></i><span>Menos uso de estrategias all-in</span></li>
                </ul>
              </div>
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-balance-scale text-yellow-400"></i>
                  Cambios Recientes
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><i className="fas fa-arrow-up text-green-400 mt-1"></i><span><strong>Terran:</strong> Buff a los Medivacs</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-arrow-down text-red-400 mt-1"></i><span><strong>Zerg:</strong> Nerf a la velocidad de los Banelings</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-arrow-up text-green-400 mt-1"></i><span><strong>Protoss:</strong> Mejoras en el coste de los Disruptors</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-exclamation-triangle text-yellow-400 mt-1"></i><span>Nuevos mapas añadidos al ladder</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Razas y fortalezas */}
          <section id="razas" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Razas y fortalezas</h2>
            </div>
            
            {/* Terran */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl p-6 border border-red-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏭</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-300">Terran</h3>
                    <span className="text-sm text-gray-400">Versatilidad y adaptabilidad</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Fortalezas</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Flexibilidad:</strong> Pueden adaptarse a cualquier estilo de juego</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Drops y movilidad:</strong> Medivacs permiten ataques multifrente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Bio agresivo:</strong> Marines y Marauders muy cost-efficient</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Defensa sólida:</strong> Bunkers, tanks y PFs para turtle</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Estilo de Juego</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• <strong>Early game:</strong> Presión constante con Marines</li>
                      <li>• <strong>Mid game:</strong> Drops multiprong con Medivacs</li>
                      <li>• <strong>Late game:</strong> Transición a Sky Terran o mech</li>
                      <li>• <strong>Posicionamiento:</strong> Crucial para bio compositions</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-red-900/20 rounded-lg">
                      <div className="text-xs text-red-300">Dificultad: Media-Alta (Micro intensivo)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Zerg */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👾</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-300">Zerg</h3>
                    <span className="text-sm text-gray-400">Swarm y economia</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Fortalezas</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Economía superior:</strong> Más workers y expansiones rápidas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Mobility:</strong> Creep spread y unidades rápidas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Larva system:</strong> Producción instantánea de ejércitos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Tech switching:</strong> Adaptación rápida a counters</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Estilo de Juego</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• <strong>Early game:</strong> Drones y supervivencia</li>
                      <li>• <strong>Mid game:</strong> Aggression con Roach-Ravager</li>
                      <li>• <strong>Late game:</strong> Brood Lords o Ultras + apoyo</li>
                      <li>• <strong>Macro focus:</strong> Inject cycles y creep spread</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-purple-900/20 rounded-lg">
                      <div className="text-xs text-purple-300">Dificultad: Alta (Macro intensivo)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Protoss */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-300">Protoss</h3>
                    <span className="text-sm text-gray-400">Tecnología avanzada</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Fortalezas</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Unidades poderosas:</strong> Alta calidad individual</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Gateway warp-ins:</strong> Reinforcement instantáneo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Skytoss:</strong> Dominación air en late game</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Shield regeneration:</strong> Sustain en combate</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Estilo de Juego</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>• <strong>Early game:</strong> Defense y tech up</li>
                      <li>• <strong>Mid game:</strong> Gateway timing attacks</li>
                      <li>• <strong>Late game:</strong> Transición a Skytoss dominance</li>
                      <li>• <strong>Positioning:</strong> Aprovecha force fields y abilities</li>
                    </ul>
                    
                    <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg">
                      <div className="text-xs text-yellow-300">Dificultad: Media (Timing dependent)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comparación de matchups */}
            <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-vs text-purple-400"></i>
                Matchups Clásicos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-900/20 to-purple-900/20 rounded-lg p-4 border border-red-500/20">
                  <h4 className="text-md font-semibold text-white mb-2">TvZ</h4>
                  <p className="text-xs text-gray-300">Terran bio vs Zerg swarm. Emphasis en drops y positioning vs creep spread y tech switches.</p>
                </div>
                <div className="bg-gradient-to-br from-red-900/20 to-yellow-900/20 rounded-lg p-4 border border-orange-500/20">
                  <h4 className="text-md font-semibold text-white mb-2">TvP</h4>
                  <p className="text-xs text-gray-300">Aggression terran vs tech protoss. Bio pressure vs gateway defense y transition to skytoss.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 rounded-lg p-4 border border-pink-500/20">
                  <h4 className="text-md font-semibold text-white mb-2">ZvP</h4>
                  <p className="text-xs text-gray-300">Zerg macro vs Protoss tech. Roach pushes vs forcefields, late game air battles.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Build Orders */}
          <section id="build-orders" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Build Orders</h2>
            </div>
            
            {/* Build Orders Terran */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl p-6 border border-red-500/30">
                <h3 className="text-xl font-bold text-red-300 mb-6 flex items-center gap-2">
                  <span className="text-2xl">🏭</span>
                  Build Orders Terran
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 3-1-1 Build */}
                  <div className="bg-[#1e0b36] rounded-lg p-4 border border-red-500/20">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <i className="fas fa-star text-yellow-400"></i>
                      3-1-1 Standard
                    </h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="font-medium text-red-300">Supply/Timing:</div>
                      <ul className="space-y-1 text-xs">
                        <li>• 14: Supply Depot</li>
                        <li>• 16: Barracks</li>
                        <li>• 17: Refinery</li>
                        <li>• 19: Marine, Orbital Command</li>
                        <li>• 20: Supply Depot</li>
                        <li>• 22: Factory</li>
                        <li>• 24: Starport</li>
                        <li>• 26: Medivac production</li>
                      </ul>
                      <div className="mt-3 p-2 bg-red-900/30 rounded text-xs text-red-300">
                        Objetivo: Bio ball con drop capability @7-8 min
                      </div>
                    </div>
                  </div>
                  
                  {/* Proxy Reaper */}
                  <div className="bg-[#1e0b36] rounded-lg p-4 border border-red-500/20">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <i className="fas fa-bolt text-orange-400"></i>
                      Proxy Reaper Rush
                    </h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="font-medium text-red-300">Early Aggression:</div>
                      <ul className="space-y-1 text-xs">
                        <li>• 12: Supply Depot</li>
                        <li>• 13: Barracks (proxy)</li>
                        <li>• 15: Refinery</li>
                        <li>• 16: Reaper, Orbital</li>
                        <li>• 18: Supply, Reaper</li>
                        <li>• 20: Continuous reapers</li>
                      </ul>
                      <div className="mt-3 p-2 bg-orange-900/30 rounded text-xs text-orange-300">
                        Meta: All-in o transition a macro
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Build Orders Zerg */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-purple-300 mb-6 flex items-center gap-2">
                  <span className="text-2xl">👾</span>
                  Build Orders Zerg
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 17 Hatch Standard */}
                  <div className="bg-[#1e0b36] rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <i className="fas fa-home text-purple-400"></i>
                      17 Hatch, 18 Gas, 17 Pool
                    </h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="font-medium text-purple-300">Macro Opening:</div>
                      <ul className="space-y-1 text-xs">
                        <li>• 14: Overlord</li>
                        <li>• 17: Hatchery (expansion)</li>
                        <li>• 18: Extractor</li>
                        <li>• 17: Spawning Pool</li>
                        <li>• 19: Overlord, Lings</li>
                        <li>• @100 gas: Metabolic Boost</li>
                        <li>• 28: Queen x2, Roach Warren</li>
                      </ul>
                      <div className="mt-3 p-2 bg-purple-900/30 rounded text-xs text-purple-300">
                        Meta: Economy advantage, safe expansion
                      </div>
                    </div>
                  </div>
                  
                  {/* 12 Pool Rush */}
                  <div className="bg-[#1e0b36] rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <i className="fas fa-running text-pink-400"></i>
                      12 Pool Speedling Rush
                    </h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="font-medium text-purple-300">Cheese/Pressure:</div>
                      <ul className="space-y-1 text-xs">
                        <li>• 12: Spawning Pool</li>
                        <li>• 13: Overlord</li>
                        <li>• 13: Extractor</li>
                        <li>• @Pool: 6x Zergling</li>
                        <li>• @100 gas: Metabolic Boost</li>
                        <li>• Continuous ling production</li>
                      </ul>
                      <div className="mt-3 p-2 bg-pink-900/30 rounded text-xs text-pink-300">
                        Objetivo: Early damage o eco behind
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Build Orders Protoss */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl p-6 border border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-300 mb-6 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Build Orders Protoss
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 1 Gate Expand */}
                  <div className="bg-[#1e0b36] rounded-lg p-4 border border-yellow-500/20">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <i className="fas fa-expand text-yellow-400"></i>
                      1 Gate Fast Expand
                    </h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="font-medium text-yellow-300">Safe Expansion:</div>
                      <ul className="space-y-1 text-xs">
                        <li>• 14: Pylon</li>
                        <li>• 16: Gateway</li>
                        <li>• 17: Assimilator</li>
                        <li>• 20: Nexus (expansion)</li>
                        <li>• 20: Cybernetics Core</li>
                        <li>• 22: Pylon, Stalker</li>
                        <li>• 24: Warpgate research</li>
                      </ul>
                      <div className="mt-3 p-2 bg-yellow-900/30 rounded text-xs text-yellow-300">
                        Transición: Gateway army o tech
                      </div>
                    </div>
                  </div>
                  
                  {/* 2 Gate Rush */}
                  <div className="bg-[#1e0b36] rounded-lg p-4 border border-yellow-500/20">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <i className="fas fa-fist-raised text-orange-400"></i>
                      2 Gate Proxy
                    </h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="font-medium text-yellow-300">All-in Timing:</div>
                      <ul className="space-y-1 text-xs">
                        <li>• 12: Pylon (proxy)</li>
                        <li>• 13: Gateway (proxy)</li>
                        <li>• 15: Gateway (proxy)</li>
                        <li>• 16: Zealot production</li>
                        <li>• Continuous zealot waves</li>
                      </ul>
                      <div className="mt-3 p-2 bg-orange-900/30 rounded text-xs text-orange-300">
                        High risk, high reward cheese
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Timing Chart */}
            <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-clock text-blue-400"></i>
                Timings Clave
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-purple-500/30">
                      <th className="text-left p-2 text-purple-300">Tiempo</th>
                      <th className="text-left p-2 text-red-300">Terran</th>
                      <th className="text-left p-2 text-purple-300">Zerg</th>
                      <th className="text-left p-2 text-yellow-300">Protoss</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-purple-500/20">
                      <td className="p-2 font-medium">4:00</td>
                      <td className="p-2">Primeros Marines</td>
                      <td className="p-2">Speed Lings</td>
                      <td className="p-2">Primeros Zealots</td>
                    </tr>
                    <tr className="border-b border-purple-500/20">
                      <td className="p-2 font-medium">6:00</td>
                      <td className="p-2">Factory units</td>
                      <td className="p-2">Roach timing</td>
                      <td className="p-2">Stalker ball</td>
                    </tr>
                    <tr className="border-b border-purple-500/20">
                      <td className="p-2 font-medium">8:00</td>
                      <td className="p-2">Medivac drops</td>
                      <td className="p-2">Lair tech</td>
                      <td className="p-2">Colossus/Storm</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">10:00+</td>
                      <td className="p-2">3-3 upgrades</td>
                      <td className="p-2">Hive tech</td>
                      <td className="p-2">Skytoss</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Unidades clave y counters */}
          <section id="unidades" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Unidades clave y counters</h2>
            </div>
            <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4">Contenido próximamente...</h3>
              <p className="text-gray-400">Esta sección está en desarrollo y se añadirá contenido completo próximamente.</p>
            </div>
          </section>

          {/* Estrategias por mapa */}
          <section id="mapas" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Estrategias por mapa</h2>
            </div>
            <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4">Contenido próximamente...</h3>
              <p className="text-gray-400">Esta sección está en desarrollo y se añadirá contenido completo próximamente.</p>
            </div>
          </section>

          {/* Micro y Macro */}
          <section id="micro-macro" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Micro y Macro</h2>
            </div>
            <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4">Contenido próximamente...</h3>
              <p className="text-gray-400">Esta sección está en desarrollo y se añadirá contenido completo próximamente.</p>
            </div>
          </section>

          {/* Recomendaciones */}
          <section id="recomendaciones" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Recomendaciones</h2>
            </div>
            <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4">Contenido próximamente...</h3>
              <p className="text-gray-400">Esta sección está en desarrollo y se añadirá contenido completo próximamente.</p>
            </div>
          </section>
        </div>
      </div>

      {/* Simple Tutorial */}
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