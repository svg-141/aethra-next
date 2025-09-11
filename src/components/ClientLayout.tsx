"use client";

import { usePathname } from 'next/navigation';
import { useMemo, memo } from 'react';
import Navbar from './Navbar';
import { NotificationManager } from '../features/notifications';
import { ProtectedRoute } from '../features/auth';

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Memoize active page calculation for performance
  const active = useMemo(() => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/chat')) return 'chat';
    if (pathname.startsWith('/games')) return 'games';
    if (pathname.startsWith('/comunity')) return 'comunity';
    if (pathname.startsWith('/profile')) return 'profile';
    return '';
  }, [pathname]);

  // Páginas que no requieren autenticación
  const publicRoutes = useMemo(() => [
    '/',
    '/login'
  ], []);

  const requiresAuth = !publicRoutes.includes(pathname);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)] transition-colors duration-300">
      <Navbar active={active} />
      <main className="pt-16 sm:pt-20 lg:pt-24 transition-all duration-300">
        <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)]">
          <ProtectedRoute requireAuth={requiresAuth}>
            {children}
          </ProtectedRoute>
        </div>
      </main>
      <NotificationManager />
    </div>
  );
}

export default memo(ClientLayout); 