import * as yup from "yup";
import { type Player as DbPlayer } from "../db/schema";

export const PlayerSchema = yup.object({
  name: yup.string().trim().required("Player name required"),
});

export type PlayerFormData = yup.InferType<typeof PlayerSchema>;
export type Player = DbPlayer;
