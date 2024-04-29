import { type PostType } from "@/server/data/post";
import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import useVanilla from "@/hooks/isVanilla";
import { useQueryClient } from "@tanstack/react-query";
import { PostAPI } from "@/api";

export type Post = {
    id: number;
    title: string;
    type: PostType;
    date: string;
};

export type PostWithContent = Post & {
    content: string;
};

export type PostComponentProps = {
    post: Post;
};

const PostTypeComponent = ({ type }: { type: Post["type"] }) => {
    const color = {
        NEWS: "bg-green-500",
        BLOG: "bg-blue-500",
        TUTORIAL: "bg-purple-500",
    }[type];

    return (
        <Typography as={"p"} className={`text-sm py-1 px-2 flex w-fit border-1 bg-opacity-35 rounded-lg ${color}`}>
            {type}
        </Typography>
    );
};

const PostTitle = ({ title }: { title: Post["title"] }) => {
    return (
        <Typography as={"h2"} className={"text-xl text-amber-200 capitalize mb-1"}>
            {title}
        </Typography>
    );
};

const PostDate = ({ date }: { date: Date | Post["date"] }) => {
    const dateClass = (date instanceof Date ? date : new Date(date)).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });

    return (
        <Typography as={"p"} className={"text-sm text-gray-700"}>
            {dateClass}
        </Typography>
    );
};

const PostContent = ({ content }: { content: PostWithContent["content"] }) => {
    const splitContent = content.split("\n");

    return (
        <div className={"my-4"}>
            {splitContent.map((line, index) => (
                <Typography key={index} as={"p"} className={"my-4"}>
                    {line}
                </Typography>
            ))}
        </div>
    );
};

const PostComponent = ({ post }: PostComponentProps) => {
    const isVanilla = useVanilla();

    return (
        <div className={"my-6 border-2 border-b-gray-700 p-4 flex flex-col w-96"}>
            <PostTitle title={post.title} />
            <PostDate date={post.date} />
            <PostTypeComponent type={post.type} />
            {isVanilla ? <PostDetailsLink id={post.id} /> : <PostDetailsWithPrefetch id={post.id} />}
        </div>
    );
};

const PostDetailsLink = ({ id }: { id: Post["id"] }) => {
    const isVanilla = useVanilla();
    return (
        <Link href={`/${isVanilla ? "vanilla" : "tanstack"}/post/${id}`} className={"my-2"}>
            <Button variant={"text"} className={"hover:text-sky-200"}>
                Read more
            </Button>
        </Link>
    );
};

/**
 * Prefetches the post details when hovering over the "Read more" button.
 */
const PostDetailsWithPrefetch = ({ id }: { id: Post["id"] }) => {
    const queryClient = useQueryClient();

    const prefetch = async () => {
        await queryClient.prefetchQuery(["getPost", { id }], () => PostAPI.getPost(id), {
            staleTime: 1000 * 60 * 5, // Only prefetch if older than 5 minutes
        });
    };

    const onHover = () => {
        void prefetch();
    };

    return (
        <Link href={`/tanstack/post/${id}`} className={"my-2"}>
            <Button onMouseEnter={onHover} variant={"text"} className={"hover:text-sky-200"}>
                Read more
            </Button>
        </Link>
    );
};

const LoadingPostComponent = () => {
    return (
        <div className={"my-6 border-2 border-b-gray-700 p-4 flex flex-col w-96 animate-pulse"}>
            <Typography as={"div"} variant={"h1"} className={"h-5 w-20 rounded-full bg-gray-700 mb-1"}>
                &nbsp;
            </Typography>
            <Typography as={"div"} variant={"paragraph"} className={"h-2 w-28 rounded-full bg-gray-700"}>
                &nbsp;
            </Typography>
            <Typography
                as={"div"}
                variant={"paragraph"}
                className={"h-7 w-20 mt-2 rounded-full bg-gray-700 text-sm py-1 px-2 "}
            >
                &nbsp;
            </Typography>
            <Typography as={"div"} variant={"paragraph"} className={"h-5 w-28 my-2 rounded-full bg-gray-700"}>
                &nbsp;
            </Typography>
        </div>
    );
};

type PostDetailProps = {
    post: PostWithContent;
};

const PostDetail = ({ post }: PostDetailProps) => {
    return (
        <div className={"max-w-prose mx-auto"}>
            <PostTitle title={post.title} />
            <PostDate date={post.date} />
            <PostTypeComponent type={post.type} />
            <PostContent content={post.content} />
        </div>
    );
};

PostComponent.content = PostContent;
PostComponent.date = PostDate;
PostComponent.title = PostTitle;
PostComponent.type = PostTypeComponent;
PostComponent.detail = PostDetail;
PostComponent.loading = LoadingPostComponent;

export default PostComponent;
