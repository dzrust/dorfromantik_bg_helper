import * as yup from "yup";

export const CampaignSchema = yup.object({
  name: yup.string().trim().required("Campaign name is required"),
  startDate: yup.date().required(),
  players: yup
    .array()
    .of(
      yup.object({
        name: yup.string().trim().required("Player name required"),
      }),
    )
    .min(1, "Add at least one player")
    .max(4, "Up to 4 players only"),
});

export type Campaign = yup.InferType<typeof CampaignSchema>;
