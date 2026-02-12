import React, { useState, useEffect } from 'react';
import { updateReview } from '../../../../../backend/services/reviewService';

interface EditReviewModalProps {
  review: any;
  onClose: () => void;
  onReviewUpdated: (review: any) => void;
}

export default function EditReviewModal({ review, onClose, onReviewUpdated }: EditReviewModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    if (review) {
      setTitle(review.title);
      setContent(review.content);
      setRating(review.rating);
    }
  }, [review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const reviewData = { title, content, rating };
    await updateReview(review.id, reviewData);
    onReviewUpdated({ id: review.id, ...reviewData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="theme-bg-surface p-8 rounded-lg">
        <h2 className="text-2xl font-bold theme-text-primary mb-6">Editar Reseña</h2>
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
            <label className="block theme-text-secondary mb-2">Contenido</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Rating</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              min="1"
              max="5"
              required
            />
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
