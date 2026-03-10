"use client";

import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import {
  TextToSpeechForm,
  tssDefaultValues,
  type tssFormValues,
} from "../components/text-to-speech-form";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { TSSVoicesProvider } from "../contexts/tts-voices-context";
import { VoicePreviewPanel } from "../components/voice-preview-panel";

export function TextToSpeechViewDetail({
  generationId,
}: {
  generationId: string;
}) {
  const trpc = useTRPC();
  const [generationQuery, voicesQuery] = useSuspenseQueries({
    queries: [
      trpc.generations.getById.queryOptions({ id: generationId }),
      trpc.voices.getAll.queryOptions(),
    ],
  });
  const generationData = generationQuery.data;
  const { custom: customVoices, system: systemVoices } = voicesQuery.data;
  const allVoices = [...customVoices, ...systemVoices];
  const fallBackVoiceId = allVoices[0]?.id ?? "";
  const resolvedVoiceId =
    generationData?.voiceId &&
    allVoices.some((v) => v.id === generationData.voiceId)
      ? generationData.voiceId
      : fallBackVoiceId;

  const defaultValues: tssFormValues = {
    text: generationData.text,
    voiceId: generationData.voiceId,
    temperature: generationData.temperature,
    topP: generationData.topP,
    topK: generationData.topK,
    repetitionPenalty: generationData.repetitionPenalty,
  };

  const generationVoice = {
    id: generationData.id ?? undefined,
    name: generationData.voiceName,
  };

  return (
    <TSSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm key={generationId} defaultValues={defaultValues}>
        <div className="flex h-full min-h-0 flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col min-h-0">
            <TextInputPanel />
            <VoicePreviewPanel
              audioUrl={generationData.audioUrl}
              voice={generationVoice}
              text={generationData.text}
            />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TSSVoicesProvider>
  );
}
