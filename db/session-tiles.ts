import { TILE_STATE } from "@/models/task-tile";
import { and, eq } from "drizzle-orm";
import { db, schema } from "./config";
import { NewSessionTileDB } from "./schema";

export const getAllSessionTiles = async (sessionId: number) => {
  const sessionTiles = await db
    .select()
    .from(schema.sessionTiles)
    .where(eq(schema.sessionTiles.sessionId, sessionId));
  return sessionTiles;
};

export const getCompletedSessionTiles = async (sessionId: number) => {
  const sessionTiles = await db
    .select()
    .from(schema.sessionTiles)
    .where(
      and(
        eq(schema.sessionTiles.sessionId, sessionId),
        eq(schema.sessionTiles.state, TILE_STATE.COMPLETE)
      )
    );
  return sessionTiles;
};

export const getInPlaySessionTiles = async (sessionId: number) => {
  const sessionTiles = await db
    .select()
    .from(schema.sessionTiles)
    .where(
      and(
        eq(schema.sessionTiles.sessionId, sessionId),
        eq(schema.sessionTiles.state, TILE_STATE.INPLAY)
      )
    );
  return sessionTiles;
};

export const updateTile = async (
  id: number,
  tile: Partial<NewSessionTileDB>
) => {
  const [updated] = await db
    .update(schema.sessionTiles)
    .set({
      ...tile,
      id,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(schema.sessionTiles.id, id))
    .returning();

  return updated;
};

export const createTile = async (tile: NewSessionTileDB) => {
  const [created] = await db
    .insert(schema.sessionTiles)
    .values({
      type: tile.type,
      point: tile.point,
      sessionId: tile.sessionId,
    })
    .returning();

  return created;
};
