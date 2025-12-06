import { describe, expect, it } from "vitest";
import { postSchema, postStatusSchema, userSchema } from "../types/models";

describe("domain schema alignment", () => {
  const sampleUser = {
    id: "b3b8a4a0-2e9f-4d7a-9c6c-2f1b9c9b6f0d",
    name: "Test User",
    email: "test@example.com",
    email_verified_at: null,
    created_at: "2024-01-01T00:00:00.000Z",
    updated_at: "2024-01-02T00:00:00.000Z",
  };

  it("parses user payloads", () => {
    expect(userSchema.parse(sampleUser)).toMatchObject({
      id: sampleUser.id,
      email: sampleUser.email,
    });
  });

  it("parses post payloads", () => {
    const samplePost = {
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

    expect(postSchema.parse(samplePost)).toMatchObject({
      id: 1,
      status: "published",
      user: {
        id: sampleUser.id,
      },
    });
  });
});
