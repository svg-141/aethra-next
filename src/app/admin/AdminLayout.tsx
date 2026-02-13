import Link from 'next/link';
import { encryptUrlPath } from '../../security/url-encryption';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Simple logic to determine active section based on pathname
    const path = window.location.pathname.split('/').pop(); // Get last part of path
    if (path && path !== 'admin') { // Ensure it's a section, not the base admin path
      setActiveSection(path);
    } else if (window.location.pathname === '/admin') {
      setActiveSection('dashboard');
    }
  }, []);

  return (
    <div className="flex h-screen theme-bg-surface">
      {/* Sidebar */} 
      <aside className="w-64 bg-gradient-to-br from-[#1a0933] to-[#2a0845] text-gray-200 flex-shrink-0 dark:bg-gray-900 border-r theme-border">
        <div className="p-6 border-b theme-border flex items-center justify-center">
          <h2 className="text-2xl font-bold theme-text-primary glow-text">Aethra Admin</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href={encryptUrlPath("/admin")}
                className={`block py-2 px-4 rounded transition-colors flex items-center gap-2 ${activeSection === 'dashboard' ? 'theme-button-primary' : 'hover:theme-bg-hover theme-text-secondary'}`}
                onClick={() => setActiveSection('dashboard')}
              >
                <i className="fas fa-tachometer-alt"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={encryptUrlPath("/admin/users")}
                className={`block py-2 px-4 rounded transition-colors flex items-center gap-2 ${activeSection === 'users' ? 'theme-button-primary' : 'hover:theme-bg-hover theme-text-secondary'}`}
                onClick={() => setActiveSection('users')}
              >
                <i className="fas fa-users"></i> Usuarios
              </Link>
            </li>
            <li>
              <Link
                href={encryptUrlPath("/admin/forums")}
                className={`block py-2 px-4 rounded transition-colors flex items-center gap-2 ${activeSection === 'forums' ? 'theme-button-primary' : 'hover:theme-bg-hover theme-text-secondary'}`}
                onClick={() => setActiveSection('forums')}
              >
                <i className="fas fa-comments"></i> Foros
              </Link>
            </li>
            <li>
              <Link
                href={encryptUrlPath("/admin/reviews")}
                className={`block py-2 px-4 rounded transition-colors flex items-center gap-2 ${activeSection === 'reviews' ? 'theme-button-primary' : 'hover:theme-bg-hover theme-text-secondary'}`}
                onClick={() => setActiveSection('reviews')}
              >
                <i className="fas fa-star"></i> Reseñas
              </Link>
            </li>
            <li>
              <Link
                href={encryptUrlPath("/admin/games")}
                className={`block py-2 px-4 rounded transition-colors flex items-center gap-2 ${activeSection === 'games' ? 'theme-button-primary' : 'hover:theme-bg-hover theme-text-secondary'}`}
                onClick={() => setActiveSection('games')}
              >
                <i className="fas fa-gamepad"></i> Juegos
              </Link>
            </li>
            <li>
              <Link
                href={encryptUrlPath("/admin/subscriptions")}
                className={`block py-2 px-4 rounded transition-colors flex items-center gap-2 ${activeSection === 'subscriptions' ? 'theme-button-primary' : 'hover:theme-bg-hover theme-text-secondary'}`}
                onClick={() => setActiveSection('subscriptions')}
              >
                <i className="fas fa-dollar-sign"></i> Suscripciones
              </Link>
            </li>
            <li>
              <Link
                href={encryptUrlPath("/admin/security")}
                className={`block py-2 px-4 rounded transition-colors flex items-center gap-2 ${activeSection === 'security' ? 'theme-button-primary' : 'hover:theme-bg-hover theme-text-secondary'}`}
                onClick={() => setActiveSection('security')}
              >
                <i className="fas fa-shield-alt"></i> Seguridad
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */} 
      <main className="flex-1 overflow-y-auto p-8 theme-bg-surface theme-section">
        {children}
      </main>
    </div>
  );
}
