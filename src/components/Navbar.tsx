import Image from 'next/image';
import Link from 'next/link';
import NotificationBell from './NotificationBell';
import SearchBar from './SearchBar';
import ThemeSelector from './ThemeSelector';
import { TooltipGuide } from '../features/tooltips';

interface NavbarProps {
  active?: string;
}

export default function Navbar({ active }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-purple-800/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-white text-2xl font-extrabold tracking-wide glow-text flex items-center gap-2">
          <Image src="/assets/logo.png" alt="Aethra Logo" width={36} height={36} className="rounded-full" />
          AETHRA
        </span>
        
        {/* Barra de búsqueda centrada */}
        <div className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-8">
          <div data-tooltip="search">
            <SearchBar />
          </div>
        </div>
        
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <li><Link href="/" className={`nav-link ${active === 'home' ? 'text-purple-400' : 'hover:text-white'}`}>Inicio</Link></li>
          <li><Link href="/chat" className={`nav-link ${active === 'chat' ? 'text-purple-400' : 'hover:text-white'}`}>Funciones</Link></li>
          <li><Link href="/games" className={`nav-link ${active === 'games' ? 'text-purple-400' : 'hover:text-white'}`}>Guías</Link></li>
          <li><Link href="/comunity" className={`nav-link ${active === 'comunity' ? 'text-purple-400' : 'hover:text-white'}`}>Comunidad</Link></li>
          <li><Link href="/profile" className={`nav-link ${active === 'profile' ? 'text-purple-200' : 'hover:text-purple-200'}`}>Mi perfil</Link></li>
        </ul>
        <div className="flex items-center gap-4">
          {/* Selector de temas */}
          <ThemeSelector />
          
          {/* Campana de notificaciones */}
          <div data-tooltip="notifications">
            <NotificationBell />
          </div>
          
          {/* Botón de cerrar sesión */}
          <button id="user-menu" className="flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-all">
            <span className="hidden sm:inline">Cerrar sesión</span>
            <i className="fas fa-sign-out-alt text-lg"></i>
          </button>
        </div>
      </div>
      
      {/* Barra de búsqueda móvil */}
      <div className="lg:hidden px-6 pb-4">
        <div data-tooltip="search">
          <SearchBar />
        </div>
      </div>

      {/* Tooltips de la navbar */}
      <TooltipGuide section="navbar" />
    </nav>
  );
} 