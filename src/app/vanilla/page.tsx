"use client";

import PostCreateFormVanilla from "@/app/vanilla/PostCreateFormVanilla";
import { type Post } from "@/components/Post";
import { useEffect, useState } from "react";
import { PostAPI } from "@/api/";
import PostTimeline from "@/components/PostTimeline";
import Pagination from "@/components/Pagination";

/**
 * Renders a page that displays a list of posts.
 */
export default function VanillaPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        limit: 10,
        offset: 0,
        totalSize: 0,
    });

    const onSubmit = (post: Post) => {
        console.log("Post created", post);
        setPosts((prevState) => [post, ...prevState]);
    };

    useEffect(() => {
        setIsLoading(true);

        PostAPI.getPosts({ limit: pagination.limit, offset: pagination.offset })
            .then((response) => {
                setPosts(response.results);
                setPagination((prevState) => ({ ...prevState, totalSize: response.totalSize }));
            })
            .catch((error) => {
                console.error("Failed to fetch posts", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [pagination.offset, pagination.limit]);

    const onPageChange = (page: number) => {
        setPagination((prevState) => ({ ...prevState, offset: page * pagination.limit }));
    };

    const uniquePosts = posts.filter((post, index, self) => self.findIndex((p) => p.id === post.id) === index);

    return (
        <div className={"p-4 lg:p-x-14 lg:py-8 flex flex-col place-items-center"}>
            <h1 className={"text-center py-2"}>Vanilla Page</h1>
            <PostCreateFormVanilla onSubmit={onSubmit} />
            <div className={"flex flex-row"}>
                {isLoading ? <PostTimeline.loading /> : <PostTimeline posts={uniquePosts} />}
                {/*{isLoading ? <PostTimeline.loading /> : <PostTimeline posts={uniquePosts} />}*/}
            </div>
            <Pagination pageCount={Math.floor(pagination.totalSize / pagination.limit)} onPageChange={onPageChange} />
        </div>
    );
}
