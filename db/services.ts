import { and, desc, eq, sql } from "drizzle-orm";
import { db, schema } from "./config";
import {
  ACHIEVEMENT_KEYS,
  TILE_STATES,
  TILE_TYPES,
  type NewCampaign,
  type NewPlayer,
  type NewPlaySession,
  type NewSessionScore,
  type NewTilePool,
  type TaskTile,
} from "./schema";

// UUID generation function
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Campaign Services
export const campaignService = {
  async create(data: {
    name: string;
    startDate: string;
    players: { name: string }[];
  }) {
    return db.transaction(async (tx) => {
      // Create campaign
      const [campaign] = await tx
        .insert(schema.campaigns)
        .values({
          name: data.name,
          startDate: data.startDate,
        })
        .returning();

      // Create players
      const playerInserts: NewPlayer[] = data.players.map((player) => ({
        name: player.name,
        campaignId: campaign.id,
      }));

      const players = await tx
        .insert(schema.players)
        .values(playerInserts)
        .returning();

      return { campaign, players };
    });
  },

  async getAll() {
    return db
      .select()
      .from(schema.campaigns)
      .orderBy(desc(schema.campaigns.createdAt));
  },

  async getById(id: number) {
    const [campaign] = await db
      .select()
      .from(schema.campaigns)
      .where(eq(schema.campaigns.id, id));
    if (!campaign) return null;

    const players = await db
      .select()
      .from(schema.players)
      .where(eq(schema.players.campaignId, id));
    const achievements = await db
      .select()
      .from(schema.campaignAchievements)
      .where(eq(schema.campaignAchievements.campaignId, id));
    const sessions = await db
      .select()
      .from(schema.playSessions)
      .where(eq(schema.playSessions.campaignId, id));

    return {
      ...campaign,
      players,
      achievements,
      sessions,
    };
  },

  async update(id: number, data: Partial<NewCampaign>) {
    const [updated] = await db
      .update(schema.campaigns)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(schema.campaigns.id, id))
      .returning();
    return updated;
  },

  async delete(id: number) {
    await db.delete(schema.campaigns).where(eq(schema.campaigns.id, id));
  },

  async addAchievement(
    campaignId: number,
    achievementKey: keyof typeof ACHIEVEMENT_KEYS,
    name: string
  ) {
    const [achievement] = await db
      .insert(schema.campaignAchievements)
      .values({
        campaignId,
        achievementKey,
        name,
      })
      .returning();
    return achievement;
  },

  async getAchievements(campaignId: number) {
    return db
      .select()
      .from(schema.campaignAchievements)
      .where(eq(schema.campaignAchievements.campaignId, campaignId));
  },
};

// Play Session Services
export const sessionService = {
  async create(campaignId: number, players: number[], date?: string) {
    return db.transaction(async (tx) => {
      // Get next session index
      const [{ count }] = await tx
        .select({ count: sql<number>`count(*)` })
        .from(schema.playSessions)
        .where(eq(schema.playSessions.campaignId, campaignId));

      // Create session
      const [session] = await tx
        .insert(schema.playSessions)
        .values({
          campaignId,
          index: (count || 0) + 1,
          date: date || new Date().toISOString(),
        })
        .returning();

      // Add session players
      const sessionPlayerInserts = players.map((playerId) => ({
        sessionId: session.id,
        playerId,
      }));
      await tx.insert(schema.sessionPlayers).values(sessionPlayerInserts);

      // Initialize tile pools
      await tilePoolService.initializeForSession(session.id, campaignId, tx);

      // Initialize empty score
      await tx.insert(schema.sessionScores).values([]);

      return session;
    });
  },

  async getById(sessionId: number) {
    const [session] = await db
      .select()
      .from(schema.playSessions)
      .where(eq(schema.playSessions.id, sessionId));
    if (!session) return null;

    const sessionPlayers = await db
      .select({
        player: schema.players,
      })
      .from(schema.sessionPlayers)
      .innerJoin(
        schema.players,
        eq(schema.sessionPlayers.playerId, schema.players.id)
      )
      .where(eq(schema.sessionPlayers.sessionId, sessionId));

    const tiles = await db
      .select()
      .from(schema.taskTiles)
      .where(eq(schema.taskTiles.sessionId, sessionId));
    const tilePools = await db
      .select()
      .from(schema.tilePools)
      .where(eq(schema.tilePools.sessionId, sessionId));
    const [score] = await db
      .select()
      .from(schema.sessionScores)
      .where(eq(schema.sessionScores.sessionId, sessionId));

    return {
      ...session,
      players: sessionPlayers.map((sp) => sp.player),
      tiles,
      tilePools,
      score,
    };
  },

  async getAllForCampaign(campaignId: number) {
    return db
      .select()
      .from(schema.playSessions)
      .where(eq(schema.playSessions.campaignId, campaignId))
      .orderBy(schema.playSessions.index);
  },

  async update(sessionId: number, data: Partial<NewPlaySession>) {
    const [updated] = await db
      .update(schema.playSessions)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(schema.playSessions.id, sessionId))
      .returning();
    return updated;
  },

  async delete(sessionId: number) {
    await db
      .delete(schema.playSessions)
      .where(eq(schema.playSessions.id, sessionId));
  },
};

