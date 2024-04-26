import { z } from "zod";

/**
 * Represents a post
 * We can imagine that the content is foreign key to another database table, instead of being stored in a string
 */
export class Post {
    readonly id: number;
    title: string;
    content: string;
    type: PostType;
    readonly date: Date;

    constructor(id: number, title: string, content: string, type: PostType) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.type = type;
        this.date = new Date();
    }
}

export const PostTypeSchema = z.enum(["NEWS", "BLOG", "TUTORIAL"]);

export type PostType = z.infer<typeof PostTypeSchema>;

const PostTitle = z.string().trim().min(1).max(50);

const PostContent = z.string().trim().min(1).max(10_000);

export const CreatePostSchema = z.object({
    title: PostTitle,
    content: PostContent,
    type: PostTypeSchema,
});

export const PostIdSchema = z.coerce.number().min(0);

export const UpdatePostSchema = z.object({
    id: PostIdSchema,
    title: PostTitle.optional(),
    content: PostContent.optional(),
    type: PostTypeSchema.optional(),
});

export type UpdatePost = z.infer<typeof UpdatePostSchema>;
export type CreatePost = z.infer<typeof CreatePostSchema>;
