// Tooltips Feature - Exports principales
export { useTooltips } from './hooks/useTooltips';
export { default as TooltipGuide } from './components/TooltipGuide';
export { TooltipWrapper } from './components/TooltipGuide';

// Types
export type { 
  TooltipStep, 
  TooltipPreferences, 
  UseTooltipsReturn,
  TooltipGuideProps,
  TooltipWrapperProps 
} from './types/tooltip.types';

// Constants
export { 
  tooltipSteps, 
  defaultPreferences,
  getTooltipsBySection, 
  getNextUnseenTooltip 
} from './constants/tooltip-steps'; 