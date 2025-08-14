export enum ACHIEVEMENT_KEY {
  CASTLE = "Castle",
  CIRCUS = "Circus",
  CLOUDS = "Clouds",
  DEER = "Deer",
  FARM = "Farm",
  FOREST_TUNNEL = "Forest Tunnel",
  GRAIN_TUNNEL = "Grain Tunnel",
  HILL = "Hill",
  SHEPHERDESS = "Shepherdess",
  SIGNALMAN = "Signalman",
  VILLAGE_TUNNEL = "Village Tunnel",
  WAREHOUSE = "Warehouse",
  BALLOON_LAUNCH_SITE = "Balloon Launch Site",
  CONSTRUCTION_SITE = "Construction Site",
  FLAG_FESTIVAL = "Flag Festival",
  FOREST_CABIN = "Forest Cabin",
  GOLDEN_HEART = "Golden Heart",
  HARBOR = "Harbor",
  HARVEST_FESTIVAL = "Harvest Festival",
  HEARTS_DESIRE = "Hearts Desire",
  LOCOMOTIVE = "Locomotive",
  ON_THE_ROAD_TO_SUCCESS = "On the Road to Success",
  RED_HEARTS = "Red Hearts",
  SHIP = "Ship",
  TRAIN_STATION = "Train Station",
  WATCHTOWER = "Watchtower",
  // Add more achievements as needed
}

export enum ACHIEVEMENT_TYPE {
  BOX_1 = "Box 1",
  BOX_2 = "Box 2",
  BOX_3 = "Box 3",
  BOX_4 = "Box 4",
  BOX_5 = "Box 5",
}

export type Achievement = {
  id: ACHIEVEMENT_KEY;
  name: string;
  type: ACHIEVEMENT_TYPE;
  unlockedAt?: string;
};

export type AchievementListItem = {
  value: ACHIEVEMENT_KEY;
  label: string;
  type: ACHIEVEMENT_TYPE;
};

export const AchievementList = [
  // Box 1
  {
    value: ACHIEVEMENT_KEY.HEARTS_DESIRE,
    label: "Hearts Desire",
    type: ACHIEVEMENT_TYPE.BOX_1,
  },
  {
    value: ACHIEVEMENT_KEY.RED_HEARTS,
    label: "Red Hearts",
    type: ACHIEVEMENT_TYPE.BOX_1,
  },

  // Box 2
  {
    value: ACHIEVEMENT_KEY.ON_THE_ROAD_TO_SUCCESS,
    label: "On the Road to Success",
    type: ACHIEVEMENT_TYPE.BOX_2,
  },

  // Box 3
  {
    value: ACHIEVEMENT_KEY.CASTLE,
    label: "Castle",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.CIRCUS,
    label: "Circus",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.CLOUDS,
    label: "Clouds",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.DEER,
    label: "Deer",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.FARM,
    label: "Farm",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.FOREST_TUNNEL,
    label: "Forest Tunnel",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.GRAIN_TUNNEL,
    label: "Grain Tunnel",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.HILL,
    label: "Hill",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.SHEPHERDESS,
    label: "Shepherdess",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.SIGNALMAN,
    label: "Signalman",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.VILLAGE_TUNNEL,
    label: "Village Tunnel",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },
  {
    value: ACHIEVEMENT_KEY.WAREHOUSE,
    label: "Warehouse",
    type: ACHIEVEMENT_TYPE.BOX_3,
  },

  // Box 4
  {
    value: ACHIEVEMENT_KEY.FOREST_CABIN,
    label: "Forest Cabin",
    type: ACHIEVEMENT_TYPE.BOX_4,
  },
  {
    value: ACHIEVEMENT_KEY.HARVEST_FESTIVAL,
    label: "Harvest Festival",
    type: ACHIEVEMENT_TYPE.BOX_4,
  },
  {
    value: ACHIEVEMENT_KEY.LOCOMOTIVE,
    label: "Locomotive",
    type: ACHIEVEMENT_TYPE.BOX_4,
  },
  {
    value: ACHIEVEMENT_KEY.SHIP,
    label: "Ship",
    type: ACHIEVEMENT_TYPE.BOX_4,
  },
  {
    value: ACHIEVEMENT_KEY.WATCHTOWER,
    label: "Watchtower",
    type: ACHIEVEMENT_TYPE.BOX_4,
  },

  // Box 5
  {
    value: ACHIEVEMENT_KEY.BALLOON_LAUNCH_SITE,
    label: "Balloon Launch Site",
    type: ACHIEVEMENT_TYPE.BOX_5,
  },
  {
    value: ACHIEVEMENT_KEY.CONSTRUCTION_SITE,
    label: "Construction Site",
    type: ACHIEVEMENT_TYPE.BOX_5,
  },
  {
    value: ACHIEVEMENT_KEY.FLAG_FESTIVAL,
    label: "Flag Festival",
    type: ACHIEVEMENT_TYPE.BOX_5,
  },
  {
    value: ACHIEVEMENT_KEY.GOLDEN_HEART,
    label: "Golden Heart",
    type: ACHIEVEMENT_TYPE.BOX_5,
  },
  {
    value: ACHIEVEMENT_KEY.HARBOR,
    label: "Harbor",
    type: ACHIEVEMENT_TYPE.BOX_5,
  },
  {
    value: ACHIEVEMENT_KEY.TRAIN_STATION,
    label: "Train Station",
    type: ACHIEVEMENT_TYPE.BOX_5,
  },
];
