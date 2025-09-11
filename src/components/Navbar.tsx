import Image from 'next/image';
import Link from 'next/link';
import { memo, useState, useCallback } from 'react';
import NotificationBell from './NotificationBell';
import SearchBar from './SearchBar';
import ThemeSelector from './ThemeSelector';

interface NavbarProps {
  active?: string;
}

function Navbar({ active }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);
  
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);
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
          <li><Link href="/comunity" className={`nav-link transition-all hover:scale-105 px-3 py-2 rounded animate-theme-hover ${active === 'comunity' ? 'text-theme-primary bg-theme-surface-hover' : 'hover:text-theme-primary'}`}>Comunidad</Link></li>
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
          <button id="user-menu" className="theme-button flex items-center gap-2 px-3 py-2 rounded animate-theme-hover">
            <span className="hidden xl:inline text-sm">Cerrar sesión</span>
            <i className="fas fa-sign-out-alt icon-theme"></i>
          </button>
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
              <Link href="/comunity" onClick={closeMobileMenu} className={`block px-4 py-3 rounded-lg transition-all ${active === 'comunity' ? 'theme-text-primary' : 'theme-text-secondary hover:theme-text-primary'}`} style={active === 'comunity' ? { backgroundColor: 'var(--color-primary)', opacity: '0.1' } : {}}>Comunidad</Link>
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