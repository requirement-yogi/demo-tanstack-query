import {ReactNode} from "react";

/**
 * Home page for the application
 */
export default function Home() {
    return (
        <div className={"max-w-prose text-gray-200 my-2 mx-auto"}>
            <Title>Site description</Title>
            <Paragraph>
                This is a comparison of the way to make requests to an API, using a simple mock of a blog as an example.
            </Paragraph>
            <List>
                <ListItem>By managing the state using the regular useEffect hooks provided by React</ListItem>
                <ListItem>By using the tanstack/react-query library</ListItem>
            </List>
            <SubTitle>Pages:</SubTitle>
            <List>
                <ListItem>`/vanilla/...` - Pages that uses the regular useEffect hooks</ListItem>
                <ListItem>`/tanstack/...` - Pages that uses the react-query library</ListItem>
                <ListItem>`/config` - Server config</ListItem>
            </List>
            <Paragraph>
                Most differences are seen with the browser's network tab open, to see the number of requests made.
            </Paragraph>
            <SubTitle>Server config</SubTitle>
            <Paragraph>
                You can configure the server to add a delay, or to randomly fail requests on the `/config` page, or in
                your `.env.local` file. Only the requests to the /post/... endpoints are affected by the delay and
                failure rate.
            </Paragraph>
            <SubTitle>Simulate other users</SubTitle>
            <Paragraph>
                You can simulate other users creating posts by running the following command in a separate terminal
                window:
            </Paragraph>
            <code className={"border-1 bg-opacity-10 bg-green-400 p-2 rounded m-2   "}>npm run simulate</code>
            <SubTitle>Git branches</SubTitle>
            <List>
                <ListItem>`main` - The initial state of the project</ListItem>
                <ListItem>
                    `auto-refetch` - Demonstrate the auto-refetch feature of react-query. The post timeline is updated
                    regularly in the background.
                </ListItem>
                <ListItem>
                    `infinite-scrolling` - Remove the pagination, and simply scroll to the bottom of the page to load
                    more posts.
                </ListItem>
                <ListItem>
                    `prefetch` - Post details are loaded in the background when hovering over a post "Read more" link.
                </ListItem>
            </List>
        </div>
    );
}

const Title = ({ children }: { children: ReactNode }) => {
    return <h1 className="text-2xl text-amber-300 my-5">{children}</h1>;
};

const Paragraph = ({ children }: { children: ReactNode }) => {
    return <p className=" my-2">{children}</p>;
};

const SubTitle = ({ children }: { children: ReactNode }) => {
    return <h2 className="text-xl text-amber-200 mt-6 mb-2">{children}</h2>;
};

const ListItem = ({ children }: { children: ReactNode }) => {
    return <li className="my-2">{children}</li>;
};

const List = ({ children }: { children: ReactNode }) => {
    return <ul className={"list-disc ml-4"}>{children}</ul>;
};
