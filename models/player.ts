import * as yup from "yup";

export const PlayerSchema = yup
  .string()
  .trim()
  .required("Player name required");

export type PlayerFormData = yup.InferType<typeof PlayerSchema>;

export type Player = {
  id: number;
  name: string;
}
