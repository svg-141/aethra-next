'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, User, LoginCredentials, RegisterData, AuthState } from '../services/authService';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  upgradeToPremium: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  useTokens: (amount: number) => Promise<boolean>;
  canAccessPremiumFeatures: () => boolean;
  canAccessGuides: () => boolean;
  canAccessForums: () => boolean;
  canUseChatbot: () => boolean;
  getRemainingTokens: () => number;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // Initialize authentication state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      // Create demo users for development
      await authService.createDemoUsers();

      const user = await authService.getCurrentUser();
      setAuthState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
        error: null
      });
    } catch (err) {
      console.error('Auth initialization error:', err);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Error de inicialización'
      });
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const { user } = await authService.login(credentials);

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (err) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Error de inicio de sesión'
      }));
      throw err;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const { user } = await authService.register(data);

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
    } catch (err) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Error al crear la cuenta'
      }));
      throw err;
    }
  };

  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      await authService.logout();

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    } catch (err) {
      console.error('Logout error:', err);
      // Force logout even if there's an error
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!authState.user) throw new Error('Usuario no autenticado');

      const updatedUser = await authService.updateProfile(updates);

      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));
    } catch (err) {
      throw err;
    }
  };

  const upgradeToPremium = async (planId: string) => {
    try {
      if (!authState.user) throw new Error('Usuario no autenticado');

      setAuthState(prev => ({ ...prev, isLoading: true }));

      const updatedUser = await authService.upgradeToPremium(planId);

      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false
      }));
    } catch (err) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw err;
    }
  };

  const cancelSubscription = async () => {
    try {
      if (!authState.user) throw new Error('Usuario no autenticado');

      const updatedUser = await authService.cancelSubscription();

      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));
    } catch (err) {
      throw err;
    }
  };

  const useTokens = async (amount: number): Promise<boolean> => {
    try {
      const success = await authService.useTokens(amount);

      if (success) {
        // Refresh user data to update token usage
        const updatedUser = await authService.getCurrentUser();
        if (updatedUser) {
          setAuthState(prev => ({
            ...prev,
            user: updatedUser
          }));
        }
      }

      return success;
    } catch (err) {
      console.error('Error using tokens:', err);
      return false;
    }
  };

  const refreshUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setAuthState(prev => ({
        ...prev,
        user,
        isAuthenticated: !!user
      }));
    } catch (err) {
      console.error('Error refreshing user:', err);
    }
  };

  // Access control methods
  const canAccessPremiumFeatures = (): boolean => {
    return authService.canAccessPremiumFeatures(authState.user);
  };

  const canAccessGuides = (): boolean => {
    return authService.canAccessGuides(authState.user);
  };

  const canAccessForums = (): boolean => {
    return authService.canAccessForums(authState.user);
  };

  const canUseChatbot = (): boolean => {
    return authService.canUseChatbot(authState.user);
  };

  const getRemainingTokens = (): number => {
    if (!authState.user) return 0;
    return authService.getRemainingTokens(authState.user);
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    upgradeToPremium,
    cancelSubscription,
    useTokens,
    canAccessPremiumFeatures,
    canAccessGuides,
    canAccessForums,
    canUseChatbot,
    getRemainingTokens,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Custom hooks for specific use cases
export function useRequireAuth() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      // Redirect to login or show login modal
      console.warn('User not authenticated - redirect to login');
    }
  }, [auth.isAuthenticated, auth.isLoading]);

  return auth;
}

export function useRequirePremium() {
  const auth = useAuth();

  const hasPremium = auth.canAccessPremiumFeatures();

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated && !hasPremium) {
      console.warn('Premium access required');
    }
  }, [auth.isAuthenticated, auth.isLoading, hasPremium]);

  return { ...auth, hasPremium };
}

export default AuthContext;