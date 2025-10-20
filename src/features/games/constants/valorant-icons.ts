// Iconos ASCII para agentes de Valorant (usando caracteres básicos)
export const VALORANT_AGENT_ICONS = {
  // Duelistas
  jett: { icon: '-^-', ascii: `  ^
 /|\\
  |`, color: 'text-blue-400', role: 'Duelista' },
  reyna: { icon: '(@)', ascii: ` ___
(@ @)
 \\_/`, color: 'text-purple-400', role: 'Duelista' },
  raze: { icon: '*!*', ascii: ` \\|/
--*--
 /|\\`, color: 'text-orange-400', role: 'Duelista' },
  phoenix: { icon: '/\\', ascii: `  /\\
 /  \\
/_/\\_\\`, color: 'text-orange-400', role: 'Duelista' },

  // Controladores
  omen: { icon: '~~~', ascii: ` ~~~
 ~~~
~~~~~`, color: 'text-purple-400', role: 'Controlador' },
  viper: { icon: '~S~', ascii: `  ~
 /S\\
~   ~`, color: 'text-green-400', role: 'Controlador' },
  brimstone: { icon: '[]', ascii: `[===]
|   |
[___]`, color: 'text-orange-400', role: 'Controlador' },

  // Iniciadores
  sova: { icon: '->>', ascii: `  o
 ->>
/`, color: 'text-blue-400', role: 'Iniciador' },
  skye: { icon: '{*}', ascii: ` {*}
/   \\
  |`, color: 'text-green-400', role: 'Iniciador' },

  // Centinelas
  sage: { icon: '<*>', ascii: ` <*>
/   \\
 | |`, color: 'text-cyan-400', role: 'Centinela' },
  cypher: { icon: '[o]', ascii: `[===]
| o |
[___]`, color: 'text-yellow-400', role: 'Centinela' },
  killjoy: { icon: '[#]', ascii: `[###]
| # |
[___]`, color: 'text-yellow-400', role: 'Centinela' },

  // Otros
  'kay-o': { icon: '|+|', ascii: ` |+|
/   \\
 | |`, color: 'text-blue-400', role: 'Iniciador' },
};

// Iconos ASCII para mapas de Valorant
export const VALORANT_MAP_ICONS = {
  ascent: {
    icon: '[A]',
    ascii: ` ___
[_A_]
|   |`,
    color: 'text-amber-400'
  },
  bind: {
    icon: '[B]',
    ascii: ` ___
[_B_]
 \\ /`,
    color: 'text-orange-400'
  },
  haven: {
    icon: '[H]',
    ascii: ` /\\
[_H_]
|   |`,
    color: 'text-blue-400'
  },
  icebox: {
    icon: '[I]',
    ascii: ` ___
[*I*]
[___]`,
    color: 'text-cyan-400'
  },
  split: {
    icon: '[S]',
    ascii: ` ___
[/S\\]
 | |`,
    color: 'text-green-400'
  },
  breeze: {
    icon: '[~]',
    ascii: `~~~~
[_~_]
~~~~`,
    color: 'text-teal-400'
  },
  fracture: {
    icon: '[F]',
    ascii: `\\_F_/
 | |
/   \\`,
    color: 'text-red-400'
  },
  pearl: {
    icon: '[P]',
    ascii: ` (P)
/   \\
 \\_/`,
    color: 'text-pink-400'
  },
  lotus: {
    icon: '[L]',
    ascii: ` {L}
/   \\
 \\_/`,
    color: 'text-purple-400'
  }
};

// Iconos ASCII para armas de Valorant
export const VALORANT_WEAPON_ICONS = {
  vandal: {
    ascii: `--[========>`,
    icon: '--[>',
    name: 'Vandal',
    type: 'Rifle',
    color: 'text-red-400'
  },
  phantom: {
    ascii: `--[========>>`,
    icon: '--[>>',
    name: 'Phantom',
    type: 'Rifle',
    color: 'text-purple-400'
  },
  operator: {
    ascii: `--+==========>`,
    icon: '--+=>',
    name: 'Operator',
    type: 'Sniper',
    color: 'text-yellow-400'
  },
  sheriff: {
    ascii: `--[=>`,
    icon: '[=>',
    name: 'Sheriff',
    type: 'Pistola',
    color: 'text-gray-400'
  },
  ghost: {
    ascii: `--[=>>`,
    icon: '[=>>',
    name: 'Ghost',
    type: 'Pistola',
    color: 'text-blue-400'
  },
  spectre: {
    ascii: `--[====>`,
    icon: '[===>',
    name: 'Spectre',
    type: 'SMG',
    color: 'text-green-400'
  }
};

// Iconos ASCII para roles
export const VALORANT_ROLE_ICONS = {
  duelista: { icon: '><', ascii: ` ><
/  \\
 ||`, color: 'text-red-400' },
  controlador: { icon: '[]', ascii: `[==]
|  |
[==]`, color: 'text-purple-400' },
  iniciador: { icon: '(+)', ascii: ` (+)
/   \\
  |`, color: 'text-yellow-400' },
  centinela: { icon: '[#]', ascii: `[###]
|   |
[___]`, color: 'text-blue-400' }
};

// Iconos ASCII para tier/rank
export const VALORANT_TIER_ICONS = {
  S: { icon: '[S]', ascii: ` ___
[_S_]
 |||`, color: 'text-yellow-400' },
  A: { icon: '[A]', ascii: ` ___
[_A_]
 ||`, color: 'text-orange-400' },
  B: { icon: '[B]', ascii: ` ___
[_B_]
 |`, color: 'text-blue-400' },
  C: { icon: '[C]', ascii: ` ___
[_C_]`, color: 'text-gray-400' }
};
