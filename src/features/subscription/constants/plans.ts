// Planes de suscripción Freemium para Aethra

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  limitations: string[];
  highlighted: boolean;
  popular: boolean;
  color: string;
  icon: string;
  maxGuides: number | 'unlimited';
  maxChatMessages: number | 'unlimited';
  aiResponseTime: 'standard' | 'priority' | 'instant';
  supportLevel: 'community' | 'email' | 'priority' | 'dedicated';
  customThemes: boolean;
  adFree: boolean;
  analytics: boolean;
  apiAccess: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    interval: 'month',
    highlighted: false,
    popular: false,
    color: '#9CA3AF',
    icon: '🎮',
    features: [
      'Acceso a guías básicas',
      '10 consultas de chat IA por día',
      'Acceso a 4 juegos',
      'Comunidad de jugadores',
      'Notificaciones básicas',
    ],
    limitations: [
      'Anuncios presentes',
      'Tiempo de respuesta estándar',
      'Guías limitadas',
      'Sin soporte prioritario',
      'Temas predeterminados solamente',
    ],
    maxGuides: 50,
    maxChatMessages: 10,
    aiResponseTime: 'standard',
    supportLevel: 'community',
    customThemes: false,
    adFree: false,
    analytics: false,
    apiAccess: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    currency: 'USD',
    interval: 'month',
    highlighted: true,
    popular: true,
    color: '#8B5CF6',
    icon: '⚡',
    features: [
      'Acceso ilimitado a todas las guías',
      '100 consultas de chat IA por día',
      'Respuestas IA prioritarias',
      'Sin anuncios',
      'Temas personalizados',
      'Análisis de rendimiento',
      'Soporte por email',
      'Actualizaciones de parche al instante',
    ],
    limitations: [
      'Sin acceso a API',
      'Sin soporte dedicado',
    ],
    maxGuides: 'unlimited',
    maxChatMessages: 100,
    aiResponseTime: 'priority',
    supportLevel: 'email',
    customThemes: true,
    adFree: true,
    analytics: true,
    apiAccess: false,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 24.99,
    currency: 'USD',
    interval: 'month',
    highlighted: true,
    popular: false,
    color: '#F59E0B',
    icon: '👑',
    features: [
      'Todo lo de Pro',
      'Consultas de chat IA ilimitadas',
      'Respuestas IA instantáneas',
      'Coaching personalizado 1-1',
      'Acceso anticipado a nuevas funciones',
      'Análisis avanzado con ML',
      'API para integraciones',
      'Soporte prioritario 24/7',
      'Badges exclusivos',
      'Acceso a torneos privados',
    ],
    limitations: [],
    maxGuides: 'unlimited',
    maxChatMessages: 'unlimited',
    aiResponseTime: 'instant',
    supportLevel: 'dedicated',
    customThemes: true,
    adFree: true,
    analytics: true,
    apiAccess: true,
  },
];

export const YEARLY_DISCOUNT = 0.20; // 20% de descuento anual

export const getYearlyPrice = (monthlyPrice: number): number => {
  const yearlyPrice = monthlyPrice * 12;
  return yearlyPrice * (1 - YEARLY_DISCOUNT);
};

export const getFeaturesByPlan = (planId: string): string[] => {
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
  return plan ? plan.features : [];
};

export const canAccessFeature = (
  userPlan: string,
  requiredPlan: string
): boolean => {
  const planHierarchy = ['free', 'pro', 'elite'];
  const userLevel = planHierarchy.indexOf(userPlan);
  const requiredLevel = planHierarchy.indexOf(requiredPlan);

  return userLevel >= requiredLevel;
};

export const getPlanByIdOrDefault = (planId: string | null | undefined): SubscriptionPlan => {
  return SUBSCRIPTION_PLANS.find(p => p.id === planId) || SUBSCRIPTION_PLANS[0];
};
