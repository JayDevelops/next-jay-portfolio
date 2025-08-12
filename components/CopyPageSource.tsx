"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-toclipboard";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

export function CopyPageSource({
  rawSource,
  className,
}: {
  rawSource: string;
  className?: string;
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard({
    timeOut: 2000,
    onCopy: () => console.log("Copied!"),
  });

  return (
    <Button
      className={className}
      variant="secondary"
      onClick={() => copyToClipboard(rawSource)}
    >
      {isCopied ? <Check /> : <Copy />} &nbsp; Copy Page
    </Button>
  );
}
