"use client";

import * as React from "react";

interface CopyToClipBoardProps {
  timeOut: number;
  onCopy: () => void;
}

export function useCopyToClipboard({ timeOut, onCopy }: CopyToClipBoardProps) {
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return;
    }

    if (!value) {
      return;
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      if (onCopy) {
        onCopy();
      }

      if (timeOut !== 0) {
        setTimeout(() => {
          setIsCopied(false);
        }, timeOut);
      }
    }, console.error);
  };
  return { isCopied, copyToClipboard };
}
