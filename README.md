This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies

```bash
npm run dev
```

Then set up your environment variables in a `.env.local` file in the root of the project. You can use the `.env.example`
file as a template.

```bash
cp .env.example .env.local
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Description

This is a comparison of the way to make requests to an API, using a simple mock of a blog as an example.

- By managing the state using the regular useEffect hooks provided by React
- By using the tanstack/react-query library

### Pages:

    - `/` - Home page
    - `/vanilla` - Pages that uses the regular useEffect hooks
    - `/tanstack` - Pages that uses the react-query library

Most differences are seen with the browser's network tab open, to see the number of requests made.

### Server config

You can configure the server to add a delay, or to randomly fail requests on the `/config` page, or in your `.env.local`
file.
Only the requests to the /post/... endpoints are affected by the delay and failure rate.

### Simulate other users

You can simulate other users creating posts by running the following command in a separate terminal window:

```bash
# Creates a new random post every 5 seconds
npm run simulate
```

### Branches

- `main` - The initial state of the project
- `auto-refetch` - Demonstrate the auto-refetch feature of react-query. The post timeline is updated regularly in the
  background.
- `infinite-scrolling` - Remove the pagination, and simply scroll to the bottom of the page to load more posts.
- `prefetch` - Post details are loaded in the background when hovering over a post "Read more" link.

## Learn more

Visit the [Next.js documentation](https://nextjs.org/docs) to learn more about Next.js.
Visit the [React Query documentation](https://tanstack.com/query/v4/docs/framework/react/overview) to learn more about TanStack Query.