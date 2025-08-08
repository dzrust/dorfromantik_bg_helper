export type TileType = "grain" | "city" | "railroad" | "river" | "forest";
export type TileValue = 4 | 5 | 6 | 7;

export type AchievementKey = "task7_grain" | "task7_city" | "task7_forest" | "other_<your_keys_here>";

export interface Player {
  id: string;
  name: string;
}

export interface Campaign {
  id: string;
  name: string;
  startDate: string; // ISO
  endDate?: string; // ISO
  players: Player[];
  achievementsUnlocked: AchievementKey[]; // campaign-wide
  sessions: PlaySession[];
}

export interface TaskTile {
  id: string;
  type: TileType;
  value: TileValue; // 4,5,6 or (sometimes) 7
  state: "in_play" | "completed" | "discarded";
}

export interface SessionDeckCounts {
  // remaining counts to enforce the 33-tile constraint
  byType: Record<TileType, { "4": number; "5": number; "6": number; "7": number }>;
}

export interface PlaySession {
  id: string;
  index: number; // 1..n within campaign
  date: string; // ISO
  players: Player[]; // subset of campaign players
  deck: SessionDeckCounts;
  tilesInPlay: TaskTile[]; // max 3 unless deck empty
  tilesCompleted: TaskTile[];
  tilesDiscarded: TaskTile[];

  // scoring
  section1_taskSum: number; // auto: sum of tilesCompleted.value
  section2_features: {
    flags: { grain: number; city: number; forest: number };
    longestRailroad: number;
    longestRiver: number;
  };
  section3_achievements: Record<AchievementKey, number>; // user input per unlocked
  totalScore: number;
}
