import { TooltipStep } from '../types/tooltip.types';

// Definición de todos los tooltips disponibles
export const tooltipSteps: TooltipStep[] = [
  // Navbar tooltips
  {
    id: 'navbar-search',
    target: '[data-tooltip="search"]',
    title: 'Búsqueda Global',
    description: 'Busca guías, posts, usuarios y más en toda la plataforma. Usa filtros para refinar resultados.',
    position: 'bottom',
    section: 'navbar',
  },
  {
    id: 'navbar-notifications',
    target: '[data-tooltip="notifications"]',
    title: 'Notificaciones',
    description: 'Mantente al día con comentarios, likes y actualizaciones importantes.',
    position: 'bottom',
    section: 'navbar',
  },
  {
    id: 'navbar-themes',
    target: '[data-tooltip="themes"]',
    title: 'Personalización',
    description: 'Cambia el tema, ajusta la accesibilidad y personaliza tu experiencia.',
    position: 'bottom',
    section: 'navbar',
  },

  // Chat tooltips
  {
    id: 'chat-game-selector',
    target: '[data-tooltip="game-selector"]',
    title: 'Selector de Juego',
    description: 'Elige el juego sobre el que quieres consultar. Aethra se adaptará a cada uno.',
    position: 'right',
    section: 'chat',
  },
  {
    id: 'chat-examples',
    target: '[data-tooltip="examples"]',
    title: 'Ejemplos de Consultas',
    description: 'Haz clic en cualquier ejemplo para usarlo como punto de partida.',
    position: 'right',
    section: 'chat',
  },
  {
    id: 'chat-input',
    target: '[data-tooltip="chat-input"]',
    title: 'Consulta a Aethra',
    description: 'Escribe tu pregunta sobre estrategias, meta, builds o cualquier duda del juego.',
    position: 'top',
    section: 'chat',
  },

  // Comunidad tooltips
  {
    id: 'community-post-form',
    target: '[data-tooltip="post-form"]',
    title: 'Crear Post',
    description: 'Comparte tus experiencias, preguntas o estrategias con la comunidad.',
    position: 'bottom',
    section: 'community',
  },
  {
    id: 'community-filters',
    target: '[data-tooltip="community-filters"]',
    title: 'Filtros de Posts',
    description: 'Filtra posts por popularidad, fecha o estado de respuesta.',
    position: 'bottom',
    section: 'community',
  },

  // Guías tooltips
  {
    id: 'guides-filter',
    target: '[data-tooltip="guides-filter"]',
    title: 'Filtro de Guías',
    description: 'Filtra guías por tipo de juego: FPS, MOBA, Battle Royale, etc.',
    position: 'bottom',
    section: 'guides',
  },
  {
    id: 'guides-card',
    target: '[data-tooltip="guide-card"]',
    title: 'Guía Estratégica',
    description: 'Cada guía contiene análisis profundo, estadísticas y estrategias actualizadas.',
    position: 'top',
    section: 'guides',
  },

  // Perfil tooltips
  {
    id: 'profile-stats',
    target: '[data-tooltip="profile-stats"]',
    title: 'Estadísticas',
    description: 'Revisa tu rendimiento, logros y progreso en tus juegos favoritos.',
    position: 'left',
    section: 'profile',
  },
  {
    id: 'profile-achievements',
    target: '[data-tooltip="achievements"]',
    title: 'Logros',
    description: 'Desbloquea logros completando objetivos y mejorando tus habilidades.',
    position: 'left',
    section: 'profile',
  },
];

// Preferencias por defecto
export const defaultPreferences = {
  showTooltips: true,
  animatedTooltips: true,
  spotlightMode: true,
};

// Funciones helper para obtener tooltips por sección
export const getTooltipsBySection = (section: string): TooltipStep[] => {
  return tooltipSteps.filter(tooltip => tooltip.section === section);
};

// Función para obtener el siguiente tooltip no visto
export const getNextUnseenTooltip = (section: string, tooltipsSeen: Set<string>): TooltipStep | null => {
  const sectionTooltips = getTooltipsBySection(section);
  return sectionTooltips.find(tooltip => !tooltipsSeen.has(tooltip.id)) || null;
}; 