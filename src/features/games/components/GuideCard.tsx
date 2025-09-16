import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GuideCardProps } from '../types/games.types';
import { useAuth } from '../../../context/AuthContext';
import { enhancedGuideService } from '../services/guideService';
import { RequirePremium } from '../../../components/auth/ProtectedRoute';

export default function GuideCard({ guide, onView, onDownload, onRate }: GuideCardProps) {
  const auth = useAuth();
  const router = useRouter();
  const [isLiking, setIsLiking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRating, setIsRating] = useState(false);

  // Check if user can access this guide
  const canAccess = auth.user
    ? enhancedGuideService.canAccessGuide(guide, auth.user.plan)
    : !guide.isPremium;

  // Get user interactions
  const interactions = auth.user && guide.interactions
    ? guide.interactions
    : { userLiked: false, userDownloaded: false };

  const handleView = useCallback(() => {
    if (!canAccess) return;
    router.push(`/guide/${guide.id}`);
    onView?.(guide.id);
  }, [canAccess, guide.id, onView, router]);

  const handleLike = useCallback(async () => {
    if (!auth.user || isLiking) return;

    setIsLiking(true);
    try {
      await enhancedGuideService.toggleLike(auth.user.id, guide.id);
      // Refresh user data to get updated interactions
      // await auth.refreshUser(); // Disabled to prevent flickering
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  }, [auth.user, auth.refreshUser, guide.id, isLiking]);

  const handleDownload = useCallback(async () => {
    if (!auth.user || isDownloading || !canAccess) return;

    setIsDownloading(true);
    try {
      const success = await enhancedGuideService.downloadGuide(auth.user.id, guide.id);
      if (success) {
        onDownload?.(guide.id);
        // Refresh user data to get updated interactions
        // await auth.refreshUser(); // Disabled to prevent flickering
      }
    } catch (error) {
      console.error('Error downloading guide:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [auth.user, auth.refreshUser, guide.id, isDownloading, canAccess, onDownload]);

  const handleRate = useCallback(async (rating: number) => {
    if (!auth.user || isRating || !canAccess) return;

    setIsRating(true);
    try {
      await enhancedGuideService.rateGuide(auth.user.id, guide.id, rating);
      onRate?.(guide.id, rating);
      // Refresh user data to get updated interactions
      // await auth.refreshUser(); // Disabled to prevent flickering
    } catch (error) {
      console.error('Error rating guide:', error);
    } finally {
      setIsRating(false);
    }
  }, [auth.user, auth.refreshUser, guide.id, isRating, canAccess, onRate]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star text-xs`}
        style={{ color: i < Math.floor(rating) ? 'var(--color-warning)' : 'var(--color-text-secondary)' }}
      />
    ));
  };

  return (
    <div className={`guide-card flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 group h-full animate-theme-hover`} style={{ background: 'var(--gradient-surface)', borderColor: 'var(--color-border)' }}>
      <div className="relative h-48 overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--color-surface)' }}>
        <img src={guide.image} alt={`Guía ${guide.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          {guide.isFeatured && (
            <span className="px-2 py-1 text-xs font-medium rounded-full border" style={{ backgroundColor: 'var(--color-warning)', opacity: '0.2', color: 'var(--color-warning)', borderColor: 'var(--color-warning)' }}>
              ⭐ Destacado
            </span>
          )}
          {guide.isNew && (
            <span className="px-2 py-1 text-xs font-medium rounded-full border" style={{ backgroundColor: 'var(--color-success)', opacity: '0.2', color: 'var(--color-success)', borderColor: 'var(--color-success)' }}>
              🆕 Nuevo
            </span>
          )}
          <span className={`px-2 py-1 text-xs font-medium rounded-full border`} style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
            {guide.type}
          </span>
          {guide.isPremium && (
            <span className="px-2 py-1 text-xs font-medium rounded-full border" style={{ backgroundColor: 'var(--color-warning)', opacity: '0.2', color: 'var(--color-warning)', borderColor: 'var(--color-warning)' }}>
              👑 Premium
            </span>
          )}
        </div>
        
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <img src={guide.icon} alt={guide.name} className="w-10 h-10 rounded-lg border-2" style={{ borderColor: 'var(--color-border)' }} />
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{guide.name}</h3>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
            <i className="fas fa-sync-alt"></i>
            Actualizado: {guide.updated}
          </span>
          <span className="text-xs theme-text-secondary flex items-center gap-1">
            <i className="fas fa-clock"></i>
            {guide.estimatedTime}
          </span>
        </div>
        
        <h4 className="text-lg font-bold theme-text-primary mb-3">{guide.meta}</h4>
        <p className="text-sm theme-text-secondary mb-4 line-clamp-3">{guide.description}</p>
        
        {/* Author and difficulty */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs theme-text-secondary">
            por <span style={{ color: 'var(--color-primary)' }}>{guide.author}</span>
          </span>
          <span className={`text-xs px-2 py-1 rounded-full`} style={{
            backgroundColor: guide.difficulty === 'beginner' ? 'var(--color-success)' :
                           guide.difficulty === 'intermediate' ? 'var(--color-warning)' : 'var(--color-error)',
            opacity: '0.2',
            color: guide.difficulty === 'beginner' ? 'var(--color-success)' :
                   guide.difficulty === 'intermediate' ? 'var(--color-warning)' : 'var(--color-error)'
          }}>
            {guide.difficulty === 'beginner' ? 'Principiante' :
             guide.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
          </span>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs theme-text-secondary">
          <span className="flex items-center gap-1">
            <i className="fas fa-eye"></i>
            {(guide.views || 0).toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-download"></i>
            {(guide.downloads || 0).toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-heart"></i>
            {(guide.likes || 0).toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-comments"></i>
            {(guide.comments || 0).toLocaleString()}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {guide.tags.map((tag, i) => (
            <span key={i} className={`px-2 py-1 text-xs rounded-full`} style={{ backgroundColor: 'var(--color-primary)', opacity: '0.2', color: 'var(--color-primary)' }}>
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2">
            {canAccess ? (
              <button
                onClick={handleView}
                className="text-sm font-medium flex items-center gap-2 transition-colors animate-theme-hover theme-text-primary hover:theme-text-primary"
              >
                Ver guía completa
                <i className="fas fa-arrow-right text-xs"></i>
              </button>
            ) : (
              <RequirePremium showPrompt={false}>
                <button
                  className="text-sm font-medium flex items-center gap-2 transition-colors animate-theme-hover cursor-not-allowed opacity-60"
                  style={{ color: 'var(--color-text-secondary)' }}
                  title="Requiere Premium"
                >
                  <i className="fas fa-crown text-xs"></i>
                  Requiere Premium
                </button>
              </RequirePremium>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Like button */}
            {auth.user && canAccess && (
              <button
                onClick={handleLike}
                disabled={isLiking}
                className={`text-xs transition-colors animate-theme-hover ${isLiking ? 'opacity-50' : ''}`}
                style={{
                  color: interactions.userLiked ? 'var(--color-error)' : 'var(--color-text-secondary)'
                }}
                title={interactions.userLiked ? 'Quitar like' : 'Dar like'}
              >
                <i className={`fas fa-heart ${isLiking ? 'fa-spin' : ''}`}></i>
              </button>
            )}

            {/* Download button */}
            {auth.user && canAccess && (
              <button
                onClick={handleDownload}
                disabled={isDownloading || interactions.userDownloaded}
                className={`text-xs transition-colors animate-theme-hover ${isDownloading ? 'opacity-50' : ''}`}
                style={{
                  color: interactions.userDownloaded ? 'var(--color-success)' : 'var(--color-info)'
                }}
                title={interactions.userDownloaded ? 'Ya descargado' : 'Descargar guía'}
              >
                <i className={`fas ${isDownloading ? 'fa-spinner fa-spin' : interactions.userDownloaded ? 'fa-check' : 'fa-download'}`}></i>
              </button>
            )}

            {/* Rating */}
            <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-warning)' }}>
              {renderStars(guide.rating || 0)}
              <span className="ml-1">{(guide.rating || 0).toFixed(1)}</span>
            </div>

            {/* Rate button */}
            {auth.user && canAccess && (
              <button
                onClick={() => handleRate(Math.min(5, (guide.rating || 0) + 0.1))}
                disabled={isRating}
                className={`text-xs transition-colors animate-theme-hover ${isRating ? 'opacity-50' : ''}`}
                style={{ color: 'var(--color-text-secondary)' }}
                title="Calificar guía"
              >
                <i className={`fas fa-star ${isRating ? 'fa-spin' : ''}`}></i>
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
} 