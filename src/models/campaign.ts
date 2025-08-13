import * as yup from "yup";
import { Achievement } from "./achievement";
import { PlayerSchema } from "./player";
import { PlaySession } from "./play-session";

export const CampaignSchema = yup.object({
  name: yup.string().trim().required("Campaign name is required"),
  startDate: yup.date().required(),
  players: yup.array().of(PlayerSchema).min(1, "Add at least one player").max(4, "Up to 4 players only"),
});

export type Campaign = yup.InferType<typeof CampaignSchema> & {
  id: number;
  endDate?: string; // ISO
  achievementsUnlocked: Achievement[]; // campaign-wide
  sessions: PlaySession[];
};
