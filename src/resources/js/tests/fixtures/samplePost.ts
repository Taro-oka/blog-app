import { postStatusSchema } from "../../types/models";
import { sampleUser } from "./sampleUser";

export const samplePost = {
  id: 1,
  title: "Sample Post",
  content: "Content body",
  excerpt: "Summary",
  status: postStatusSchema.enum.published,
  user_id: sampleUser.id,
  created_at: "2024-01-03T00:00:00.000Z",
  updated_at: "2024-01-04T00:00:00.000Z",
  published_at: "2024-01-05T00:00:00.000Z",
  user: sampleUser,
};
