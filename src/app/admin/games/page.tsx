"use client";

import React, { useState, useEffect } from 'react';
import { getGames, deleteGame } from '../../../backend/services/gameService';
import CreateGameModal from './components/CreateGameModal';
import EditGameModal from './components/EditGameModal';

interface Game {
  id: string;
  name: string;
  genre: string;
  platform: string;
}

export default function AdminGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const gamesData = await getGames();
      setGames(gamesData as Game[]);
    };
    fetchGames();
  }, []);

  const handleDeleteGame = async (gameId: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      await deleteGame(gameId);
      setGames(games.filter(game => game.id !== gameId));
    }
  };

  const handleGameCreated = (game: Game) => {
    setGames([...games, game]);
  };

  const handleGameUpdated = (game: Game) => {
    setGames(games.map(g => (g.id === game.id ? game : g)));
  };

  const handleEditClick = (game: Game) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };

  return (
    <div className="theme-section p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold theme-text-primary">Gestión de Juegos</h1>
        <button onClick={() => setIsCreateModalOpen(true)} className="theme-button-primary">Crear Juego</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full theme-bg-surface">
          <thead>
            <tr className="theme-border-b">
              <th className="py-3 px-4 text-left theme-text-secondary">ID</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Nombre</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Género</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Plataforma</th>
              <th className="py-3 px-4 text-left theme-text-secondary">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.id} className="theme-border-b">
                <td className="py-3 px-4 theme-text-primary">{game.id}</td>
                <td className="py-3 px-4 theme-text-primary">{game.name}</td>
                <td className="py-3 px-4 theme-text-primary">{game.genre}</td>
                <td className="py-3 px-4 theme-text-primary">{game.platform}</td>
                <td className="py-3 px-4 theme-text-primary">
                  <button onClick={() => handleEditClick(game)} className="theme-button-secondary mr-2">Editar</button>
                  <button onClick={() => handleDeleteGame(game.id)} className="theme-button-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isCreateModalOpen && <CreateGameModal onClose={() => setIsCreateModalOpen(false)} onGameCreated={handleGameCreated} />}
      {isEditModalOpen && selectedGame && <EditGameModal game={selectedGame} onClose={() => setIsEditModalOpen(false)} onGameUpdated={handleGameUpdated} />}
    </div>
  );
}
