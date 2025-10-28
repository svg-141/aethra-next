// Authentication Service for Freemium Model
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  plan: 'free' | 'premium';
  tokenUsage: number;
  tokenLimit: number;
  subscriptionStatus: 'active' | 'cancelled' | 'expired' | 'none';
  subscriptionEnd?: Date;
  createdAt: Date;
  lastLogin: Date;
  level: number;
  reputation: number;
  role: 'user' | 'admin';
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: string;
  notifications: boolean;
  language: string;
  privacy: {
    showProfile: boolean;
    showActivity: boolean;
    showStats: boolean;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  tokenLimit?: number;
}

class AuthService {
  private readonly API_BASE = '/api/auth';
  private readonly TOKEN_KEY = 'aethra_auth_token';
  private readonly USER_KEY = 'aethra_user';

  // Available subscription plans
  private readonly PLANS: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Plan Gratuito',
      price: 0,
      currency: 'USD',
      interval: 'monthly',
      tokenLimit: 1000000, // 1M tokens
      features: [
        'Acceso al chatbot (1M tokens)',
        'Personalización de perfil',
        'Personalización de temas',
        'Acceso a tutoriales básicos'
      ]
    },
    {
      id: 'premium_monthly',
      name: 'Premium Mensual',
      price: 9.99,
      currency: 'USD',
      interval: 'monthly',
      features: [
        'Acceso ilimitado al chatbot',
        'Acceso completo a guías estratégicas',
        'Participación en foros',
        'Descargas ilimitadas',
        'Soporte prioritario',
        'Funciones interactivas (likes, comentarios)',
        'Análisis avanzado de gameplay'
      ]
    },
    {
      id: 'premium_yearly',
      name: 'Premium Anual',
      price: 99.99,
      currency: 'USD',
      interval: 'yearly',
      features: [
        'Todos los beneficios del plan mensual',
        '2 meses gratis',
        'Acceso anticipado a nuevas características',
        'Sesiones de coaching exclusivas',
        'Contenido premium exclusivo'
      ]
    }
  ];

  // Mock user database (in production, this would be a real database)
  private users: Map<string, User> = new Map();
  private sessions: Map<string, string> = new Map(); // token -> userId

  constructor() {
    this.initializeService();
  }

  private initializeService() {
    // Load persisted user data
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem(this.USER_KEY);
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          this.users.set(user.id, user);
        } catch (err) {
          console.error('Error loading saved user:', err);
          localStorage.removeItem(this.USER_KEY);
        }
      }
    }
  }

  // Authentication Methods
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user by email
      const user = Array.from(this.users.values()).find(u => u.email === credentials.email);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // In production, verify password hash
      // For demo purposes, accept any password except empty
      if (!credentials.password || credentials.password.length < 3) {
        throw new Error('Contraseña incorrecta');
      }

      // Update last login
      user.lastLogin = new Date();
      this.users.set(user.id, user);

      // Generate session token
      const token = this.generateToken();
      this.sessions.set(token, user.id);

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      }

      return { user, token };
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error de autenticación');
    }
  }

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if user already exists
      const existingUser = Array.from(this.users.values()).find(u =>
        u.email === data.email || u.username === data.username
      );

      if (existingUser) {
        if (existingUser.email === data.email) {
          throw new Error('El email ya está registrado');
        }
        if (existingUser.username === data.username) {
          throw new Error('El nombre de usuario ya está en uso');
        }
      }

      // Create new user with free plan
      const newUser: User = {
        id: this.generateUserId(),
        email: data.email,
        username: data.username,
        displayName: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
        plan: 'free',
        tokenUsage: 0,
        tokenLimit: 1000000, // 1M tokens for free users
        subscriptionStatus: 'none',
        createdAt: new Date(),
        lastLogin: new Date(),
        level: 1,
        reputation: 0,
        role: 'user',
        preferences: {
          theme: 'aethra-purple',
          notifications: true,
          language: 'es',
          privacy: {
            showProfile: true,
            showActivity: false,
            showStats: true
          }
        }
      };

      // Store user
      this.users.set(newUser.id, newUser);

      // Generate session token
      const token = this.generateToken();
      this.sessions.set(token, newUser.id);

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(newUser));
      }

      return { user: newUser, token };
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error al crear la cuenta');
    }
  }

  async logout(): Promise<void> {
    try {
      const token = this.getStoredToken();
      if (token) {
        this.sessions.delete(token);
      }

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getStoredToken();
      if (!token) return null;

      const userId = this.sessions.get(token);
      if (!userId) return null;

      const user = this.users.get(userId);
      if (!user) return null;

      // Check if subscription is still valid
      if (user.subscriptionEnd && user.subscriptionEnd < new Date()) {
        user.plan = 'free';
        user.subscriptionStatus = 'expired';
        user.tokenLimit = 1000000;
        this.users.set(user.id, user);
      }

      return user;
    } catch (err) {
      console.error('Error getting current user:', err);
      return null;
    }
  }

  // Subscription Methods
  getAvailablePlans(): SubscriptionPlan[] {
    return this.PLANS;
  }

  async upgradeToPremium(planId: string, paymentMethod?: string): Promise<User> {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const plan = this.PLANS.find(p => p.id === planId);
    if (!plan || plan.id === 'free') {
      throw new Error('Plan no válido');
    }

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update user to premium
    const subscriptionEnd = new Date();
    if (plan.interval === 'monthly') {
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);
    } else {
      subscriptionEnd.setFullYear(subscriptionEnd.getFullYear() + 1);
    }

    user.plan = 'premium';
    user.subscriptionStatus = 'active';
    user.subscriptionEnd = subscriptionEnd;
    user.tokenLimit = Infinity; // Unlimited for premium

    this.users.set(user.id, user);

    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    return user;
  }

  async cancelSubscription(): Promise<User> {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    user.subscriptionStatus = 'cancelled';
    // Keep premium features until subscription ends

    this.users.set(user.id, user);

    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    return user;
  }

  // Token Management
  async useTokens(amount: number): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;

    if (user.plan === 'premium') return true; // Unlimited for premium

    if (user.tokenUsage + amount > user.tokenLimit) {
      return false; // Not enough tokens
    }

    user.tokenUsage += amount;
    this.users.set(user.id, user);

    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    return true;
  }

  getRemainingTokens(user: User): number {
    if (user.plan === 'premium') return Infinity;
    return Math.max(0, user.tokenLimit - user.tokenUsage);
  }

  // Access Control
  canAccessPremiumFeatures(user: User | null): boolean {
    if (!user) return false;
    return user.plan === 'premium' && user.subscriptionStatus === 'active';
  }

  canAccessGuides(user: User | null): boolean {
    return this.canAccessPremiumFeatures(user);
  }

  canAccessForums(user: User | null): boolean {
    return this.canAccessPremiumFeatures(user);
  }

  canUseChatbot(user: User | null): boolean {
    if (!user) return false;
    if (user.plan === 'premium') return true;
    return user.tokenUsage < user.tokenLimit;
  }

  // Profile Management
  async updateProfile(updates: Partial<User>): Promise<User> {
    const user = await this.getCurrentUser();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    // Merge updates (excluding sensitive fields)
    const { id, email, plan, tokenUsage, tokenLimit, subscriptionStatus, createdAt, ...allowedUpdates } = updates;

    const updatedUser = { ...user, ...allowedUpdates };
    this.users.set(user.id, updatedUser);

    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
    }

    return updatedUser;
  }

  // Utility Methods
  private generateToken(): string {
    return 'token_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Demo Methods (for development)
  async createDemoUsers(): Promise<void> {
    // Create demo free user
    const freeUser: User = {
      id: 'demo_free_user',
      email: 'free@demo.com',
      username: 'usuario_gratis',
      displayName: 'Usuario Gratuito',
      firstName: 'Usuario',
      lastName: 'Gratuito',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=free',
      plan: 'free',
      tokenUsage: 250000,
      tokenLimit: 1000000,
      subscriptionStatus: 'none',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      lastLogin: new Date(),
      level: 5,
      reputation: 120,
      role: 'user',
      preferences: {
        theme: 'aethra-purple',
        notifications: true,
        language: 'es',
        privacy: {
          showProfile: true,
          showActivity: true,
          showStats: true
        }
      }
    };

    // Create demo premium user
    const premiumUser: User = {
      id: 'demo_premium_user',
      email: 'premium@demo.com',
      username: 'usuario_premium',
      displayName: 'Usuario Premium',
      firstName: 'Usuario',
      lastName: 'Premium',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=premium',
      plan: 'premium',
      tokenUsage: 0,
      tokenLimit: Infinity,
      subscriptionStatus: 'active',
      subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      lastLogin: new Date(),
      level: 25,
      reputation: 2500,
      role: 'admin',
      preferences: {
        theme: 'cyber-blue',
        notifications: true,
        language: 'es',
        privacy: {
          showProfile: true,
          showActivity: true,
          showStats: false
        }
      }
    };

    this.users.set(freeUser.id, freeUser);
    this.users.set(premiumUser.id, premiumUser);
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;