export * as Exceptions from "./exceptions";
export * from "./pageable";
export * from "./apiHandler";

/**
 * Waits for the given number of milliseconds before resolving
 */
export const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));
