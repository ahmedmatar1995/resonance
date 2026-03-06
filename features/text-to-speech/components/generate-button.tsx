"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface Props {
  disabled: boolean;
  isSubmitting: boolean;
  className?: string;
  onSubmit: () => void;
  size?: "default" | "sm";
}

export const GenerateButton = ({
  size,
  disabled,
  isSubmitting,
  onSubmit,
  className,
}: Props) => {
  return (
    <Button
      size={size}
      disabled={disabled || isSubmitting}
      onClick={onSubmit}
      className={cn("", className)}
    >
      {!isSubmitting ? (
        "Generate Speech"
      ) : (
        <>
          <Spinner className="size-3" />
          Generating
        </>
      )}
    </Button>
  );
};
