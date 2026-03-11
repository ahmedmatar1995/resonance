import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Text To Speech | Resonance" };

async function page({
  searchParams,
}: {
  searchParams: Promise<{ text?: string; voiceId?: string }>;
}) {
  const { text, voiceId } = await searchParams;
  prefetch(trpc.voices.getAll.queryOptions());
  prefetch(trpc.generations.getAll.queryOptions());
  return (
    <HydrateClient>
      <TextToSpeechView initialValues={{ text, voiceId }} />
    </HydrateClient>
  );
}

export default page;
