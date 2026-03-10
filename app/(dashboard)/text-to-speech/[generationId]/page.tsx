import { TextToSpeechViewDetail } from "@/features/text-to-speech/views/text-to-speech-detail-view";
import { trpc, HydrateClient, prefetch } from "@/trpc/server";

const TextToSeechDetailPage = async ({
  params,
}: {
  params: Promise<{ generationId: string }>;
}) => {
  const { generationId } = await params;
  prefetch(trpc.generations.getById.queryOptions({ id: generationId }));
  prefetch(trpc.voices.getAll.queryOptions());
  return (
    <HydrateClient>
      <TextToSpeechViewDetail generationId={generationId} />
    </HydrateClient>
  );
};

export default TextToSeechDetailPage;
