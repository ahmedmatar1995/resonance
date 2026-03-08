import React from "react";
import { Metadata } from "next";
import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";
import { trpc, HydrateClient, prefetch } from "@/trpc/server";

export const metadata: Metadata = { title: "Text To Speech | Resonance" };

async function page({
  searchParams,
}: {
  searchParams: Promise<{ text?: string; voiceId?: string }>;
}) {
  const { text, voiceId } = await searchParams;
  prefetch(trpc.voices.getAll.queryOptions());
  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  );
}

export default page;
