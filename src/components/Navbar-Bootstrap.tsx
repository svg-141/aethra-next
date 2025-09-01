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
    <nav className="navbar navbar-expand-lg fixed-top shadow-theme-md theme-navbar">
      <div className="container-fluid px-3 px-lg-4">
        {/* Brand */}
        <Link href="/" className="navbar-brand d-flex align-items-center me-lg-4">
          <Image 
            src="/assets/logo.png" 
            alt="Aethra Logo" 
            width={40} 
            height={40} 
            className="rounded-circle me-3" 
            priority
          />
          <span className="fw-bold fs-4 glow-text text-theme-primary">AETHRA</span>
        </Link>

        {/* Toggle button for mobile */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={toggleMobileMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search bar - centered on desktop */}
          <div className="navbar-nav me-auto d-lg-flex justify-content-center flex-grow-1">
            <div className="d-none d-lg-block mx-auto" style={{width: '400px', maxWidth: '100%'}}>
              <SearchBar />
            </div>
          </div>
          
          {/* Navigation links */}
          <ul className="navbar-nav me-auto me-lg-3">
            <li className="nav-item">
              <Link href="/" className={`nav-link px-3 py-2 animate-theme-hover rounded ${active === 'home' ? 'active text-theme-primary bg-theme-surface-hover' : 'text-theme-secondary'}`}>
                <i className="fas fa-home me-2"></i>Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/chat" className={`nav-link px-3 py-2 animate-theme-hover rounded ${active === 'chat' ? 'active text-theme-primary bg-theme-surface-hover' : 'text-theme-secondary'}`}>
                <i className="fas fa-robot me-2"></i>Funciones
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/games" className={`nav-link px-3 py-2 animate-theme-hover rounded ${active === 'games' ? 'active text-theme-primary bg-theme-surface-hover' : 'text-theme-secondary'}`}>
                <i className="fas fa-gamepad me-2"></i>Guías
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/comunity" className={`nav-link px-3 py-2 animate-theme-hover rounded ${active === 'comunity' ? 'active text-theme-primary bg-theme-surface-hover' : 'text-theme-secondary'}`}>
                <i className="fas fa-users me-2"></i>Comunidad
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/profile" className={`nav-link px-3 py-2 animate-theme-hover rounded ${active === 'profile' ? 'active text-theme-primary bg-theme-surface-hover' : 'text-theme-secondary'}`}>
                <i className="fas fa-user me-2"></i>Mi perfil
              </Link>
            </li>
          </ul>

          {/* Action buttons */}
          <div className="d-flex align-items-center gap-2 gap-lg-3">
            <ThemeSelector />
            <NotificationBell />
            <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2 animate-theme-hover" id="user-menu">
              <span className="d-none d-xl-inline">Cerrar sesión</span>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="d-lg-none mt-3 w-100 px-3">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);