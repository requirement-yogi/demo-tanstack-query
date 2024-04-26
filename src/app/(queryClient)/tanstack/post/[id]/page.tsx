"use client";
import { useParams } from "next/navigation";
import PostComponent from "@/components/Post";
import { PostAPI } from "@/api";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "@/components/ErrorComponent";
import { PostIdSchema } from "@/server/data/post";

/**
 * Renders a page that displays a single post.
 */
export default function PostDetailPageTanstack() {
    const postIdFromParams = useParams().id;
    const postId = PostIdSchema.parse(postIdFromParams);

    const {
        data: post,
        isLoading,
        error,
        isError,
    } = useQuery(
        ["getPost", postId],
        () => {
            return PostAPI.getPost(postId);
        },
        {
            staleTime: 1000 * 60 * 5,
        },
    );

    return (
        <div className={"flex mx-auto"}>
            {isLoading ? (
                <PostComponent.loading />
            ) : isError ? (
                <ErrorComponent error={error} />
            ) : (
                <PostComponent.detail post={post} />
            )}
        </div>
    );
}
