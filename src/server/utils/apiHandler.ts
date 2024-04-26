import { type NextRequest } from "next/server";

/**
 * Utility type for defining API handlers in Next route.ts files
 */
export type ApiHandler<T = unknown> = (
    req: NextRequest,
    context: { params: T },
) => Response | Promise<Response> | Promise<void> | void | undefined;
