import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold theme-text-primary mb-6">Panel de Administrador</h1>
      <p className="theme-text-secondary">Bienvenido al panel de administración. Aquí podrás gestionar usuarios, contenido y más.</p>
      {/* Placeholder for admin navigation and sections */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold theme-text-primary mb-4">Secciones Principales</h2>
        <ul className="list-disc list-inside space-y-2 theme-text-secondary">
          <li>Gestión de Usuarios</li>
          <li>Gestión de Foros</li>
          <li>Gestión de Reseñas</li>
          <li>Gestión de Juegos</li>
          <li>Gestión de Suscripciones</li>
          <li>Configuración de Seguridad</li>
        </ul>
      </div>
    </div>
  );
}
