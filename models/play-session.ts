import {
  type PlaySessionDB as DbPlaySession,
  type SessionScoreDB as DbSessionScore,
  type TilePoolDB
} from "../db/schema";
import { ACHIEVEMENT_KEY } from "./achievement";
import { Player } from "./player";
import { TaskTile, TILE_TYPE } from "./task-tile";

export type PlaySession = DbPlaySession & {
  players: Player[];
  tiles: TaskTile[];
  tilePools: TilePoolDB[];
  score: DbSessionScore;
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