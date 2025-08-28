import { TILE_TYPE } from '@/models/task-tile';

export function getTileVariant(tileType: TILE_TYPE): 'grain' | 'city' | 'railroad' | 'forest' | 'river' {
  const variantMap = {
    [TILE_TYPE.GRAIN]: 'grain' as const,
    [TILE_TYPE.CITY]: 'city' as const,
    [TILE_TYPE.RAILROAD]: 'railroad' as const,
    [TILE_TYPE.FOREST]: 'forest' as const,
    [TILE_TYPE.RIVER]: 'river' as const,
  };
  
  return variantMap[tileType];
}