import React, { useState, useEffect } from 'react';
import { updateSubscription } from '../../../../../backend/services/subscriptionService';

interface EditSubscriptionModalProps {
  subscription: any;
  onClose: () => void;
  onSubscriptionUpdated: (subscription: any) => void;
}

export default function EditSubscriptionModal({ subscription, onClose, onSubscriptionUpdated }: EditSubscriptionModalProps) {
  const [userId, setUserId] = useState('');
  const [plan, setPlan] = useState('basic');
  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (subscription) {
      setUserId(subscription.userId);
      setPlan(subscription.plan);
      setStatus(subscription.status);
    }
  }, [subscription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subscriptionData = { userId, plan, status };
    await updateSubscription(subscription.id, subscriptionData);
    onSubscriptionUpdated({ id: subscription.id, ...subscriptionData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="theme-bg-surface p-8 rounded-lg">
        <h2 className="text-2xl font-bold theme-text-primary mb-6">Editar Suscripción</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">ID de Usuario</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Plan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
            >
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
            >
              <option value="active">Activa</option>
              <option value="inactive">Inactiva</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="theme-button-secondary mr-2">Cancelar</button>
            <button type="submit" className="theme-button-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}
