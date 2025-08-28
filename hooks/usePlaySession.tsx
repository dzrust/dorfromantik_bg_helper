import { TILE_TYPE } from '@/models/task-tile';
import { useCallback } from 'react';
import { useAchievements } from './useAchievements';
import { useGameState } from './useGameState';
import { useTileDecks } from './useTileDecks';

export function usePlaySession() {
  const { unlockedAchievementIds, isLoading: achievementsLoading } = useAchievements();
  const { decks, drawFromDeck } = useTileDecks(unlockedAchievementIds);
  const { inPlay, completed, addTileToPlay, completeTile, canDrawTile } = useGameState();

  const createTileDrawer = useCallback(
    (tileType: TILE_TYPE) => () => {
      if (!canDrawTile) {
        throw new Error('Cannot draw more than 3 tiles into play');
      }

      const value = drawFromDeck(tileType);
      if (value === null) {
        throw new Error(`No more ${tileType} tiles available`);
      }

      addTileToPlay({ type: tileType, value });
    },
    [canDrawTile, drawFromDeck, addTileToPlay]
  );

  const canDrawType = useCallback(
    (tileType: TILE_TYPE) => canDrawTile && decks[tileType].length > 0,
    [canDrawTile, decks]
  );

  return {
    // Game state
    inPlay,
    completed,
    isLoading: achievementsLoading,

    // Deck information
    decks,

    // Actions
    drawGrain: createTileDrawer(TILE_TYPE.GRAIN),
    drawCity: createTileDrawer(TILE_TYPE.CITY),
    drawForest: createTileDrawer(TILE_TYPE.FOREST),
    drawRailroad: createTileDrawer(TILE_TYPE.RAILROAD),
    drawRiver: createTileDrawer(TILE_TYPE.RIVER),
    completeTile,

    // Computed state
    canDrawGrain: canDrawType(TILE_TYPE.GRAIN),
    canDrawCity: canDrawType(TILE_TYPE.CITY),
    canDrawForest: canDrawType(TILE_TYPE.FOREST),
    canDrawRailroad: canDrawType(TILE_TYPE.RAILROAD),
    canDrawRiver: canDrawType(TILE_TYPE.RIVER),
  };
}
