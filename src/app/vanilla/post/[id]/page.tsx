"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostComponent, { type PostWithContent } from "@/components/Post";
import { PostAPI } from "@/api";
import { PostIdSchema } from "@/server/data/post";

/**
 * Renders a page that displays a single post.
 */
export default function PostDetailPageVanilla() {
    const postId = useParams().id;
    const [post, setPost] = useState<PostWithContent>();

    useEffect(() => {
        const id = PostIdSchema.parse(postId);

        PostAPI.getPost(id)
            .then((response) => {
                setPost(response);
            })
            .catch((e) => {
                console.error("Error when fetching post details", e);
            });
    }, [postId]);

    return (
        <div className={"flex mx-auto"}>{post ? <PostComponent.detail post={post} /> : <PostComponent.loading />}</div>
    );
}
