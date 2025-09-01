/**
 * Componente Button optimizado para el sistema de temas
 */
import React from 'react';
import { getThemeClasses, optimizeClasses } from '../../utils/theme-utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gaming' | 'outline' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  animated?: boolean;
  glow?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = React.memo(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  animated = true,
  glow = false,
  icon,
  children,
  className,
  disabled,
  ...props
}) => {
  // Clases base según la variante usando el sistema de temas
  const variantClasses = {
    primary: 'theme-button btn-gradient',
    secondary: 'theme-button btn-gradient-secondary', 
    gaming: 'theme-button btn-gradient',
    outline: 'theme-button btn-gradient-outline',
    neon: 'theme-button btn-gradient icon-glow'
  };

  // Clases de tamaño usando variables de tema
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  // Clases de animación y efectos
  const animationClasses = animated ? 'hover:scale-105 active:scale-95' : '';
  const glowClasses = glow ? 'icon-glow' : '';
  const loadingClasses = isLoading ? 'opacity-75 cursor-wait' : '';

  // Combinar todas las clases
  const buttonClasses = optimizeClasses(
    variantClasses[variant],
    sizeClasses[size],
    animationClasses,
    glowClasses,
    loadingClasses,
    'transition-all duration-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <i className="fas fa-spinner icon-animate-spin mr-2"></i>
          Cargando...
        </>
      ) : (
        <>
          {icon && <span className="mr-2 icon-theme">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';