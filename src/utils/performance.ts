/**
 * Performance utilities for Aethra application
 * Optimized functions to improve app performance and user experience
 */

import { useCallback, useEffect, useRef } from 'react';

// Debounce hook for search and input optimization
export function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup the timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
}

// Throttle hook for scroll and resize events
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastCallRef = useRef<number>(0);
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback(...args);
    }
  }, [callback, delay]) as T;
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = {}
) {
  const targetRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      callback(entry.isIntersecting);
    }, options);
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [callback, options]);
  
  return targetRef;
}

// Performance monitoring utilities
export const performanceMonitor = {
  mark: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
    }
  },
  
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name, 'measure')[0];
      console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
    }
  },
  
  clearMarks: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }
};

// Image optimization utilities
export const imageUtils = {
  preloadImage: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  },
  
  preloadImages: async (sources: string[]): Promise<void> => {
    await Promise.all(sources.map(imageUtils.preloadImage));
  }
};

// Theme change optimization
export const themeUtils = {
  batchDOMUpdates: (callback: () => void) => {
    requestAnimationFrame(() => {
      callback();
    });
  },
  
  reduceMotionForUser: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  prefersColorScheme: (): 'dark' | 'light' => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
};

// Memory optimization for component lists
export const listOptimization = {
  chunkArray: <T>(array: T[], chunkSize: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  },
  
  virtualizeList: <T>(items: T[], visibleCount: number, startIndex: number): T[] => {
    return items.slice(startIndex, startIndex + visibleCount);
  }
};

// Web Workers utilities for heavy computations
export const workerUtils = {
  createWorker: (workerFunction: () => void): Worker => {
    const blob = new Blob([`(${workerFunction})()`], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
  },
  
  runInWorker: async <T>(workerFunction: () => void, data: unknown): Promise<T> => {
    return new Promise((resolve, reject) => {
      const worker = workerUtils.createWorker(workerFunction);
      
      worker.postMessage(data);
      
      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
      };
      
      worker.onerror = (error) => {
        reject(error);
        worker.terminate();
      };
    });
  }
};