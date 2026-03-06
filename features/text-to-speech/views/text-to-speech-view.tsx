import { SettingsPanel } from "../components/settings-panel";
import { TextInputPanel } from "../components/text-input-panel";
import {
  TextToSpeechForm,
  tssDefaultValues,
} from "../components/text-to-speech-form";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";

export function TextToSpeechView() {
  return (
    <TextToSpeechForm defaultValues={tssDefaultValues}>
      <div className="flex h-full min-h-0 flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col min-h-0">
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </TextToSpeechForm>
  );
}
