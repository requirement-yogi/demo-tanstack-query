/*
 Next uses this file to define the API routes for the posts endpoints
*/
import database from "@/server/data/database";
import { type ApiHandler } from "@/server/utils/apiHandler";
import { Pageable } from "@/server/utils/pageable";
import { PostTypeSchema } from "@/server/data/post";
import config from "@/server/config";

/**
 * GET /api/post
 */
export const GET: ApiHandler = async (req) => {
    const limit = req.nextUrl.searchParams.get("limit");
    const offset = req.nextUrl.searchParams.get("offset");
    const type = PostTypeSchema.safeParse(req.nextUrl.searchParams.get("type")?.toUpperCase());

    if (type.success) {
        return Response.json(database.getPostsByType(type.data, Pageable.of({ limit, offset })));
    }

    return config.apiWrapper(() => Response.json(database.getPosts(Pageable.of({ limit, offset }))));
};

/**
 * POST /api/post
 */
export const POST: ApiHandler = async (request) => {
    const parsed = (await request.json()) as unknown;

    return config.apiWrapper(() => Response.json(database.addPost(parsed)));
};
