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
    <div className="bg-gradient-to-br from-[#1a0933] to-[#2a0845] rounded-2xl p-6 border border-purple-900/60 mb-6 hover:border-purple-700/60 transition-all">
      <div className="flex items-start">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-900/40 to-pink-900/30 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-purple-500/40 overflow-hidden mr-4">
          <img src={post.author.avatar} alt={`Avatar de ${post.author.name}`} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-xs bg-purple-900/30 text-purple-200 px-2 py-1 rounded-full">{tag}</span>
            ))}
            <span className="text-xs text-gray-400">{formatTime(post.createdAt)}</span>
            {post.isPinned && (
              <span className="text-xs bg-yellow-900/30 text-yellow-200 px-2 py-1 rounded-full">
                📌 Fijado
              </span>
            )}
            {post.isLocked && (
              <span className="text-xs bg-red-900/30 text-red-200 px-2 py-1 rounded-full">
                🔒 Cerrado
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-white">{post.title}</h4>
            <span className="text-xs text-gray-400">por {post.author.name}</span>
            <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded-full">
              Nivel {post.author.level}
            </span>
          </div>
          <p className="text-sm text-gray-300 mb-3">{post.content}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-purple-300 transition-colors"
            >
              <i className="fas fa-heart"></i> {post.likes} me gusta
            </button>
            <button 
              onClick={handleComment}
              className="flex items-center gap-1 hover:text-purple-300 transition-colors"
            >
              <i className="fas fa-comment"></i> {post.comments} comentarios
            </button>
            <span className="flex items-center gap-1">
              <i className="fas fa-eye"></i> {post.views} vistas
            </span>
            <button 
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-purple-300 transition-colors"
            >
              <i className="fas fa-share"></i> Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 