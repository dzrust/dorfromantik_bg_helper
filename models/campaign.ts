import * as yup from "yup";
import { Achievement } from "./achievement";
import { PlayerSchema } from "./player";
import { PlaySession } from "./play-session";
import { type Campaign as DbCampaign, type Player as DbPlayer } from "../db/schema";

export const CampaignSchema = yup.object({
  name: yup.string().trim().required("Campaign name is required"),
  startDate: yup.date().required(),
  players: yup.array().of(PlayerSchema).min(1, "Add at least one player").max(4, "Up to 4 players only"),
});

export type CampaignFormData = yup.InferType<typeof CampaignSchema>;

export type Campaign = DbCampaign & {
  players: DbPlayer[];
  achievements: Achievement[];
  sessions: PlaySession[];
};

// Helper type for creating campaigns
export type CreateCampaignData = {
  name: string;
  startDate: string;
  players: { name: string }[];
};
