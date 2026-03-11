"use client";

import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { COST_PER_UNIT, TEXT_MAX_LENGTH } from "@/constants";
import { useStore } from "@tanstack/react-form";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { GenerateButton } from "./generate-button";
import { tssFormOptions } from "./text-to-speech-form";
import { cn } from "@/lib/utils";
import { SettingsDrawer } from "./settings-drawer";
import { HistoryDrawer } from "./history-drawer";
import { VoiceSelectorButton } from "./voice-selector-button";
import { PromptSuggestions } from "./prompt-suggestion";

export function TextInputPanel() {
  const form = useTypedAppFormContext(tssFormOptions);
  const text = useStore(form.store, (s) => s.values.text);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
  const isValid = useStore(form.store, (s) => s.isValid);
  return (
    <div className="flex flex-col flex-1 min-h-0 h-full">
      <div className="relative min-h-0 flex-1">
        <form.Field name="text">
          {(field) => (
            <Textarea
              value={text}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Start Typing or paste text here"
              className="absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 lg:p-6 lg:pb-8 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0"
              maxLength={TEXT_MAX_LENGTH}
              disabled={isSubmitting}
            ></Textarea>
          )}
        </form.Field>
        <div className="absolute bottom-0 inset-x-0 pointer-events-none h-8 bg-linear-to-t from-background to-transparent"></div>
      </div>
      <div className="shrink-0 p-4 lg:p-6 flex items-center justify-between">
        <div className="flex flex-col gap-3 lg:hidden">
          <GenerateButton
            size="default"
            disabled={isSubmitting || !isValid}
            isSubmitting={isSubmitting}
            className="w-full"
            onSubmit={() => form.handleSubmit()}
          />
        </div>
        {text.length > 0 ? (
          <div className="hidden lg:flex items-center justify-between">
            <Badge variant="outline" className="gap-1.5 border-dashed">
              <Coins className="size-3 text-chart-5" />
              <span className="text-xs text-muted-foreground">
                <span className="tabular-nums">
                  ${(text.length * COST_PER_UNIT).toFixed(4)}
                </span>
              </span>
            </Badge>
          </div>
        ) : (
          <div className="hidden lg:block">
            <PromptSuggestions
              onSelect={(prompt) => form.setFieldValue("text", prompt)}
            />
          </div>
        )}
        <div className="hidden lg:flex items-center gap-3">
          <p className="text-xs tracking-tight">
            {text.length.toLocaleString()} &nbsp;/&nbsp;
            <span className="text-xs text-muted-foreground">
              {TEXT_MAX_LENGTH.toLocaleString()} characters
            </span>
          </p>
          <div className="flex items-center gap-2">
            <SettingsDrawer>
              <VoiceSelectorButton />
            </SettingsDrawer>
          </div>
          {text.length > 0 && (
            <GenerateButton
              size="default"
              disabled={isSubmitting || !isValid}
              isSubmitting={isSubmitting}
              className={cn(
                "w-full lg:w-fit hidden lg:block",
                isSubmitting && "flex items-center",
              )}
              onSubmit={() => form.handleSubmit()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
