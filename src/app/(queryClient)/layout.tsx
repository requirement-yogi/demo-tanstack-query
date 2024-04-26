"use client";

import { QueryCache, QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";

/**
 * Create a new QueryClient with default options for the queries and mutations
 */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Queries are cached for 5 minutes
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
    // Handlers must be defined on the query cache, and not on the api hooks, or they would get triggered multiple times
    queryCache: new QueryCache({
        onError: (error, query) => {
            console.error("An error occurred while fetching data", error, query);
        },
    }),
});

/**
 * Common layout for pages in the (queryClient) directory
 * Includes the QueryClientProvider from tanstack/react-query
 */
export default React.memo(function TanstackQueryLayout({ children }: Readonly<{ children: ReactNode }>) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
});
