import PostComponent, { type Post } from "@/components/Post";

type PostTimelineProps = {
    posts: Post[];
};

const PostTimeline = ({ posts }: PostTimelineProps) => {
    return (
        <div>
            {posts.map((post) => (
                <PostComponent key={post.id} post={post} />
            ))}
        </div>
    );
};

const LoadingPostTimeline = () => {
    const postNumber = 10;
    return (
        <div>
            {Array.from({ length: postNumber }, (_, index) => (
                <PostComponent.loading key={index} />
            ))}
        </div>
    );
};

PostTimeline.loading = LoadingPostTimeline;

export default PostTimeline;
