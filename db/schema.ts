import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Enums as constants
export const TILE_TYPES = {
  GRAIN: "grain",
  CITY: "city",
  RAILROAD: "railroad",
  RIVER: "river",
  FOREST: "forest",
} as const;

export const ACHIEVEMENT_KEYS = {
  GRAIN_7: "grain_7",
  CITY_7: "city_7",
  FOREST_7: "forest_7",
  // Add more achievements as needed
} as const;

export const TILE_STATES = {
  IN_PLAY: "in_play",
  COMPLETED: "completed",
} as const;

// Campaigns table
export const campaigns = sqliteTable("campaigns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  startDate: text("start_date").notNull(), // ISO string
  endDate: text("end_date"), // Optional, ISO string
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Players table
export const players = sqliteTable("players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  campaignId: integer("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Achievements table - stores achievements unlocked at campaign level
export const campaignAchievements = sqliteTable("campaign_achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  campaignId: integer("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  achievementKey: text("achievement_key").notNull(), // ACHIEVEMENT_KEYS values
  name: text("name").notNull(),
  unlockedAt: text("unlocked_at").default(sql`CURRENT_TIMESTAMP`),
});

// Play sessions table
export const playSessions = sqliteTable("play_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  campaignId: integer("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  index: integer("index").notNull(), // Sequential number within campaign
  date: text("date").notNull(), // ISO string
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Session players table - tracks which players participated in each session
export const sessionPlayers = sqliteTable("session_players", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id")
    .notNull()
    .references(() => playSessions.id, { onDelete: "cascade" }),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id, { onDelete: "cascade" }),
});

// Task tiles table
export const taskTiles = sqliteTable("task_tiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id")
    .notNull()
    .references(() => playSessions.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // TILE_TYPES values
  value: integer("value").notNull(), // 4, 5, 6, or 7
  state: text("state").notNull(), // TILE_STATES values
  completedAt: text("completed_at"), // ISO string when completed
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Session scores table
export const sessionScores = sqliteTable("session_scores", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id")
    .notNull()
    .references(() => playSessions.id, { onDelete: "cascade" }),

  // Section 1: Task tile scores
  taskTileScore: integer("task_tile_score").default(0),

  // Section 2: Flags and longest paths
  grainFlags: integer("grain_flags").default(0),
  cityFlags: integer("city_flags").default(0),
  forestFlags: integer("forest_flags").default(0),
  longestRailroad: integer("longest_railroad").default(0),
  longestRiver: integer("longest_river").default(0),

  // Section 3: Achievement scores stored as JSON
  achievementScores: text("achievement_scores").default("{}"), // JSON object

  // Total calculated score
  totalScore: integer("total_score").default(0),

  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Tile pools table - tracks remaining tiles in deck for each session
export const tilePools = sqliteTable("tile_pools", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: integer("session_id")
    .notNull()
    .references(() => playSessions.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // TILE_TYPES values
  value: integer("value").notNull(), // 4, 5, 6, or 7
  remainingCount: integer("remaining_count").notNull(),
});

// Export types for TypeScript
export type Campaign = typeof campaigns.$inferSelect;
export type NewCampaign = typeof campaigns.$inferInsert;

export type Player = typeof players.$inferSelect;
export type NewPlayer = typeof players.$inferInsert;

export type CampaignAchievement = typeof campaignAchievements.$inferSelect;
export type NewCampaignAchievement = typeof campaignAchievements.$inferInsert;

export type PlaySession = typeof playSessions.$inferSelect;
export type NewPlaySession = typeof playSessions.$inferInsert;

export type SessionPlayer = typeof sessionPlayers.$inferSelect;
export type NewSessionPlayer = typeof sessionPlayers.$inferInsert;

export type TaskTile = typeof taskTiles.$inferSelect;
export type NewTaskTile = typeof taskTiles.$inferInsert;

export type SessionScore = typeof sessionScores.$inferSelect;
export type NewSessionScore = typeof sessionScores.$inferInsert;

export type TilePool = typeof tilePools.$inferSelect;
export type NewTilePool = typeof tilePools.$inferInsert;
