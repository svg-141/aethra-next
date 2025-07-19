import React from 'react';
import { SubscriptionCardProps } from '../types/profile.types';

export default function SubscriptionCard({ subscription, onManage, onUpgrade, onCancel }: SubscriptionCardProps) {
  const handleManage = () => {
    onManage(subscription.id);
  };

  const handleUpgrade = () => {
    onUpgrade?.(subscription.id);
  };

  const handleCancel = () => {
    onCancel?.(subscription.id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'expired': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'trial': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activa';
      case 'cancelled': return 'Cancelada';
      case 'expired': return 'Expirada';
      case 'pending': return 'Pendiente';
      case 'trial': return 'Prueba';
      default: return 'Desconocido';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'from-gray-600 to-gray-700';
      case 'basic': return 'from-blue-600 to-blue-700';
      case 'pro': return 'from-purple-600 to-purple-700';
      case 'premium': return 'from-pink-600 to-pink-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getPlanColor(subscription.plan)} rounded-2xl p-6 border border-pink-500/40 hover:shadow-[0_0_20px_#ec489940] transition-all mb-6`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 capitalize">{subscription.plan}</h3>
          <p className="text-sm text-gray-300">Desbloquea todo el potencial</p>
        </div>
        <span className={`px-2 py-1 text-xs font-bold rounded-full border ${getStatusColor(subscription.status)}`}>
          {getStatusLabel(subscription.status)}
        </span>
      </div>

      {/* Subscription details */}
      <div className="mb-4 text-xs text-gray-300">
        <div className="flex items-center justify-between mb-2">
          <span>Inicio:</span>
          <span>{formatDate(subscription.startDate)}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span>Próxima facturación:</span>
          <span>{formatDate(subscription.endDate)}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span>Renovación automática:</span>
          <span className={subscription.autoRenew ? 'text-green-400' : 'text-red-400'}>
            {subscription.autoRenew ? 'Sí' : 'No'}
          </span>
        </div>
        {subscription.paymentMethod && (
          <div className="flex items-center justify-between">
            <span>Método de pago:</span>
            <span>{subscription.paymentMethod}</span>
          </div>
        )}
      </div>

      <ul className="space-y-2 mb-6">
        {subscription.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-2xl font-bold text-white">
            {subscription.price.toFixed(2)} {subscription.currency}
          </span>
          <span className="text-sm text-gray-400">
            /{subscription.billingCycle === 'monthly' ? 'mes' : 'año'}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          className="flex-1 px-4 py-2 bg-white/90 text-purple-900 rounded-lg font-semibold hover:bg-white transition-all flex items-center justify-center gap-2"
          onClick={handleManage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Administrar
        </button>

        {onUpgrade && subscription.plan !== 'premium' && (
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-500 transition-all"
            onClick={handleUpgrade}
          >
            <i className="fas fa-arrow-up mr-2"></i>
            Mejorar
          </button>
        )}

        {onCancel && subscription.status === 'active' && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition-all"
            onClick={handleCancel}
          >
            <i className="fas fa-times mr-2"></i>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
} 