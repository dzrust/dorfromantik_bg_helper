import { TILE_STATE } from "@/models/task-tile";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Campaigns table
export const campaigns = sqliteTable("campaigns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  startDate: text("start_date").notNull(), // ISO string
  endDate: text("end_date"), // Optional, ISO string
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Achievements table
export const achievements = sqliteTable("achievements", {
  id: text("id").notNull(),
  campaignId: integer("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
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

// Session scores table
export const sessionTiles = sqliteTable("session_tiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull(),
  point: integer("point").notNull(),
  state: integer("state").notNull().default(TILE_STATE.INPLAY),
  sessionId: integer("session_id")
    .notNull()
    .references(() => playSessions.id, { onDelete: "cascade" }),

  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
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

// Export types for TypeScript
export type CampaignDB = typeof campaigns.$inferSelect;
export type NewCampaignDB = typeof campaigns.$inferInsert;

export type AchievementDB = typeof achievements.$inferSelect;
export type NewAchievementDB = typeof achievements.$inferInsert;

export type PlayerDB = typeof players.$inferSelect;
export type NewPlayerDB = typeof players.$inferInsert;

export type PlaySessionDB = typeof playSessions.$inferSelect;
export type NewPlaySessionDB = typeof playSessions.$inferInsert;

export type SessionPlayerDB = typeof sessionPlayers.$inferSelect;
export type NewSessionPlayerDB = typeof sessionPlayers.$inferInsert;

export type SessionTileDB = typeof sessionTiles.$inferSelect;
export type NewSessionTileDB = typeof sessionTiles.$inferInsert;

export type SessionScoreDB = typeof sessionScores.$inferSelect;
export type NewSessionScoreDB = typeof sessionScores.$inferInsert;
