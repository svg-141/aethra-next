export interface TooltipStep {
  id: string;
  target: string; // Selector CSS del elemento objetivo
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  section: string; // Sección a la que pertenece (navbar, chat, etc.)
}

export interface TooltipPreferences {
  showTooltips: boolean;
  animatedTooltips: boolean;
  spotlightMode: boolean;
}

export interface UseTooltipsReturn {
  tooltipsSeen: Set<string>;
  preferences: TooltipPreferences;
  markTooltipAsSeen: (tooltipId: string) => void;
  isTooltipVisible: (tooltipId: string) => boolean;
  updatePreferences: (preferences: Partial<TooltipPreferences>) => void;
  resetTooltips: () => void;
  shouldShowTooltip: (tooltipId: string) => boolean;
  getTooltipsBySection: (section: string) => TooltipStep[];
}

export interface TooltipGuideProps {
  section: string;
}

export interface TooltipWrapperProps {
  tooltipId: string;
  children: React.ReactNode;
  className?: string;
} 