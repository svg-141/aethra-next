'use client';

import React from 'react';

interface SimpleTutorialProps {
  isActive: boolean;
  currentStep: {
    id: string;
    title: string;
    description: string;
    sectionId: string;
  } | undefined;
  currentStepIndex: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}

export default function SimpleTutorial({
  isActive,
  currentStep,
  currentStepIndex,
  totalSteps,
  isFirstStep,
  isLastStep,
  onNext,
  onPrevious,
  onClose
}: SimpleTutorialProps) {

  if (!isActive || !currentStep) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={(e) => e.preventDefault()}>
        
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60 shadow-2xl max-w-md w-full mx-4 z-60">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-purple-300 font-medium">
                Paso {currentStepIndex + 1} de {totalSteps}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-3">
              {currentStep.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          <div className="bg-purple-900/30 rounded-lg p-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-purple-300">
              <i className="fas fa-crosshairs"></i>
              <span>Sección: #{currentStep.sectionId}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {!isFirstStep && (
                <button
                  onClick={onPrevious}
                  className="px-4 py-2 bg-gray-600/50 hover:bg-gray-600 text-white rounded-lg transition-all text-sm flex items-center gap-2"
                >
                  <i className="fas fa-chevron-left text-xs"></i>
                  Anterior
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-600/50 hover:bg-red-600 text-white rounded-lg transition-all text-sm"
              >
                Cerrar
              </button>

              {isLastStep ? (
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all text-sm font-medium flex items-center gap-2"
                >
                  <i className="fas fa-check"></i>
                  Finalizar
                </button>
              ) : (
                <button
                  onClick={onNext}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all text-sm font-medium flex items-center gap-2"
                >
                  Siguiente
                  <i className="fas fa-chevron-right text-xs"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}