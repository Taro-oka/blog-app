import { describe, expect, it } from "vitest";
import { userSchema } from "../../types/models";
import { sampleUser } from "../fixtures/sampleUser";

describe("user schema", () => {
  it("parses user payloads", () => {
    expect(userSchema.parse(sampleUser)).toMatchObject({
      id: sampleUser.id,
      email: sampleUser.email,
    });
  });
});
