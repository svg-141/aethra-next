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

  const canAccess = auth.user
    ? enhancedGuideService.canAccessGuide(guide, auth.user.plan)
    : !guide.isPremium;

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
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  }, [auth.user, guide.id, isLiking]);

  const handleDownload = useCallback(async () => {
    if (!auth.user || isDownloading || !canAccess) return;
    setIsDownloading(true);
    try {
      const success = await enhancedGuideService.downloadGuide(auth.user.id, guide.id);
      if (success) {
        onDownload?.(guide.id);
      }
    } catch (error) {
      console.error('Error downloading guide:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [auth.user, guide.id, isDownloading, canAccess, onDownload]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return { bg: 'var(--color-success)', opacity: '0.15', text: 'var(--color-success)', border: 'var(--color-success)', borderOpacity: '0.3' };
      case 'intermediate': return { bg: 'var(--color-warning)', opacity: '0.15', text: 'var(--color-warning)', border: 'var(--color-warning)', borderOpacity: '0.3' };
      case 'advanced': return { bg: 'var(--color-error)', opacity: '0.15', text: 'var(--color-error)', border: 'var(--color-error)', borderOpacity: '0.3' };
      default: return { bg: 'var(--color-primary)', opacity: '0.15', text: 'var(--color-primary)', border: 'var(--color-primary)', borderOpacity: '0.3' };
    }
  };

  const difficultyColors = getDifficultyColor(guide.difficulty);

  return (
    <div
      className="guide-card-new"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Gradient Header */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '180px',
        overflow: 'hidden',
        background: guide.gradient
          ? `linear-gradient(135deg, ${guide.gradient})`
          : 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.2))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Decorative pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)',
          backgroundSize: '100px 100px'
        }} />

        {/* Game name text logo */}
        <div style={{
          fontSize: '48px',
          fontWeight: '900',
          color: 'rgba(255, 255, 255, 0.15)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)'
        }}>
          {guide.name}
        </div>

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
        }} />

        {/* Game Icon Badge */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          padding: '8px 12px',
          borderRadius: '12px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          fontSize: '12px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {guide.name}
        </div>

        {/* Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          alignItems: 'flex-end'
        }}>
          {guide.isPremium && (
            <span style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '600',
              backgroundColor: 'var(--color-warning)',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
              <span>👑</span>
              <span>PREMIUM</span>
            </span>
          )}
          {guide.isNew && (
            <span style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '600',
              backgroundColor: 'var(--color-success)',
              color: '#fff',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
              NUEVO
            </span>
          )}
          {guide.isFeatured && (
            <span style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '600',
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
              DESTACADO
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '12px'
      }}>
        {/* Title */}
        <h3 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: 'var(--color-text)',
          margin: 0,
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {guide.meta}
        </h3>

        {/* Author & Game */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--color-text-secondary)'
        }}>
          <span>por <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>{guide.author}</span></span>
          <span style={{
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            background: 'var(--color-primary)',
            opacity: '0.2',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
            borderOpacity: '0.3'
          }}>
            {guide.name}
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          margin: 0,
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {guide.description}
        </p>

        {/* Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          paddingTop: '8px',
          borderTop: '1px solid var(--color-border)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text)' }}>
              {guide.views > 999 ? `${(guide.views / 1000).toFixed(1)}k` : guide.views}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Vistas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-text)' }}>
              {guide.downloads > 999 ? `${(guide.downloads / 1000).toFixed(1)}k` : guide.downloads}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Descargas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-error)' }}>
              {guide.likes || 0}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Likes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-warning)' }}>
              {guide.rating.toFixed(1)}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Rating</div>
          </div>
        </div>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginTop: 'auto'
        }}>
          <span style={{
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '600',
            background: difficultyColors.bg,
            opacity: difficultyColors.opacity,
            color: difficultyColors.text,
            border: `1px solid ${difficultyColors.border}`
          }}>
            {guide.difficulty === 'beginner' ? 'Principiante' :
             guide.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
          </span>
          <span style={{
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '600',
            background: 'var(--color-primary)',
            opacity: '0.2',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-primary)'
          }}>
            {guide.type}
          </span>
          {guide.estimatedTime && (
            <span style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: '600',
              background: 'var(--color-secondary)',
              opacity: '0.2',
              color: 'var(--color-secondary)',
              border: '1px solid var(--color-secondary)'
            }}>
              ⏱️ {guide.estimatedTime}
            </span>
          )}
        </div>

        {/* Action Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          paddingTop: '12px',
          borderTop: '1px solid var(--color-border)'
        }}>
          {/* Main Action Button */}
          {canAccess ? (
            <button
              onClick={handleView}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                background: 'var(--gradient-primary)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Ver Guía
            </button>
          ) : (
            <RequirePremium showPrompt={false}>
              <button
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1))',
                  color: '#fbbf24',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>👑</span>
                <span>Premium</span>
              </button>
            </RequirePremium>
          )}

          {/* Like Button */}
          {auth.user && canAccess && (
            <button
              onClick={handleLike}
              disabled={isLiking}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                background: interactions.userLiked
                  ? 'var(--color-error)'
                  : 'var(--color-surface-hover)',
                opacity: interactions.userLiked ? '0.2' : '1',
                color: interactions.userLiked ? 'var(--color-error)' : 'var(--color-text-secondary)',
                border: interactions.userLiked ? '1px solid var(--color-error)' : '1px solid var(--color-border)',
                cursor: isLiking ? 'wait' : 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (!isLiking) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {interactions.userLiked ? '❤️' : '🤍'}
            </button>
          )}

          {/* Download Button */}
          {auth.user && canAccess && (
            <button
              onClick={handleDownload}
              disabled={isDownloading || interactions.userDownloaded}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                background: interactions.userDownloaded
                  ? 'var(--color-success)'
                  : 'var(--color-surface-hover)',
                opacity: interactions.userDownloaded ? '0.2' : '1',
                color: interactions.userDownloaded ? 'var(--color-success)' : 'var(--color-text-secondary)',
                border: interactions.userDownloaded ? '1px solid var(--color-success)' : '1px solid var(--color-border)',
                cursor: interactions.userDownloaded ? 'not-allowed' : isDownloading ? 'wait' : 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
            >
              {isDownloading ? '⏳' : interactions.userDownloaded ? '✅' : '📥'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
