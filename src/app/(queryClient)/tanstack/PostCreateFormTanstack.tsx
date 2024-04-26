"use client";

import React from "react";
import { type CreatePost, CreatePostSchema } from "@/server/data/post";
import { type Post } from "@/components/Post";
import { PostAPI } from "@/api";
import PostCreateForm from "@/components/PostCreateForm";
import { Button, Collapse } from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PostCreateFormVanillaTanstack = {
    onSubmit: (post: Post) => void;
};

/**
 * A form to create a new post.
 */
const PostCreateFormTanstack = ({ onSubmit }: PostCreateFormVanillaTanstack) => {
    const [showForm, setShowForm] = React.useState(false);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (post: CreatePost) => PostAPI.createPost(post),
        onSuccess: (savedPost) => {
            onSubmit(savedPost);
            closeForm();
            // Invalidate the getPosts query to refetch the data
            // Invalidate every query that starts with "getPosts"
            void queryClient.invalidateQueries({ queryKey: ["getPosts"] });

            // Or manually update the caches with the new post
            queryClient.setQueryData(["getPost", savedPost.id], savedPost);
            // queryClient.setQueryData(
            //     ["getPosts", { offset: 0 }],
            //     (oldData: Awaited<ReturnType<(typeof PostAPI)["getPosts"]>> | undefined) => {
            //         if (!oldData) {
            //             return oldData;
            //         }
            //         return {
            //             ...oldData,
            //             results: [savedPost, ...oldData.results],
            //             totalSize: oldData.totalSize + 1,
            //         };
            //     },
            // );
        },
        onError: (error) => {
            console.error("Post creation failed", error);
        },
    });

    const handleSubmit = (post: CreatePost) => {
        // Validate the post
        CreatePostSchema.parse(post);
        mutation.mutate(post);
    };

    const closeForm = () => {
        setShowForm(false);
    };

    const toggleOpen = () => {
        setShowForm(!showForm);
    };

    return (
        <>
            <Button
                className={"px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 bg-opacity-50 rounded-lg"}
                onClick={toggleOpen}
            >
                Create Post
            </Button>
            <Collapse open={showForm}>
                <PostCreateForm isSubmitting={mutation.isLoading} onSubmit={handleSubmit} closeForm={closeForm} />
            </Collapse>
        </>
    );
};

export default PostCreateFormTanstack;
