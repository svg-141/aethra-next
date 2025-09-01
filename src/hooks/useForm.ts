"use client";

import { useState } from 'react';

/**
 * Hook personalizado para formularios controlados con validación y feedback.
 * @param initialValues Valores iniciales del formulario
 * @param validate Función de validación, retorna objeto de errores
 */
export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => void | Promise<void>;
}) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Maneja cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  // Maneja el submit del formulario
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    let validationErrors: Partial<Record<keyof T, string>> = {};
    if (validate) {
      validationErrors = validate(values) || {};
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
    }
    setIsSubmitting(true);
    await onSubmit(values);
    setIsSubmitting(false);
    setSuccess('¡Formulario enviado correctamente!');
    setTimeout(() => setSuccess(null), 2500);
  };

  // Para marcar campos como tocados manualmente
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Resetear formulario
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSuccess(null);
  };

  return {
    values,
    setValues,
    errors,
    touched,
    isSubmitting,
    success,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setErrors,
    setTouched,
    setSuccess,
  };
} 