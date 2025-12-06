import { z } from "zod";

export const postStatusSchema = z.enum(["draft", "published"]);
export type PostStatus = z.infer<typeof postStatusSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  email_verified_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  excerpt: z
    .string()
    .trim()
    .nullable()
    .transform((val) => (val === null || val === "" ? null : val)),
  status: postStatusSchema,
  user_id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  published_at: z.string().nullable(),
  user: userSchema,
});

export type Post = z.infer<typeof postSchema>;

export type PostForm = Pick<Post, "title" | "content" | "excerpt" | "status">;
export type ProfileForm = Pick<User, "name" | "email">;
