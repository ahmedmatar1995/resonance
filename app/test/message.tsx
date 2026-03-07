"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import React from "react";

function Message() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.sendMessage.queryOptions());
  return <div>{data.message}</div>;
}

export default Message;
