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
    <div className="min-h-screen bg-gradient-to-b from-[#0f0720] to-[#1a0933] relative">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600 rounded-full blur-[80px] animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-600 rounded-full blur-[80px] animate-pulse delay-300"></div>
          <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-pink-600 rounded-full blur-[70px] animate-pulse delay-500"></div>
        </div>
      </div>
      {/* Contenido principal */}
      <main className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-10 animate__animated animate__fadeInDown">
            <h1 className="text-5xl font-extrabold text-white mb-2 glow-text">AETHRA</h1>
            <p className="text-lg text-gray-300 opacity-90">Domina el meta con inteligencia artificial</p>
          </div>
          {/* Tarjeta de login */}
          <div className="login-card bg-gradient-to-br from-[#1a0933]/90 to-[#2a0845]/90 rounded-2xl p-8 border border-purple-900/50 animate__animated animate__fadeIn backdrop-blur-md shadow-xl">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Iniciar Sesión</h2>
            {/* Formulario */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 opacity-90">Correo Electrónico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-purple-400 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="input-field bg-[#1e0b36]/70 text-white placeholder-gray-400 block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none transition-all"
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 opacity-90">Contraseña</label>
                  <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-purple-400 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="input-field bg-[#1e0b36]/70 text-white placeholder-gray-400 block w-full pl-10 pr-3 py-3 rounded-lg focus:outline-none transition-all"
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
                  className="h-4 w-4 bg-[#1e0b36] border-purple-900/50 rounded text-purple-600 focus:ring-purple-500 focus:ring-offset-[#1a0933]"
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
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300 opacity-90">Recordar mi sesión</label>
              </div>
              {/* Botón de login */}
              <div>
                <button
                  type="submit"
                  className="btn-login w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 focus:outline-none transition-all"
                  disabled={isSubmitting}
                >
                  Iniciar Sesión
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </button>
                {success && <div className="mt-2 text-sm text-green-400 font-semibold text-center">¡Login exitoso!</div>}
              </div>
            </form>
            {/* Divisor */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-900/40"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#1a0933]/90 text-gray-400 opacity-90">O continúa con</span>
              </div>
            </div>
            {/* Login social */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a href="#" className="social-btn w-full inline-flex justify-center items-center py-2 px-4 border border-purple-900/40 rounded-lg text-sm font-medium text-gray-300 bg-[#1e0b36]/70 hover:bg-purple-900/30 focus:outline-none transition-all">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.7663 12.2764C23.7663 11.4607 23.7001 10.6406 23.559 9.83807H12.2402V14.4591H18.722C18.453 15.9494 17.5888 17.2678 16.3233 18.1056V21.1039H20.1903C22.4611 19.0139 23.7663 15.9274 23.7663 12.2764Z" fill="#4285F4" />
                    <path d="M12.2401 24C15.4766 24 18.2059 22.9383 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.2519 12.2445 19.2519C9.11388 19.2519 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24 12.2401 24Z" fill="#34A853" />
                    <path d="M5.50277 14.3003C5.00011 12.8099 5.00011 11.1961 5.50277 9.70575V6.61481H1.51674C-0.185266 10.0056 -0.185266 14.0004 1.51674 17.3912L5.50277 14.3003Z" fill="#FBBC04" />
                    <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55737 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
                  </svg>
                  Google
                </a>
              </div>
              <div>
                <a href="#" className="social-btn w-full inline-flex justify-center items-center py-2 px-4 border border-purple-900/40 rounded-lg text-sm font-medium text-gray-300 bg-[#1e0b36]/70 hover:bg-purple-900/30 focus:outline-none transition-all">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>
          {/* Enlace a registro */}
          <div className="mt-8 text-center animate__animated animate__fadeInUp">
            <p className="text-sm text-gray-400 opacity-90">
              ¿No tienes una cuenta?{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Regístrate ahora</a>
            </p>
          </div>
        </div>
      </main>
      {/* Footer minimalista */}
      <footer className="relative z-10 py-6 px-4 border-t border-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 text-center md:text-left opacity-80">
              &copy; 2025 Aethra. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Términos</span>
                <span className="text-sm">Términos</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Privacidad</span>
                <span className="text-sm">Privacidad</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
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