type ErrorComponentProps = {
    error: unknown;
};

const ErrorComponent = ({ error }: ErrorComponentProps) => {
    return (
        <div className={"m-4"}>
            <p className={"mb-2"}>An error occurred while fetching posts</p>
            {error instanceof Error ? <p className={"text-sm"}>{error.message}</p> : null}
        </div>
    );
};

export default ErrorComponent;
