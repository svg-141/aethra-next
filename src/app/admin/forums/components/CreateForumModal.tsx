import React, { useState } from 'react';
import { createForum } from '../../../../../backend/services/forumService';

interface CreateForumModalProps {
  onClose: () => void;
  onForumCreated: (forum: any) => void;
}

export default function CreateForumModal({ onClose, onForumCreated }: CreateForumModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const forumData = { title, description };
    const forumId = await createForum(forumData);
    onForumCreated({ id: forumId, ...forumData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="theme-bg-surface p-8 rounded-lg">
        <h2 className="text-2xl font-bold theme-text-primary mb-6">Crear Foro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="theme-button-secondary mr-2">Cancelar</button>
            <button type="submit" className="theme-button-primary">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
