import { type CreatePost, type PostType } from "@/server/data/post";
import React from "react";
import { Button } from "@material-tailwind/react";

type PostCreateFormProps = {
    onSubmit: (post: CreatePost) => void | Promise<void>;
    isSubmitting: boolean;
    closeForm: () => void;
};

let postNumber = 1;

const PostCreateForm = ({ onSubmit, isSubmitting, closeForm }: PostCreateFormProps) => {
    const [title, setTitle] = React.useState(`My title ${postNumber}`);
    const [content, setContent] = React.useState(`My content ${postNumber}`);
    const [type, setType] = React.useState<PostType>("NEWS");

    const resetForm = () => {
        setTitle(`My title ${postNumber}`);
        setContent(`My content ${postNumber}`);
        setType("NEWS");
    };

    return (
        <form
            className="w-full max-w-2xl mx-auto p-4 rounded-lg shadow-gray-800 shadow-sm"
            onSubmit={(e) => {
                e.preventDefault();
                postNumber++;
                void onSubmit({ title, content, type });
                resetForm();
            }}
        >
            <h1 className="text-2xl font-semibold text-gray-500">Create a Post</h1>
            <div className="mt-4">
                <label className="block text-sm">Title</label>
                <input
                    type="text"
                    className="w-full px-4 py-2 mt-2 text-black border rounded-lg"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                        const title = e.currentTarget.value;
                        setTitle(title);
                    }}
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm">Content</label>
                <textarea
                    className="w-full px-4 py-2 mt-2 border text-black rounded-lg"
                    value={content}
                    placeholder="Content"
                    onChange={(e) => {
                        const content = e.currentTarget.value;
                        setContent(content);
                    }}
                />
            </div>
            <div className="mt-8 my-4 flex justify-between">
                <Button className="px-4 py-2 text-white duration-200 hover:bg-red-500 rounded-lg" onClick={closeForm}>
                    Close
                </Button>
                <Button
                    type={"submit"}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-white duration-100 bg-indigo-500 disabled:bg-gray-600 hover:bg-indigo-600 rounded-lg"
                >
                    {isSubmitting ? "Submitting..." : "Create"}
                </Button>
            </div>
        </form>
    );
};

export default PostCreateForm;
