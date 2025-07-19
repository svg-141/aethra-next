import { Game } from '../types/chat.types';

export const GAMES: Game[] = [
  {
    key: 'valorant',
    name: 'Valorant',
    icon: '/assets/img/games/valorant.png',
    category: 'fps',
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
    key: 'lol',
    name: 'League of Legends',
    icon: '/assets/img/games/lol.png',
    category: 'moba',
    description: 'MOBA 5v5 con más de 150 campeones',
    examples: [
      '¿Qué campeones están fuertes en el parche actual?',
      '¿Cómo jugar contra Yasuo en mid?',
      'Mejores builds para ADC',
      'Consejos para subir de elo en soloQ',
    ],
    tip: 'En LoL, controlar la visión y los objetivos neutrales es clave para ganar partidas cerradas.'
  },
  {
    key: 'dota2',
    name: 'Dota 2',
    icon: '/assets/img/games/dota2.png',
    category: 'moba',
    description: 'MOBA complejo con más de 120 héroes',
    examples: [
      '¿Qué héroes están en el meta?',
      'Mejores builds para Invoker',
      'Consejos para ganar la fase de líneas',
      '¿Cómo jugar teamfights efectivas?',
    ],
    tip: 'En Dota 2, la coordinación en teamfights y el control de runas pueden cambiar el rumbo de la partida.'
  },
  {
    key: 'cs2',
    name: 'Counter-Strike 2',
    icon: '/assets/img/games/cs2.png',
    category: 'fps',
    description: 'FPS táctico de terroristas vs contra-terroristas',
    examples: [
      'Mejores posiciones para AWP en Dust2',
      'Estrategias de eco round',
      'Consejos para mejorar el aim',
      'Comunicación efectiva en equipo',
    ],
    tip: 'En CS2, la economía del equipo y la coordinación en las rotaciones son fundamentales.'
  },
  {
    key: 'starcraft2',
    name: 'Starcraft 2',
    icon: '/assets/img/games/starcraft2.png',
    category: 'rts',
    description: 'RTS con tres razas únicas',
    examples: [
      'Mejores builds para Terran',
      '¿Cómo defender un rush Zerg?',
      'Consejos para mejorar el micro y macro',
      'Timings clave para cada raza',
    ],
    tip: 'En Starcraft 2, practicar los timings de expansión y producción es esencial para escalar en ladder.'
  },
  {
    key: 'overwatch2',
    name: 'Overwatch 2',
    icon: '/assets/img/games/overwatch2.png',
    category: 'fps',
    description: 'FPS hero shooter 5v5',
    examples: [
      'Mejores composiciones para ranked',
      '¿Cómo jugar con Mercy?',
      'Counters para Genji',
      'Estrategias para cada mapa',
    ],
    tip: 'En Overwatch 2, la sinergia entre héroes y la adaptación al meta son clave para el éxito.'
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