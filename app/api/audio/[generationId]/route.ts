import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { getSignedAudioUrl } from "@/lib/r2";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ generationId: string }> },
) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) return new Response("unAuthorized", { status: 401 });

  const { generationId } = await params;

  const generation = await prisma.generation.findUnique({
    where: {
      id: generationId,
      orgId,
    },
  });
  if (!generation) return new Response("generation not found", { status: 404 });

  if (!generation.r2ObjectKey)
    return new Response("Audio is not avaialble", { status: 409 });

  const signedUrl = await getSignedAudioUrl(generation.r2ObjectKey);
  const audioResponse = await fetch(signedUrl);
  if (!audioResponse.ok) {
    return new Response("Failed to fetch audio url", { status: 502 });
  }

  return new Response(audioResponse.body, {
    headers: {
      "Content-Type": "audio/wav",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
