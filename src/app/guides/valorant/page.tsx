'use client';

import HeroSection from '../../../features/ui/components/HeroSection';
import CommentSection from '../../../features/chat/components/CommentSection';
import { useSimpleTutorial } from '../../../hooks/useSimpleTutorial';
import SimpleTutorial from '../../../components/SimpleTutorial';
import TutorialStartButton from '../../../components/TutorialStartButton';

export default function ValorantGuidePage() {
  const tutorialSteps = [
    {
      id: 'step-1',
      title: 'Meta Actual',
      description: 'Conoce las tendencias actuales, cambios recientes y estadísticas globales del meta de Valorant.',
      sectionId: 'meta-actual'
    },
    {
      id: 'step-2', 
      title: 'Tier List de Agentes',
      description: 'Descubre qué agentes están dominando en el meta actual y cuáles son las mejores opciones.',
      sectionId: 'agentes-tier'
    },
    {
      id: 'step-3',
      title: 'Estrategias por Mapa',
      description: 'Aprende las mejores estrategias y tácticas específicas para cada mapa competitivo.',
      sectionId: 'mapas'
    },
    {
      id: 'step-4',
      title: 'Armas y Economía',
      description: 'Domina el sistema económico y conoce las mejores armas para cada situación.',
      sectionId: 'armas'
    },
    {
      id: 'step-5',
      title: 'Composiciones Recomendadas',
      description: 'Descubre las mejores composiciones de equipo y cómo ejecutarlas efectivamente.',
      sectionId: 'composiciones'
    }
  ];

  const tutorial = useSimpleTutorial({ 
    steps: tutorialSteps
  });

  // Comentarios iniciales para la sección
  const initialComments = [
    {
      id: 1,
      author: 'ProPlayer123',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: 'Excelente guía, me ayudó mucho con las composiciones. ¿Alguien tiene consejos para Ascent?',
      time: 'hace 2 horas',
      likes: 5,
      section: 'meta-actual',
    },
    {
      id: 2,
      author: 'ValorantMaster',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'La sección de agentes está muy actualizada. Reyna sigue siendo muy fuerte.',
      time: 'hace 1 día',
      likes: 3,
      section: 'meta-actual',
    },
  ];

  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen bg-gradient-to-b from-[#0f0720] to-[#1a0933]">
      {/* Hero Section */}
      <HeroSection
        gradient="from-green-900/40 via-emerald-800/30 to-green-900/40"
        title="Valorant"
        subtitle="Guía estratégica completa para dominar el meta actual en Valorant. Episodio 6, Acto 3."
        badge="FPS Táctico"
        badgeColor="bg-red-500/20 text-red-300 border-red-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <pre className="font-mono text-green-400 text-sm leading-tight" style={{ textShadow: '0 0 10px rgba(74, 222, 128, 0.5)' }}>
{`\\\\     //  /\\  ||
 \\\\   //  /__\\ ||
  \\\\ //  /    \\||___`}
          </pre>
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
                  href="#agentes-tier"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Tier List de Agentes
                </a>
              </li>
              <li>
                <a 
                  href="#mapas"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Estrategias por Mapa
                </a>
              </li>
              <li>
                <a 
                  href="#armas"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Armas y Economía
                </a>
              </li>
              <li>
                <a 
                  href="#composiciones"
                  className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-900/30 transition-all"
                >
                  <i className="fas fa-chevron-right text-xs"></i>Composiciones Recomendadas
                </a>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-history text-purple-300"></i>
                Actualizaciones
              </h3>
              <p className="text-sm text-gray-400 mb-2"><span className="text-purple-300">Última actualización:</span> 05/06/2023</p>
              <p className="text-sm text-gray-400">Próxima actualización estimada: 20/06/2023</p>
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
              <h2 className="text-2xl font-bold text-white">Meta Actual</h2>
              <span className="px-3 py-1 text-sm bg-red-900/30 text-red-300 rounded-full">Episodio 6 Acto 3</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-line text-green-400"></i>
                  Tendencias Principales
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><i className="fas fa-check text-green-400 mt-1"></i><span>Dominio de duelistas como Jett y Reyna en meta agresivo</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-check text-green-400 mt-1"></i><span>Controladores como Omen y Brimstone en alza</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-check text-green-400 mt-1"></i><span>Estrategias de rotación rápida ganando popularidad</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-times text-red-400 mt-1"></i><span>Disminución en el uso de Sage en niveles altos</span></li>
                </ul>
              </div>
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-balance-scale text-yellow-400"></i>
                  Cambios Recientes
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2"><i className="fas fa-arrow-up text-green-400 mt-1"></i><span><strong>Jett:</strong> Mejora en tiempo de recuperación de dash</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-arrow-down text-red-400 mt-1"></i><span><strong>Chamber:</strong> Nerfeo en el alcance de su TP</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-arrow-up text-green-400 mt-1"></i><span><strong>Vandal:</strong> Ligero ajuste en spray pattern</span></li>
                  <li className="flex items-start gap-2"><i className="fas fa-exclamation-triangle text-yellow-400 mt-1"></i><span>Nuevo mapa Lotus en rotación competitiva</span></li>
                </ul>
              </div>
            </div>
            <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <i className="fas fa-chart-pie text-purple-300"></i>
                Estadísticas Globales
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">58.3%</div>
                  <div className="text-sm text-gray-400">Win Rate Atacantes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">1.24</div>
                  <div className="text-sm text-gray-400">KDA Promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">42.7%</div>
                  <div className="text-sm text-gray-400">Headshot Percentage</div>
                </div>
              </div>
              {/* Aquí iría el gráfico en una versión interactiva */}
              <div className="h-64 flex items-center justify-center text-purple-300 bg-purple-900/10 rounded-lg">
                <span>Gráfico estadístico próximamente...</span>
              </div>
            </div>

            {/* Sistema de comentarios modularizado */}
            <CommentSection
              sectionId="meta-actual"
              initialComments={initialComments}
              initialVotes={{ up: 42, down: 3 }}
              title="¿Te resultó útil esta sección?"
            />
          </section>

          {/* Tier List de Agentes */}
          <section id="agentes-tier" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Tier List de Agentes</h2>
              <span className="px-3 py-1 text-sm bg-red-900/30 text-red-300 rounded-full">Episodio 6 Acto 3</span>
            </div>
            
            {/* Tier S */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-xl p-6 border border-yellow-500/30 mb-4">
                <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                  <i className="fas fa-crown"></i>
                  Tier S - Meta Dominante
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-[#1e0b36] rounded-lg p-4 border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <img src="/assets/img/games/valorant/agents/jett.jpg" alt="Jett" className="w-12 h-12 rounded-full" />
                      <div>
                        <h4 className="text-white font-semibold">Jett</h4>
                        <span className="text-xs text-blue-300">Duelista</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">Movilidad excepcional, perfecto para entry frags y escapes rápidos. Domina en manos expertas.</p>
                  </div>
                  
                  <div className="bg-[#1e0b36] rounded-lg p-4 border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <img src="/assets/img/games/valorant/agents/reyna.jpg" alt="Reyna" className="w-12 h-12 rounded-full" />
                      <div>
                        <h4 className="text-white font-semibold">Reyna</h4>
                        <span className="text-xs text-blue-300">Duelista</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">Snowball increíble una vez que obtiene la primera kill. Ideal para jugadores agresivos con buena puntería.</p>
                  </div>
                  
                  <div className="bg-[#1e0b36] rounded-lg p-4 border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <img src="/assets/img/games/valorant/agents/omen.jpg" alt="Omen" className="w-12 h-12 rounded-full" />
                      <div>
                        <h4 className="text-white font-semibold">Omen</h4>
                        <span className="text-xs text-green-300">Controlador</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">Versatilidad extrema. Sus smokes, flash y TP lo convierten en el controlador más completo del meta.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tier A */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-xl p-6 border border-green-500/30 mb-4">
                <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                  <i className="fas fa-medal"></i>
                  Tier A - Muy Fuerte
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#1e0b36] rounded-lg p-3 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="/assets/img/games/valorant/agents/viper.jpg" alt="Viper" className="w-10 h-10 rounded-full" />
                      <div>
                        <h4 className="text-white text-sm font-semibold">Viper</h4>
                        <span className="text-xs text-green-300">Controlador</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#1e0b36] rounded-lg p-3 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="/assets/img/games/valorant/agents/sova.jpg" alt="Sova" className="w-10 h-10 rounded-full" />
                      <div>
                        <h4 className="text-white text-sm font-semibold">Sova</h4>
                        <span className="text-xs text-yellow-300">Iniciador</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#1e0b36] rounded-lg p-3 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="/assets/img/games/valorant/agents/raze.jpg" alt="Raze" className="w-10 h-10 rounded-full" />
                      <div>
                        <h4 className="text-white text-sm font-semibold">Raze</h4>
                        <span className="text-xs text-blue-300">Duelista</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#1e0b36] rounded-lg p-3 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="/assets/img/games/valorant/agents/skye.jpg" alt="Skye" className="w-10 h-10 rounded-full" />
                      <div>
                        <h4 className="text-white text-sm font-semibold">Skye</h4>
                        <span className="text-xs text-yellow-300">Iniciador</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tier B */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <i className="fas fa-thumbs-up"></i>
                  Tier B - Situacional
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  <div className="bg-[#1e0b36] rounded-lg p-2 border border-blue-500/20 text-center">
                    <img src="/assets/img/games/valorant/agents/sage.jpg" alt="Sage" className="w-8 h-8 rounded-full mx-auto mb-1" />
                    <div className="text-white text-xs font-medium">Sage</div>
                  </div>
                  <div className="bg-[#1e0b36] rounded-lg p-2 border border-blue-500/20 text-center">
                    <img src="/assets/img/games/valorant/agents/cypher.jpg" alt="Cypher" className="w-8 h-8 rounded-full mx-auto mb-1" />
                    <div className="text-white text-xs font-medium">Cypher</div>
                  </div>
                  <div className="bg-[#1e0b36] rounded-lg p-2 border border-blue-500/20 text-center">
                    <img src="/assets/img/games/valorant/agents/brimstone.jpg" alt="Brimstone" className="w-8 h-8 rounded-full mx-auto mb-1" />
                    <div className="text-white text-xs font-medium">Brimstone</div>
                  </div>
                  <div className="bg-[#1e0b36] rounded-lg p-2 border border-blue-500/20 text-center">
                    <img src="/assets/img/games/valorant/agents/phoenix.jpg" alt="Phoenix" className="w-8 h-8 rounded-full mx-auto mb-1" />
                    <div className="text-white text-xs font-medium">Phoenix</div>
                  </div>
                  <div className="bg-[#1e0b36] rounded-lg p-2 border border-blue-500/20 text-center">
                    <img src="/assets/img/games/valorant/agents/killjoy.jpg" alt="Killjoy" className="w-8 h-8 rounded-full mx-auto mb-1" />
                    <div className="text-white text-xs font-medium">Killjoy</div>
                  </div>
                  <div className="bg-[#1e0b36] rounded-lg p-2 border border-blue-500/20 text-center">
                    <img src="/assets/img/games/valorant/agents/kay-o.jpg" alt="KAY/O" className="w-8 h-8 rounded-full mx-auto mb-1" />
                    <div className="text-white text-xs font-medium">KAY/O</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Notas del meta */}
            <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-lightbulb text-yellow-400"></i>
                Notas del Meta Actual
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <i className="fas fa-arrow-right text-purple-400 mt-1"></i>
                  <span><strong>Duelistas:</strong> El meta favorece los entry frags agresivos. Jett y Reyna dominan por su capacidad de crear espacios.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-arrow-right text-purple-400 mt-1"></i>
                  <span><strong>Controladores:</strong> Omen se ha convertido en pick obligatorio por su versatilidad en mapas como Ascent y Bind.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-arrow-right text-purple-400 mt-1"></i>
                  <span><strong>Sentinelas:</strong> Sage ha perdido relevancia en favor de setups más agresivos, pero sigue siendo viable en equipos defensivos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-arrow-right text-purple-400 mt-1"></i>
                  <span><strong>Iniciadores:</strong> Sova mantiene su posición como el mejor iniciador por su información valiosa.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Estrategias por Mapa */}
          <section id="mapas" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Estrategias por Mapa</h2>
            </div>
            
            {/* Ascent */}
            <div className="mb-8">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/assets/img/games/valorant/ascent.jpg" alt="Ascent" className="w-16 h-16 rounded-lg" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Ascent</h3>
                    <span className="text-sm text-purple-300">Mapa clásico de 3 carriles</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                      <i className="fas fa-sword"></i>
                      Lado Atacante
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Control de Mid:</strong> Usa Sova para obtener información y Omen para dividir el mapa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Rush A:</strong> Efectivo con smokes de Omen y flash de Skye</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-green-400 mt-1"></i>
                        <span><strong>Split B:</strong> Combina presión por tunnels y market</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      <i className="fas fa-shield"></i>
                      Lado Defensivo
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-blue-400 mt-1"></i>
                        <span><strong>Setup Mid:</strong> Mantener un jugador en mid con utilidades para rotaciones rápidas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-blue-400 mt-1"></i>
                        <span><strong>Retakes:</strong> Usar smokes para dividir sitios y facilitar retakes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-check text-blue-400 mt-1"></i>
                        <span><strong>Info gathering:</strong> Cypher en B site para información temprana</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bind */}
            <div className="mb-8">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/assets/img/games/valorant/bind.jpg" alt="Bind" className="w-16 h-16 rounded-lg" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Bind</h3>
                    <span className="text-sm text-purple-300">Mapa de teleports</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-300 mb-3">Atacante</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li><i className="fas fa-check text-green-400"></i> <strong>Rotaciones rápidas:</strong> Aprovechar TPs para rotaciones inesperadas</li>
                      <li><i className="fas fa-check text-green-400"></i> <strong>Control de Hookah:</strong> Fundamental para acceso a ambos sitios</li>
                      <li><i className="fas fa-check text-green-400"></i> <strong>Split pushes:</strong> Combinar presión en multiple ángulos</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Defensivo</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li><i className="fas fa-check text-blue-400"></i> <strong>Stack sites:</strong> Información temprana permite rotaciones rápidas</li>
                      <li><i className="fas fa-check text-blue-400"></i> <strong>Control de TPs:</strong> Mantener presencia en teleports clave</li>
                      <li><i className="fas fa-check text-blue-400"></i> <strong>Utility usage:</strong> Maximizar valor de smokes y flashes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Haven */}
            <div className="mb-8">
              <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/assets/img/games/valorant/haven.jpg" alt="Haven" className="w-16 h-16 rounded-lg" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Haven</h3>
                    <span className="text-sm text-purple-300">Mapa de 3 sitios</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg p-4 border border-purple-500/30">
                  <h4 className="text-lg font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <i className="fas fa-exclamation-triangle"></i>
                    Características Especiales
                  </h4>
                  <p className="text-sm text-gray-300 mb-3">
                    Haven es único por tener 3 sitios (A, B, C), lo que requiere estrategias específicas de rotación y control de map.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-400">
                    <li><strong className="text-red-300">Sitio A:</strong> Garage control + Long angles</li>
                    <li><strong className="text-yellow-300">Sitio B:</strong> Close quarters + Window control</li>
                    <li><strong className="text-blue-300">Sitio C:</strong> Long rotations + Connector control</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Armas y Economía */}
          <section id="armas" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Armas y Economía</h2>
            </div>
            
            {/* Armas principales */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <i className="fas fa-crosshairs text-red-400"></i>
                Armas Meta
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="/assets/img/games/valorant/weapons/vandal.jpg" alt="Vandal" className="w-16 h-10 rounded" />
                    <div>
                      <h4 className="text-lg font-bold text-white">Vandal</h4>
                      <span className="text-sm text-red-300">Rifle de asalto - 2900 créditos</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Daño cabeza:</span><span className="text-red-400 font-bold">160 (One-tap)</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Daño cuerpo:</span><span className="text-yellow-400">40</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Fire rate:</span><span className="text-blue-400">9.75 rounds/sec</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      <strong>Cuándo usar:</strong> Ideal para ángulos largos y duelos de precisión. Perfecto para one-taps a cualquier distancia.
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#1e0b36] rounded-xl p-6 border border-purple-900/50">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="/assets/img/games/valorant/weapons/phantom.jpg" alt="Phantom" className="w-16 h-10 rounded" />
                    <div>
                      <h4 className="text-lg font-bold text-white">Phantom</h4>
                      <span className="text-sm text-blue-300">Rifle de asalto - 2900 créditos</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Daño cabeza (&lt;15m):</span><span className="text-red-400 font-bold">156</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Daño cuerpo:</span><span className="text-yellow-400">39</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Fire rate:</span><span className="text-blue-400">11 rounds/sec</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      <strong>Cuándo usar:</strong> Mejor para combates cercanos y spray control. Sin tracers, ideal para plays sigilosos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Economía */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <i className="fas fa-coins text-yellow-400"></i>
                Guía de Economía
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Ronda pistol */}
                <div className="bg-[#1e0b36] rounded-xl p-6 border border-green-500/30">
                  <h4 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                    <i className="fas fa-play"></i>
                    Ronda Pistol
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-300">
                      <div className="font-medium text-white mb-1">Buy recomendado:</div>
                      <ul className="space-y-1 text-xs">
                        <li>• Ghost (500) + Light Armor (400)</li>
                        <li>• Sheriff (800) + sin armor (risk/reward)</li>
                        <li>• Classic + Full Armor (1000) + utilities</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 rounded-lg p-2">
                      <div className="text-xs text-green-300">Objetivo: Ganar para bonus de 3000</div>
                    </div>
                  </div>
                </div>
                
                {/* Anti-eco */}
                <div className="bg-[#1e0b36] rounded-xl p-6 border border-yellow-500/30">
                  <h4 className="text-lg font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                    <i className="fas fa-arrow-up"></i>
                    Anti-Eco
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-300">
                      <div className="font-medium text-white mb-1">Buy recomendado:</div>
                      <ul className="space-y-1 text-xs">
                        <li>• Spectre (1600) + Full Armor</li>
                        <li>• Judge (1850) en mapas CQC</li>
                        <li>• Marshal (950) para picks largos</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-900/20 rounded-lg p-2">
                      <div className="text-xs text-yellow-300">Cuidado: No subestimar pistols+armor</div>
                    </div>
                  </div>
                </div>
                
                {/* Full buy */}
                <div className="bg-[#1e0b36] rounded-xl p-6 border border-red-500/30">
                  <h4 className="text-lg font-semibold text-red-300 mb-3 flex items-center gap-2">
                    <i className="fas fa-crown"></i>
                    Full Buy
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-300">
                      <div className="font-medium text-white mb-1">Buy recomendado:</div>
                      <ul className="space-y-1 text-xs">
                        <li>• Vandal/Phantom + Full Armor</li>
                        <li>• Operator (4700) para AWPer</li>
                        <li>• Utilities completas por equipo</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/20 rounded-lg p-2">
                      <div className="text-xs text-red-300">Costo total: ~5000-5500 por jugador</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tips de economía */}
            <div className="theme-card p-6 card-tips">
              <h3 className="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
                <i className="fas fa-lightbulb icon-accent icon-glow-subtle"></i>
                Tips Económicos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 p-2 theme-bg-surface rounded-lg">
                    <i className="fas fa-check icon-success mt-1"></i>
                    <span className="theme-text-secondary"><strong className="theme-text-primary">Save rounds:</strong> Si no puedes full buy, considera eco para next round</span>
                  </li>
                  <li className="flex items-start gap-2 p-2 theme-bg-surface rounded-lg">
                    <i className="fas fa-check icon-success mt-1"></i>
                    <span className="theme-text-secondary"><strong className="theme-text-primary">Force buys:</strong> Solo en situaciones críticas (match point, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2 p-2 theme-bg-surface rounded-lg">
                    <i className="fas fa-check icon-success mt-1"></i>
                    <span className="theme-text-secondary"><strong className="theme-text-primary">Team economy:</strong> Coordina buys con tu equipo</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2 p-2 theme-bg-surface rounded-lg">
                    <i className="fas fa-check icon-success mt-1"></i>
                    <span className="theme-text-secondary"><strong className="theme-text-primary">Bonus rounds:</strong> Aprovecha loss bonus para resets</span>
                  </li>
                  <li className="flex items-start gap-2 p-2 theme-bg-surface rounded-lg">
                    <i className="fas fa-check icon-success mt-1"></i>
                    <span className="theme-text-secondary"><strong className="theme-text-primary">Arma management:</strong> Recoge armas enemigas cuando sea posible</span>
                  </li>
                  <li className="flex items-start gap-2 p-2 theme-bg-surface rounded-lg">
                    <i className="fas fa-check icon-success mt-1"></i>
                    <span className="theme-text-secondary"><strong className="theme-text-primary">Utility value:</strong> Una smoke bien colocada vale más que un rifle mal usado</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Composiciones Recomendadas */}
          <section id="composiciones" className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-8 border border-purple-900/60 scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Composiciones Recomendadas</h2>
            </div>
            
            {/* Composición Agresiva */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-xl p-6 border border-red-500/30 mb-6">
                <h3 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
                  <i className="fas fa-fire"></i>
                  Composición Agresiva - "Rush & Entry"
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Lineup</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-[#1e0b36] rounded-lg p-3">
                        <img src="/assets/img/games/valorant/agents/jett.jpg" alt="Jett" className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="text-white font-semibold">Jett</div>
                          <div className="text-xs text-blue-300">Duelista principal</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-[#1e0b36] rounded-lg p-3">
                        <img src="/assets/img/games/valorant/agents/reyna.jpg" alt="Reyna" className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="text-white font-semibold">Reyna</div>
                          <div className="text-xs text-blue-300">Segundo duelista</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-[#1e0b36] rounded-lg p-3">
                        <img src="/assets/img/games/valorant/agents/omen.jpg" alt="Omen" className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="text-white font-semibold">Omen</div>
                          <div className="text-xs text-green-300">Controlador</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-[#1e0b36] rounded-lg p-3">
                        <img src="/assets/img/games/valorant/agents/sova.jpg" alt="Sova" className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="text-white font-semibold">Sova</div>
                          <div className="text-xs text-yellow-300">Iniciador</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-[#1e0b36] rounded-lg p-3">
                        <img src="/assets/img/games/valorant/agents/sage.jpg" alt="Sage" className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="text-white font-semibold">Sage</div>
                          <div className="text-xs text-cyan-300">Sentinela</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Estrategia</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <i className="fas fa-arrow-right text-red-400 mt-1"></i>
                        <span><strong>Fast rushes:</strong> Uso de double duelist para entries rápidos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-arrow-right text-red-400 mt-1"></i>
                        <span><strong>Trade kills:</strong> Jett entra, Reyna tradea y heal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-arrow-right text-red-400 mt-1"></i>
                        <span><strong>Info + Smokes:</strong> Sova proporciona info, Omen facilita entries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <i className="fas fa-arrow-right text-red-400 mt-1"></i>
                        <span><strong>Sustain:</strong> Sage mantiene al equipo vivo para chains</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-red-900/20 rounded-lg">
                      <div className="text-xs text-red-300 font-medium">Ideal para: Equipos agresivos con buena punteria</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Composición Equilibrada */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30 mb-6">
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <i className="fas fa-balance-scale"></i>
                  Composición Equilibrada - "Standard Meta"
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Lineup</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 bg-[#1e0b36] rounded-lg p-2">
                        <img src="/assets/img/games/valorant/agents/jett.jpg" alt="Jett" className="w-8 h-8 rounded-full" />
                        <div className="text-xs">
                          <div className="text-white font-semibold">Jett</div>
                          <div className="text-blue-300">Duelista</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#1e0b36] rounded-lg p-2">
                        <img src="/assets/img/games/valorant/agents/omen.jpg" alt="Omen" className="w-8 h-8 rounded-full" />
                        <div className="text-xs">
                          <div className="text-white font-semibold">Omen</div>
                          <div className="text-green-300">Controlador</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#1e0b36] rounded-lg p-2">
                        <img src="/assets/img/games/valorant/agents/sova.jpg" alt="Sova" className="w-8 h-8 rounded-full" />
                        <div className="text-xs">
                          <div className="text-white font-semibold">Sova</div>
                          <div className="text-yellow-300">Iniciador</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#1e0b36] rounded-lg p-2">
                        <img src="/assets/img/games/valorant/agents/cypher.jpg" alt="Cypher" className="w-8 h-8 rounded-full" />
                        <div className="text-xs">
                          <div className="text-white font-semibold">Cypher</div>
                          <div className="text-cyan-300">Sentinela</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-[#1e0b36] rounded-lg p-2">
                        <img src="/assets/img/games/valorant/agents/skye.jpg" alt="Skye" className="w-8 h-8 rounded-full" />
                        <div className="text-xs">
                          <div className="text-white font-semibold">Skye</div>
                          <div className="text-yellow-300">Iniciador</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Fortalezas</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li><i className="fas fa-check text-blue-400"></i> Versatilidad en todas las situaciones</li>
                      <li><i className="fas fa-check text-blue-400"></i> Buen balance entre agresividad y control</li>
                      <li><i className="fas fa-check text-blue-400"></i> Información abundante (Sova + Cypher)</li>
                      <li><i className="fas fa-check text-blue-400"></i> Capacidad de heal y support (Skye)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Composición Defensiva */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-green-600/20 to-cyan-600/20 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                  <i className="fas fa-shield"></i>
                  Composición Defensiva - "Control & Retake"
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Lineup</h4>
                    <div className="space-y-2">
                      {['Viper', 'Cypher', 'Killjoy', 'Omen', 'Sova'].map((agent, i) => (
                        <div key={i} className="text-xs bg-[#1e0b36] rounded p-2 text-center text-white">
                          {agent}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Estrategia</h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• Setup defensivo sólido</li>
                      <li>• Control de área con utilities</li>
                      <li>• Retakes coordinados</li>
                      <li>• Información constante</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Mejor en</h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• Equipos con aim superior</li>
                      <li>• Mapas con chokes cerrados</li>
                      <li>• Contra equipos agresivos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tips generales */}
            <div className="theme-card p-6 card-tips">
              <h3 className="text-lg font-bold theme-text-primary mb-4 flex items-center gap-2">
                <i className="fas fa-users icon-primary icon-glow-subtle"></i>
                Tips para Composiciones
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="theme-bg-surface p-4 rounded-lg">
                  <h4 className="text-md font-semibold theme-text-primary mb-3 flex items-center gap-2">
                    <i className="fas fa-handshake icon-secondary"></i>
                    Sinergia de roles
                  </h4>
                  <ul className="space-y-2 text-sm theme-text-secondary">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-arrow-right icon-accent text-xs mt-1"></i>
                      <span><strong className="theme-text-primary">Duelista + Iniciador:</strong> Entry frag coordinado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-arrow-right icon-accent text-xs mt-1"></i>
                      <span><strong className="theme-text-primary">Controlador + Duelista:</strong> Smokes para entries seguras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-arrow-right icon-accent text-xs mt-1"></i>
                      <span><strong className="theme-text-primary">Sentinela + Controlador:</strong> Setup defensivo sólido</span>
                    </li>
                  </ul>
                </div>
                <div className="theme-bg-surface p-4 rounded-lg">
                  <h4 className="text-md font-semibold theme-text-primary mb-3 flex items-center gap-2">
                    <i className="fas fa-sync-alt icon-secondary"></i>
                    Adaptación
                  </h4>
                  <ul className="space-y-2 text-sm theme-text-secondary">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-arrow-right icon-accent text-xs mt-1"></i>
                      <span><strong className="theme-text-primary">Map dependent:</strong> Adapta picks según el mapa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-arrow-right icon-accent text-xs mt-1"></i>
                      <span><strong className="theme-text-primary">Enemy comp:</strong> Counter-pick cuando sea posible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-arrow-right icon-accent text-xs mt-1"></i>
                      <span><strong className="theme-text-primary">Team strengths:</strong> Juega a las fortalezas del equipo</span>
                    </li>
                  </ul>
                </div>
              </div>
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