import { eq } from "drizzle-orm";
import { DateTime } from "luxon";
import { db, schema } from "./config";
import { NewSessionScoreDB } from "./schema";
import { getCompletedSessionTiles } from "./session-tiles";

export const updateScore = async (
  sessionId: number,
  scoreData: Partial<NewSessionScoreDB>
) => {
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

  const totalScore = taskTileScore + flagsScore + pathsScore + achievementScore;

  const [updated] = await db
    .update(schema.sessionScores)
    .set({
      ...scoreData,
      totalScore,
      updatedAt: DateTime.now().toISO(),
    })
    .where(eq(schema.sessionScores.sessionId, sessionId))
    .returning();

  return updated;
};

export const getScore = async (sessionId: number) => {
  const [score] = await db
    .select()
    .from(schema.sessionScores)
    .where(eq(schema.sessionScores.sessionId, sessionId));
  return score;
};

export const calculateTaskTileScore = async (sessionId: number) => {
  const completedTiles = await getCompletedSessionTiles(sessionId);
  const total = completedTiles.reduce((sum, tile) => sum + tile.point, 0);

  await updateScore(sessionId, { taskTileScore: total });
  return total;
};
