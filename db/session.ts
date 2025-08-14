import { eq, sql } from "drizzle-orm";
import { DateTime } from "luxon";
import { db, schema } from "./config";
import { NewPlaySessionDB } from "./schema";

export const createPlaySession = async (
  campaignId: number,
  players: number[],
  date?: string
) => {
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
        date: date || DateTime.now().toISO(),
      })
      .returning();

    // Add session players
    const sessionPlayerInserts = players.map((playerId) => ({
      sessionId: session.id,
      playerId,
    }));
    await tx.insert(schema.sessionPlayers).values(sessionPlayerInserts);

    // Initialize empty score
    await tx.insert(schema.sessionScores).values([]);

    return session;
  });
};

export const getById = async (sessionId: number) => {
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

  const [score] = await db
    .select()
    .from(schema.sessionScores)
    .where(eq(schema.sessionScores.sessionId, sessionId));

  return {
    ...session,
    players: sessionPlayers.map((sp) => sp.player),
    score,
  };
};
export const getAllPlaySessionsForCampaign = async (campaignId: number) => {
  return db
    .select()
    .from(schema.playSessions)
    .where(eq(schema.playSessions.campaignId, campaignId))
    .orderBy(schema.playSessions.index);
};

export const updatePlaySession = async (
  sessionId: number,
  data: Partial<NewPlaySessionDB>
) => {
  const [updated] = await db
    .update(schema.playSessions)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(schema.playSessions.id, sessionId))
    .returning();
  return updated;
};

export const deletePlaySession = async (sessionId: number) => {
  await db
    .delete(schema.playSessions)
    .where(eq(schema.playSessions.id, sessionId));
};
