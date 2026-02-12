"use client";

import React, { useState, useEffect } from 'react';
import { getForums, deleteForum } from '../../../backend/services/forumService';
import CreateForumModal from './components/CreateForumModal';
import EditForumModal from './components/EditForumModal';

interface Forum {
  id: string;
  title: string;
  description: string;
}

export default function AdminForumsPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);

  useEffect(() => {
    const fetchForums = async () => {
      const forumsData = await getForums();
      setForums(forumsData as Forum[]);
    };
    fetchForums();
  }, []);

  const handleDeleteForum = async (forumId: string) => {
    if (window.confirm('Are you sure you want to delete this forum?')) {
      await deleteForum(forumId);
      setForums(forums.filter(forum => forum.id !== forumId));
    }
  };

  const handleForumCreated = (forum: Forum) => {
    setForums([...forums, forum]);
  };

  const handleForumUpdated = (forum: Forum) => {
    setForums(forums.map(f => (f.id === forum.id ? forum : f)));
  };

  const handleEditClick = (forum: Forum) => {
    setSelectedForum(forum);
    setIsEditModalOpen(true);
  };

  return (
    <div className="theme-section p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold theme-text-primary">Gestión de Foros</h1>
        <button onClick={() => setIsCreateModalOpen(true)} className="theme-button-primary">Crear Foro</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full theme-bg-surface">
          <thead>
            <tr className="theme-border-b">
              <th className="py-3 px-4 text-left theme-text-secondary">ID</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Título</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Descripción</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {forums.map(forum => (
              <tr key={forum.id} className="theme-border-b">
                <td className="py-3 px-4 theme-text-primary">{forum.id}</td>
                <td className="py-3 px-4 theme-text-primary">{forum.title}</td>
                <td className="py-3 px-4 theme-text-primary">{forum.description}</td>
                <td className="py-3 px-4 theme-text-primary">
                  <button onClick={() => handleEditClick(forum)} className="theme-button-secondary mr-2">Editar</button>
                  <button onClick={() => handleDeleteForum(forum.id)} className="theme-button-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isCreateModalOpen && <CreateForumModal onClose={() => setIsCreateModalOpen(false)} onForumCreated={handleForumCreated} />}
      {isEditModalOpen && selectedForum && <EditForumModal forum={selectedForum} onClose={() => setIsEditModalOpen(false)} onForumUpdated={handleForumUpdated} />}
    </div>
  );
}
