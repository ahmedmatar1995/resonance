"use client";

import { formOptions } from "@tanstack/react-form";
import { z } from "zod";
import { useAppForm } from "@/hooks/use-app-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";

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
  const trpc = useTRPC();
  const router = useRouter();
  const create = useMutation(trpc.generations.create.mutationOptions());
  const form = useAppForm({
    ...tssFormOptions,
    defaultValues: defaultValues ?? tssDefaultValues,
    validators: {
      onSubmit: tssFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await create.mutateAsync({
          text: value.text.trim(),
          voiceId: value.voiceId.trim(),
          temperature: value.temperature,
          topP: value.topP,
          topK: value.topK,
          repetitionPenalty: value.repetitionPenalty,
        });
        toast.success("Audio generated successfully");
        router.push(`/text-to-speech/${data.id}`);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to generate audio";
        toast.error(message);
      }
    },
  });
  return <form.AppForm>{children}</form.AppForm>;
}
