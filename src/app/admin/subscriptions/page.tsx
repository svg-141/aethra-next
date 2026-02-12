"use client";

import React, { useState, useEffect } from 'react';
import { getSubscriptions, deleteSubscription } from '../../../backend/services/subscriptionService';
import CreateSubscriptionModal from './components/CreateSubscriptionModal';
import EditSubscriptionModal from './components/EditSubscriptionModal';

interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: string;
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const subscriptionsData = await getSubscriptions();
      setSubscriptions(subscriptionsData as Subscription[]);
    };
    fetchSubscriptions();
  }, []);

  const handleDeleteSubscription = async (subscriptionId: string) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      await deleteSubscription(subscriptionId);
      setSubscriptions(subscriptions.filter(subscription => subscription.id !== subscriptionId));
    }
  };

  const handleSubscriptionCreated = (subscription: Subscription) => {
    setSubscriptions([...subscriptions, subscription]);
  };

  const handleSubscriptionUpdated = (subscription: Subscription) => {
    setSubscriptions(subscriptions.map(s => (s.id === subscription.id ? subscription : s)));
  };

  const handleEditClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsEditModalOpen(true);
  };

  return (
    <div className="theme-section p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold theme-text-primary">Gestión de Suscripciones</h1>
        <button onClick={() => setIsCreateModalOpen(true)} className="theme-button-primary">Crear Suscripción</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full theme-bg-surface">
          <thead>
            <tr className="theme-border-b">
              <th className="py-3 px-4 text-left theme-text-secondary">ID</th>
              <th className="py-3 px-4 text-left theme-text-secondary">ID de Usuario</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Plan</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Estado</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(subscription => (
              <tr key={subscription.id} className="theme-border-b">
                <td className="py-3 px-4 theme-text-primary">{subscription.id}</td>
                <td className="py-3 px-4 theme-text-primary">{subscription.userId}</td>
                <td className="py-3 px-4 theme-text-primary">{subscription.plan}</td>
                <td className="py-3 px-4 theme-text-primary">{subscription.status}</td>
                <td className="py-3 px-4 theme-text-primary">
                  <button onClick={() => handleEditClick(subscription)} className="theme-button-secondary mr-2">Editar</button>
                  <button onClick={() => handleDeleteSubscription(subscription.id)} className="theme-button-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isCreateModalOpen && <CreateSubscriptionModal onClose={() => setIsCreateModalOpen(false)} onSubscriptionCreated={handleSubscriptionCreated} />}
      {isEditModalOpen && selectedSubscription && <EditSubscriptionModal subscription={selectedSubscription} onClose={() => setIsEditModalOpen(false)} onSubscriptionUpdated={handleSubscriptionUpdated} />}
    </div>
  );
}
