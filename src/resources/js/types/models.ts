import { z } from "zod";

export const blogStatusSchema = z.enum(["draft", "published"]);
export type BlogStatus = z.infer<typeof blogStatusSchema>;

export const userSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    email_verified_at: z.string().nullable().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export const blogSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    slug: z.string(),
    excerpt: z.string().nullable(),
    status: blogStatusSchema,
    user_id: z.string().uuid(),
    created_at: z.string(),
    updated_at: z.string(),
    published_at: z.string().nullable(),
    user: userSchema,
});

export type Blog = z.infer<typeof blogSchema>;

export type BlogForm = Pick<Blog, "title" | "content" | "excerpt" | "status">;
export type ProfileForm = Pick<User, "name" | "email">;
