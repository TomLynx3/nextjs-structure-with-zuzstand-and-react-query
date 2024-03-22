import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/query-core";
import React, { useState } from "react";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  //Creating Client
  const [queryClient] = useState(
      () =>
          new QueryClient({
            defaultOptions: { queries: { refetchOnWindowFocus: false } },
          })
  );
  return (
      <QueryClientProvider client={queryClient}>
        {/*HydrationBoundary is needed to pass dehydrated state into the queryClient. */}
        <HydrationBoundary state={pageProps?.dehydratedState}>
          <Component {...pageProps} />
        </HydrationBoundary>
      </QueryClientProvider>
  );
}