"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { COST_PER_UNIT, TEXT_MAX_LENGTH } from "@/constants";
import { Coins } from "lucide-react";

export function TextInputPanel() {
  const [text, setText] = useState("");
  const router = useRouter();
  const handleGenerate = () => {
    const trimmed = text?.trim();
    if (trimmed) {
      router.push(`/text-to-speech?text=${text}`);
    }
  };
  return (
    <div className="rounded-[22px] bg-linear185 from-[#ff8ee3] from-15% ia-[#57d7e0] via-39% to-[#dbf1f2] to-85% shadow-[0_0_0_4px_white]">
      <div className="rounded-[20px] p-1 bg-[#F9F9F9]">
        <div className="space-y-4 rounded-2xl bg-white p-4 drop-shadow-xs">
          {/* Text_Area */}
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={TEXT_MAX_LENGTH}
            className="min-h-35 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            placeholder="Start typing or paste text here"
          ></Textarea>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="gap-1.5 border-dashed">
              <Coins className="size-3 text-chart-5" />
              <span>
                {text.length > 0 ? (
                  <>
                    <span className="tabular-nums">
                      ${(text.length * COST_PER_UNIT).toFixed(4)}
                    </span>{" "}
                    estimated
                  </>
                ) : (
                  "Start typing to estimate"
                )}
              </span>
            </Badge>
            <div className="flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                {text.length.toLocaleString()} /{" "}
                {TEXT_MAX_LENGTH.toLocaleString()} characters
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end">
          <Button
            className="w-full lg:w-auto"
            size="sm"
            disabled={!text.trim()}
            onClick={handleGenerate}
          >
            Generate Speech
          </Button>
        </div>
      </div>
    </div>
  );
}
