"use client";

import React, { useState, useEffect } from 'react';
import { getReviews, deleteReview } from '../../../backend/services/reviewService';
import CreateReviewModal from './components/CreateReviewModal';
import EditReviewModal from './components/EditReviewModal';

interface Review {
  id: string;
  title: string;
  content: string;
  rating: number;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviews();
      setReviews(reviewsData as Review[]);
    };
    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      await deleteReview(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
    }
  };

  const handleReviewCreated = (review: Review) => {
    setReviews([...reviews, review]);
  };

  const handleReviewUpdated = (review: Review) => {
    setReviews(reviews.map(r => (r.id === review.id ? review : r)));
  };

  const handleEditClick = (review: Review) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  return (
    <div className="theme-section p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold theme-text-primary">Gestión de Reseñas</h1>
        <button onClick={() => setIsCreateModalOpen(true)} className="theme-button-primary">Crear Reseña</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full theme-bg-surface">
          <thead>
            <tr className="theme-border-b">
              <th className="py-3 px-4 text-left theme-text-secondary">ID</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Título</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Contenido</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Rating</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id} className="theme-border-b">
                <td className="py-3 px-4 theme-text-primary">{review.id}</td>
                <td className="py-3 px-4 theme-text-primary">{review.title}</td>
                <td className="py-3 px-4 theme-text-primary">{review.content}</td>
                <td className="py-3 px-4 theme-text-primary">{review.rating}</td>
                <td className="py-3 px-4 theme-text-primary">
                  <button onClick={() => handleEditClick(review)} className="theme-button-secondary mr-2">Editar</button>
                  <button onClick={() => handleDeleteReview(review.id)} className="theme-button-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isCreateModalOpen && <CreateReviewModal onClose={() => setIsCreateModalOpen(false)} onReviewCreated={handleReviewCreated} />}
      {isEditModalOpen && selectedReview && <EditReviewModal review={selectedReview} onClose={() => setIsEditModalOpen(false)} onReviewUpdated={handleReviewUpdated} />}
    </div>
  );
}
