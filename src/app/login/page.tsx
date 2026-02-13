'use client';

import { useForm } from '../../hooks/useForm';

export default function LoginPage() {
  // 1. Uso del hook useForm para el login
  const {
    values,
    errors,
    touched,
    isSubmitting,
    success,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useForm({
    initialValues: { email: '', password: '', remember: false },
    validate: () => {
      const errs: { email?: string; password?: string } = {};
      return errs;
    },
    onSubmit: async () => {
      // Aquí iría la lógica de autenticación (simulada)
      resetForm();
    },
  });

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-background)' }}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full blur-[80px] animate-pulse" style={{ background: 'var(--color-primary)' }}></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-[80px] animate-pulse delay-300" style={{ background: 'var(--color-secondary)' }}></div>
          <div className="absolute top-1/3 right-1/4 w-60 h-60 rounded-full blur-[70px] animate-pulse delay-500" style={{ background: 'var(--color-accent)' }}></div>
        </div>
      </div>
      {/* Contenido principal */}
      <main className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10 animate__animated animate__fadeInDown">
            <h1 className="text-5xl font-extrabold theme-text-primary mb-2 glow-text">AETHRA</h1>
            <p className="text-lg theme-text-secondary opacity-90">Domina el meta con inteligencia artificial</p>
          </div>
          {/* Tarjeta de login */}
          <div className="theme-card p-8 animate__animated animate__fadeIn backdrop-blur-md">
            <h2 className="text-2xl font-bold theme-text-primary text-center mb-6">Iniciar Sesión</h2>
            {/* Formulario */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium theme-text-secondary mb-1 opacity-90">Correo Electrónico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-theme-primary opacity-90"></i>
                  </div>
                  <input
                    className="theme-input w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none transition-all"
                    placeholder="tucorreo@ejemplo.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.email && errors.email && <div className="mt-1 text-sm text-red-400 font-semibold">{errors.email}</div>}
              </div>
              {/* Contraseña */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium theme-text-secondary opacity-90">Contraseña</label>
                  <a href="#" className="text-xs theme-text-primary hover:text-theme-primary-light transition-colors">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-theme-primary opacity-90"></i>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="theme-input w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none transition-all"
                    placeholder="••••••••"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.password && errors.password && <div className="mt-1 text-sm text-red-400 font-semibold">{errors.password}</div>}
              </div>
              {/* Recordar sesión */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 bg-theme-surface border-theme rounded text-theme-primary focus:ring-theme-primary focus:ring-offset-theme-surface"
                  checked={values.remember}
                  onChange={e => handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      name: 'remember',
                      value: String(e.target.checked),
                      type: 'checkbox',
                    },
                  })}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm theme-text-secondary opacity-90">Recordar mi sesión</label>
              </div>
              {/* Botón de login */}
              <div>
                <button
                  type="submit"
                  className="theme-button w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-lg font-semibold text-white focus:outline-none transition-all"
                  disabled={isSubmitting}
                >
                  Iniciar Sesión
                  <i className="fas fa-sign-in-alt ml-2"></i>
                </button>
                {success && <div className="mt-2 text-sm text-green-400 font-semibold text-center">¡Login exitoso!</div>}
              </div>
            </form>
            {/* Divisor */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t theme-border opacity-40"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 theme-bg-surface theme-text-secondary opacity-90">O continúa con</span>
              </div>
            </div>
            {/* Login social */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a href="#" className="theme-button-secondary w-full inline-flex justify-center items-center py-2 px-4 border rounded-lg text-sm font-medium transition-all">
                  <i className="fab fa-google mr-2 text-theme-primary"></i>
                  Google
                </a>
              </div>
              <div>
                <a href="#" className="theme-button-secondary w-full inline-flex justify-center items-center py-2 px-4 border rounded-lg text-sm font-medium transition-all">
                  <i className="fab fa-facebook mr-2 text-theme-primary"></i>
                  Facebook
                </a>
              </div>
            </div>
          </div>
          {/* Enlace a registro */}
          <div className="mt-8 text-center animate__animated animate__fadeInUp">
            <p className="text-sm theme-text-secondary opacity-90">
              ¿No tienes una cuenta?{' '}
              <a href="#" className="text-theme-primary hover:text-theme-primary-light font-medium transition-colors">Regístrate ahora</a>
            </p>
          </div>
        </div>
      </main>
      {/* Footer minimalista */}
      <footer className="relative z-10 py-6 px-4 border-t theme-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm theme-text-secondary text-center md:text-left opacity-80">
              &copy; 2025 Aethra. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="theme-text-secondary hover:theme-text-primary transition-colors">
                <span className="sr-only">Términos</span>
                <span className="text-sm">Términos</span>
              </a>
              <a href="#" className="theme-text-secondary hover:theme-text-primary transition-colors">
                <span className="sr-only">Privacidad</span>
                <span className="text-sm">Privacidad</span>
              </a>
              <a href="#" className="theme-text-secondary hover:theme-text-primary transition-colors">
                <span className="sr-only">Contacto</span>
                <span className="text-sm">Contacto</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}