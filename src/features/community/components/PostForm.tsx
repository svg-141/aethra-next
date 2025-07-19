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
    <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60 mb-6">
      <div className="flex items-start">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-900/40 to-pink-900/30 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-purple-500/40 overflow-hidden mr-4">
          <img src="/api/placeholder/40/40" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-4">
            {isEditing ? 'Editar Post' : 'Crear Nuevo Post'}
          </h3>
          
          {/* Título */}
          <input
            type="text"
            placeholder="Título del post..."
            className="w-full bg-[#1e0b36] border border-purple-900/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-3"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          {/* Categoría */}
          <select
            value={category}
            onChange={e => setCategory(e.target.value as PostCategory)}
            className="w-full bg-[#1e0b36] border border-purple-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-3"
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
            className="w-full bg-[#1e0b36] border border-purple-900/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-3 min-h-[120px] resize-y"
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          {/* Tags */}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags populares:</label>
            <div className="flex flex-wrap gap-2">
              {POST_TAGS.slice(0, 10).map(tag => (
                <button
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="px-3 py-1 text-xs font-medium bg-purple-900/30 text-purple-200 rounded-full border border-purple-800/50 hover:bg-purple-900/50 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Tags seleccionados */}
          {selectedTags.length > 0 && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags seleccionados:</label>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-purple-600 text-white rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-300 transition-colors"
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
                className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-all"
                onClick={handleCancel}
                type="button"
              >
                Cancelar
              </button>
            </div>
            <button
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
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