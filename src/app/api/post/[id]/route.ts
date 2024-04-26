/*
 Next uses this file to define the API routes for the posts endpoints
 */
import { type ApiHandler } from "@/server/utils/apiHandler";
import database from "@/server/data/database";
import { PostIdSchema } from "@/server/data/post";
import config from "@/server/config";

/**
 * GET /api/post/[id]
 */
export const GET: ApiHandler<{ id: string }> = async (res, context) => {
    return config.apiWrapper(() => Response.json(database.getPost(parseInt(context.params.id))));
};

/**
 * PUT /api/post/[id]
 */
export const PUT: ApiHandler<{ id: string }> = async (req, context) => {
    const id = PostIdSchema.parse(context.params.id);
    const parsed = (await req.json()) as unknown;

    return config.apiWrapper(() => Response.json(database.updatePost(id, parsed)));
};

/**
 * DELETE /api/post/[id]
 */
export const DELETE: ApiHandler<{ id: string }> = async (res, context) => {
    const id = PostIdSchema.parse(context.params.id);

    return config.apiWrapper(() => database.deletePost(id));
};
