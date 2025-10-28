"use client";

import { useState } from 'react';
import Image from 'next/image';
import { CommentSection } from '../../features/chat';
import { UserCard, AchievementCard, ConnectionCard, SubscriptionCard } from '../../features/profile';
import { SAMPLE_USER, SAMPLE_USER_STATS, SAMPLE_ACHIEVEMENTS, SAMPLE_CONNECTIONS, SAMPLE_SUBSCRIPTION } from '../../features/profile/constants/profile-constants';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const handleEditUser = (userId: string) => {
    console.log('Editar usuario:', userId);
    // Aquí se agregaría la lógica para editar el usuario
  };

  const handleViewProfile = (userId: string) => {
    console.log('Ver perfil completo:', userId);
    // Aquí se agregaría la lógica para ver el perfil completo
  };

  const handleViewAchievement = (achievementId: string) => {
    console.log('Ver logro:', achievementId);
    // Aquí se agregaría la lógica para ver el logro
  };

  const handleShareAchievement = (achievementId: string) => {
    console.log('Compartir logro:', achievementId);
    // Aquí se agregaría la lógica para compartir el logro
  };

  const handleDisconnect = (connectionId: string) => {
    console.log('Desconectar:', connectionId);
    // Aquí se agregaría la lógica para desconectar
  };

  const handleReconnect = (connectionId: string) => {
    console.log('Reconectar:', connectionId);
    // Aquí se agregaría la lógica para reconectar
  };

  const handleManageConnection = (connectionId: string) => {
    console.log('Gestionar conexión:', connectionId);
    // Aquí se agregaría la lógica para gestionar la conexión
  };

  const handleManageSubscription = (subscriptionId: string) => {
    console.log('Administrar suscripción:', subscriptionId);
    // Aquí se agregaría la lógica para administrar la suscripción
  };

  const handleUpgradeSubscription = (subscriptionId: string) => {
    console.log('Mejorar suscripción:', subscriptionId);
    // Aquí se agregaría la lógica para mejorar la suscripción
  };

  const handleCancelSubscription = (subscriptionId: string) => {
    console.log('Cancelar suscripción:', subscriptionId);
    // Aquí se agregaría la lógica para cancelar la suscripción
  };

  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen" style={{ background: 'var(--gradient-background)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header del perfil */}
        <div className="card-profile p-8 mb-8">
          <div className="flex items-center gap-6">
            <Image src={SAMPLE_USER.avatar} alt={SAMPLE_USER.name} width={96} height={96} className="w-24 h-24 rounded-full border-4" style={{ borderColor: 'var(--color-primary)' }} />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold theme-text-primary glow-text">{SAMPLE_USER.name}</h1>
                <span className="theme-badge px-3 py-1 text-sm rounded-full" style={{ background: 'var(--gradient-primary)' }}>
                  Nivel {SAMPLE_USER.level}
                </span>
                {SAMPLE_USER.isVerified && (
                  <span className="icon-info" title="Usuario verificado">
                    <i className="fas fa-check-circle text-lg"></i>
                  </span>
                )}
              </div>
              <p className="theme-text-secondary mb-4">@{SAMPLE_USER.username} • Miembro desde {new Date(SAMPLE_USER.joinDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <i className="fas fa-star icon-accent"></i>
                  <span className="theme-text-primary">4.8/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-trophy icon-primary"></i>
                  <span className="theme-text-primary">{SAMPLE_USER_STATS.achievements} logros</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="fas fa-gamepad icon-success"></i>
                  <span className="theme-text-primary">{SAMPLE_USER_STATS.totalMatches} partidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className={`w-2 h-2 rounded-full ${SAMPLE_USER.isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></i>
                  <span className="theme-text-primary">{SAMPLE_USER.isOnline ? 'En línea' : 'Desconectado'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="flex items-center gap-1 theme-card rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`theme-button flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'theme-text-primary'
                : 'theme-text-secondary hover:theme-text-primary'
            }`}
            style={activeTab === 'overview' ? { background: 'var(--gradient-primary)' } : {}}
          >
            <i className="fas fa-chart-bar icon-theme mr-2"></i>
            Estadísticas
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`theme-button flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'achievements'
                ? 'theme-text-primary'
                : 'theme-text-secondary hover:theme-text-primary'
            }`}
            style={activeTab === 'achievements' ? { background: 'var(--gradient-primary)' } : {}}
          >
            <i className="fas fa-trophy icon-theme mr-2"></i>
            Logros
          </button>
          <button
            onClick={() => setActiveTab('connections')}
            className={`theme-button flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'connections'
                ? 'theme-text-primary'
                : 'theme-text-secondary hover:theme-text-primary'
            }`}
            style={activeTab === 'connections' ? { background: 'var(--gradient-primary)' } : {}}
          >
            <i className="fas fa-link icon-theme mr-2"></i>
            Conexiones
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`theme-button flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'subscription'
                ? 'theme-text-primary'
                : 'theme-text-secondary hover:theme-text-primary'
            }`}
            style={activeTab === 'subscription' ? { background: 'var(--gradient-primary)' } : {}}
          >
            <i className="fas fa-crown icon-theme mr-2"></i>
            Suscripción
          </button>
        </div>

        {/* Contenido de las tabs */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Tarjeta de usuario principal */}
            <UserCard 
              user={SAMPLE_USER}
              stats={SAMPLE_USER_STATS}
              onEdit={handleEditUser}
              onViewProfile={handleViewProfile}
            />

            {/* Estadísticas por juego */}
            <div className="theme-card p-6 card-hover">
              <h3 className="text-xl font-bold theme-text-primary mb-6">Estadísticas por Juego</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SAMPLE_USER.preferences.gaming.favoriteGames.map((game, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg theme-bg-surface">
                    <span className="theme-text-primary font-medium">{game}</span>
                    <div className="text-right">
                      <div className="text-sm theme-text-primary">
                        {game === 'Valorant' && 'Diamond 2'}
                        {game === 'CS2' && 'MG2'}
                        {game === 'League of Legends' && 'Platinum 1'}
                      </div>
                      <div className="text-xs theme-text-secondary">
                        {game === 'Valorant' && '72.3% WR'}
                        {game === 'CS2' && '58.9% WR'}
                        {game === 'League of Legends' && '65.8% WR'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="theme-card p-6 card-hover">
              <h3 className="text-xl font-bold theme-text-primary mb-6">Logros Desbloqueados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAMPLE_ACHIEVEMENTS.filter(ach => ach.isUnlocked).map(achievement => (
                  <AchievementCard 
                    key={achievement.id}
                    achievement={achievement}
                    onView={handleViewAchievement}
                    onShare={handleShareAchievement}
                  />
                ))}
              </div>
            </div>

            <div className="theme-card p-6 card-hover">
              <h3 className="text-xl font-bold theme-text-primary mb-6">Logros Pendientes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SAMPLE_ACHIEVEMENTS.filter(ach => !ach.isUnlocked).map(achievement => (
                  <AchievementCard 
                    key={achievement.id}
                    achievement={achievement}
                    onView={handleViewAchievement}
                    onShare={handleShareAchievement}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-6">
            <div className="theme-card p-6 card-hover">
              <h3 className="text-xl font-bold theme-text-primary mb-6">Conexiones de Plataforma</h3>
              <div className="space-y-4">
                {SAMPLE_CONNECTIONS.map(connection => (
                  <ConnectionCard 
                    key={connection.id}
                    connection={connection}
                    onDisconnect={handleDisconnect}
                    onReconnect={handleReconnect}
                    onManage={handleManageConnection}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <SubscriptionCard 
              subscription={SAMPLE_SUBSCRIPTION}
              onManage={handleManageSubscription}
              onUpgrade={handleUpgradeSubscription}
              onCancel={handleCancelSubscription}
            />
          </div>
        )}

        {/* Sección de feedback */}
        <div className="mt-12">
          <CommentSection
            sectionId="profile-feedback"
            initialComments={[
              {
                id: 1,
                author: 'ProfileViewer',
                avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
                content: '¡Excelente perfil! Me gusta cómo organizas las estadísticas por juego.',
                time: 'hace 1 día',
                likes: 5,
                section: 'profile-feedback',
              },
              {
                id: 2,
                author: 'StatsLover',
                avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
                content: '¿Podrían agregar más gráficos de progreso? Sería muy útil ver la evolución.',
                time: 'hace 3 días',
                likes: 3,
                section: 'profile-feedback',
              },
            ]}
            initialVotes={{ up: 89, down: 2 }}
            title="¿Cómo te gusta tu perfil?"
            className="theme-card p-6 card-hover"
          />
        </div>
      </div>

    </section>
  );
} 