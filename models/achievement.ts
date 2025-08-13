export enum ACHIEVEMENT_KEY {
  GRAIN_7 = 'grain_7',
  CITY_7 = 'city_7',
  FOREST_7 = 'forest_7',
  // Add more achievements as needed
}

export type Achievement = {
  id: ACHIEVEMENT_KEY;
  name: string;
  unlockedAt?: string;
}
