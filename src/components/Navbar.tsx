import Image from 'next/image';
import Link from 'next/link';
import { memo, useState, useCallback } from 'react';
import NotificationBell from './NotificationBell';
import SearchBar from './SearchBar';
import ThemeSelector from './ThemeSelector';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  active?: string;
}

function Navbar({ active }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu(prev => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    setShowUserMenu(false);
    await logout();
  }, [logout]);
  return (
    <nav className="fixed top-0 w-full z-50 theme-navbar backdrop-blur-lg border-b transition-all duration-300" style={{ borderBottomColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center gap-4">
        <Link href="/" className="text-theme-primary text-xl sm:text-2xl font-extrabold tracking-wide glow-text flex items-center gap-3 hover:scale-105 transition-transform flex-shrink-0">
          <Image 
            src="/assets/logo.png" 
            alt="Aethra Logo" 
            width={32} 
            height={32} 
            className="rounded-full sm:w-9 sm:h-9" 
            priority
          />
          <span className="hidden xs:inline">AETHRA</span>
        </Link>
        
        {/* Barra de búsqueda centrada - Optimizada */}
        <div className="hidden lg:flex items-center justify-center flex-1 max-w-lg mx-6 xl:mx-12">
          <SearchBar />
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-2 xl:gap-4 text-sm font-medium text-theme-secondary flex-shrink-0">
          <li><Link href="/" className={`nav-link transition-all hover:scale-105 px-3 py-2 rounded animate-theme-hover ${active === 'home' ? 'text-theme-primary bg-theme-surface-hover' : 'hover:text-theme-primary'}`}>Inicio</Link></li>
          <li><Link href="/chat" className={`nav-link transition-all hover:scale-105 px-3 py-2 rounded animate-theme-hover ${active === 'chat' ? 'text-theme-primary bg-theme-surface-hover' : 'hover:text-theme-primary'}`}>Funciones</Link></li>
          <li><Link href="/games" className={`nav-link transition-all hover:scale-105 px-3 py-2 rounded animate-theme-hover ${active === 'games' ? 'text-theme-primary bg-theme-surface-hover' : 'hover:text-theme-primary'}`}>Guías</Link></li>
          <li><Link href="/community" className={`nav-link transition-all hover:scale-105 px-3 py-2 rounded animate-theme-hover ${active === 'community' ? 'text-theme-primary bg-theme-surface-hover' : 'hover:text-theme-primary'}`}>Comunidad</Link></li>
          <li><Link href="/profile" className={`nav-link transition-all hover:scale-105 px-3 py-2 rounded animate-theme-hover ${active === 'profile' ? 'text-theme-primary bg-theme-surface-hover' : 'hover:text-theme-primary'}`}>Mi perfil</Link></li>
        </ul>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu}
          className="lg:hidden theme-button p-2 animate-theme-hover"
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg icon-theme`}></i>
        </button>
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
          <ThemeSelector />
          <NotificationBell />
          {isAuthenticated && user ? (
            <div className="relative">
              <button 
                onClick={toggleUserMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-lg animate-theme-hover transition-all" 
                style={{ 
                  backgroundColor: 'var(--color-surface)', 
                  borderColor: 'var(--color-border)', 
                  border: '1px solid' 
                }}
              >
                <img 
                  src={user.avatar} 
                  alt={user.displayName} 
                  className="w-6 h-6 rounded-full border" 
                  style={{ borderColor: 'var(--color-border)' }}
                />
                <span className="hidden xl:inline text-sm theme-text-primary font-medium">
                  {user.displayName}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs theme-badge" style={{ 
                    backgroundColor: 'var(--color-primary)', 
                    opacity: '0.2', 
                    color: 'var(--color-primary)' 
                  }}>
                    Nv.{user.level}
                  </span>
                  <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'} text-xs theme-text-secondary`}></i>
                </div>
              </button>
              
              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl theme-card border animate-fade-in z-50" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="p-4">
                    {/* User Info Header */}
                    <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                      <img 
                        src={user.avatar} 
                        alt={user.displayName} 
                        className="w-10 h-10 rounded-full border-2" 
                        style={{ borderColor: 'var(--color-primary)' }}
                      />
                      <div className="flex-1">
                        <div className="font-medium theme-text-primary">{user.displayName}</div>
                        <div className="text-sm theme-text-secondary">@{user.username}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs theme-badge" style={{ 
                            backgroundColor: 'var(--color-primary)', 
                            opacity: '0.2', 
                            color: 'var(--color-primary)' 
                          }}>
                            Nivel {user.level}
                          </span>
                          <span className="text-xs theme-badge" style={{ 
                            backgroundColor: 'var(--color-warning)', 
                            opacity: '0.2', 
                            color: 'var(--color-warning)' 
                          }}>
                            {user.reputation} pts
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-3 space-y-1">
                      <Link 
                        href="/profile" 
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg theme-text-secondary hover:theme-text-primary transition-colors animate-theme-hover"
                      >
                        <i className="fas fa-user icon-theme"></i>
                        <span>Mi Perfil</span>
                      </Link>
                      <Link 
                        href="/profile/settings" 
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg theme-text-secondary hover:theme-text-primary transition-colors animate-theme-hover"
                      >
                        <i className="fas fa-cog icon-theme"></i>
                        <span>Configuración</span>
                      </Link>
                      {user.role === 'admin' && (
                        <Link 
                          href="/admin" 
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg theme-text-secondary hover:theme-text-primary transition-colors animate-theme-hover"
                        >
                          <i className="fas fa-shield-alt icon-warning"></i>
                          <span>Administración</span>
                        </Link>
                      )}
                    </div>
                    
                    {/* Logout Button */}
                    <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg theme-text-secondary hover:theme-text-primary transition-colors animate-theme-hover"
                      >
                        <i className="fas fa-sign-out-alt icon-error"></i>
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="theme-button flex items-center gap-2 px-3 py-2 rounded animate-theme-hover"
            >
              <span className="hidden xl:inline text-sm">Iniciar Sesión</span>
              <i className="fas fa-sign-in-alt icon-theme"></i>
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 theme-bg-surface backdrop-blur-lg border-b theme-border animate-slide-down">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div data-tooltip="search">
              <SearchBar />
            </div>
            
            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link href="/" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg transition-all ${active === 'home' ? 'theme-text-primary' : 'theme-text-secondary hover:theme-text-primary'}`} style={active === 'home' ? { backgroundColor: 'var(--color-primary)', opacity: '0.1' } : {}}>Inicio</Link>
              <Link href="/chat" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg transition-all ${active === 'chat' ? 'theme-text-primary' : 'theme-text-secondary hover:theme-text-primary'}`} style={active === 'chat' ? { backgroundColor: 'var(--color-primary)', opacity: '0.1' } : {}}>Funciones</Link>
              <Link href="/games" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg transition-all ${active === 'games' ? 'theme-text-primary' : 'theme-text-secondary hover:theme-text-primary'}`} style={active === 'games' ? { backgroundColor: 'var(--color-primary)', opacity: '0.1' } : {}}>Guías</Link>
              <Link href="/community" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg transition-all ${active === 'community' ? 'theme-text-primary' : 'theme-text-secondary hover:theme-text-primary'}`} style={active === 'community' ? { backgroundColor: 'var(--color-primary)', opacity: '0.1' } : {}}>Comunidad</Link>
              <Link href="/profile" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg transition-all ${active === 'profile' ? 'theme-text-primary' : 'theme-text-secondary hover:theme-text-primary'}`} style={active === 'profile' ? { backgroundColor: 'var(--color-primary)', opacity: '0.1' } : {}}>Mi perfil</Link>
            </nav>
            
            {/* Mobile Actions */}
            <div className="flex items-center justify-between pt-4 border-t theme-border">
              <div className="flex items-center gap-4">
                <ThemeSelector />
                <NotificationBell />
              </div>
              <button id="mobile-user-menu" className="theme-button flex items-center gap-2 px-3 py-2 rounded">
                <span className="text-sm">Cerrar sesión</span>
                <i className="fas fa-sign-out-alt icon-theme"></i>
              </button>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}

export default memo(Navbar); 