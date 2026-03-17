"use client";

import { type ReactNode } from "react";

interface ProGateProps {
  children: ReactNode;
  fallback?: ReactNode;
  isPro: boolean;
}

export function ProGate({ children, fallback, isPro }: ProGateProps) {
  if (isPro) return <>{children}</>;

  return (
    <>
      {fallback ?? (
        <div className="relative">
          <div className="blur-sm pointer-events-none select-none">{children}</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white border border-border rounded-lg px-6 py-4 text-center shadow-sm">
              <p className="font-medium text-sm">Pro Feature</p>
              <p className="text-muted text-xs mt-1">Upgrade to unlock this feature</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
