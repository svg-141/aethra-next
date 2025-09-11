"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthCredentials, RegisterData, AuthContextType } from '../types/auth.types';
import { AuthService } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar sesión existente al cargar
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const token = localStorage.getItem('aethra-auth-token');
      if (token) {
        const userData = await AuthService.getUserByToken(token);
        if (userData) {
          setUser(userData);
        } else {
          localStorage.removeItem('aethra-auth-token');
          localStorage.removeItem('aethra-refresh-token');
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
      localStorage.removeItem('aethra-auth-token');
      localStorage.removeItem('aethra-refresh-token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: AuthCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await AuthService.login(credentials);
      
      // Guardar tokens
      localStorage.setItem('aethra-auth-token', response.token);
      localStorage.setItem('aethra-refresh-token', response.refreshToken);
      
      setUser(response.user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await AuthService.register(data);
      
      // Guardar tokens
      localStorage.setItem('aethra-auth-token', response.token);
      localStorage.setItem('aethra-refresh-token', response.refreshToken);
      
      setUser(response.user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrarse';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('aethra-auth-token');
      if (token) {
        await AuthService.logout(token);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Limpiar estado local
      localStorage.removeItem('aethra-auth-token');
      localStorage.removeItem('aethra-refresh-token');
      setUser(null);
      setError(null);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) {
      throw new Error('No hay usuario autenticado');
    }

    try {
      setIsLoading(true);
      setError(null);

      const updatedUser = await AuthService.updateProfile(user.id, updates);
      setUser(updatedUser);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar perfil';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook personalizado para permisos
export function usePermissions() {
  const { user } = useAuth();
  
  return AuthService.getUserPermissions(user?.id || null);
}

// Hook para verificar si el usuario puede realizar una acción
export function useCanPerform() {
  const permissions = usePermissions();
  const { user } = useAuth();

  return {
    edit: (resourceOwnerId: string) => permissions.canEdit(resourceOwnerId),
    delete: (resourceOwnerId: string) => permissions.canDelete(resourceOwnerId),
    moderate: () => permissions.canModerate(),
    admin: () => permissions.canAdmin(),
    isOwner: (resourceOwnerId: string) => permissions.isOwner(resourceOwnerId),
    isAuthenticated: !!user
  };
}