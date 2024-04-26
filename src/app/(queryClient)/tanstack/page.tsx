"use client";

import { type Post } from "@/components/Post";
import { useState } from "react";
import { PostAPI } from "@/api";
import PostTimeline from "@/components/PostTimeline";
import PostCreateFormTanstack from "@/app/(queryClient)/tanstack/PostCreateFormTanstack";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "@/components/ErrorComponent";
import Pagination from "@/components/Pagination";

/**
 * Renders a page that displays a list of posts.
 */
export default function VanillaPage() {
    const [pagination, setPagination] = useState({
        limit: 10,
        offset: 0,
        totalSize: 0,
    });

    const {
        data: postSearch,
        isLoading,
        error,
        isError,
        isSuccess,
    } = useQuery(["getPosts", { offset: pagination.offset }], () => PostAPI.getPosts(pagination));

    const pageCount = isSuccess ? Math.floor(postSearch.totalSize / pagination.limit) : 0;

    const onSubmit = (post: Post) => {
        console.log("Post created", post);
    };

    const onPageChange = (page: number) => {
        setPagination((prevState) => ({ ...prevState, offset: page * pagination.limit }));
    };

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
                        <PostTimeline posts={postSearch.results} />
                        {/*<PostTimeline posts={postSearch.results} />*/}
                    </>
                )}
            </div>
            <Pagination pageCount={pageCount} onPageChange={onPageChange} />
        </div>
    );
}
