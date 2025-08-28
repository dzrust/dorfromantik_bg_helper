import { Achievement } from '@/models/achievement';
import { shuffleArray } from '@/models/array';
import { TaskTile, TILE_STATE, TILE_TYPE } from '@/models/task-tile';
import { useState } from 'react';
import { useTaskTiles } from './useTaskTiles';

//grain, city, railroad, river, forest
export const usePlaySession = (achievements: Achievement[]) => {
  const { grains, cities, forests, railroads, rivers } = useTaskTiles(achievements);
  const [tileId, setTileId] = useState(1);
  const [inPlay, setInPlay] = useState<TaskTile[]>([]);
  const [completed, setCompleted] = useState<TaskTile[]>([]);
  const [grainDeck, setGrainDeck] = useState(shuffleArray(grains));
  const [cityDeck, setCityDeck] = useState(shuffleArray(cities));
  const [forestDeck, setForestDeck] = useState(shuffleArray(forests));
  const [railroadDeck, setRailroadDeck] = useState(shuffleArray(railroads));
  const [riverDeck, setRiverDeck] = useState(shuffleArray(rivers));
  const drawTile =
    (deck: (4 | 5 | 6 | 7)[], setDeck: React.Dispatch<(4 | 5 | 6 | 7)[]>, tileType: TILE_TYPE) =>
    () => {
      if (deck.length === 0) throw new Error('Tried to draw from an empty deck');
      if (inPlay.length === 3) throw new Error('Tried to add more than 3 task tiles into play');
      setInPlay([
        ...inPlay,
        { id: tileId, value: deck[0], state: TILE_STATE.INPLAY, type: tileType },
      ]);
      setDeck(deck.slice(1));
      setTileId(tileId + 1);
    };
  return {
    decks: {
      grain: grainDeck,
      city: cityDeck,
      forest: forestDeck,
      railroad: railroadDeck,
      river: riverDeck,
    },
    inPlay,
    completed,
    drawGrain: drawTile(grainDeck, setGrainDeck, TILE_TYPE.GRAIN),
    drawCity: drawTile(cityDeck, setCityDeck, TILE_TYPE.CITY),
    drawForest: drawTile(forestDeck, setForestDeck, TILE_TYPE.FOREST),
    drawRailroad: drawTile(railroadDeck, setRailroadDeck, TILE_TYPE.RAILROAD),
    drawRiver: drawTile(riverDeck, setRiverDeck, TILE_TYPE.RIVER),
    completeTile: (taskTile: TaskTile) => {
      if (!inPlay.includes(taskTile))
        throw new Error('You tried to complete a task tile that was not in play');
      setInPlay(inPlay.filter((tile) => tile !== taskTile));
      setCompleted([...completed, { ...taskTile, state: TILE_STATE.COMPLETE }]);
    },
  };
};
