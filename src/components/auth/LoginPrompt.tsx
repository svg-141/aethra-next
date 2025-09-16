import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';

export default function LoginPrompt() {
  const auth = useAuth();
  const { currentTheme } = useThemeContext();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await auth.login(loginData);
      setShowLoginForm(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error de inicio de sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await auth.register(registerData);
      setShowRegisterForm(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (userType: 'free' | 'premium') => {
    setIsLoading(true);
    setError(null);

    try {
      const credentials = {
        email: userType === 'free' ? 'free@demo.com' : 'premium@demo.com',
        password: 'demo123'
      };
      await auth.login(credentials);
    } catch (error) {
      setError('Error al acceder con usuario demo');
    } finally {
      setIsLoading(false);
    }
  };

  if (showLoginForm) {
    return (
      <div className="theme-card p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold theme-text-primary mb-6 text-center">Iniciar Sesión</h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-error)', opacity: '0.1', borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium theme-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)'
              }}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium theme-text-secondary mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)'
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-lg font-medium transition-colors animate-theme-hover animate-theme-glow disabled:opacity-50"
            style={{ background: 'var(--gradient-primary)', color: 'var(--color-text)' }}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowRegisterForm(true)}
            className="text-sm theme-text-secondary hover:theme-text-primary transition-colors"
          >
            ¿No tienes cuenta? Regístrate gratis
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowLoginForm(false)}
            className="text-sm theme-text-secondary hover:theme-text-primary transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  if (showRegisterForm) {
    return (
      <div className="theme-card p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold theme-text-primary mb-6 text-center">Crear Cuenta Gratuita</h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-error)', opacity: '0.1', borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium theme-text-secondary mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={registerData.firstName}
                onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)'
                }}
                placeholder="Juan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium theme-text-secondary mb-2">
                Apellido
              </label>
              <input
                type="text"
                value={registerData.lastName}
                onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)'
                }}
                placeholder="Pérez"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium theme-text-secondary mb-2">
              Nombre de usuario
            </label>
            <input
              type="text"
              required
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)'
              }}
              placeholder="mi_usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium theme-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)'
              }}
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium theme-text-secondary mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border transition-colors animate-theme-hover"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)'
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-lg font-medium transition-colors animate-theme-hover animate-theme-glow disabled:opacity-50"
            style={{ background: 'var(--gradient-primary)', color: 'var(--color-text)' }}
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta Gratuita'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowLoginForm(true)}
            className="text-sm theme-text-secondary hover:theme-text-primary transition-colors"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowRegisterForm(false)}
            className="text-sm theme-text-secondary hover:theme-text-primary transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-card p-8 max-w-lg mx-auto text-center">
      <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2' }}>
        <i className="fas fa-lock text-2xl" style={{ color: 'var(--color-primary)' }}></i>
      </div>

      <h2 className="text-2xl font-bold theme-text-primary mb-4">
        Acceso Requerido
      </h2>

      <p className="theme-text-secondary mb-6">
        Para acceder a esta función necesitas crear una cuenta gratuita o iniciar sesión.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => setShowRegisterForm(true)}
          className="w-full py-3 px-4 rounded-lg font-medium transition-colors animate-theme-hover animate-theme-glow"
          style={{ background: 'var(--gradient-primary)', color: 'var(--color-text)' }}
        >
          <i className="fas fa-user-plus mr-2"></i>
          Crear Cuenta Gratuita
        </button>

        <button
          onClick={() => setShowLoginForm(true)}
          className="w-full py-3 px-4 rounded-lg font-medium border transition-colors animate-theme-hover"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
        >
          <i className="fas fa-sign-in-alt mr-2"></i>
          Iniciar Sesión
        </button>
      </div>

      {/* Demo users for development */}
      <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-sm theme-text-secondary mb-3">Demo para desarrollo:</p>
        <div className="flex gap-2">
          <button
            onClick={() => handleDemoLogin('free')}
            disabled={isLoading}
            className="flex-1 py-2 px-3 rounded text-xs border transition-colors animate-theme-hover disabled:opacity-50"
            style={{ borderColor: 'var(--color-success)', color: 'var(--color-success)' }}
          >
            Usuario Gratuito
          </button>
          <button
            onClick={() => handleDemoLogin('premium')}
            disabled={isLoading}
            className="flex-1 py-2 px-3 rounded text-xs border transition-colors animate-theme-hover disabled:opacity-50"
            style={{ borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}
          >
            Usuario Premium
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium theme-text-primary mb-3">Cuenta Gratuita Incluye:</h4>
        <ul className="text-sm theme-text-secondary space-y-1">
          <li>✅ Acceso al chatbot (1M tokens)</li>
          <li>✅ Personalización de perfil y temas</li>
          <li>✅ Tutoriales básicos</li>
        </ul>
      </div>
    </div>
  );
}