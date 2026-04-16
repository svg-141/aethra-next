import React from 'react';
import { PostCardProps } from '../types/community.types';

export default function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const handleLike = () => {
    onLike?.(post.id);
  };

  const handleComment = () => {
    onComment?.(post.id);
  };

  const handleShare = () => {
    onShare?.(post.id);
  };

  return (
    <div className="module-card module-card-interactive p-6 mb-6">
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 overflow-hidden mr-4" style={{ background: 'var(--gradient-primary)', borderColor: 'var(--color-primary)', opacity: '0.8' }}>
          <img src={post.author.avatar} alt={`Avatar de ${post.author.name}`} className="w-full h-full object-cover image-fade" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {post.tags.map((tag, i) => (
              <span key={i} className="module-badge">{tag}</span>
            ))}
            <span className="module-text-muted text-xs">{formatTime(post.createdAt)}</span>
            {post.isPinned && (
              <span className="module-badge module-badge-warning">
                📌 Fijado
              </span>
            )}
            {post.isLocked && (
              <span className="module-badge module-badge-danger">
                🔒 Cerrado
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="module-text-title text-lg mb-0">{post.title}</h4>
            <span className="module-text-muted text-xs">por {post.author.name}</span>
            <span className="module-badge">
              Nivel {post.author.level}
            </span>
          </div>
          <p className="module-text-muted text-sm mb-3">{post.content}</p>
          <div className="flex items-center gap-4 text-xs module-text-muted">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-theme-primary transition-colors animate-theme-hover"
            >
              <i className="fas fa-heart"></i> {post.likes} me gusta
            </button>
            <button 
              onClick={handleComment}
              className="flex items-center gap-1 hover:text-theme-primary transition-colors animate-theme-hover"
            >
              <i className="fas fa-comment"></i> {post.comments} comentarios
            </button>
            <span className="flex items-center gap-1">
              <i className="fas fa-eye"></i> {post.views} vistas
            </span>
            <button 
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-theme-primary transition-colors animate-theme-hover"
            >
              <i className="fas fa-share"></i> Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 