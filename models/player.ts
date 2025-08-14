import * as yup from "yup";
import { type PlayerDB as DbPlayer } from "../db/schema";

export const PlayerSchema = yup
  .string()
  .trim()
  .required("Player name required");

export type PlayerFormData = yup.InferType<typeof PlayerSchema>;
export type Player = DbPlayer;
