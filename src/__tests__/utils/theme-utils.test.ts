/**
 * Tests unitarios para theme-utils
 */
import { 
  getThemeClasses, 
  optimizeClasses,
  generateThemeStyles 
} from '../../utils/theme-utils';
import { Theme } from '../../hooks/useTheme';

// Mock theme para testing
const mockTheme: Theme = {
  id: 'test-theme',
  name: 'Test Theme',
  description: 'Theme para testing',
  colors: {
    primary: '#8B5CF6',
    secondary: '#EC4899',
    accent: '#F59E0B',
    background: '#0F0720',
    surface: '#1A0933',
    text: '#FFFFFF',
    textSecondary: '#9CA3AF',
    border: '#374151',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  },
  gradients: {
    primary: 'from-purple-600 to-pink-600',
    secondary: 'from-indigo-600 to-purple-600',
    background: 'from-[#0F0720] to-[#1A0933]'
  },
  preview: '/test-theme.png'
};

describe('Theme Utils', () => {
  describe('getThemeClasses', () => {
    it('should return correct navbar classes', () => {
      const classes = getThemeClasses('navbar', 'brand');
      expect(classes).toBe('text-theme-primary font-extrabold glow-text');
    });

    it('should return correct navbar link classes with active state', () => {
      const activeClasses = getThemeClasses('navbar', undefined, true);
      expect(activeClasses).toContain('text-theme-primary');
      expect(activeClasses).toContain('bg-theme-surface-hover');
    });

    it('should return correct button classes', () => {
      const classes = getThemeClasses('button', 'primary');
      expect(classes).toBe('btn btn-primary animate-theme-hover');
    });

    it('should return default class for unknown component', () => {
      // @ts-expect-error - Testing with an invalid component type
      const classes = getThemeClasses('unknown');
      expect(classes).toBe('text-theme-primary');
    });
  });

  describe('optimizeClasses', () => {
    it('should remove duplicates and filter falsy values', () => {
      const result = optimizeClasses(
        'btn',
        'btn-primary',
        'btn',
        undefined,
        false,
        'animate-hover',
        ''
      );
      expect(result).toBe('btn btn-primary animate-hover');
    });

    it('should handle empty input', () => {
      const result = optimizeClasses();
      expect(result).toBe('');
    });

    it('should handle single class', () => {
      const result = optimizeClasses('single-class');
      expect(result).toBe('single-class');
    });
  });

  describe('generateThemeStyles', () => {
    it('should generate correct theme styles', () => {
      const styles = generateThemeStyles(mockTheme);
      
      expect(styles.background).toEqual({
        background: 'var(--gradient-background, from-[#0F0720] to-[#1A0933])'
      });

      expect(styles.surface).toEqual({
        backgroundColor: 'var(--color-surface, #1A0933)',
        color: 'var(--color-text, #FFFFFF)',
        borderColor: 'var(--color-border, #374151)'
      });

      expect(styles.primary).toEqual({
        color: 'var(--color-primary, #8B5CF6)'
      });
    });
  });
});

// Test helpers
export const createMockTheme = (overrides: Partial<Theme> = {}): Theme => ({
  ...mockTheme,
  ...overrides
});