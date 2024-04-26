/**
 * Thrown by Post api endpoints when a post with the given id is not found
 */
export class PostNotFoundException extends Error {
    constructor(id?: number) {
        super(`Post with id '${id}' not found`);
    }
}

/**
 * Randomly thrown by Post api endpoints, depending on the {@link config.errorRate}
 */
export class RandomError extends Error {
    constructor() {
        super("Random error");
    }
}
