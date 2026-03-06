import React from "react";
import { Metadata } from "next";
import { TextToSpeechView } from "@/features/text-to-speech/views/text-to-speech-view";

export const metadata: Metadata = { title: "Text To Speech | Resonance" };

function page() {
  return <TextToSpeechView />;
}

export default page;
