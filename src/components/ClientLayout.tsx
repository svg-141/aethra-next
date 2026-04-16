"use client";

import { usePathname } from 'next/navigation';
import { useMemo, memo } from 'react';
import Navbar from './Navbar';
import { NotificationManager } from '../features/notifications';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Script from 'next/script';
import { decryptUrlPath } from '../security/url-encryption';

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Memoize active page calculation for performance
  const active = useMemo(() => {
    // Determine the actual path (decrypt if necessary)
    let effectivePath = pathname;
    
    // Check if the path is likely encrypted (doesn't match known prefixes)
    if (pathname !== '/' && !pathname.startsWith('/login') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
       const decrypted = decryptUrlPath(pathname);
       if (decrypted && decrypted !== pathname) {
         effectivePath = decrypted;
       }
    }

    if (effectivePath === '/') return 'home';
    if (effectivePath.startsWith('/chat')) return 'chat';
    if (effectivePath.startsWith('/games') || effectivePath.startsWith('/guide/')) return 'games';
    if (effectivePath.startsWith('/community')) return 'community';
    if (effectivePath.startsWith('/profile')) return 'profile';
    return '';
  }, [pathname]);

  // Páginas que no requieren autenticación
  const publicRoutes = useMemo(() => [
    '/',
    '/login',
    '/games',
    '/community',
    '/chat'
  ], []);

  const requiresAuth = !publicRoutes.includes(pathname);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)] transition-colors duration-300 relative overflow-hidden">
      {/* Tactical Grid & Scanlines Background */}
      <div className="fixed inset-0 pointer-events-none z-0" id="aethra-background-effects">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
        <div className="absolute inset-0 bg-repeat scanline-bg"></div>
      </div>

      <Navbar active={active} />
      <main className="pt-16 sm:pt-20 lg:pt-24 transition-all duration-300 relative z-10">
        <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)]">
          <ProtectedRoute requireAuth={requiresAuth}>
            {children}
          </ProtectedRoute>
        </div>
      </main>
      <NotificationManager />
      <Script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" 
        strategy="afterInteractive" 
      />
    </div>
  );
}

export default memo(ClientLayout); 