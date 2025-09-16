import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

export default function PremiumPrompt() {
  const auth = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('premium_monthly');

  const plans = authService.getAvailablePlans().filter(p => p.id !== 'free');

  const handleUpgrade = async (planId: string) => {
    setIsUpgrading(true);
    try {
      await auth.upgradeToPremium(planId);
    } catch (error) {
      console.error('Error upgrading to premium:', error);
      alert('Error al actualizar a premium. Por favor, intenta de nuevo.');
    } finally {
      setIsUpgrading(false);
    }
  };

  const formatPrice = (price: number, currency: string, interval: string) => {
    return `$${price.toFixed(2)} ${currency}/${interval === 'monthly' ? 'mes' : 'año'}`;
  };

  return (
    <div className="theme-card p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
          <i className="fas fa-crown text-2xl text-white"></i>
        </div>

        <h2 className="text-3xl font-bold theme-text-primary mb-4">
          Acceso Premium Requerido
        </h2>

        <p className="theme-text-secondary mb-2">
          Esta función está disponible solo para usuarios Premium.
        </p>

        {auth.user && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: 'var(--color-info)', opacity: '0.2', color: 'var(--color-info)' }}>
            <i className="fas fa-user"></i>
            {auth.user.username} - Plan {auth.user.plan === 'free' ? 'Gratuito' : 'Premium'}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
              selectedPlan === plan.id
                ? 'border-primary'
                : 'border-gray-600 hover:border-gray-500'
            }`}
            style={{
              borderColor: selectedPlan === plan.id ? 'var(--color-primary)' : 'var(--color-border)',
              backgroundColor: selectedPlan === plan.id ? 'var(--color-primary)' : 'var(--color-surface)',
              opacity: selectedPlan === plan.id ? '0.1' : '1'
            }}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <div className="text-center">
              <h3 className="text-xl font-bold theme-text-primary mb-2">
                {plan.name}
              </h3>

              <div className="mb-4">
                <span className="text-3xl font-bold theme-text-primary">
                  {formatPrice(plan.price, plan.currency, plan.interval)}
                </span>
                {plan.interval === 'yearly' && (
                  <div className="text-sm theme-text-secondary">
                    (Ahorra $20 al año)
                  </div>
                )}
              </div>

              {selectedPlan === plan.id && (
                <div className="w-6 h-6 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
              )}
            </div>

            <ul className="space-y-2 text-sm">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 theme-text-secondary">
                  <i className="fas fa-check text-green-400 text-xs mt-1 flex-shrink-0"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => handleUpgrade(selectedPlan)}
          disabled={isUpgrading}
          className="px-8 py-3 rounded-lg font-medium text-lg transition-colors animate-theme-hover animate-theme-glow disabled:opacity-50"
          style={{ background: 'var(--gradient-primary)', color: 'var(--color-text)' }}
        >
          {isUpgrading ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i>
              Procesando...
            </>
          ) : (
            <>
              <i className="fas fa-crown mr-2"></i>
              Actualizar a Premium
            </>
          )}
        </button>

        <p className="text-xs theme-text-secondary mt-3">
          Facturación segura • Cancela en cualquier momento
        </p>
      </div>

      <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <h4 className="text-lg font-bold theme-text-primary mb-4 text-center">
          ¿Por qué elegir Premium?
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--color-success)', opacity: '0.2' }}>
              <i className="fas fa-infinity text-lg" style={{ color: 'var(--color-success)' }}></i>
            </div>
            <h5 className="font-semibold theme-text-primary mb-2">Acceso Ilimitado</h5>
            <p className="text-sm theme-text-secondary">Chatbot sin límites y todas las guías estratégicas</p>
          </div>

          <div className="p-4">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--color-info)', opacity: '0.2' }}>
              <i className="fas fa-users text-lg" style={{ color: 'var(--color-info)' }}></i>
            </div>
            <h5 className="font-semibold theme-text-primary mb-2">Comunidad</h5>
            <p className="text-sm theme-text-secondary">Acceso a foros y interacción con otros jugadores</p>
          </div>

          <div className="p-4">
            <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--color-warning)', opacity: '0.2' }}>
              <i className="fas fa-star text-lg" style={{ color: 'var(--color-warning)' }}></i>
            </div>
            <h5 className="font-semibold theme-text-primary mb-2">Contenido Exclusivo</h5>
            <p className="text-sm theme-text-secondary">Guías premium y análisis profesional</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => window.history.back()}
          className="text-sm theme-text-secondary hover:theme-text-primary transition-colors"
        >
          ← Volver atrás
        </button>
      </div>
    </div>
  );
}