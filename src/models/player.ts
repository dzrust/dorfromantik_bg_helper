import * as yup from "yup";

export const PlayerSchema = yup.object({
  name: yup.string().trim().required("Player name required"),
});

export type Player = yup.InferType<typeof PlayerSchema> & { id: number };
