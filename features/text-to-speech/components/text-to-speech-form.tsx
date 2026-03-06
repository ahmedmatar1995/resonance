"use client";

import { formOptions } from "@tanstack/react-form";
import { z } from "zod";
import { useAppForm } from "@/hooks/use-app-form";

const tssFormSchema = z.object({
  text: z.string().min(1, "please enter some text"),
  voiceId: z.string().min(1, "please select a voice"),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});

export type tssFormValues = z.infer<typeof tssFormSchema>;

export const tssDefaultValues: tssFormValues = {
  text: "",
  voiceId: "",
  temperature: 0.8,
  topP: 0.95,
  topK: 1000,
  repetitionPenalty: 1.2,
};

export const tssFormOptions = formOptions({
  defaultValues: tssDefaultValues,
});

export function TextToSpeechForm({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues: tssFormValues;
}) {
  const form = useAppForm({
    ...tssFormOptions,
    defaultValues: defaultValues ?? tssDefaultValues,
    validators: {
      onSubmit: tssFormSchema,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return <form.AppForm>{children}</form.AppForm>;
}
