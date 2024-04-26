import { type Post, type PostWithContent } from "@/components/Post";
import { axiosClient } from "@/api";
import { type CreatePost, type PostType, type UpdatePost } from "@/server/data/post";
import { type AxiosResponse } from "axios";
import { addParam, axiosWrapper } from "@/api/utils";

const createPost = async (post: CreatePost) => {
    return axiosWrapper(() => axiosClient.post<CreatePost, AxiosResponse<PostWithContent>>("/post", post));
};

const getPosts = async ({ limit, offset, type }: { limit?: number; offset?: number; type?: PostType }) => {
    const params = new URLSearchParams();
    addParam(params, "limit", limit);
    addParam(params, "offset", offset);
    addParam(params, "type", type);

    return axiosWrapper(() => axiosClient.get<{ totalSize: number; results: Post[] }>("/post", { params }));
};

const getPost = async (id: number | string) => {
    return axiosWrapper(() => axiosClient.get<PostWithContent>(`/post/${id}`));
};

const deletePost = async (id: number) => {
    return axiosWrapper(() => axiosClient.delete<void>(`/post/${id}`));
};

const updatePost = async (post: UpdatePost) => {
    return axiosWrapper(() => axiosClient.put<UpdatePost, AxiosResponse<PostWithContent>>(`/post/${post.id}`, post));
};

export const PostAPI = {
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost,
};
