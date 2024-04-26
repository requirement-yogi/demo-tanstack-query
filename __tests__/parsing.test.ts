import { CreatePostSchema, PostTypeSchema } from "@/server/data/post";
import { describe, expect, test } from "vitest";
import database from "@/server/data/database";
import { z } from "zod";

const type = "NEWS";

PostTypeSchema.parse(type);

describe("PostTypeSchema", () => {
    test("parsing", () => {
        expect(PostTypeSchema.parse(type)).toBe("NEWS");
    });

    test("parsing post", () => {
        const post = { title: "title", content: "content", type: "NEWS" };
        expect(CreatePostSchema.parse(post)).toEqual(expect.objectContaining(post));
    });

    test("parsing post with invalid type", () => {
        const invalidType = "blog";

        expect(() => PostTypeSchema.parse(invalidType)).toThrow();
        expect(PostTypeSchema.safeParse(invalidType)).toHaveProperty("error");
    });
});

describe("Database", () => {
    test("create post", () => {
        const postCreated = database.addPost({ title: "title", content: "content", type: "NEWS" });
        expect(postCreated).toHaveProperty("id");
        expect(postCreated).toHaveProperty("title", "title");
        expect(postCreated).toHaveProperty("content", "content");
        expect(postCreated).toHaveProperty("type", "NEWS");
    });

    test("update post", () => {
        const post = database.getPost(0);
        expect(post).toBeTruthy();
        const updatedPost = database.updatePost(0, {
            ...post,
            title: "Updated",
            content: "Updated",
        });
        expect(updatedPost).toHaveProperty("title", "Updated");
    });
});
