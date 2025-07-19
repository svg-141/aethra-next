"use client";

import { useState, useEffect, useRef } from 'react';
import { TooltipStep, TooltipGuideProps, TooltipWrapperProps } from '../types/tooltip.types';
import { useTooltips, getTooltipsBySection } from '../hooks/useTooltips';

export default function TooltipGuide({ section }: TooltipGuideProps) {
  const { preferences, shouldShowTooltip, markTooltipAsSeen, getTooltipsBySection } = useTooltips();
  const [currentTooltip, setCurrentTooltip] = useState<TooltipStep | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  // Obtener tooltips de la sección actual
  const sectionTooltips = getTooltipsBySection(section);

  // Encontrar el primer tooltip no visto
  useEffect(() => {
    const unseenTooltip = sectionTooltips.find(tooltip => shouldShowTooltip(tooltip.id));
    if (unseenTooltip) {
      setCurrentTooltip(unseenTooltip);
      setIsVisible(true);
    } else {
      setCurrentTooltip(null);
      setIsVisible(false);
    }
  }, [section, sectionTooltips, shouldShowTooltip]);

  // Posicionar tooltip cuando cambia
  useEffect(() => {
    if (currentTooltip && isVisible) {
      const targetElement = document.querySelector(currentTooltip.target) as HTMLElement;
      if (targetElement) {
        targetRef.current = targetElement;
        positionTooltip(targetElement);
        
        // Agregar clase de spotlight si está habilitado
        if (preferences.spotlightMode) {
          targetElement.classList.add('tooltip-spotlight');
        }
      }
    }
  }, [currentTooltip, isVisible, preferences.spotlightMode]);

  // Posicionar tooltip
  const positionTooltip = (targetElement: HTMLElement) => {
    if (!tooltipRef.current) return;

    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const padding = 10;

    let top = 0;
    let left = 0;

    switch (currentTooltip?.position) {
      case 'top':
        top = targetRect.top - tooltipRect.height - padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = targetRect.bottom + padding;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.left - tooltipRect.width - padding;
        break;
      case 'right':
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.right + padding;
        break;
    }

    // Asegurar que el tooltip esté dentro de la ventana
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = padding;
    if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - padding;
    if (top < 0) top = padding;
    if (top + tooltipRect.height > viewportHeight) top = viewportHeight - tooltipRect.height - padding;

    tooltipRef.current.style.top = `${top}px`;
    tooltipRef.current.style.left = `${left}px`;
  };

  // Manejar clic en "Entendido"
  const handleUnderstood = () => {
    if (currentTooltip) {
      markTooltipAsSeen(currentTooltip.id);
      
      // Remover spotlight
      if (targetRef.current) {
        targetRef.current.classList.remove('tooltip-spotlight');
      }
      
      setIsVisible(false);
      
      // Buscar el siguiente tooltip
      setTimeout(() => {
        const nextTooltip = sectionTooltips.find(tooltip => shouldShowTooltip(tooltip.id));
        if (nextTooltip) {
          setCurrentTooltip(nextTooltip);
          setIsVisible(true);
        }
      }, 300);
    }
  };

  // Manejar clic en "Saltar todos"
  const handleSkipAll = () => {
    sectionTooltips.forEach(tooltip => {
      markTooltipAsSeen(tooltip.id);
    });
    
    if (targetRef.current) {
      targetRef.current.classList.remove('tooltip-spotlight');
    }
    
    setIsVisible(false);
    setCurrentTooltip(null);
  };

  if (!currentTooltip || !isVisible) return null;

  return (
    <>
      {/* Overlay de spotlight */}
      {preferences.spotlightMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-none" />
      )}
      
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`fixed z-50 max-w-xs bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-xl border border-purple-900/60 shadow-2xl ${
          preferences.animatedTooltips ? 'animate-fade-in' : ''
        }`}
        style={{
          position: 'fixed',
          pointerEvents: 'auto',
        }}
      >
        {/* Flecha del tooltip */}
        <div
          className={`absolute w-3 h-3 bg-gradient-to-br from-[#1a0933] to-[#2a0845] border border-purple-900/60 transform rotate-45 ${
            currentTooltip.position === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-0 border-l-0' :
            currentTooltip.position === 'bottom' ? 'top-[-6px] left-1/2 -translate-x-1/2 border-b-0 border-r-0' :
            currentTooltip.position === 'left' ? 'right-[-6px] top-1/2 -translate-y-1/2 border-l-0 border-b-0' :
            'left-[-6px] top-1/2 -translate-y-1/2 border-r-0 border-t-0'
          }`}
        />
        
        {/* Contenido del tooltip */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-semibold text-white">{currentTooltip.title}</h4>
            <button
              onClick={handleSkipAll}
              className="text-xs text-gray-400 hover:text-white transition-colors ml-2"
            >
              Saltar todos
            </button>
          </div>
          <p className="text-xs text-gray-300 mb-3">{currentTooltip.description}</p>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">
              {sectionTooltips.filter(t => !shouldShowTooltip(t.id)).length + 1} de {sectionTooltips.length}
            </div>
            <button
              onClick={handleUnderstood}
              className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-lg font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Componente para envolver elementos que necesitan tooltips
export function TooltipWrapper({ tooltipId, children, className = '' }: TooltipWrapperProps) {
  return (
    <div data-tooltip={tooltipId} className={className}>
      {children}
    </div>
  );
} 