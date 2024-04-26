import { expect, test } from "vitest";
import { z } from "zod";

test("parsing env", () => {
    const parsed = z.coerce
        .number()
        .int()
        .min(1)
        .describe("Provide a number for the initial number of posts to seed the database")
        .parse("19");

    expect(parsed).toBe(19);
});
