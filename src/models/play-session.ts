import { ACHIEVEMENT_KEY } from "./achievement";
import { Player } from "./player";
import { TaskTile, TILE_TYPE, TileValue } from "./task-tile";

export type PlaySession = {
  id: string;
  index: number; // 1..n within campaign
  date: string; // ISO
  players: Player[]; // subset of campaign players
  taskNumberPools: Record<TILE_TYPE, TileValue>
  tilesInPlay: TaskTile[]; // max 3 unless deck empty
  tilesCompleted: TaskTile[];
  score: PlaySessionScore;
}

export type PlaySessionScore = {
    taskTileScore: number;
    flags: Record<TILE_TYPE.CITY | TILE_TYPE.FOREST | TILE_TYPE.GRAIN, number>;
    longestRailroad: number;
    longestRiver: number;
    achievmentScores: Record<ACHIEVEMENT_KEY, number>
}