"use client";

import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../../backend/services/userService';
import CreateUserModal from './components/CreateUserModal';
import EditUserModal from './components/EditUserModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getUsers();
      setUsers(usersData as User[]);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleUserCreated = (user: User) => {
    setUsers([...users, user]);
  };

  const handleUserUpdated = (user: User) => {
    setUsers(users.map(u => (u.id === user.id ? user : u)));
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="theme-section p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold theme-text-primary">Gestión de Usuarios</h1>
        <button onClick={() => setIsCreateModalOpen(true)} className="theme-button-primary">Crear Usuario</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full theme-bg-surface">
          <thead>
            <tr className="theme-border-b">
              <th className="py-3 px-4 text-left theme-text-secondary">ID</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Nombre</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Email</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Rol</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="theme-border-b">
                <td className="py-3 px-4 theme-text-primary">{user.id}</td>
                <td className="py-3 px-4 theme-text-primary">{user.name}</td>
                <td className="py-3 px-4 theme-text-primary">{user.email}</td>
                <td className="py-3 px-4 theme-text-primary">{user.role}</td>
                <td className="py-3 px-4 theme-text-primary">
                  <button onClick={() => handleEditClick(user)} className="theme-button-secondary mr-2">Editar</button>
                  <button onClick={() => handleDeleteUser(user.id)} className="theme-button-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isCreateModalOpen && <CreateUserModal onClose={() => setIsCreateModalOpen(false)} onUserCreated={handleUserCreated} />}
      {isEditModalOpen && selectedUser && <EditUserModal user={selectedUser} onClose={() => setIsEditModalOpen(false)} onUserUpdated={handleUserUpdated} />}
    </div>
  );
}
