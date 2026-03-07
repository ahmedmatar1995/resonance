import React, { Suspense } from "react";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import Message from "./message";

function Page() {
  prefetch(trpc.sendMessage.queryOptions());
  return (
    <HydrateClient>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg font-semibold">TRPC Test Page</h1>
        <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <Message />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrateClient>
  );
}

export default Page;
