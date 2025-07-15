// components/PlausibleWrapper.tsx
"use client";

import PlausibleProvider from "next-plausible";

export default function PlausibleWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlausibleProvider
      domain="jesusperez.dev"
      customDomain="https://analytics.jesusperez.dev"
      trackOutboundLinks
      trackFileDownloads
      revenue
      taggedEvents
    >
      {children}
    </PlausibleProvider>
  );
}
