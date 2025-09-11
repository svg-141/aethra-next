"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthForm from './AuthForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  fallback 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      setShowAuth(true);
    } else {
      setShowAuth(false);
    }
  }, [isAuthenticated, isLoading, requireAuth]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--gradient-background)' }}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
               style={{ background: 'var(--gradient-primary)' }}>
            <i className="fas fa-spinner icon-animate-spin text-2xl text-white"></i>
          </div>
          <div className="theme-text-primary font-semibold mb-2">Verificando sesión...</div>
          <div className="theme-text-secondary text-sm">Preparando tu experiencia Aethra</div>
        </div>
      </div>
    );
  }

  // Si no requiere autenticación, mostrar el contenido
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Si está autenticado, mostrar el contenido
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Si no está autenticado y se requiere, mostrar formulario de auth o fallback
  if (showAuth) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center px-4" 
           style={{ background: 'var(--gradient-background)' }}>
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" 
                 style={{ background: 'var(--gradient-primary)' }}>
              <i className="fas fa-shield-alt text-3xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold theme-text-primary mb-2">Acceso Requerido</h1>
            <p className="theme-text-secondary">
              Necesitas una cuenta para acceder a esta sección de Aethra
            </p>
          </div>

          {/* Auth Form */}
          <AuthForm 
            mode={authMode}
            onToggleMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            onSuccess={() => setShowAuth(false)}
          />

          {/* Benefits */}
          <div className="mt-8">
            <div className="theme-card p-4">
              <h3 className="font-semibold theme-text-primary mb-3 text-center">
                ¿Por qué crear una cuenta?
              </h3>
              <div className="space-y-2">
                <div className="flex items-center theme-text-secondary text-sm">
                  <i className="fas fa-check icon-success mr-2"></i>
                  <span>Acceso completo al chatbot IA especializado</span>
                </div>
                <div className="flex items-center theme-text-secondary text-sm">
                  <i className="fas fa-check icon-success mr-2"></i>
                  <span>Participar en foros y comunidades</span>
                </div>
                <div className="flex items-center theme-text-secondary text-sm">
                  <i className="fas fa-check icon-success mr-2"></i>
                  <span>Guardar tus configuraciones y preferencias</span>
                </div>
                <div className="flex items-center theme-text-secondary text-sm">
                  <i className="fas fa-check icon-success mr-2"></i>
                  <span>Sistema de niveles y logros</span>
                </div>
                <div className="flex items-center theme-text-secondary text-sm">
                  <i className="fas fa-check icon-success mr-2"></i>
                  <span>Historial personalizado de consultas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Componente específico para rutas que requieren roles específicos
interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'moderator' | 'admin';
  fallback?: React.ReactNode;
}

export function RoleProtectedRoute({ 
  children, 
  requiredRole = 'user', 
  fallback 
}: RoleProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner icon-animate-spin text-3xl theme-text-primary mb-4"></i>
          <div className="theme-text-secondary">Verificando permisos...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <ProtectedRoute requireAuth={true}>{children}</ProtectedRoute>;
  }

  // Verificar rol
  const roleHierarchy = { user: 0, moderator: 1, admin: 2 };
  const userLevel = user ? roleHierarchy[user.role] : -1;
  const requiredLevel = roleHierarchy[requiredRole];

  if (userLevel < requiredLevel) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center theme-card p-8 max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
               style={{ backgroundColor: 'var(--color-error)', opacity: '0.2' }}>
            <i className="fas fa-ban text-2xl" style={{ color: 'var(--color-error)' }}></i>
          </div>
          <h2 className="text-2xl font-bold theme-text-primary mb-4">Acceso Restringido</h2>
          <p className="theme-text-secondary mb-6">
            No tienes los permisos necesarios para acceder a esta sección.
            Se requiere rol de {requiredRole}.
          </p>
          <p className="theme-text-secondary text-sm">
            Tu rol actual: <span className="font-semibold">{user?.role || 'ninguno'}</span>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}