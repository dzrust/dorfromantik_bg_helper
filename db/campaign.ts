import { Campaign } from "@/models/campaign";
import { desc, eq } from "drizzle-orm";
import { db, schema } from "./config";
import { NewCampaignDB, NewPlayerDB } from "./schema";
import { getAllPlaySessionsForCampaign } from "./session";

export const getCampaigns = async () => {
  return db
    .select()
    .from(schema.campaigns)
    .orderBy(desc(schema.campaigns.createdAt));
};

export const createCampaign = async (data: NewCampaignDB, playerNames: string[]) => {
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
    const playerInserts: NewPlayerDB[] = playerNames.map((playerName) => ({
      name: playerName,
      campaignId: campaign.id,
    }));

    const players = await tx
      .insert(schema.players)
      .values(playerInserts)
      .returning();

    return { campaign, players };
  });
};

export const getCampaignById = async (id: number): Promise<Campaign | null> => {
  const [campaign] = await db
    .select()
    .from(schema.campaigns)
    .where(eq(schema.campaigns.id, id));
  if (!campaign) return null;

  const [players, achievements, sessions] = await Promise.all([
    db.select().from(schema.players).where(eq(schema.players.campaignId, id)),
    db
      .select()
      .from(schema.achievements)
      .where(eq(schema.achievements.campaignId, id)),
    getAllPlaySessionsForCampaign(campaign.id),
  ]);

  return {
    ...campaign,
    players,
    achievements,
    sessions,
  };
};

export const updateCampaign = async (id: number, data: Partial<Campaign>) => {
  const [updated] = await db
    .update(schema.campaigns)
    .set({ ...data, updatedAt: new Date().toISOString() })
    .where(eq(schema.campaigns.id, id))
    .returning();
  return updated;
};

export const deleteCampaign = async (id: number) => {
  await db.delete(schema.campaigns).where(eq(schema.campaigns.id, id));
};
