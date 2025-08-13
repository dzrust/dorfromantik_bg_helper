import { type TaskTile as DbTaskTile, TILE_TYPES, TILE_STATES } from "../db/schema";

export enum TILE_TYPE {
  GRAIN = "grain",
  CITY = "city",
  RAILROAD = "railroad",
  RIVER = "river",
  FOREST = "forest",
}

export type TileValue = 4 | 5 | 6 | 7;

export type TaskTile = DbTaskTile;

// Re-export constants from schema for convenience
export { TILE_TYPES, TILE_STATES };

// Helper types
export type TileState = keyof typeof TILE_STATES;
export type TileType = keyof typeof TILE_TYPES;
