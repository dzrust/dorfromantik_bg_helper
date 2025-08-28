import { Achievement, ACHIEVEMENT_KEY } from '@/models/achievement';
import { useMemo } from 'react';
const BASE_TILE_SET: (4 | 5 | 6 | 7)[] = [4, 4, 5, 5, 6, 6];
const EXTENDED_TILE_SET: (4 | 5 | 6 | 7)[] = [4, 4, 5, 5, 6, 6, 7];
//grain, city, railroad, river, forest
export const useTaskTiles = (achievements: Achievement[]) => {
  return useMemo(() => {
    const achievementIds = achievements.map((achievment) => achievment.id);
    const grains = achievementIds.includes(ACHIEVEMENT_KEY.FARM)
      ? EXTENDED_TILE_SET
      : BASE_TILE_SET;
    const cities = achievementIds.includes(ACHIEVEMENT_KEY.CASTLE)
      ? EXTENDED_TILE_SET
      : BASE_TILE_SET;
    const forests = achievementIds.includes(ACHIEVEMENT_KEY.DEER)
      ? EXTENDED_TILE_SET
      : BASE_TILE_SET;
    const railroads = BASE_TILE_SET;
    const rivers = BASE_TILE_SET;
    return {
      grains,
      cities,
      forests,
      railroads,
      rivers,
    };
  }, [achievements]);
};
