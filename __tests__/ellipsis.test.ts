import { describe, expect, test } from "vitest";
import { ellipsis } from "@/components/Pagination";

describe("ellipsis", () => {
    test("On low page count", () => {
        expect(ellipsis(1, 5)).toEqual([1, 2, 3, 4, 5]);
    });
    test("On high page count", () => {
        expect(ellipsis(1, 20)).toEqual([1, 2, 3, 4, 5, "...", 20]);
        expect(ellipsis(2, 20)).toEqual([1, 2, 3, 4, 5, "...", 20]);
        expect(ellipsis(3, 20)).toEqual([1, 2, 3, 4, 5, "...", 20]);
        expect(ellipsis(4, 20)).toEqual([1, "...", 3, 4, 5, 6, "...", 20]);
        expect(ellipsis(10, 20)).toEqual([1, "...", 9, 10, 11, 12, "...", 20]);
        expect(ellipsis(20, 20)).toEqual([1, "...", 16, 17, 18, 19, 20]);
    });
});
