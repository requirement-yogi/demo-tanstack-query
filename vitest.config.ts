import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
    },
    resolve: {
        alias: [
            {
                find: /^@\/(.*)/,
                replacement: path.resolve(__dirname, "./src/$1"),
            },
        ],
    },
});
