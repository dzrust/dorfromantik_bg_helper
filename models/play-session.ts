import { ACHIEVEMENT_KEY } from "./achievement";
import { Player } from "./player";
import { TaskTile, TILE_TYPE } from "./task-tile";

export type PlaySession = {
  id: number;
  players: Player[];
  tiles: TaskTile[];
  score: PlaySessionScore;
};

export type PlaySessionScore = {
  taskTileScore: number;
  flags: Record<TILE_TYPE.CITY | TILE_TYPE.FOREST | TILE_TYPE.GRAIN, number>;
  longestRailroad: number;
  longestRiver: number;
  achievementScores: Record<ACHIEVEMENT_KEY, number>;
  totalScore: number;
};

// Helper types for creating/updating sessions
export type CreateSessionData = {
  campaignId: number;
  players: number[];
  date?: string;
};

export type UpdateScoreData = {
  taskTileScore?: number;
  grainFlags?: number;
  cityFlags?: number;
  forestFlags?: number;
  longestRailroad?: number;
  longestRiver?: number;
  achievementScores?: Record<string, number>;
};