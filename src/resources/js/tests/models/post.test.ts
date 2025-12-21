import { describe, expect, it } from "vitest";
import { postSchema, postStatusSchema } from "../../types/models";
import { samplePost } from "../fixtures/samplePost";
import { sampleUser } from "../fixtures/sampleUser";

describe("post schema", () => {
  it("parses post payloads", () => {
    expect(postSchema.parse(samplePost)).toMatchObject({
      id: 1,
      status: postStatusSchema.enum.published,
      user: {
        id: sampleUser.id,
      },
    });
  });
});
