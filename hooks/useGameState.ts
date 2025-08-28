import { useState } from 'react';
import { TaskTile, TILE_STATE } from '@/models/task-tile';

export function useGameState() {
  const [tileId, setTileId] = useState(1);
  const [inPlay, setInPlay] = useState<TaskTile[]>([]);
  const [completed, setCompleted] = useState<TaskTile[]>([]);

  const addTileToPlay = (tile: Omit<TaskTile, 'id' | 'state'>) => {
    if (inPlay.length >= 3) {
      throw new Error('Cannot have more than 3 tiles in play');
    }

    const newTile: TaskTile = {
      ...tile,
      id: tileId,
      state: TILE_STATE.INPLAY,
    };

    setInPlay(prev => [...prev, newTile]);
    setTileId(prev => prev + 1);
  };

  const completeTile = (tile: TaskTile) => {
    if (!inPlay.find(t => t.id === tile.id)) {
      throw new Error('Cannot complete tile that is not in play');
    }

    setInPlay(prev => prev.filter(t => t.id !== tile.id));
    setCompleted(prev => [...prev, { ...tile, state: TILE_STATE.COMPLETE }]);
  };

  const canDrawTile = inPlay.length < 3;

  return {
    inPlay,
    completed,
    addTileToPlay,
    completeTile,
    canDrawTile,
  };
}