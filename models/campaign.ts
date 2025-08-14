import * as yup from "yup";
import {
  AchievementDB,
  PlaySessionDB,
  type CampaignDB as DbCampaign,
  type PlayerDB as DbPlayer,
} from "../db/schema";
import { PlayerSchema } from "./player";

export const CampaignSchema = yup.object({
  name: yup.string().trim().required("Campaign name is required"),
  startDate: yup.date().required(),
  players: yup
    .array()
    .of(PlayerSchema)
    .min(1, "Add at least one player")
    .max(4, "Up to 4 players only"),
});

export type CampaignFormData = yup.InferType<typeof CampaignSchema>;

export type Campaign = DbCampaign & {
  players: DbPlayer[];
  achievements: AchievementDB[];
  sessions: PlaySessionDB[];
};
