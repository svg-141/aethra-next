"use client";

import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../../features/subscription/constants/plans';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      // Aquí se integrará la autenticación real con Google OAuth
      // Por ahora, simularemos el proceso

      console.log('Iniciando sesión con Google...');


      setTimeout(() => {
        alert(`Autenticación con Google simulada\nPlan seleccionado: ${selectedPlan}\nModo: ${mode}`);
        setIsLoading(false);
        onClose();
      }, 1500);

    } catch (err) {
      console.error('Error en autenticación:', err);
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {

      console.log('Autenticación por email:', { email, password, name, selectedPlan, mode });

      setTimeout(() => {
        alert(`Autenticación por email simulada\nEmail: ${email}\nPlan: ${selectedPlan}`);
        setIsLoading(false);
        onClose();
      }, 1500);

    } catch (err) {
      console.error('Error en autenticación:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="modal-content w-full max-w-4xl max-h-[90vh] overflow-y-auto theme-card p-6 rounded-2xl shadow-theme-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-theme-primary glow-text">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <button
            onClick={onClose}
            className="text-theme-secondary hover:text-theme-primary transition-all text-2xl"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {!showPlans ? (
          /* Auth Form */
          <div className="space-y-6">
            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'Conectando...' : `Continuar con Google`}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t theme-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-r from-transparent via-[var(--color-surface)] to-transparent text-theme-secondary">
                  O continuar con email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full theme-input px-4 py-3 rounded-lg"
                    placeholder="Tu nombre"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full theme-input px-4 py-3 rounded-lg"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-primary mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength={8}
                  className="w-full theme-input px-4 py-3 rounded-lg"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              {mode === 'register' && (
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    required
                    id="terms"
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-theme-secondary">
                    Acepto los{' '}
                    <a href="/terms" className="text-theme-primary hover:underline">
                      términos y condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="/privacy" className="text-theme-primary hover:underline">
                      política de privacidad
                    </a>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full theme-button px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'var(--gradient-primary)' }}
              >
                {isLoading ? 'Procesando...' : mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center text-sm text-theme-secondary">
              {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
              <button
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-theme-primary hover:underline font-semibold"
              >
                {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </div>

            {/* Show Plans Button */}
            {mode === 'register' && (
              <div className="pt-4 border-t theme-border">
                <button
                  onClick={() => setShowPlans(true)}
                  className="w-full px-4 py-2 text-theme-primary border theme-border rounded-lg hover:bg-[var(--color-surface-hover)] transition-all"
                >
                  Ver planes de suscripción →
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Plans Selection */
          <div className="space-y-6">
            <button
              onClick={() => setShowPlans(false)}
              className="flex items-center gap-2 text-theme-secondary hover:text-theme-primary transition-all"
            >
              ← Volver al registro
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative theme-card p-6 rounded-xl cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'ring-2 ring-[var(--color-primary)] shadow-theme-glow'
                      : 'hover:shadow-theme-md'
                  } ${plan.popular ? 'md:scale-105' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full"
                         style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                      MÁS POPULAR
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{plan.icon}</div>
                    <h3 className="text-xl font-bold text-theme-primary">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold" style={{ color: plan.color }}>
                        ${plan.price}
                      </span>
                      <span className="text-theme-secondary">/{plan.interval === 'month' ? 'mes' : 'año'}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {plan.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-theme-secondary">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedPlan === plan.id
                        ? 'text-white'
                        : 'border theme-border hover:bg-[var(--color-surface-hover)]'
                    }`}
                    style={selectedPlan === plan.id ? { background: plan.color } : {}}
                  >
                    {selectedPlan === plan.id ? 'Seleccionado' : 'Seleccionar'}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPlans(false)}
                className="px-6 py-3 border theme-border rounded-lg hover:bg-[var(--color-surface-hover)] transition-all"
              >
                Continuar sin plan premium
              </button>
              <button
                onClick={() => setShowPlans(false)}
                className="px-6 py-3 rounded-lg font-semibold"
                style={{ background: 'var(--gradient-primary)', color: 'white' }}
              >
                Confirmar y Continuar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
