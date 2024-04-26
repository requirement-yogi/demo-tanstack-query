/**
 * Encapsulates pagination information for the database
 */
export class Pageable {
    readonly limit: number;
    readonly offset: number;

    constructor(limit?: number, offset?: number) {
        this.limit = limit ?? 10;
        this.offset = offset ?? 0;
    }

    static of({ limit, offset }: { limit?: string | null; offset?: string | null }) {
        return new Pageable(limit ? parseInt(limit) : undefined, offset ? parseInt(offset) : undefined);
    }
}
