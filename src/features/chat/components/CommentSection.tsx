import { useState, useEffect } from 'react';
import { CommentSectionProps, Comment } from '../types/chat.types';
import { useNotifications } from '../../notifications';
import { CommentService } from '../services/commentService';
import { useAuth } from '../../auth';

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
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Hook de notificaciones
  const { addNotification } = useNotifications();
  
  // Hook de autenticación
  const { user, isAuthenticated } = useAuth();

  // Cargar comentarios desde el servicio
  useEffect(() => {
    loadComments();
  }, [sectionId]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const loadedComments = await CommentService.getComments({ sectionId });
      setComments(loadedComments);
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error al cargar comentarios',
        message: 'No se pudieron cargar los comentarios.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Manejo de envío de comentario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || newComment.length < 10) return;
    
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para comentar.',
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const comment = await CommentService.createComment({
        content: newComment,
        sectionId,
        author: user.displayName,
        avatar: user.avatar,
        userId: user.id,
      }, user.id);
      
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
  const handleCommentLike = async (commentId: number) => {
    try {
      const isLiked = likedComments.has(commentId);
      
      let updatedComment;
      if (isLiked) {
        updatedComment = await CommentService.unlikeComment(commentId);
        setLikedComments(prev => {
          const newSet = new Set(prev);
          newSet.delete(commentId);
          return newSet;
        });
      } else {
        updatedComment = await CommentService.likeComment(commentId);
        setLikedComments(prev => new Set(prev).add(commentId));
      }

      if (updatedComment) {
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId ? updatedComment : comment
          )
        );

        addNotification({
          type: 'info',
          priority: 'low',
          title: isLiked ? 'Like removido' : 'Like agregado',
          message: `${isLiked ? 'Ya no te gusta' : 'Te gustó'} el comentario de ${updatedComment.author}`,
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'medium',
        title: 'Error',
        message: 'No se pudo procesar el like.',
      });
    }
  };

  // Manejo de edición de comentarios
  const handleEditComment = (commentId: number, content: string) => {
    setEditingComment(commentId);
    setEditContent(content);
  };

  const handleSaveEdit = async (commentId: number) => {
    if (!editContent.trim() || editContent.length < 10) return;
    
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para editar comentarios.',
      });
      return;
    }

    try {
      const updatedComment = await CommentService.updateComment(commentId, {
        content: editContent,
      }, user.id);

      if (updatedComment) {
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId ? updatedComment : comment
          )
        );

        setEditingComment(null);
        setEditContent('');

        addNotification({
          type: 'success',
          priority: 'medium',
          title: 'Comentario actualizado',
          message: 'Tu comentario ha sido actualizado exitosamente.',
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error al actualizar',
        message: 'No se pudo actualizar tu comentario.',
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent('');
  };

  // Manejo de eliminación de comentarios
  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      return;
    }
    
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para eliminar comentarios.',
      });
      return;
    }

    try {
      const deleted = await CommentService.deleteComment(commentId, user.id);
      
      if (deleted) {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
        
        addNotification({
          type: 'success',
          priority: 'medium',
          title: 'Comentario eliminado',
          message: 'Tu comentario ha sido eliminado exitosamente.',
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error al eliminar',
        message: 'No se pudo eliminar tu comentario.',
      });
    }
  };

  // Manejo de respuestas
  const handleReplyToComment = (commentId: number) => {
    setReplyingTo(commentId);
    setReplyContent('');
  };

  const handleSendReply = async (parentId: number) => {
    if (!replyContent.trim() || replyContent.length < 10) return;
    
    if (!isAuthenticated || !user) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Autenticación requerida',
        message: 'Debes iniciar sesión para responder comentarios.',
      });
      return;
    }

    try {
      const reply = await CommentService.replyToComment(parentId, {
        content: replyContent,
        sectionId,
        author: user.displayName,
        avatar: user.avatar,
        userId: user.id,
      }, user.id);

      if (reply) {
        // Recargar comentarios para mostrar las respuestas
        await loadComments();
        
        setReplyingTo(null);
        setReplyContent('');

        addNotification({
          type: 'success',
          priority: 'medium',
          title: 'Respuesta enviada',
          message: 'Tu respuesta ha sido publicada exitosamente.',
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        priority: 'high',
        title: 'Error al responder',
        message: 'No se pudo enviar tu respuesta.',
      });
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyContent('');
  };

  return (
    <div className={`mt-8 pt-8 border-t theme-border ${className}`}>
      {/* Votación de utilidad */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold theme-text-primary">{title}</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleVote('up')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg theme-border transition-all hover:scale-105 animate-theme-hover"
            style={{ 
              backgroundColor: 'var(--color-success)', 
              opacity: '0.2',
              color: 'var(--color-success)', 
              borderColor: 'var(--color-success)' 
            }}
          >
            <i className="fas fa-thumbs-up icon-success"></i>
            <span>{usefulVotes.up}</span>
          </button>
          <button
            onClick={() => handleVote('down')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg theme-border transition-all hover:scale-105 animate-theme-hover"
            style={{ 
              backgroundColor: 'var(--color-error)', 
              opacity: '0.2',
              color: 'var(--color-error)', 
              borderColor: 'var(--color-error)' 
            }}
          >
            <i className="fas fa-thumbs-down icon-error"></i>
            <span>{usefulVotes.down}</span>
          </button>
        </div>
      </div>

      {/* Formulario de comentarios */}
      <div className="mb-6">
        <h4 className="text-lg font-bold theme-text-primary mb-4">Comentarios</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="theme-input w-full rounded-lg px-4 py-3 resize-none"
            style={{ 
              backgroundColor: 'var(--color-surface)', 
              borderColor: 'var(--color-border)', 
              color: 'var(--color-text)' 
            }}
            placeholder="Comparte tu experiencia o pregunta..."
            disabled={isSubmitting}
          />
          {newComment.length > 0 && newComment.length < 10 && (
            <div className="text-sm" style={{ color: 'var(--color-error)' }}>Mínimo 10 caracteres</div>
          )}
          <div className="flex justify-between items-center">
            <div className="text-xs theme-text-secondary">{newComment.length}/500</div>
            <button
              type="submit"
              disabled={isSubmitting || newComment.length < 10}
              className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 animate-theme-hover"
              style={{ 
                background: 'var(--gradient-primary)', 
                color: 'var(--color-text)', 
                border: '1px solid var(--color-primary)' 
              }}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner icon-animate-spin mr-2"></i>
                  Publicando...
                </>
              ) : (
                'Comentar'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">
            <i className="fas fa-spinner icon-animate-spin mr-2" style={{ color: 'var(--color-primary)' }}></i>
            <span className="theme-text-secondary">Cargando comentarios...</span>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 theme-text-secondary">
            <i className="fas fa-comments mb-4 text-3xl" style={{ color: 'var(--color-primary)', opacity: '0.5' }}></i>
            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="rounded-xl p-4 card-hover animate-theme-hover" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', border: '1px solid' }}>
              <div className="flex items-start gap-3">
                <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" style={{ borderColor: 'var(--color-border)', border: '2px solid' }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold theme-text-primary">{comment.author}</span>
                      <span className="text-xs theme-text-muted">{comment.time}</span>
                      {comment.isEdited && (
                        <span className="text-xs px-2 py-1 rounded theme-badge" style={{ backgroundColor: 'var(--color-warning)', opacity: '0.2', color: 'var(--color-warning)' }}>
                          Editado
                        </span>
                      )}
                    </div>
                    {/* Mostrar botones de edición/eliminación solo para el autor del comentario */}
                    {user && comment.userId === user.id && (
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleEditComment(comment.id, comment.content)}
                          className="p-1 rounded hover:bg-opacity-20 transition-colors text-xs" 
                          style={{ color: 'var(--color-text-secondary)' }}
                          title="Editar comentario"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="p-1 rounded hover:bg-opacity-20 transition-colors text-xs" 
                          style={{ color: 'var(--color-error)' }}
                          title="Eliminar comentario"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {editingComment === comment.id ? (
                    <div className="space-y-3">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        className="theme-input w-full rounded-lg px-3 py-2 resize-none text-sm"
                        style={{ 
                          backgroundColor: 'var(--color-input-bg)', 
                          borderColor: 'var(--color-input-border)', 
                          color: 'var(--color-text)' 
                        }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(comment.id)}
                          disabled={editContent.length < 10}
                          className="px-3 py-1 text-xs rounded-lg font-semibold transition-all disabled:opacity-50"
                          style={{ 
                            background: 'var(--gradient-primary)', 
                            color: 'var(--color-text)' 
                          }}
                        >
                          Guardar
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-3 py-1 text-xs rounded-lg font-semibold transition-all"
                          style={{ 
                            backgroundColor: 'var(--color-surface)', 
                            borderColor: 'var(--color-border)', 
                            color: 'var(--color-text)', 
                            border: '1px solid' 
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="theme-text-secondary text-sm mb-3">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleCommentLike(comment.id)}
                          className={`flex items-center gap-1 text-xs transition-colors hover:scale-105 animate-theme-hover ${
                            likedComments.has(comment.id) 
                              ? 'theme-text-primary' 
                              : 'theme-text-secondary hover:theme-text-primary'
                          }`}
                        >
                          <i className={`fas fa-thumbs-up ${
                            likedComments.has(comment.id) ? 'icon-primary' : ''
                          }`} style={{ color: likedComments.has(comment.id) ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}></i>
                          <span>{comment.likes}</span>
                        </button>
                        <button 
                          onClick={() => handleReplyToComment(comment.id)}
                          className="text-xs theme-text-secondary hover:theme-text-primary transition-colors hover:scale-105 animate-theme-hover"
                        >
                          <i className="fas fa-reply mr-1"></i>
                          Responder
                        </button>
                      </div>

                      {/* Formulario de respuesta */}
                      {replyingTo === comment.id && (
                        <div className="mt-4 pl-4 border-l-2" style={{ borderColor: 'var(--color-primary)' }}>
                          <div className="space-y-3">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              rows={3}
                              className="theme-input w-full rounded-lg px-3 py-2 resize-none text-sm"
                              style={{ 
                                backgroundColor: 'var(--color-input-bg)', 
                                borderColor: 'var(--color-input-border)', 
                                color: 'var(--color-text)' 
                              }}
                              placeholder={`Responder a ${comment.author}...`}
                            />
                            {replyContent.length > 0 && replyContent.length < 10 && (
                              <div className="text-xs" style={{ color: 'var(--color-error)' }}>Mínimo 10 caracteres</div>
                            )}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSendReply(comment.id)}
                                disabled={replyContent.length < 10}
                                className="px-3 py-1 text-xs rounded-lg font-semibold transition-all disabled:opacity-50"
                                style={{ 
                                  background: 'var(--gradient-primary)', 
                                  color: 'var(--color-text)' 
                                }}
                              >
                                Responder
                              </button>
                              <button
                                onClick={handleCancelReply}
                                className="px-3 py-1 text-xs rounded-lg font-semibold transition-all"
                                style={{ 
                                  backgroundColor: 'var(--color-surface)', 
                                  borderColor: 'var(--color-border)', 
                                  color: 'var(--color-text)', 
                                  border: '1px solid' 
                                }}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mostrar respuestas si las hay */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 space-y-3" style={{ borderColor: 'var(--color-border)' }}>
                          {comment.replies.map(reply => (
                            <div key={reply.id} className="rounded-lg p-3" style={{ backgroundColor: 'var(--color-surface-light)' }}>
                              <div className="flex items-start gap-2">
                                <img src={reply.avatar} alt={reply.author} className="w-8 h-8 rounded-full" style={{ borderColor: 'var(--color-border)', border: '1px solid' }} />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold theme-text-primary text-sm">{reply.author}</span>
                                    <span className="text-xs theme-text-muted">{reply.time}</span>
                                  </div>
                                  <p className="theme-text-secondary text-xs">{reply.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 