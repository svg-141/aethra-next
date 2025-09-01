'use client';

import { useState, useEffect, useCallback } from 'react';

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  sectionId: string;
}

export interface UseSimpleTutorialOptions {
  steps: TutorialStep[];
}

export function useSimpleTutorial({ steps }: UseSimpleTutorialOptions) {
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const startTutorial = useCallback(() => {
    if (steps.length === 0) return;
    setIsActive(true);
    setCurrentStepIndex(0);
    
    const element = document.getElementById(steps[0].sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [steps]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      
      const element = document.getElementById(steps[nextIndex].sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStepIndex, steps]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      
      const element = document.getElementById(steps[prevIndex].sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStepIndex, steps]);

  const closeTutorial = useCallback(() => {
    setIsActive(false);
    setCurrentStepIndex(0);
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isActive]);

  return {
    isActive,
    currentStep,
    currentStepIndex,
    totalSteps: steps.length,
    isFirstStep,
    isLastStep,
    startTutorial,
    nextStep,
    prevStep,
    closeTutorial
  };
}