"use client";

import { type Post } from "@/components/Post";
import { useEffect } from "react";
import { PostAPI } from "@/api";
import PostTimeline from "@/components/PostTimeline";
import PostCreateFormTanstack from "@/app/(queryClient)/tanstack/PostCreateFormTanstack";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import ErrorComponent from "@/components/ErrorComponent";
import { useInView } from "react-intersection-observer";
import { Button } from "@material-tailwind/react";

const pageSize = 10;

/**
 * Renders a page that displays a list of posts.
 */
export default function TanstackPage() {
    const { ref, inView } = useInView({ rootMargin: "200px" });

    const {
        data: postSearch,
        isLoading,
        error,
        isError,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["getPosts"],
        // Automatic type inference did not work, string[] is the query key, number is the page param returned by getNextPageParam
        queryFn: (params: QueryFunctionContext<string[], number>) => {
            const offset = params.pageParam ?? 0;
            return PostAPI.getPosts({ offset, limit: pageSize });
        },
        getNextPageParam: (lastPage, allPages) => {
            const offset = allPages.length * pageSize;
            if (lastPage.totalSize > offset) {
                return offset;
            }
            // Return undefined to indicate no more pages
            return undefined;
        },
    });

    const onSubmit = (post: Post) => {
        console.log("Post created", post);
    };

    useEffect(() => {
        if (inView) {
            void fetchNextPage();
        }
    }, [inView]);

    const posts = postSearch?.pages.flatMap((page) => page.results) || [];

    return (
        <div className={"p-4 lg:p-x-14 lg:py-8 flex flex-col place-items-center"}>
            <h1 className={"text-center py-2"}>Tanstack Page</h1>
            <PostCreateFormTanstack onSubmit={onSubmit} />

            <div className={"flex flex-row"}>
                {isLoading ? (
                    <PostTimeline.loading />
                ) : isError ? (
                    <ErrorComponent error={error} />
                ) : (
                    <>
                        <PostTimeline posts={posts} />
                        {/*<PostTimeline posts={postSearch.results} />*/}
                    </>
                )}
            </div>

            <Button ref={ref} color={"blue-gray"} className={"mx-auto mt-4"}>
                Load more
            </Button>
        </div>
    );
}