// Tile Pool Services
export const tilePoolService = {
  async initializeForSession(sessionId: number, campaignId: number, tx?: any) {
    const dbInstance = tx || db;

    // Get campaign achievements to check for special 7 tiles
    const achievements = await dbInstance
      .select()
      .from(schema.campaignAchievements)
      .where(eq(schema.campaignAchievements.campaignId, campaignId));

    const unlockedAchievements = new Set(
      achievements.map((a) => a.achievementKey)
    );

    // Base tile pools: [4,4,5,5,6,6] for each type
    const basePools: NewTilePool[] = [];

    Object.values(TILE_TYPES).forEach((type) => {
      // Add base tiles
      basePools.push(
        { sessionId, type, value: 4, remainingCount: 2 },
        { sessionId, type, value: 5, remainingCount: 2 },
        { sessionId, type, value: 6, remainingCount: 2 }
      );

      // Add special 7 tiles if unlocked
      if (
        type === TILE_TYPES.GRAIN &&
        unlockedAchievements.has(ACHIEVEMENT_KEYS.GRAIN_7)
      ) {
        basePools.push({ sessionId, type, value: 7, remainingCount: 1 });
      }
      if (
        type === TILE_TYPES.CITY &&
        unlockedAchievements.has(ACHIEVEMENT_KEYS.CITY_7)
      ) {
        basePools.push({ sessionId, type, value: 7, remainingCount: 1 });
      }
      if (
        type === TILE_TYPES.FOREST &&
        unlockedAchievements.has(ACHIEVEMENT_KEYS.FOREST_7)
      ) {
        basePools.push({ sessionId, type, value: 7, remainingCount: 1 });
      }
    });

    await dbInstance.insert(schema.tilePools).values(basePools);
  },

  async getAvailableTiles(sessionId: number) {
    return db
      .select()
      .from(schema.tilePools)
      .where(
        and(
          eq(schema.tilePools.sessionId, sessionId),
          sql`${schema.tilePools.remainingCount} > 0`
        )
      );
  },

  async drawTile(
    sessionId: number,
    type: keyof typeof TILE_TYPES,
    value: 4 | 5 | 6 | 7
  ) {
    return db.transaction(async (tx) => {
      // Check if tile is available
      const [pool] = await tx
        .select()
        .from(schema.tilePools)
        .where(
          and(
            eq(schema.tilePools.sessionId, sessionId),
            eq(schema.tilePools.type, type),
            eq(schema.tilePools.value, value),
            sql`${schema.tilePools.remainingCount} > 0`
          )
        );

      if (!pool) {
        throw new Error(`No ${value} ${type} tiles available`);
      }

      // Decrease pool count
      await tx
        .update(schema.tilePools)
        .set({ remainingCount: pool.remainingCount - 1 })
        .where(eq(schema.tilePools.id, pool.id));

      // Create new tile
      const [tile] = await tx
        .insert(schema.taskTiles)
        .values({
          sessionId,
          type,
          value,
          state: TILE_STATES.IN_PLAY,
        })
        .returning();

      return tile;
    });
  },

  async getRandomAvailableTile(
    sessionId: number,
    type: keyof typeof TILE_TYPES
  ) {
    const availablePools = await db
      .select()
      .from(schema.tilePools)
      .where(
        and(
          eq(schema.tilePools.sessionId, sessionId),
          eq(schema.tilePools.type, type),
          sql`${schema.tilePools.remainingCount} > 0`
        )
      );

    if (availablePools.length === 0) {
      throw new Error(`No ${type} tiles available`);
    }

    // Create weighted array based on remaining count
    const weightedTiles: { value: number; pool: (typeof availablePools)[0] }[] =
      [];
    availablePools.forEach((pool) => {
      for (let i = 0; i < pool.remainingCount; i++) {
        weightedTiles.push({ value: pool.value, pool });
      }
    });

    // Pick random tile
    const randomIndex = Math.floor(Math.random() * weightedTiles.length);
    const selectedTile = weightedTiles[randomIndex];

    return this.drawTile(sessionId, type, selectedTile.value as 4 | 5 | 6 | 7);
  },
};

