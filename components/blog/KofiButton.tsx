"use client";

import Link from "next/link";
import type React from "react";
import { Button } from "@/components/ui/button";

export default function KofiButton({ className }: { className?: string }) {
  return (
    <Button className={className} asChild>
      <Link href="https://ko-fi.com/Y8Y11OC0A" target="_blank">
        Buy Me a Coffee
      </Link>
    </Button>
  );
}
