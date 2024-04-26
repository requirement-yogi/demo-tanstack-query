"use client";

import React from "react";
import { type CreatePost, CreatePostSchema } from "@/server/data/post";
import { type Post } from "@/components/Post";
import { PostAPI } from "@/api";
import PostCreateForm from "@/components/PostCreateForm";
import { Button, Collapse } from "@material-tailwind/react";

type PostCreateFormVanillaProps = {
    onSubmit: (post: Post) => void;
};

/**
 * A form to create a new post.
 */
const PostCreateFormVanilla = ({ onSubmit }: PostCreateFormVanillaProps) => {
    const [showForm, setShowForm] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (post: CreatePost) => {
        setIsSubmitting(true);
        const validated = CreatePostSchema.safeParse(post);

        if (validated.success) {
            const savedPost = await PostAPI.createPost(post);

            if (savedPost) {
                onSubmit(savedPost);
                closeForm();
            }
        }

        console.error("Post is invalid", validated.error);
        setIsSubmitting(false);
    };

    const closeForm = () => {
        setIsSubmitting(false);
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
                <PostCreateForm isSubmitting={isSubmitting} onSubmit={handleSubmit} closeForm={closeForm} />
            </Collapse>
        </>
    );
};

export default PostCreateFormVanilla;
