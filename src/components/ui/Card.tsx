/**
 * Componente Card optimizado para el sistema de temas
 */
import React from 'react';
import { optimizeClasses } from '../../utils/theme-utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gaming' | 'surface' | 'hover';
  animated?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = React.memo(({
  variant = 'default',
  animated = true,
  glow = false,
  children,
  className,
  ...props
}) => {
  // Clases base según la variante
  const variantClasses = {
    default: 'cuadro',
    gaming: 'card-gaming',
    surface: 'bg-theme-surface border-theme',
    hover: 'cuadro-hover'
  };

  // Clases de animación
  const animationClasses = animated ? 'animate-theme-hover' : '';
  const glowClasses = glow ? 'animate-theme-glow' : '';

  // Combinar todas las clases
  const cardClasses = optimizeClasses(
    variantClasses[variant],
    animationClasses,
    glowClasses,
    'rounded transition-all',
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Subcomponentes para estructura de Card
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = React.memo(({ 
  children, 
  className, 
  ...props 
}) => (
  <div 
    className={optimizeClasses('cuadro-header p-4 border-b border-theme', className)} 
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = React.memo(({ 
  children, 
  className, 
  ...props 
}) => (
  <div className={optimizeClasses('p-4', className)} {...props}>
    {children}
  </div>
));

CardBody.displayName = 'CardBody';

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = React.memo(({ 
  children, 
  className, 
  ...props 
}) => (
  <div 
    className={optimizeClasses('p-4 border-t border-theme', className)} 
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';