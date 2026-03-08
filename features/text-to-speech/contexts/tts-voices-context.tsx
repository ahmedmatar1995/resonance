"use client";

import { createContext, useContext } from "react";
import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

type TSSVoiceItem =
  inferRouterOutputs<AppRouter>["voices"]["getAll"]["custom"][number];

interface TSSVoicesContextValue {
  customVoices: TSSVoiceItem[];
  systemVoices: TSSVoiceItem[];
  allVoices: TSSVoiceItem[];
}

const TSSVoicesContext = createContext<TSSVoicesContextValue | null>(null);

export function TSSVoicesProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TSSVoicesContextValue;
}) {
  return (
    <TSSVoicesContext.Provider value={value}>
      {children}
    </TSSVoicesContext.Provider>
  );
}

export function useTTSVoices() {
  const context = useContext(TSSVoicesContext);

  if (!context)
    throw new Error("use TSSVoices must be used within TSSVoiceProvider");

  return context;
}
