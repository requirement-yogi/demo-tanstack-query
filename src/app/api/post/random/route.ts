import {type ApiHandler} from "@/server/utils";
import database from "@/server/data/database";

/**
 * POST /api/post/random
 * Creates a random new post
 */
export const POST: ApiHandler = () => {
    return Response.json(database.addRandomPost());
};
