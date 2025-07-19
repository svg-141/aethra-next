import { useState } from 'react';
import { CommentSectionProps, Comment } from '../types/chat.types';
import { useNotifications } from '../../notifications';

export default function CommentSection({ 
  sectionId, 
  initialComments = [], 
  initialVotes = { up: 0, down: 0 },
  title = "¿Te resultó útil esta sección?",
  className = "",
  onComment,
  onVote
}: CommentSectionProps) {
  // Estado para comentarios
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [usefulVotes, setUsefulVotes] = useState(initialVotes);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hook de notificaciones
  const { addNotification } = useNotifications();

  // Manejo de envío de comentario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || newComment.length < 10) return;

    setIsSubmitting(true);
    
    try {
      // Agregar nuevo comentario
      const comment: Comment = {
        id: Date.now(),
        author: 'JugadorPro123', // Esto vendría del contexto de usuario
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        content: newComment,
        time: 'Ahora',
        likes: 0,
        section: sectionId,
      };
      
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      
      // Notificar al padre si existe callback
      if (onComment) {
        onComment(comment);
      }
      
      // Notificación de éxito
      addNotification({
        type: 'success',
        priority: 'medium',
        title: 'Comentario publicado',
        message: 'Tu comentario ha sido publicado exitosamente.',
      });
      
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error al publicar',
        message: 'No se pudo publicar tu comentario. Intenta de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejo de votos
  const handleVote = (type: 'up' | 'down') => {
    setUsefulVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));

    // Notificar al padre si existe callback
    if (onVote) {
      onVote(type);
    }

    // Notificación de voto útil
    if (type === 'up') {
      addNotification({
        type: 'success',
        priority: 'low',
        title: '¡Gracias por tu feedback!',
        message: 'Tu voto nos ayuda a mejorar el contenido.',
      });
    }
  };

  // Manejo de likes en comentarios
  const handleCommentLike = (commentId: number) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );

    // Encontrar el comentario para la notificación
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      addNotification({
        type: 'info',
        priority: 'low',
        title: 'Like agregado',
        message: `Te gustó el comentario de ${comment.author}`,
      });
    }
  };

  return (
    <div className={`mt-8 pt-8 border-t border-purple-900/50 ${className}`}>
      {/* Votación de utilidad */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote('up')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-300 rounded-lg border border-green-600/30 hover:bg-green-600/30 transition-all"
          >
            <i className="fas fa-thumbs-up"></i>
            <span>{usefulVotes.up}</span>
          </button>
          <button
            onClick={() => handleVote('down')}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-300 rounded-lg border border-red-600/30 hover:bg-red-600/30 transition-all"
          >
            <i className="fas fa-thumbs-down"></i>
            <span>{usefulVotes.down}</span>
          </button>
        </div>
      </div>

      {/* Formulario de comentarios */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-white mb-4">Comentarios</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="w-full bg-[#0f0720] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 border border-purple-900/50 resize-none"
            placeholder="Comparte tu experiencia o pregunta..."
            disabled={isSubmitting}
          />
          {newComment.length > 0 && newComment.length < 10 && (
            <div className="text-sm text-red-400">Mínimo 10 caracteres</div>
          )}
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">{newComment.length}/500</div>
            <button
              type="submit"
              disabled={isSubmitting || newComment.length < 10}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Publicando...' : 'Comentar'}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-[#1e0b36] rounded-xl p-4 border border-purple-900/50">
            <div className="flex items-start gap-3">
              <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white">{comment.author}</span>
                  <span className="text-xs text-gray-400">{comment.time}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleCommentLike(comment.id)}
                    className="flex items-center gap-1 text-xs text-gray-400 hover:text-purple-300 transition-colors"
                  >
                    <i className="fas fa-thumbs-up"></i>
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-xs text-gray-400 hover:text-purple-300 transition-colors">
                    Responder
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 