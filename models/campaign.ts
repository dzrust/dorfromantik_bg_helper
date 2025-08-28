import * as yup from "yup";
import { Achievement } from "./achievement";
import { PlaySession } from "./play-session";
import { Player, PlayerSchema } from "./player";

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

export type Campaign = Omit<CampaignFormData, "players"> & {
  id: number;
  endDate: Date;
  players: Player[];
  achievements: Achievement[];
  sessions: PlaySession[];
};
