"use client";

import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import {
  TextToSpeechForm,
  tssDefaultValues,
  type tssFormValues,
} from "../components/text-to-speech-form";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { TSSVoicesProvider } from "../contexts/tts-voices-context";

export function TextToSpeechView({
  initialValues,
}: {
  initialValues: Partial<tssFormValues>;
}) {
  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(trpc.voices.getAll.queryOptions());
  const { custom: customVoices, system: systemVoices } = voices;
  const allVoices = [...customVoices, ...systemVoices];
  const fallBackVoiceId = allVoices[0]?.id ?? "";
  const resolvedVoiceId =
    initialValues?.voiceId &&
    allVoices.some((v) => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallBackVoiceId;
  const defaultValues: tssFormValues = {
    ...tssDefaultValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  };
  return (
    <TSSVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
      <TextToSpeechForm defaultValues={defaultValues}>
        <div className="flex h-full min-h-0 flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col min-h-0">
            <TextInputPanel />
            <VoicePreviewPlaceholder />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TSSVoicesProvider>
  );
}
