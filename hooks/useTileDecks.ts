import { useState, useEffect } from 'react';
import { shuffleArray } from '@/models/array';
import { ACHIEVEMENT_KEY } from '@/models/achievement';
import { TILE_TYPE } from '@/models/task-tile';

const BASE_TILE_SET: (4 | 5 | 6 | 7)[] = [4, 4, 5, 5, 6, 6];
const EXTENDED_TILE_SET: (4 | 5 | 6 | 7)[] = [4, 4, 5, 5, 6, 6, 7];

export function useTileDecks(unlockedAchievementIds: ACHIEVEMENT_KEY[]) {
  // Generate tile sets based on achievements
  const grainTiles = unlockedAchievementIds.includes(ACHIEVEMENT_KEY.FARM) 
    ? EXTENDED_TILE_SET 
    : BASE_TILE_SET;
  
  const cityTiles = unlockedAchievementIds.includes(ACHIEVEMENT_KEY.CASTLE) 
    ? EXTENDED_TILE_SET 
    : BASE_TILE_SET;
    
  const forestTiles = unlockedAchievementIds.includes(ACHIEVEMENT_KEY.DEER) 
    ? EXTENDED_TILE_SET 
    : BASE_TILE_SET;

  // Create shuffled decks
  const [decks, setDecks] = useState(() => ({
    [TILE_TYPE.GRAIN]: shuffleArray(grainTiles),
    [TILE_TYPE.CITY]: shuffleArray(cityTiles),
    [TILE_TYPE.FOREST]: shuffleArray(forestTiles),
    [TILE_TYPE.RAILROAD]: shuffleArray(BASE_TILE_SET),
    [TILE_TYPE.RIVER]: shuffleArray(BASE_TILE_SET),
  }));

  // Update decks when achievements change
  useEffect(() => {
    setDecks({
      [TILE_TYPE.GRAIN]: shuffleArray(grainTiles),
      [TILE_TYPE.CITY]: shuffleArray(cityTiles),
      [TILE_TYPE.FOREST]: shuffleArray(forestTiles),
      [TILE_TYPE.RAILROAD]: shuffleArray(BASE_TILE_SET),
      [TILE_TYPE.RIVER]: shuffleArray(BASE_TILE_SET),
    });
  }, [grainTiles, cityTiles, forestTiles]); // Re-shuffle when tile sets change

  const drawFromDeck = (tileType: TILE_TYPE): (4 | 5 | 6 | 7) | null => {
    const currentDeck = decks[tileType];
    if (currentDeck.length === 0) return null;

    const drawnValue = currentDeck[0];
    setDecks(prev => ({
      ...prev,
      [tileType]: prev[tileType].slice(1)
    }));

    return drawnValue;
  };

  return {
    decks: {
      [TILE_TYPE.GRAIN]: decks[TILE_TYPE.GRAIN],
      [TILE_TYPE.CITY]: decks[TILE_TYPE.CITY],
      [TILE_TYPE.FOREST]: decks[TILE_TYPE.FOREST],
      [TILE_TYPE.RAILROAD]: decks[TILE_TYPE.RAILROAD],
      [TILE_TYPE.RIVER]: decks[TILE_TYPE.RIVER],
    },
    drawFromDeck,
  };
}