import HeroSection from '../../../components/HeroSection';
import CommentSection from '../../../components/CommentSection';

export default function ValorantGuidePage() {
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
        image="/assets/img/banners/valorant-banner2.jpeg"
        title="Valorant"
        subtitle="Guía estratégica completa para dominar el meta actual en Valorant. Episodio 6, Acto 3."
        badge="FPS Táctico"
        badgeColor="bg-red-500/20 text-red-300 border-red-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <img src="/assets/img/games/valorant.png" alt="Valorant" className="w-16 h-16 rounded-lg border-2 border-white/20" />
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
              <li><a href="#meta-actual" className="index-link text-purple-300 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Meta Actual</a></li>
              <li><a href="#agentes-tier" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Tier List de Agentes</a></li>
              <li><a href="#mapas" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Estrategias por Mapa</a></li>
              <li><a href="#armas" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Armas y Economía</a></li>
              <li><a href="#composiciones" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Composiciones Recomendadas</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-history text-purple-300"></i>
                Actualizaciones
              </h3>
              <p className="text-sm text-gray-400 mb-2"><span className="text-purple-300">Última actualización:</span> 05/06/2023</p>
              <p className="text-sm text-gray-400">Próxima actualización estimada: 20/06/2023</p>
            </div>
            <div className="mt-8 pt-6 border-t border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-download text-purple-300"></i>
                Descargar Guía
              </h3>
              <button className="w-full px-4 py-2 bg-purple-600/50 hover:bg-purple-600 text-white rounded-lg transition-all flex items-center justify-center gap-2">
                <i className="fas fa-file-pdf"></i>
                PDF Completo
              </button>
            </div>
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
          {/* Aquí irían las demás secciones: Tier List, Mapas, Armas, Composiciones */}
        </div>
      </div>
    </section>
  );
} 