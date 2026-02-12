import React, { useState } from 'react';
import { PostFormProps, PostCategory } from '../types/community.types';
import { POST_CATEGORIES, POST_TAGS } from '../constants/community-constants';

export default function PostForm({ onSubmit, onCancel, initialData, isEditing = false }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState<PostCategory>(initialData?.category || 'general');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('Por favor completa el título y contenido');
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      category,
      tags: [...tags, ...selectedTags]
    });

    // Reset form
    setTitle('');
    setContent('');
    setCategory('general');
    setTags([]);
    setSelectedTags([]);
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag) && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="theme-card p-6 mb-6">
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 overflow-hidden mr-4" style={{ background: 'var(--gradient-secondary)', borderColor: 'var(--color-primary)' }}>
          <img src="/api/placeholder/40/40" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-theme-primary mb-4">
            {isEditing ? 'Editar Post' : 'Crear Nuevo Post'}
          </h3>
          
          {/* Título */}
          <input
            type="text"
            placeholder="Título del post..."
            className="theme-input w-full"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          {/* Categoría */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value as PostCategory)}
            className="theme-input w-full"
          >
            {POST_CATEGORIES.map(cat => (
              <option key={cat.key} value={cat.key}>
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>

          {/* Contenido */}
          <textarea
            placeholder="¿Qué quieres compartir con la comunidad?"
            className="theme-input w-full min-h-[120px] resize-y"
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          {/* Tags */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-theme-secondary mb-2">Tags populares:</label>
            <div className="flex flex-wrap gap-2">
              {POST_TAGS.slice(0, 10).map(tag => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="theme-badge px-3 py-1 text-xs font-medium cursor-pointer hover:opacity-80 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Tags seleccionados */}
          {selectedTags.length > 0 && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-theme-secondary mb-2">Tags seleccionados:</label>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="theme-badge px-3 py-1 text-xs font-medium flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                className="theme-button-secondary px-4 py-2 rounded-lg font-semibold transition-all"
                onClick={handleCancel}
                type="button"
              >
                Cancelar
              </button>
            </div>
            <button
              className="theme-button px-4 py-2 rounded-lg font-semibold transition-all"
              onClick={handleSubmit}
              type="button"
            >
              {isEditing ? 'Actualizar' : 'Publicar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 