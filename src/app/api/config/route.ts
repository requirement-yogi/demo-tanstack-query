/*
 Next uses this file to define the API routes for the config endpoint.
 */
import type { ApiHandler } from "@/server/utils/apiHandler";
import config, { ConfigSchema } from "@/server/config";

/**
 * GET /api/config
 */
export const GET: ApiHandler = () => {
    return Response.json(config);
};

/**
 * PUT /api/config
 */
export const PUT: ApiHandler = async (request) => {
    const parsed = ConfigSchema.parse(await request.json());

    config.delay = parsed.delay;
    config.errorRate = parsed.errorRate;

    return Response.json(config);
};
