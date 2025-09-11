"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthCredentials, RegisterData } from '../types/auth.types';

interface AuthFormProps {
  mode: 'login' | 'register';
  onToggleMode: () => void;
  onSuccess?: () => void;
}

export default function AuthForm({ mode, onToggleMode, onSuccess }: AuthFormProps) {
  const { login, register, isLoading, error, clearError } = useAuth();
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    displayName: '',
    confirmPassword: ''
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // Validación en tiempo real
  const validateField = (name: string, value: string) => {
    const errors: Record<string, string> = {};

    switch (name) {
      case 'email':
        if (!value) {
          errors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Email inválido';
        }
        break;
      
      case 'password':
        if (!value) {
          errors.password = 'La contraseña es requerida';
        } else if (value.length < 8) {
          errors.password = 'La contraseña debe tener al menos 8 caracteres';
        }
        break;
      
      case 'username':
        if (mode === 'register') {
          if (!value) {
            errors.username = 'El nombre de usuario es requerido';
          } else if (value.length < 3 || value.length > 20) {
            errors.username = 'Debe tener entre 3 y 20 caracteres';
          } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            errors.username = 'Solo letras, números y guiones bajos';
          }
        }
        break;
      
      case 'displayName':
        if (mode === 'register') {
          if (!value) {
            errors.displayName = 'El nombre es requerido';
          } else if (value.length < 2 || value.length > 50) {
            errors.displayName = 'Debe tener entre 2 y 50 caracteres';
          }
        }
        break;
      
      case 'confirmPassword':
        if (mode === 'register') {
          if (!value) {
            errors.confirmPassword = 'Confirma tu contraseña';
          } else if (value !== formData.password) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
          }
        }
        break;
    }

    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar errores del servidor
    if (error) {
      clearError();
    }

    // Validación en tiempo real
    const fieldErrors = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name] || ''
    }));

    // Validar confirmPassword cuando cambie password
    if (name === 'password' && formData.confirmPassword) {
      const confirmErrors = validateField('confirmPassword', formData.confirmPassword);
      setValidationErrors(prev => ({
        ...prev,
        confirmPassword: confirmErrors.confirmPassword || ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos los campos
    const allErrors: Record<string, string> = {};
    const fieldsToValidate = mode === 'login' 
      ? ['email', 'password']
      : ['email', 'password', 'username', 'displayName', 'confirmPassword'];

    fieldsToValidate.forEach(field => {
      const fieldErrors = validateField(field, formData[field as keyof typeof formData]);
      Object.assign(allErrors, fieldErrors);
    });

    if (Object.keys(allErrors).length > 0) {
      setValidationErrors(allErrors);
      return;
    }

    try {
      if (mode === 'login') {
        const credentials: AuthCredentials = {
          email: formData.email,
          password: formData.password
        };
        await login(credentials);
      } else {
        const registerData: RegisterData = {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          displayName: formData.displayName
        };
        await register(registerData);
      }
      
      onSuccess?.();
    } catch (error) {
      // El error ya se maneja en el contexto
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="theme-form-container max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold theme-text-primary mb-2">
          {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        <p className="theme-text-secondary">
          {mode === 'login' 
            ? 'Accede a tu cuenta de Aethra' 
            : 'Únete a la comunidad gaming de Aethra'
          }
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg border" style={{ 
          backgroundColor: 'var(--color-error)', 
          opacity: '0.1', 
          borderColor: 'var(--color-error)',
          color: 'var(--color-error)'
        }}>
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="theme-form-group">
          <label className="theme-form-label">
            <i className="fas fa-envelope mr-2 icon-theme"></i>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`theme-input w-full ${validationErrors.email ? 'border-red-500' : ''}`}
            placeholder="tu@email.com"
            disabled={isLoading}
          />
          {validationErrors.email && (
            <div className="theme-form-helper text-red-400">{validationErrors.email}</div>
          )}
        </div>

        {/* Username (solo registro) */}
        {mode === 'register' && (
          <div className="theme-form-group">
            <label className="theme-form-label">
              <i className="fas fa-user mr-2 icon-theme"></i>
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`theme-input w-full ${validationErrors.username ? 'border-red-500' : ''}`}
              placeholder="nombreusuario"
              disabled={isLoading}
            />
            {validationErrors.username && (
              <div className="theme-form-helper text-red-400">{validationErrors.username}</div>
            )}
          </div>
        )}

        {/* Display Name (solo registro) */}
        {mode === 'register' && (
          <div className="theme-form-group">
            <label className="theme-form-label">
              <i className="fas fa-id-card mr-2 icon-theme"></i>
              Nombre Completo
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className={`theme-input w-full ${validationErrors.displayName ? 'border-red-500' : ''}`}
              placeholder="Tu Nombre"
              disabled={isLoading}
            />
            {validationErrors.displayName && (
              <div className="theme-form-helper text-red-400">{validationErrors.displayName}</div>
            )}
          </div>
        )}

        {/* Password */}
        <div className="theme-form-group">
          <label className="theme-form-label">
            <i className="fas fa-lock mr-2 icon-theme"></i>
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`theme-input w-full pr-12 ${validationErrors.password ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 theme-text-secondary hover:theme-text-primary transition-colors"
              disabled={isLoading}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
          {validationErrors.password && (
            <div className="theme-form-helper text-red-400">{validationErrors.password}</div>
          )}
        </div>

        {/* Confirm Password (solo registro) */}
        {mode === 'register' && (
          <div className="theme-form-group">
            <label className="theme-form-label">
              <i className="fas fa-lock mr-2 icon-theme"></i>
              Confirmar Contraseña
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`theme-input w-full ${validationErrors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {validationErrors.confirmPassword && (
              <div className="theme-form-helper text-red-400">{validationErrors.confirmPassword}</div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || Object.keys(validationErrors).some(key => validationErrors[key])}
          className="w-full theme-button py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner icon-animate-spin mr-2"></i>
              {mode === 'login' ? 'Iniciando sesión...' : 'Creando cuenta...'}
            </>
          ) : (
            <>
              <i className={`fas ${mode === 'login' ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </>
          )}
        </button>
      </form>

      {/* Toggle Mode */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="theme-text-secondary hover:theme-text-primary transition-colors font-medium"
          disabled={isLoading}
        >
          {mode === 'login' 
            ? '¿No tienes cuenta? Regístrate aquí' 
            : '¿Ya tienes cuenta? Inicia sesión'
          }
        </button>
      </div>

      {/* Demo Credentials (solo desarrollo) */}
      {mode === 'login' && process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 rounded-lg" style={{ 
          backgroundColor: 'var(--color-info)', 
          opacity: '0.1', 
          borderColor: 'var(--color-info)',
          border: '1px solid'
        }}>
          <div className="text-center">
            <div className="theme-text-secondary text-xs mb-2">Cuentas de prueba:</div>
            <div className="text-xs theme-text-secondary">
              <div>Admin: admin@aethra.com</div>
              <div>Usuario: gamer@example.com</div>
              <div className="mt-1">Contraseña: password123</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}