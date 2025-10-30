'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../../../context/AuthContext';


export default function ProfileSettingsPage() {
  const { user, isAuthenticated } = useAuth();
  

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    notifications: {
      news: user?.preferences.notifications || true,
      updates: user?.preferences.notifications || true,
      mentions: user?.preferences.notifications || true,
    },
    privacy: {
      showProfile: user?.preferences.privacy.showProfile || true,
      showActivity: user?.preferences.privacy.showActivity || true,
      showStats: user?.preferences.privacy.showStats || true,
    },
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'privacy'>('profile');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key: string) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }));
  };

  const handlePrivacyChange = (key: string) => {
    setFormData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key as keyof typeof prev.privacy]
      }
    }));
  };

  const handleSaveChanges = () => {
    console.log('Guardando cambios:', formData);
    // Aquí iría la lógica para guardar en el backend
  };

  if (!isAuthenticated) {
    return (
      <section className="pt-32 pb-20 px-6 min-h-screen" style={{ background: 'var(--gradient-background)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="theme-card p-12">
            <i className="fas fa-lock text-4xl theme-text-secondary mb-4"></i>
            <h2 className="text-2xl font-bold theme-text-primary mb-4">Acceso Restringido</h2>
            <p className="theme-text-secondary mb-6">Debes iniciar sesión para acceder a la configuración.</p>
            <a href="/login" className="inline-block px-6 py-3 rounded-lg transition-all animate-theme-hover animate-theme-glow" style={{ background: 'var(--gradient-primary)', color: 'var(--color-text)' }}>
              Iniciar Sesión
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 px-6 min-h-screen" style={{ background: 'var(--gradient-background)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold theme-text-primary mb-2">Configuración del Perfil</h1>
          <p className="theme-text-secondary">Administra tu cuenta y preferencias personales</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="theme-card p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeTab === 'profile' ? 'theme-bg-primary theme-text-primary' : 'theme-text-secondary hover:theme-bg-hover'
                  }`}
                >
                  <i className="fas fa-user"></i>
                  <span>Perfil</span>
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeTab === 'account' ? 'theme-bg-primary theme-text-primary' : 'theme-text-secondary hover:theme-bg-hover'
                  }`}
                >
                  <i className="fas fa-cog"></i>
                  <span>Cuenta</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeTab === 'notifications' ? 'theme-bg-primary theme-text-primary' : 'theme-text-secondary hover:theme-bg-hover'
                  }`}
                >
                  <i className="fas fa-bell"></i>
                  <span>Notificaciones</span>
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    activeTab === 'privacy' ? 'theme-bg-primary theme-text-primary' : 'theme-text-secondary hover:theme-bg-hover'
                  }`}
                >
                  <i className="fas fa-shield-alt"></i>
                  <span>Privacidad</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="theme-card p-6 md:p-8">
              {/* Perfil Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold theme-text-primary mb-4">Información del Perfil</h2>
                    <p className="theme-text-secondary text-sm mb-6">Actualiza tu información personal y foto de perfil</p>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Image
                        src={user?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                        alt="Avatar"
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full border-4"
                        style={{ borderColor: 'var(--color-primary)' }}
                      />
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--color-primary)' }}>
                        <i className="fas fa-camera text-white text-xs"></i>
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold theme-text-primary">{user?.username}</h3>

                      <button className="text-sm px-4 py-2 rounded-lg transition-all animate-theme-hover" style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2', color: 'var(--color-primary)' }}>
                        Cambiar foto
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium theme-text-primary mb-2">Nombre de usuario</label>
                      <input
                        type="text"
                        name="displayName"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border transition-colors"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text)'
                        }}
                        placeholder="Tu nombre de usuario"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium theme-text-primary mb-2">Biografía</label>

                      <p className="text-xs theme-text-secondary mt-1">Máximo 500 caracteres</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cuenta Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold theme-text-primary mb-4">Configuración de Cuenta</h2>
                    <p className="theme-text-secondary text-sm mb-6">Administra tu email y contraseña</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium theme-text-primary mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border transition-colors"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border)',
                          color: 'var(--color-text)'
                        }}
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                      <h3 className="text-lg font-semibold theme-text-primary mb-4">Cambiar Contraseña</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium theme-text-primary mb-2">Contraseña actual</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg border transition-colors"
                            style={{
                              backgroundColor: 'var(--color-surface)',
                              borderColor: 'var(--color-border)',
                              color: 'var(--color-text)'
                            }}
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium theme-text-primary mb-2">Nueva contraseña</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg border transition-colors"
                            style={{
                              backgroundColor: 'var(--color-surface)',
                              borderColor: 'var(--color-border)',
                              color: 'var(--color-text)'
                            }}
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium theme-text-primary mb-2">Confirmar nueva contraseña</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 rounded-lg border transition-colors"
                            style={{
                              backgroundColor: 'var(--color-surface)',
                              borderColor: 'var(--color-border)',
                              color: 'var(--color-text)'
                            }}
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notificaciones Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold theme-text-primary mb-4">Preferencias de Notificaciones</h2>
                    <p className="theme-text-secondary text-sm mb-6">Elige cómo quieres recibir actualizaciones</p>
                  </div>

                  <div className="space-y-4">






                    <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
                      <div>
                        <h4 className="font-medium theme-text-primary">Menciones</h4>
                        <p className="text-sm theme-text-secondary">Cuando alguien te menciona</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications.mentions}
                          onChange={() => handleNotificationChange('mentions')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: formData.notifications.mentions ? 'var(--color-primary)' : 'var(--color-border)' }}></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacidad Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold theme-text-primary mb-4">Privacidad y Seguridad</h2>
                    <p className="theme-text-secondary text-sm mb-6">Controla quién puede ver tu información</p>
                  </div>

                  <div className="space-y-4">


                    

                    <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--color-surface)' }}>
                      <div>
                        <h4 className="font-medium theme-text-primary">Mostrar estadísticas</h4>
                        <p className="text-sm theme-text-secondary">Tus stats de juego serán públicas</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.privacy.showStats}
                          onChange={() => handlePrivacyChange('showStats')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: formData.privacy.showStats ? 'var(--color-primary)' : 'var(--color-border)' }}></div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <h3 className="text-lg font-semibold theme-text-primary mb-3 text-red-400">Zona de Peligro</h3>
                    <button className="px-4 py-2 rounded-lg border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                      Eliminar cuenta
                    </button>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end gap-4 pt-6 border-t mt-8" style={{ borderColor: 'var(--color-border)' }}>
                <button className="px-6 py-3 rounded-lg transition-all animate-theme-hover theme-text-secondary" style={{ backgroundColor: 'var(--color-surface)' }}>
                  Cancelar
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-3 rounded-lg transition-all animate-theme-hover animate-theme-glow"
                  style={{ background: 'var(--gradient-primary)', color: 'white' }}
                >
                  <i className="fas fa-save mr-2"></i>
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