// Task Tile Services
export const taskTileService = {
  async getInPlayTiles(sessionId: number) {
    return db
      .select()
      .from(schema.taskTiles)
      .where(
        and(
          eq(schema.taskTiles.sessionId, sessionId),
          eq(schema.taskTiles.state, TILE_STATES.IN_PLAY)
        )
      );
  },

  async getCompletedTiles(sessionId: number) {
    return db
      .select()
      .from(schema.taskTiles)
      .where(
        and(
          eq(schema.taskTiles.sessionId, sessionId),
          eq(schema.taskTiles.state, TILE_STATES.COMPLETED)
        )
      );
  },

  async completeTile(tileId: number) {
    const [updated] = await db
      .update(schema.taskTiles)
      .set({
        state: TILE_STATES.COMPLETED,
        completedAt: new Date().toISOString(),
      })
      .where(eq(schema.taskTiles.id, tileId))
      .returning();
    return updated;
  },

  async canDrawMoreTiles(sessionId: number) {
    const inPlayTiles = await this.getInPlayTiles(sessionId);
    const availablePools = await tilePoolService.getAvailableTiles(sessionId);

    // Can draw if we have less than 3 in play and tiles are available
    return (
      inPlayTiles.length < 3 &&
      availablePools.some((pool) => pool.remainingCount > 0)
    );
  },

  async autoDrawTiles(sessionId: number) {
    const inPlayTiles = await this.getInPlayTiles(sessionId);
    const targetTiles = Math.min(
      3,
      inPlayTiles.length + (await this.getAvailableTileCount(sessionId))
    );

    const newTiles: TaskTile[] = [];

    while (inPlayTiles.length + newTiles.length < targetTiles) {
      try {
        // Draw random tile from available types
        const availableTypes = await this.getAvailableTypes(sessionId);
        if (availableTypes.length === 0) break;

        const randomType =
          availableTypes[Math.floor(Math.random() * availableTypes.length)];
        const tile = await tilePoolService.getRandomAvailableTile(
          sessionId,
          randomType
        );
        newTiles.push(tile);
      } catch (error) {
        break; // No more tiles available
      }
    }

    return newTiles;
  },

  async getAvailableTileCount(sessionId: number) {
    const [{ total }] = await db
      .select({
        total: sql<number>`sum(${schema.tilePools.remainingCount})`,
      })
      .from(schema.tilePools)
      .where(eq(schema.tilePools.sessionId, sessionId));

    return total || 0;
  },

  async getAvailableTypes(sessionId: number) {
    const availablePools = await tilePoolService.getAvailableTiles(sessionId);
    const types = new Set(availablePools.map((pool) => pool.type));
    return Array.from(types) as (keyof typeof TILE_TYPES)[];
  },
};

// Score Services
export const scoreService = {
  async updateScore(sessionId: number, scoreData: Partial<NewSessionScore>) {
    // Calculate total score
    const taskTileScore = scoreData.taskTileScore || 0;
    const flagsScore =
      (scoreData.grainFlags || 0) +
      (scoreData.cityFlags || 0) +
      (scoreData.forestFlags || 0);
    const pathsScore =
      (scoreData.longestRailroad || 0) + (scoreData.longestRiver || 0);

    let achievementScore = 0;
    if (scoreData.achievementScores) {
      const achievements =
        typeof scoreData.achievementScores === "string"
          ? JSON.parse(scoreData.achievementScores)
          : scoreData.achievementScores;
      achievementScore = Object.values(achievements).reduce(
        (sum: number, score: any) => sum + (score || 0),
        0
      );
    }

    const totalScore =
      taskTileScore + flagsScore + pathsScore + achievementScore;

    const [updated] = await db
      .update(schema.sessionScores)
      .set({
        ...scoreData,
        totalScore,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.sessionScores.sessionId, sessionId))
      .returning();

    return updated;
  },

  async getScore(sessionId: number) {
    const [score] = await db
      .select()
      .from(schema.sessionScores)
      .where(eq(schema.sessionScores.sessionId, sessionId));
    return score;
  },

  async calculateTaskTileScore(sessionId: number) {
    const completedTiles = await taskTileService.getCompletedTiles(sessionId);
    const total = completedTiles.reduce((sum, tile) => sum + tile.value, 0);

    await this.updateScore(sessionId, { taskTileScore: total });
    return total;
  },
};

// Initialize database tables
export const initializeDatabase = async () => {
  // This would typically run migrations
  // For now, we'll assume tables are created when needed
  console.log("Database initialized");
};
