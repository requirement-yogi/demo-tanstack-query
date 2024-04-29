import { PostNotFoundException } from "@/server/utils/exceptions";
import { CreatePost, CreatePostSchema, Post, type PostType, UpdatePostSchema } from "@/server/data/post";
import { LoremIpsum } from "lorem-ipsum";
import { Pageable } from "@/server/utils/pageable";
import { env } from "@/utils/env.mjs";

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});

/**
 * Mocks a database with posts
 */
class Database {
    private idSequence: number = 0;
    private posts: Post[] = [];

    private constructor() {}

    static init() {
        const database = new Database();
        return this.seed(database);
    }

    private static createRandomPost(): CreatePost {
        const title = lorem.generateWords(3);
        const content = lorem.generateParagraphs(3);
        const type = Math.random() < 0.3 ? "NEWS" : Math.random() < 0.5 ? "BLOG" : "TUTORIAL";

        return { title, content, type };
    }

    private static seed(database: Database) {
        for (let i = 0; i < env.INITIAL_POST_COUNT; i++) {
            database.addPost(this.createRandomPost());
        }
        return database;
    }

    addPost(unknownPost: unknown) {
        const post = CreatePostSchema.parse(unknownPost);
        const newPost = new Post(this.idSequence++, post.title, post.content, post.type);

        // Insert at the beginning to keep the array sorted by date
        this.posts.unshift(newPost);

        return newPost;
    }

    getPosts(pageable?: Pageable) {
        return limit(this.posts, pageable);
    }

    getPost(id: number) {
        return this.posts.find((post) => post.id === id);
    }

    deletePost(id: number) {
        let found = false;

        this.posts = this.posts.filter((post) => {
            if (post.id === id) {
                found = true;
                return false;
            }
            return true;
        });

        if (!found) {
            throw new PostNotFoundException(id);
        }
    }

    updatePost(id: number, postUpdate: unknown) {
        const validatedPost = UpdatePostSchema.parse(postUpdate);
        const post = this.posts.find((post) => post.id === id);

        if (post) {
            post.title = validatedPost.title ?? post.title;
            post.content = validatedPost.content ?? post.content;
            return post;
        }

        throw new PostNotFoundException(validatedPost.id);
    }

    getPostsByType(type: PostType, pageable?: Pageable) {
        return limit(
            this.posts.filter((post) => post.type === type),
            pageable,
        );
    }

    addRandomPost() {
        return this.addPost(Database.createRandomPost());
    }
}

/**
 * Utility function to limit the number of items returned
 */
const limit = <T>(items: T[], pageable?: Pageable) => {
    if (!pageable) {
        pageable = new Pageable();
    }

    return {
        totalSize: items.length,
        results: items.slice(pageable?.offset, pageable?.offset + pageable?.limit),
    };
};

const database = Database.init();

export default database;
