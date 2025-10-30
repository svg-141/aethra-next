'use client';

import React from 'react';
import { GAME_ASCII_LOGOS } from '@/features/games/constants/games-constants';

export type GameLogoSize = 'icon' | 'small' | 'medium' | 'large';
export type GameKey = 'valorant' | 'starcraft2';

interface GameLogoProps {
  game: GameKey;
  size?: GameLogoSize;
  className?: string;
  gradient?: string;
  accentColor?: string;
}

const colorClasses = {
  green: 'text-green-400',
  blue: 'text-blue-400',
  orange: 'text-orange-400',
  purple: 'text-purple-400',
};

export const GameLogo: React.FC<GameLogoProps> = ({
  game,
  size = 'medium',
  className = '',
  gradient,
  accentColor = 'green'
}) => {
  const logo = GAME_ASCII_LOGOS[game];
  if (!logo) return null;

  const logoText = logo[size] || logo.medium;
  const colorClass = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.green;

  const sizeClasses = {
    icon: 'text-lg leading-none',
    small: 'text-sm leading-tight',
    medium: 'text-base leading-tight',
    large: 'text-lg leading-tight'
  };

  return (
    <div
      className={`font-mono whitespace-pre ${sizeClasses[size]} ${colorClass} ${className}`}
      style={{
        fontFamily: 'monospace',
        letterSpacing: '-0.05em',
        textShadow: gradient ? `0 0 10px currentColor` : 'none'
      }}
    >
      {logoText}
    </div>
  );
};

// Componente para logos inline (una sola línea)
export const GameLogoInline: React.FC<GameLogoProps> = ({
  game,
  className = '',
  accentColor = 'green'
}) => {
  const logo = GAME_ASCII_LOGOS[game];
  if (!logo) return null;

  const colorClass = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.green;

  return (
    <span className={`font-mono ${colorClass} ${className}`}>
      {logo.small}
    </span>
  );
};

// Componente para badges con gradiente
export const GameLogoBadge: React.FC<GameLogoProps & { label?: string }> = ({
  game,
  gradient,
  className = '',
  label
}) => {
  const logo = GAME_ASCII_LOGOS[game];
  if (!logo) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${gradient} border border-white/10 ${className}`}
    >
      <span className="font-mono text-white leading-none">
        {logo.icon}
      </span>
      {label && (
        <span className="text-sm font-semibold text-white">
          {label}
        </span>
      )}
    </div>
  );
};

export default GameLogo;
