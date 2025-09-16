import React, { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginPrompt from './LoginPrompt';
import PremiumPrompt from './PremiumPrompt';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requirePremium?: boolean;
  fallback?: ReactNode;
  showPrompt?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAuth = false,
  requirePremium = false,
  fallback,
  showPrompt = true
}: ProtectedRouteProps) {
  const auth = useAuth();

  // Show loading state
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !auth.isAuthenticated) {
    if (fallback) return <>{fallback}</>;
    if (showPrompt) return <LoginPrompt />;
    return null;
  }

  // Check premium requirement
  if (requirePremium && !auth.canAccessPremiumFeatures()) {
    if (fallback) return <>{fallback}</>;
    if (showPrompt) return <PremiumPrompt />;
    return null;
  }

  return <>{children}</>;
}

// Convenience components for common use cases
export function RequireAuth({ children, fallback, showPrompt = true }: {
  children: ReactNode;
  fallback?: ReactNode;
  showPrompt?: boolean;
}) {
  return (
    <ProtectedRoute
      requireAuth
      fallback={fallback}
      showPrompt={showPrompt}
    >
      {children}
    </ProtectedRoute>
  );
}

export function RequirePremium({ children, fallback, showPrompt = true }: {
  children: ReactNode;
  fallback?: ReactNode;
  showPrompt?: boolean;
}) {
  return (
    <ProtectedRoute
      requireAuth
      requirePremium
      fallback={fallback}
      showPrompt={showPrompt}
    >
      {children}
    </ProtectedRoute>
  );
}