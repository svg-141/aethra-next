import React, { useState } from 'react';
import { createGame } from '../../../../../backend/services/gameService';

interface CreateGameModalProps {
  onClose: () => void;
  onGameCreated: (game: any) => void;
}

export default function CreateGameModal({ onClose, onGameCreated }: CreateGameModalProps) {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const gameData = { name, genre, platform };
    const gameId = await createGame(gameData);
    onGameCreated({ id: gameId, ...gameData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="theme-bg-surface p-8 rounded-lg">
        <h2 className="text-2xl font-bold theme-text-primary mb-6">Crear Juego</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Género</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block theme-text-secondary mb-2">Plataforma</label>
            <input
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2 theme-bg-input theme-text-primary rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="theme-button-secondary mr-2">Cancelar</button>
            <button type="submit" className="theme-button-primary">Crear</button>
          </div>
        </form>
      </div>
    </div>
  );
}
