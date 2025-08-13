export enum TILE_TYPE {
  GRAIN = "grain",
  CITY = "city",
  RAILROAD = "railroad",
  RIVER = "river",
  FOREST = "forest",
}

export type TileValue = 4 | 5 | 6 | 7;

export type TaskTile = {
  id: string;
  type: TILE_TYPE;
  value: TileValue;
  state: "in_play" | "completed";
};
