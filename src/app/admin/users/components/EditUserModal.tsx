import React, { useState, useEffect } from 'react';
import { updateUser } from '../../../../../backend/services/userService';

interface EditUserModalProps {
  user: any;
  onClose: () => void;
  onUserUpdated: (user: any) => void;
}

export default function EditUserModal({ user, onClose, onUserUpdated }: EditUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { name, email, role };
    await updateUser(user.id, userData);
    onUserUpdated({ id: user.id, ...userData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="theme-bg-surface p-8 rounded-lg">
        <h2 className="text-2xl font-bold theme-text-primary mb-6">Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Rol</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="theme-button-secondary mr-2">Cancelar</button>
            <button type="submit" className="theme-button-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}
