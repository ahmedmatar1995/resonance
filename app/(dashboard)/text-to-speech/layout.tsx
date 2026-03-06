import React from "react";
import { TextToSpeechLayout } from "@/features/text-to-speech/views/text-to-speech-layout";

function layout({ children }: { children: React.ReactNode }) {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>;
}

export default layout;
