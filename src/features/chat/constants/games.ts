import { Game } from '../types/chat.types';

// Logos ASCII para el chat (versiones compactas de los oficiales)
const CHAT_ASCII_LOGOS = {
  valorant: {
    display: `\\\\     //  /\\  ||
 \\\\   //  /__\\ ||
  \\\\ //  /    \\||___`,
    compact: `\\/AL`,
    icon: `\\/`
  },
  starcraft2: {
    display: ` ___  _____  //
/ __)/     //||
\\__ \\\\    // ||
(___/ \\__//  ||`,
    compact: `SC II`,
    icon: `SC`
  }
};

// Iconos ASCII para el chat (compatibilidad)
const CHAT_ASCII_ICONS = {
  valorant: CHAT_ASCII_LOGOS.valorant.display,
  starcraft2: CHAT_ASCII_LOGOS.starcraft2.display,
};

export const GAMES: Game[] = [
  {
    key: 'valorant',
    name: 'Valorant',
    category: 'fps',
    gradient: 'from-green-900/40 via-emerald-800/30 to-green-900/40',
    accentColor: 'green',
    emoji: '▼',
    asciiIcon: CHAT_ASCII_ICONS.valorant,
    description: 'FPS táctico 5v5 con agentes únicos',
    examples: [
      '¿Cuál es el meta actual en el parche 5.12?',
      'Mejores composiciones para ranked',
      'Counters para el agente Reyna',
      'Estrategias para el mapa Ascent',
    ],
    tip: 'En Valorant, usar las habilidades de Viper para dividir el sitio en Icebox puede dar ventaja táctica a tu equipo.'
  },
  {
    key: 'starcraft2',
    name: 'Starcraft 2',
    category: 'rts',
    gradient: 'from-blue-900/40 via-cyan-800/30 to-blue-900/40',
    accentColor: 'blue',
    emoji: '◢◤',
    asciiIcon: CHAT_ASCII_ICONS.starcraft2,
    description: 'RTS con tres razas únicas',
    examples: [
      'Mejores builds para Terran',
      '¿Cómo defender un rush Zerg?',
      'Consejos para mejorar el micro y macro',
      'Timings clave para cada raza',
    ],
    tip: 'En Starcraft 2, practicar los timings de expansión y producción es esencial para escalar en ladder.'
  }
];

export const getGameByKey = (key: string): Game | undefined => {
  return GAMES.find(game => game.key === key);
};

export const getGamesByCategory = (category: string): Game[] => {
  return GAMES.filter(game => game.category === category);
};

export const getDefaultGame = (): Game => {
  return GAMES[0]; // Valorant por defecto
}; 