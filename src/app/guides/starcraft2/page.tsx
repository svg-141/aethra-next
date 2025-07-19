import HeroSection from '../../../components/HeroSection';

export default function Starcraft2GuidePage() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen bg-gradient-to-b from-[#0f0720] to-[#1a0933]">
      {/* Hero Section */}
      <HeroSection
        image="/assets/img/banners/dota2-banner.jpg"
        title="Starcraft 2"
        subtitle="Guía estratégica completa para dominar el campo de batalla. Expansión Legacy of the Void."
        badge="RTS"
        badgeColor="bg-blue-500/20 text-blue-300 border-blue-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <img src="/assets/img/games/dota2.png" alt="Starcraft 2" className="w-16 h-16 rounded-lg border-2 border-white/20" />
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
              <li><a href="#meta-actual" className="index-link text-purple-300 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Meta actual y parches</a></li>
              <li><a href="#razas" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Razas y fortalezas</a></li>
              <li><a href="#build-orders" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Build Orders</a></li>
              <li><a href="#unidades" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Unidades clave y counters</a></li>
              <li><a href="#mapas" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Estrategias por mapa</a></li>
              <li><a href="#micro-macro" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Micro y Macro</a></li>
              <li><a href="#recomendaciones" className="index-link text-gray-400 hover:text-white transition-all flex items-center gap-2"><i className="fas fa-chevron-right text-xs"></i>Recomendaciones</a></li>
            </ul>
            <div className="mt-8 pt-6 border-t border-purple-900/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-history text-purple-300"></i>
                Actualizaciones
              </h3>
              <p className="text-sm text-gray-400 mb-2"><span className="text-purple-300">Última actualización:</span> 05/06/2025</p>
              <p className="text-sm text-gray-400">Próxima actualización estimada: Soporte oficial descontinuado</p>
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
          {/* Aquí irían las demás secciones: Razas, Builds, Unidades, Mapas, Micro/Macro, Recomendaciones */}
        </div>
      </div>
    </section>
  );
} 